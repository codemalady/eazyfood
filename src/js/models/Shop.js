import { log } from "util";

export class Shop {
    constructor(){
        this.items = [];
        this.sum = 0;
    }

    addItems(productID, products){
        // If product is already in shopping list, increase its count and return it without adding to cart
        for (const item of this.items) {
            if(item.id === productID){
                item.count += 1;
                this.sum += parseInt(item.price);
                // console.log(this.sum);
                return item;
            }
        }

        // If not, add it to the shopping list and return it 
        for (const product of products) {
            if(product.id === productID){
                this.items.push(product);
                this.sum += parseInt(product.price);
                // console.log(this.sum);
                return product;
            }
        }
    }

    deleteItems(productID){
        for (const item of this.items) {
            if(item.id === productID){
                let removedItem = this.items.splice(this.items.indexOf(item), 1);
                this.sum -= removedItem[0].price * removedItem[0].count;
                return removedItem[0];
            }
        }
    }

    updateItem(productID){
        for (const item of this.items) {          
            // If product has more han one count, reduce it and return it back to the controller. Otherwise remove it from the cart otherwise
            if(item.id === productID){
                if(item.count > 1){
                    item.count -= 1;
                    this.sum -= item.price;
                    return item
                }else{
                    item.count -= 1;
                    let removedItem = this.items.splice(this.items.indexOf(item), 1);
                    this.sum -= removedItem[0].price;
                    return removedItem[0];
                }
            }
        }
    }

    restoreCount(products){
        for (const product of products) {
            if(product.count === 0){
                product.count = 1;
            }
        }
    }

    // calcTotalPrice(product, deducted = '', instruction = ''){
    //     if(instruction === 'del'){
    //         this.sum -= product.price * product.count;
    //     }else if(deducted === 1 && instruction === 'del'){
    //         this.sum -= product.price * deducted;
    //     }else{
    //         this.sum += parseInt(product.price);
    //     }
    // }
}