export class Search{
    constructor(query){
        this.query = query;
    }

    getSearchResults(products){
        const searchResults = [];
        for (const product of products) {
            if(product.name.includes(this.query)){
                // console.log('Product found');
                searchResults.push({name : product.name, id: product.id});
            }
        }
        return searchResults;
    }
}