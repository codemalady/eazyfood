import { DOM } from '../base';

export const showProducts = (catID, prdts) =>{
    let productsHtml, productsArr = [];
    for (const prdt of prdts) {
        for (const category of prdt.categories) {
            if(category === catID){
                productsArr.push(
                `<div class="col-1-of-3">
                    <div class="product" id=${prdt.id}>
                        <img src=${prdt.imageUrl} class="product__img"></img>
                        <div class="product__capsule">
                            <ul class="product__capsule--icons">
                                <li>
                                    <span class="product__capsule--icon">
                                        <span>
                                            <i class="fad fa-shopping-basket"></i>
                                        </span>
                                    </span>
                                </li>
                                <li>
                                    <span href="#" class="product__capsule--icon">
                                        <span>
                                            <i class="fad fa-search"></i>
                                        </span>
                                    </span>
                                </li>
                                <li>
                                    <span href="#" class="product__capsule--icon">
                                        <span>
                                            <i class="fad fa-heart"></i>
                                        </span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="product__details">
                            <h2 class="product__details--info"><span class="product__details--name">${prdt.name}</span><span class="product__details--price">₦${prdt.price}.00</span></h2>
                        </div>
                        <div class="product__btns">
                            <div class="product__btns--btn u-center-text">
                                <span class="product__btns--btn--icon-box">
                                    <span class="product__btns--btn--icon">
                                        <span>
                                            <i class="fad fa-shopping-basket"></i>
                                        </span>
                                    </span>
                                </span>
                            </div>
                            <div class="product__btns--btn u-center-text">
                                <span class="product__btns--btn--icon-box">
                                    <span class="product__btns--btn--icon">
                                        <span>
                                            <i class="fad fa-search"></i>
                                        </span>
                                    </span>
                                </span>
                            </div>
                            <div class="product__btns--btn u-center-text">
                                <span class="product__btns--btn--icon-box">
                                    <span class="product__btns--btn--icon">
                                        <span>
                                            <i class="fad fa-heart"></i>
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>`);
            }
        }
    }
    productsHtml = productsArr.join('');
    document.getElementById('products-row').innerHTML = productsHtml;  
}

// export const showLoader = ()=>{
//     setTimeout(() => {
//         document.querySelector(DOM["dashboard-content"]).innerHTML = `<div class="loader"></div>`;
//     }, 1500);
// }

export const viewProduct = (productID, products)=>{
    /* Select opened product from state */
    for (const product of products) {
        if(product.id === productID){
            /* Select product, open popup and change url */
            document.querySelector(DOM.product).classList.add('active');
            history.pushState(null, null, `/dashboard.html?name=${product.name}&id=${productID}`);
            // console.log(product);

            /* Display product in popup */
            document.querySelector(DOM["product-name"]).textContent = product.name;
            document.querySelector(DOM["product-price"]).textContent = `₦${product.price}.00`;
            document.querySelector(DOM["product-moq"]).textContent = (product.moq) ? product.moq : 'None';


            /* Display slidehow of images and implement its controls */
            document.querySelector(DOM["product-img"]).style.backgroundImage = `url('${product.imageUrl}')`;
            // document.querySelector(DOM["product-img"]).alt = product.name;
        }
    }

}

export const closeProduct = ()=>{
    history.pushState(null, null, `/dashboard.html`);
    document.querySelector(DOM.product).classList.remove('active');
    // console.log('Closed');
}

export const showLoader = ()=>{
    document.querySelector(DOM.preloader).style.opacity = '1';
    document.querySelector(DOM.preloader).style.visibility = 'visible';
    // document.querySelector(DOM.preloader).classList.toggle('active');
}

export const hideLoader = ()=>{
    document.querySelector(DOM.preloader).style.opacity = '0';
    document.querySelector(DOM.preloader).style.visibility = 'hidden';
}