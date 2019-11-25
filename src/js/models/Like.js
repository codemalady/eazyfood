export class Like {
    constructor(){
        this.likes = [];
    }

    fetchLikes(){
        if(localStorage.getItem('likedProducts') !== null && localStorage.getItem('likedProducts') !== "[]"){
            this.likes = JSON.parse(localStorage.getItem('likedProducts'));
        }else{
            this.like = [];
        }
    }

    setLike(productID, products){
        /* Don't add if product is already in array */
        for (const like of this.likes) {
            if(like.id === productID){
                return false;
            }
        }

        /* Add to likes array if product isn't liked */
        for (const product of products) {
            if(productID === product.id){
                this.likes.push(product);
                return true;
            }
        }
    }

    removeLike(productID){
        for (const like of this.likes) {
            if(like.id === productID){
                return this.likes.splice(this.likes.indexOf(like), 1)[0];
            }
        }
    }
}