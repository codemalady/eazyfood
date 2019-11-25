import { DOM } from '../base';

export const showSearchResults = (results) =>{
    document.querySelector(DOM.result).style.opacity = '1';
    document.querySelector(DOM.result).style.visibility = 'visible';
    let resultHtml, resultsArr = [];
    if(results.length !== 0){
        for (const result of results) {
            // console.log(result);
            resultsArr.push(`<a href="http://127.0.0.1:8080/dashboard.html?name=${result.name}&id=${result.id}" class="dashboard__input--results-link">${result.name}</a>`);
        }
        resultHtml = resultsArr.join('');
        document.querySelector(DOM.result).classList.remove('empty');
        document.querySelector(DOM.result).innerHTML = resultHtml;
    }else{
        document.querySelector(DOM.result).classList.add('empty');
        document.querySelector(DOM.result).innerHTML = '<h2 class="dashboard__input--results-text">No products found</h2>';
    }
    // productsHtml = productsArr.join('');
    // document.getElementById('products-row').innerHTML = productsHtml;  
}

export const endCurrentSearch = ()=>{
    document.querySelector(DOM.input).value = '';
    document.querySelector(DOM.icon).innerHTML = '<i class="fas fa-search"></i>';
    document.querySelector(DOM.result).style.opacity = '0';
    document.querySelector(DOM.result).style.visibility = 'hidden';
}
