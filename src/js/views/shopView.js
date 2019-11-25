import { DOM } from '../base';

export const showCart = (productsInCart, totalValue)=>{
    if(productsInCart.length === 0){
        document.querySelector(DOM["dashboard__cart-number"]).textContent = `${productsInCart.length}`;
        document.querySelector(DOM["dashboard__cart-value"]).textContent = `₦0`;
    }else{
        for (const product of productsInCart) {
            addToCartUI(product, totalValue);
        }
    }
}

export const addToCartUI = (product, totalValue)=>{
    let cartItems = Array.from(document.querySelectorAll(DOM["dashboard-cart-product"]));
    let lastIndex = (cartItems.length === 0) ? 0 : parseInt(cartItems[cartItems.length-1].dataset.index) + 1;
    let numOfProduct = product.count;
    let numOfProductTimesPrice = product.count * product.price;
    let productID = product.id;
    
    if(numOfProduct === 1){
        //If product count is 1, then you can create and add new pwoduct to UI
        let html = `
            <div class="dashboard__sidebar--cart--product" id =${product.id} data-index=${lastIndex}>
                <img src = ${product.imageUrl} class="dashboard__sidebar--cart--product--img"/>
                <span class="dashboard__sidebar--cart--product--del"><i class="fas fa-times"></i></span>
                <p class="dashboard__sidebar--cart--product--qty">${product.count}</p>
                <p class="dashboard__sidebar--cart--product--times">X</p>
                <p class="dashboard__sidebar--cart--product--name">${product.name}</p>
                <div class="dashboard__sidebar--cart--product--btn">
                    <span class="dashboard__sidebar--cart--product--btn-add"><i class="fal fa-plus-circle"></i></span>
                    <span class="dashboard__sidebar--cart--product--btn-rmv"><i class="fal fa-minus-circle"></i></span>
                </div>
                <p class="dashboard__sidebar--cart--product--price">${product.price}</p>
            </div>
        `;
        document.querySelector(DOM["dashboard-cart"]).insertAdjacentHTML('beforeend', html);
    }else{
        //Increase product count in UI
        for (const product of cartItems) {
            if((product.id === productID)){
                product.children[2].textContent = numOfProduct;
                product.children[6].textContent =  `${numOfProductTimesPrice}`;              
            }
        }
    }

    //Update value and number of products in cart
    document.querySelector(DOM["dashboard__cart-value"]).textContent = `₦${totalValue}`;
}

export const removeFromCartUI = (index, totalValue)=>{
    let cartItems = Array.from(document.querySelectorAll(DOM["dashboard-cart-product"]));
    cartItems.forEach((e) => {
        if(e.dataset.index === index){
            e.parentNode.removeChild(e);
        }
    });
    document.querySelector(DOM["dashboard__cart-value"]).textContent = `₦${totalValue}`;
}

export const updateItemInCartUI = (product, totalCartCost)=>{
    let cartItems = Array.from(document.querySelectorAll(DOM["dashboard-cart-product"]));
    for (const cartItem of cartItems) {
        if(cartItem.id === product.id){
            if(product.count === 0){
                cartItem.parentElement.removeChild(cartItem);
            }else{
                cartItem.children[2].textContent = product.count;
                cartItem.children[6].textContent = `${product.count * product.price}`;
            }
        }
        document.querySelector(DOM["dashboard__cart-value"]).textContent = `₦${totalCartCost}`;
    }
}

