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

// export const fetchProductsLocally = async()=>{
//     try {
//         let data = await fetch('http://127.0.0.1:8080/data/dummy.json');
//         let res = await data.json();
//         return res;
//     } catch (e) {
//         console.log(e);
//     }
// }

export const fetchProducts = async() => {
    try{
        let data = await fetch('https://eazy-food.firebaseio.com/products.json');
        let res = await data.json();
        return res;
    }catch(e){
        console.log(e);
    }
}