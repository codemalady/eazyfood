import { DOM } from '../base';

export const isProductLiked = (likeStatus)=>{
    if(likeStatus){
        document.querySelector(DOM["alert-content"]).textContent = 'Product liked';
        document.querySelector(DOM["alert-box"]).classList.toggle('active');
        setTimeout(()=>{
            document.querySelector(DOM["alert-box"]).classList.toggle('active');
        }, 2500)
    }else{
        document.querySelector(DOM["alert-content"]).textContent = 'Product already liked';
        document.querySelector(DOM["alert-box"]).classList.toggle('active');
        setTimeout(()=>{
            document.querySelector(DOM["alert-box"]).classList.toggle('active');
        }, 2500)
    }
}

export const showLikesOnUI = (products)=>{
    let html = [], newHtml;
    if(products.length !== 0){
        for (const product of products) {
            html.unshift(
                `
                    <div class="general__main--content--favorites--card" id=${product.id}>
                        <img src="${product.imageUrl}" alt="" class="general__main--content--favorites--card--img">
                        <h1 class="general__main--content--favorites--card--title">${product.name}</h1>
                        <p class="general__main--content--favorites--card--description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <a href="http://127.0.0.1:8080/dashboard.html?add-${product.id}" class="general__main--content--favorites--card--add">Add to cart</a>
                        <a href="#" class="general__main--content--favorites--card--delete">Delete</a>
                    </div>
                `
            );
        }
        newHtml = html.join('');
    }else{
        newHtml = `<h1 class="general__main--content--favorites--error u-center-text">No liked products... 😞</h1>`
    }

    document.querySelector(DOM["favorites-list"]).insertAdjacentHTML('afterbegin', newHtml);
}

export const deleteLikeOnUI = (product)=>{
    let favs = Array.from(document.querySelectorAll(DOM.favorites));

    /* If liked products is 0, display this. Otherewise delete liked product from UI */
    favs.forEach(f => {
        if(f.id === product.id){
            f.parentNode.removeChild(f);
            location.reload();
        }
    });
}