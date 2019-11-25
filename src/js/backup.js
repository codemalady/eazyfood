let shopController = (function() {
    class Product{
        constructor(name , id, price, imageUrl){
            this.name = name;
            this.id = id;
            this.price = price;
            this.imageUrl = imageUrl
        }
    }

    const products = {
        cart: [],
        categories : {
            'all' : [
                new Product('Onion', 0, 350, '../img/onions.jpg'),
                new Product('Potato', 1, 400, '../img/potatoes.jpg'),
                new Product('Tomatoes', 2, 250, '../img/tomatoes.jpg'),
                new Product('Eggs', 3, 400, '../img/eggs.jpg'),
                new Product('Watermelon', 4, 400, '../img/watermelon.jpg'),
                new Product('Titus', 5, 400, '../img/fish.jpg'),
                new Product('Okra', 6, 200, '../img/okra.jpg'),
                new Product('Red Pepper', 7, 200, '../img/tatashe.jpg'),
                new Product('Cayenne Pepper', 8, 250, '../img/cayenne-pepper.jpg'),
                new Product('Yam', 9, 450, '../img/yam.jpg'),
            ],
            'bread' : [],
            'pizza' : [],
            'fruits' : [
                new Product('Watermelon', 0, 400, '../img/watermelon.jpg'),
            ],
            'egg' : [
                new Product('Eggs', 0, 400, '../img/eggs.jpg'),
            ],
            'fish' : [
                new Product('Titus', 0, 400, '../img/fish.jpg'),
            ],
            'pepper' : [
                new Product('Tomatoes', 0, 250, '../img/tomatoes.jpg'),
                new Product('Red Pepper', 1, 200, '../img/tatashe.jpg'),
                new Product('Cayenne Pepper', 2, 250, '../img/cayenne-pepper.jpg'),
            ],
            'chicken' :[],
            'veggie' : [],
            'meat' : [],
            'other' : [
                new Product('Onion', 0, 350, '../img/onions.jpg'),
                new Product('Potato', 1, 400, '../img/potatoes.jpg'),
                new Product('Okra', 2, 200, '../img/okra.jpg'),
            ]
        },
        favorites : []
    }

    return {
        'all-products' : ()=> products.categories
    }

})();

let uiController = (function() {
    let DOMvalues = {
        'dashboard': '.dashboard',
        'categories': '.food-capsule'
    }

    return {
        DOM: ()=> DOMvalues,
        activeCategory: (catID, prdts)=>{
            let productsHtml, productsArr = [];
            for (const prdt of prdts[catID]) {
                productsArr.push(`<div class="col-1-of-3"><div class="product" id=${catID}-${prdt.id}><img src=${prdt.imageUrl} class="product__img"></img><div class="product__capsule"><ul class="product__capsule--icons"><li><a href="#" class="product__capsule--icon"><span><i class="icon-ecommerce-bag"></i></span></a></li><li><a href="#" class="product__capsule--icon"><span><i class="icon-basic-magnifier"></i></span></a></li><li><a href="#" class="product__capsule--icon"><span class="product__capsule--icon"><i class="icon-basic-heart"></i></span></a></li></ul></div><div class="product__details"><h2 class="product__details--info"><span class="product__details--name">${prdt.name}</span><span class="product__details--price">₦${prdt.price}.00</span></h2></div></div></div>`);
            }
            productsHtml = productsArr.join('');
            return productsHtml;
        },
        showCategory: (catID, prdts)=> {
            let html = '';
            switch (catID) {
                case 'pizza':
                    html = uiController.activeCategory(catID, prdts);
                    break;

                case 'fruits':
                    html = uiController.activeCategory(catID, prdts);
                    break;

                case 'egg':
                    html = uiController.activeCategory(catID, prdts);
                    break;

                case 'fish':
                    html = uiController.activeCategory(catID, prdts);
                    break;

                case 'pepper':
                    html = uiController.activeCategory(catID, prdts);
                    break;

                case 'chicken':
                    html = uiController.activeCategory(catID, prdts);
                    break;

                case 'veggie':
                    html = uiController.activeCategory(catID, prdts);
                    break;

                case 'meat':
                    html = uiController.activeCategory(catID, prdts);
                    break;

                case 'other':
                    html = uiController.activeCategory(catID, prdts);
                    break;
            
                default:
                    html = uiController.activeCategory(catID, prdts);
                    break;
            }
            document.getElementById('products-row').innerHTML = html;   
        }
    }
})();

let controller = (function(uiCtrl, shpCtrl) {
    let selected = 'all';
    let DOM = uiCtrl.DOM();
    let products = shpCtrl["all-products"]();

    const eventListeners = ()=>{
        // TOGGLE PRODUCT CATEGORIES
        document.querySelector(DOM.dashboard).addEventListener('click', function(e) {
            let categories = Array.from(document.querySelectorAll(DOM.categories))
            let categoryClass = DOM.categories.replace('.', '');
            if(e.target.id !== '' && e.target.className === categoryClass){
                selected = e.target.id;
                for (const category of categories) {
                    if(category.id === selected){
                        category.classList.toggle('active');
                    }else{
                        category.classList.remove('active');
                    }
                }
            }
            uiCtrl.showCategory(selected, products);
        });
    }
    
    
    return {
        init: ()=>{
            console.log('App started');
            uiCtrl.showCategory(selected, products);
            eventListeners();
            // let productToShow = uiController.activeCategory(selected, products);
            // uiCtrl.showCategory(productToShow);
            // uiController.showCategory(selected, products);
            // updateDOM();
            // console.log(products); 
        }
    }
})(uiController, shopController);

controller.init();



// // import { chooseActiveCategory, selectedCategory } from './models/Filter';
// import { DOM, showActiveCategoryID } from './views/filterView';
// import { productCategories } from './models/Shop';


// //APP CONTROLLER
// const setupEventListeners = ()=>{
//     let selected = 'all';
//     document.querySelector(DOM.dashboard).addEventListener('click', function(e) {
//         let categories = Array.from(document.querySelectorAll(DOM.categories))
//         let categoryClass = DOM.categories.replace('.', '');
//         if(e.target.id !== '' && e.target.className === categoryClass){
//             selected = e.target.id;
//             for (const category of categories) {
//                 if(category.id === selected){
//                     category.classList.toggle('active');
//                 }else{
//                     category.classList.remove('active');
//                 }
//             }
//         }
//         showActiveCategory(selected, productCategories);
//     });
// }

// const controller = (()=>{
//     console.log('App has started');
//     // showActiveCategory(selectedCategoryID, productCategories);
//     setupEventListeners();
// })();
