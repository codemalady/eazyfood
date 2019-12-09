//GLOBAL APP CONTROLLER
import firebase from 'firebase/app';
import 'firebase/auth';
import { DOM } from './base';
import {Product, fetchProducts, fetchProductsLocally} from './models/Product';
import { showProducts, viewProduct as viewP, closeProduct as closeP, showLoader, hideLoader } from './views/productView';
import { Search } from './models/Search';
import { showSearchResults, endCurrentSearch } from './views/searchView';
import { Shop } from './models/Shop';
import { showCart, toggleMobileCart, addToCartUI, addToCartMobileUI, removeFromCartUI, updateItemInCartUI } from './views/shopView';
import { Like } from './models/Like';
import { isProductLiked, showLikesOnUI, deleteLikeOnUI } from './views/likesView';
import { User } from './models/Auth';
import { initializeAuth, toggleAuthModes, showAuthPopup, closeAuthPopup, retrieveUserData, authLoading, signInDone, signUpDone, showCurrentUser} from './views/authView';

/* Global App State */
const state = {};

//HOME CONTROLLER - (To control product preview, adding to cart and favorites)
window.addEventListener('load', ()=>{
    marketEventListener();
});

const marketEventListener = ()=>{
    document.querySelector('.market').addEventListener('click', (e) => {
        /* Setting up product popup for homepage */
        if(e.target.className === 'fad fa-search'){
            e.preventDefault();
            const productID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.toString();
            window.open(`/dashboard.html?${productID}`, '_blank');

        }else if(e.target.className === 'fad fa-shopping-basket'){
            e.preventDefault();
            const productID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.toString();        
            window.open(`/dashboard.html?add-${productID}`, '_blank');
            // if(state.user !== undefined){
            //     e.preventDefault();
            //     const productID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.toString();        
            //     window.open(`http://127.0.0.1:8080/dashboard.html?add-${productID}`, '_blank');
            // }else{
            //     showAuthPopup();
            // }
        }
    });
}

//TOGGlE DASHBOARD MENU

/* Function to toggle the menus if menu input label is checked */
const toggleMenu = ()=>{
    if(document.querySelector(DOM["dashboard-menu-toggle"]).checked){
        document.querySelector(DOM["dashboard-menu"]).style.width= '8%';
        document.querySelector(DOM["dashboard-menu"]).style.opacity = '1';
        document.querySelector(DOM["dashboard-menu"]).style.visibility = 'visible';
    }else{
        document.querySelector(DOM["dashboard-menu"]).style.width= '0%';
        document.querySelector(DOM["dashboard-menu"]).style.opacity = '0';
        document.querySelector(DOM["dashboard-menu"]).style.visibility = 'hidden';
    }
}

/* Function to toggle the menus if menu input label is checked  --- MOBILE */
const toggleMobileMenu = ()=>{
    if(document.querySelector(DOM["dashboard-mobile"]).checked){
        document.querySelector(DOM["dashboard-tray"]).style.opacity = '1';
        document.querySelector(DOM["dashboard-tray"]).style.visibility = 'visible';
    }else{
        document.querySelector(DOM["dashboard-tray"]).style.opacity = '0';
        document.querySelector(DOM["dashboard-tray"]).style.visibility = 'hidden';
    }
}

/* Function to toggle the menus if menu input label is checked  --- TABLET PORTRAIT */
const toggleTabletMenu = ()=>{
    if(document.querySelector('.dashboard__sliding-cart--input').checked){
        document.querySelector('.dashboard__sidebar').style.opacity = '1';
        document.querySelector('.dashboard__sidebar').style.visibility = 'visible';
        document.querySelector('.dashboard__sidebar').style.width = '35%';
    }else{
        document.querySelector('.dashboard__sidebar').style.opacity = '0';
        document.querySelector('.dashboard__sidebar').style.visibility = 'hidden';
        document.querySelector('.dashboard__sidebar').style.width = '0%';
    }
}

/* Event listener to be added to the menu button at initialization of webapp */
const setupMenuEventListener = ()=>{
    /* Some buttons to be hidden when user isnt logged in */
    if(localStorage.getItem('username') === null){
        document.querySelector(DOM["dashboard-nav"]).innerHTML = `
            <li><a href="/" class="dashboard__menu__btns--btn">
                <span class="dashboard__menu__btns--btn--icon">
                    <i class="fad fa-home"></i>
                </span>
                <span class="dashboard__menu__btns--btn--tooltip">Home</span>
            </a></li>
            <li><a href="/favorites.html" class="dashboard__menu__btns--btn">
                <span class="dashboard__menu__btns--btn--icon">
                    <i class="fad fa-heart"></i>
                </span>
                <span class="dashboard__menu__btns--btn--tooltip">Favorites</span>
            </a></li>
            <li><a href="#" class="dashboard__menu__btns--btn">
                <span class="dashboard__menu__btns--btn--icon">
                    <i class="fad fa-envelope-open"></i>
                </span>
                <span class="dashboard__menu__btns--btn--tooltip">Contact</span>
            </a></li>
        `;
        document.querySelector(DOM["dashboard-tray"]).innerHTML = `
            <a href="/" class="dashboard__tray--menu">Home</a>
            <a href="/favorites.html" class="dashboard__tray--menu">Favorites</a>
            <a href="#" class="dashboard__tray--menu">Contact</a>
        `;
    }else{
        document.querySelector(DOM["dashboard-nav"]).innerHTML = `
            <li><a href="/" class="dashboard__menu__btns--btn">
                <span class="dashboard__menu__btns--btn--icon">
                    <i class="fad fa-home"></i>
                </span>
                <span class="dashboard__menu__btns--btn--tooltip">Home</span>
            </a></li>
            <li><a href="/favorites.html" class="dashboard__menu__btns--btn">
                <span class="dashboard__menu__btns--btn--icon">
                    <i class="fad fa-heart"></i>
                </span>
                <span class="dashboard__menu__btns--btn--tooltip">Favorites</span>
            </a></li>
            <li><a href="/orders.html" id="orders" class="dashboard__menu__btns--btn">
                <span class="dashboard__menu__btns--btn--icon">
                    <i class="fad fa-box"></i>
                </span>
                <span class="dashboard__menu__btns--btn--tooltip">Orders</span>
            </a></li>
            <li><a href="#" class="dashboard__menu__btns--btn">
                <span class="dashboard__menu__btns--btn--icon">
                    <i class="fad fa-cog"></i>
                </span>
                <span class="dashboard__menu__btns--btn--tooltip">Settings</span>
            </a></li>
            <li><a href="#" class="dashboard__menu__btns--btn">
                <span class="dashboard__menu__btns--btn--icon">
                    <i class="fad fa-envelope-open"></i>
                </span>
                <span class="dashboard__menu__btns--btn--tooltip">Contact</span>
            </a></li>
            <li><a href="#" id="sign-out" class="dashboard__menu__btns--btn">
                <span class="dashboard__menu__btns--btn--icon">
                    <i class="fad fa-sign-out-alt"></i>
                </span>
                <span class="dashboard__menu__btns--btn--tooltip">Logout</span>
            </a></li>
        `;
        document.querySelector(DOM["dashboard-tray"]).innerHTML = `
            <a href="/" class="dashboard__tray--menu">Home</a>
            <a href="/favorites.html" class="dashboard__tray--menu">Favorites</a>
            <a href="/orders.html" class="dashboard__tray--menu">Orders</a>
            <a href="#" class="dashboard__tray--menu">Settings</a>
            <a href="#" class="dashboard__tray--menu">Contact</a>
            <a href="#" id="sign-out" class="dashboard__tray--menu">Logout</a>
        `;
    }
    document.querySelector(DOM["dashboard-menu-toggle"]).checked = false;
    document.querySelector(DOM["dashboard-menu-toggle"]).addEventListener('click', toggleMenu);
    document.querySelector(DOM["dashboard-mobile"]).addEventListener('click', toggleMobileMenu);
    document.querySelector(DOM["dashboard-body"]).addEventListener('click', toggleTabletMenu);
}


//PRODUCT CONTROLLER
/* App initial state and all neccessary event listeners to be setup in the dashboard */
const init = ()=>{
    showProducts(state.selected, state.products);
    toggleProductCategories();
    setupMenuEventListener();
    toggleMobileCart()
    searchListener();
    viewProduct();
    closeProduct();
    browserCloseProduct();
    showCart(state.shoppingList.items, state.shoppingList.sum);
    addToCart();
    addToCartInPopup();
    removeFromCart();
    updateShoppingList();
    likeProduct();
};

/* Fetch products and assign them to the Product class */
state.products = new Array();
window.addEventListener('load', async ()=>{
    try {
        // let fetchedProducts = await fetchProducts();
        let fetchedProducts = await fetchProductsLocally();
        showLoader();
        /* If products are available, transfer into state */
        if(fetchedProducts){
            hideLoader();
            for (const product of fetchedProducts.products) {
                const newProduct = new Product(product.productId, product.name.toLowerCase(), product.imageUrl, product.price, product.moq, product.categories)
                state.products.push(newProduct);
            }
        }
    } catch (error) {
        // Create or display error message
        console.log('An error occured');
    }

    init();

    /* Automatically open popup on refresh of page and pass product parameters */
    const productAddress = window.location.href;
    const productID = productAddress.slice((productAddress.length-4), productAddress.length);
    if(window.location.href.includes(productAddress.slice(0, 36))){
        viewP(productID, state.products);
    }

    /* Automatically add product to cart from homepage */
    if(productAddress.slice(37, 40) === 'add'){
        productToAdd = state.shoppingList.addItems(productID, state.products);

        /* Close popup */
        closeP();

        /* Calculate total & display in UI */
        addToCartUI(productToAdd, state.shoppingList.sum);
    }

    /* Change dashboard username */
    state.user.fetchCurrentUser();
    showCurrentUser();

});

/* Arrange and sort products by categories */
state.selected = 'fruits';
const toggleProductCategories = ()=>{
    document.querySelector(DOM.dashboard).addEventListener('click', function(e) {
        let categories = Array.from(document.querySelectorAll(DOM.categories))
        let categoryClass = DOM.categories.replace('.', '');
        if(e.target.id !== '' && e.target.className === categoryClass){
            state.selected = e.target.id;
            for (const category of categories) {
                if(category.id === state.selected){
                    category.classList.toggle('active');
                }else{
                    category.classList.remove('active');
                }
            }
        }
        showProducts(state.selected, state.products);
    });
}

/* View product and show product popup */
const viewProduct = ()=>{
    document.querySelector(DOM.dashboard).addEventListener('click', (e)=>{
        if(e.target.className === 'fad fa-search'){
            e.preventDefault();
            const productID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.toString();
            viewP(productID, state.products);
        }
        
    });
}

/* Close product details and close product popup */
const closeProduct = ()=>{
    document.querySelector('body').addEventListener('click', (e)=>{
        if(e.target.className === 'product-detail__close' || e.target.className === 'product-detail__close--icon'){
            closeP();
        }
    });
}

/* Close product details and close product popup with browser back button */
const browserCloseProduct = ()=>{
    window.addEventListener('popstate', ()=>{
        history.replaceState(null, null, '/dashboard.html');
        closeP();
    });
}


//SEARCH CONTROLLER
const searchListener = ()=>{
    const searchIcon = document.querySelector(DOM.icon);
    const searchInput = document.querySelector(DOM.input);
    searchIcon.innerHTML = '<i class="fas fa-search"></i>';
    searchInput.addEventListener('input', ()=>{
        if(searchInput.value !== ' ' && searchInput.value.length > 0){
            //Convert search icon to close anad attach event listener to cancel search and input fields
            searchIcon.innerHTML = '<i class="fas fa-times"></i>';
            searchIcon.addEventListener('click', ()=>{
                endCurrentSearch();
            });

            //Convert search string to lowercase and create new search object
            const searchString = searchInput.value.toLowerCase();
            state.search = new Search(searchString);
    
            // Make search
            state.searchResult = state.search.getSearchResults(state.products);
    
            // Display search results
            showSearchResults(state.searchResult);
        }else{
            // Stop search and hide search results
            endCurrentSearch();
        }
    });
}

//SHOP CONTROLLER
state.shoppingList = new Shop();
window.cart = state.shoppingList.items;
window.sum = state.shoppingList.sum;
window.products = state.products;
let productToAdd, productToRemove, productToUpdate;

/* Save cart items in local storage */
const updateCartToStorage = ()=>{
    localStorage.setItem('cart', JSON.stringify(state.shoppingList.items));
    localStorage.setItem('cartTotal', JSON.stringify(state.shoppingList.items.length));
}

/* Update cart count */
const cartCountTotal = ()=>{
    document.querySelector(DOM["dashboard__cart-number"]).textContent = state.shoppingList.items.length;
    document.querySelector(DOM["dashboard__cart-number-mobile"]).textContent = state.shoppingList.items.length;
    document.querySelector('.dashboard__sliding-cart--label--count--number').textContent = state.shoppingList.items.length;
}

/* Add items to cart in dashboard */
const addToCart = ()=>{
    document.querySelector(DOM["dashboard-body"]).addEventListener('click', (e)=>{
        if(e.target.className === 'fad fa-shopping-basket'){
            e.preventDefault();        
            const productID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.toString();
            
            productToAdd = state.shoppingList.addItems(productID, state.products);

             /* Calculate total & display in UI -- Desktop */
            addToCartUI(productToAdd, state.shoppingList.sum);
        }else if(e.target.parentNode.className === 'dashboard__sidebar--cart--product--btn-add' || e.target.parentNode.className === 'dashboard__cart--product--add'){
            console.log('Adding from sidebar');
            
            const productID = e.target.parentNode.parentNode.parentNode.id.toString();
            productToAdd = state.shoppingList.addItems(productID, state.products);

             /* Calculate total & display in UI */
            addToCartUI(productToAdd, state.shoppingList.sum);
            // addToCartMobileUI(productToAdd, state.shoppingList.sum);
        }

        updateCartToStorage();
        cartCountTotal();
    });
}


/* Add items to cart in product popup */
const addToCartInPopup = ()=>{
    document.querySelector(DOM["product-popup-btn"]).addEventListener('click', (e)=>{
        e.preventDefault();

        /* Retrieve productID from generated url and add to shopping list */
        const productAddress = window.location.href;
        const productID = productAddress.slice((productAddress.length-4), productAddress.length);

        productToAdd = state.shoppingList.addItems(productID, state.products);

        /* Calculate total & display in UI */
        addToCartUI(productToAdd, state.shoppingList.sum);

        updateCartToStorage();

        /* Close popup */
        closeP();

        cartCountTotal();
    });
}

/* Remove items from cart */
const removeFromCart = ()=>{
    document.querySelector(DOM["dashboard-body"]).addEventListener('click', (e)=>{
        // console.log(e.target.parentNode.className);
        
        if(e.target.parentNode.className === 'dashboard__sidebar--cart--product--del' || e.target.parentNode.className === 'dashboard__cart--product--close'){
            console.log('Remove that shii');
            
            const productID = e.target.parentNode.parentNode.id.toString(); //ID of item to be removed
            const productIndex  = e.target.parentNode.parentNode.dataset.index; //Dataset index of item to be removed

            /* Delete from shopping List */
            productToRemove = state.shoppingList.deleteItems(productID);
            
            /* Calculate total & remove from UI */
            removeFromCartUI(productIndex, state.shoppingList.sum);

            /* If deleted item has count more than 1, reset back to 1 because you've removed it from cart */
            productToRemove.count = 1;
        }
        
        updateCartToStorage();
        cartCountTotal();
    });
}

/* Update items in cart */
const updateShoppingList = ()=>{
    document.querySelector(DOM["dashboard-body"]).addEventListener('click', (e)=>{
        if(e.target.parentNode.className === 'dashboard__sidebar--cart--product--btn-rmv' || e.target.parentNode.className === 'dashboard__cart--product--rmv'){
            const productID = e.target.parentNode.parentNode.parentNode.id.toString();
            const productIndex  = e.target.parentNode.parentNode.parentNode.dataset.index; //Dataset index of item to be altered
            console.log(productID, productIndex);
            
            /* Reduce count of item in shopping cart if more than 1, otherwise delete from cart */
            productToUpdate = state.shoppingList.updateItem(productID);
            updateItemInCartUI(productToUpdate, state.shoppingList.sum);
            // updateItemInCartUI(productIndex, productToRemove, state.shoppingList.sum);
            updateCartToStorage();
            cartCountTotal();

            /* If deleted item has count as 0, reset back to 1 */
            state.shoppingList.restoreCount(state.products);
        }
    });
}

//LIKES CONTROLLER
let likeStatus, likedProducts ;
state.likedProducts = new Like;

/* Fetch likes from localstorage or server and overwrite empty likes array */
state.likedProducts.fetchLikes();

/* Exposing state likes to console */
window.likes = state.likedProducts.likes;


/* Add products to likes */
const likeProduct = ()=>{

    /* Add productID to likes array */
    document.querySelector(DOM.dashboard).addEventListener('click', (e)=>{
        if(e.target.className === 'fad fa-heart' && (e.target.parentNode.parentNode.className === 'product__capsule--icon' || e.target.parentNode.parentNode.className === 'product__btns--btn--icon')){
            e.preventDefault();
            const productID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.toString();
            likeStatus = state.likedProducts.setLike(productID, state.products);
            
            /* Display alert if product is liked or not */
            isProductLiked(likeStatus, productID, likedProducts);

            /* Update likes in local storage */
            localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts.likes));
        }
    });
}

/* Event listener to know we are on the favorites page and thus fetch for orders */
window.addEventListener('load', ()=>{
    let productAddress = location.href;
    if(productAddress.slice(22, 31) === 'favorites'){
        /* Show liked products on favorites page UI */
        showLikesOnUI(JSON.parse(localStorage.getItem('likedProducts')));

        /* Some buttons to be hidden when user isnt logged in */
        setupMenuEventListener(DOM["general-nav"]);

        /* Event listener to track which product to remove from likedProducts state */
        document.querySelector('body').addEventListener('click', (e)=>{
            if(e.target.className === 'general__main--content--favorites--card--delete'){
                e.preventDefault();
                /* Retrieve id of liked product */
                let likeID = e.target.parentNode.id.toString();
                
                /* Pass the id to remove method and from state likes */
                let likeToRemove = state.likedProducts.removeLike(likeID);
                console.log(state.likedProducts.likes);
                
                /* Update likes in local storage */
                localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts.likes));
                
                /* Render new list to UI */
                deleteLikeOnUI(likeToRemove);
            }

        });
    }
});

//ORDERS CONTROLLER
window.addEventListener('load', ()=>{
    let productAddress = location.href;
    if(productAddress.slice(22, 28) === 'orders'){
        console.log('In the orders page, biish');

        /* Some buttons to be hidden when user isnt logged in */
        setupMenuEventListener(DOM["general-nav"]);
    }
});

//AUTH CONTROLLER
state.user = new User();
state.user.init();

/* Start Firebase services and initial auth mode (sign up/ sign in) */
document.addEventListener('DOMContentLoaded', async()=>{
    /* Switch auth modes between sign in/ sign up if necessary */
    toggleAuthModes();
    /* Switch initial auth form to sign in mode */
    initializeAuth();
    /* Fetch current user */
    state.user.fetchCurrentUser();
});

/* Open and close auth popup if no user if found */
document.querySelector('body').addEventListener('click', (e)=>{
    if(e.target.parentNode.className === 'header__menu--icon'){
        if(localStorage.getItem('username') === null){
            showAuthPopup();
        }else{
            window.open(`/dashboard.html`);
        }
    }else if(e.target.closest('.auth__close')){
        closeAuthPopup();
    }
});

/* Collect data from UI and pass to Firebase to authenticate */
document.querySelector('body').addEventListener('click', async (e)=>{
    let userDetails;
    if(e.target.closest('.auth__form--btn')){ 
        /* Pass data to appropriate function */
        if (!document.getElementById(DOM["auth-switch"]).checked) {
            authLoading();
            userDetails = retrieveUserData();
            await state.user.signIn(userDetails.email, userDetails.password);
            if(localStorage.getItem('username') !== null){
                signInDone();
                window.open(`/dashboard.html`, '_self'); 
            }      
        } else {
            authLoading();
            userDetails = retrieveUserData();
            await state.user.signUp(userDetails.email, userDetails.password, userDetails.display);
            if(localStorage.getItem('username') !== null){
                /* While signing up, wait for 2 secs before assigning user details wth updated username to user state */
                setTimeout(()=>{
                    state.user = state.user;
                    signUpDone();
                    window.open(`/dashboard.html`, '_self');
                }, 2000);
            }
        }
    }
});

/* Sign out from app */
document.querySelector(DOM.dashboard).addEventListener('click', async(e)=>{
    if(e.target.id === 'sign-out' || e.target.className === 'fad fa-sign-out-alt'){
        await state.user.signOut();
    }
});