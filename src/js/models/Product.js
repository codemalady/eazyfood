export class Product{
    constructor(id, name, imageUrl, price, moq, categories){
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.moq = moq;
        this.categories = categories;
        this.count = 1;
    }

    setLiked(liked){
        // set product status to liked
    }
};

export const fetchProducts = async() => {
    let data = await fetch('./data/dummy.json');
    let res = await data.json();
    return res;
    console.log(res);
    
}