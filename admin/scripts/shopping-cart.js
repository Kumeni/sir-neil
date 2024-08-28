const addToCart = product => {
    /**
     * Important codes
     *  sessionStorage.setItem("key", "value");
     *  sessionStorage.getItem("key");
     *  sessionStorage.removeItem("key", "value");
     *  sessionStorage.clear();
     */

    //get shopping cart from the browser storage.
    console.log(product);
    let shoppingCart = sessionStorage.getItem("shopping-cart");

    if(shoppingCart == null)
        shoppingCart = [];
    else {
        shoppingCart = JSON.parse(shoppingCart);
    }

    const firstImage = images => {
        if(images.length > 0){
            return baseURL + images[0].path;
        }
        return baseURL+"/uploads/no image.png";
    }

    let cartItem = {
        image:firstImage(product.images),
        name:product.name,
        price:product.price,
        quantity: 1,
        id:product.id
    }

    //code to check if product exists
    let i=0, productExists = false;
    for(i=0; i < shoppingCart.length; i++){
        if(shoppingCart[i].id == cartItem.id){
            console.log(shoppingCart[i]);
            shoppingCart[i].quantity = Number(shoppingCart[i].quantity)+Number(product.quantity);
            productExists = true;
            break;
        }
    }

    if(!productExists){
        shoppingCart = shoppingCart.concat(cartItem);
    }

    //storing the shopping cart in sessionStorage
    sessionStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
    console.log(sessionStorage.getItem("shopping-cart"));
}

const changeQuantity = index => {
    //update the shopping cart
    cartTotal();
}

const removeFromCart = index => {
    let shoppingCart = sessionStorage.getItem("shopping-cart");

    shoppingCart = JSON.parse(shoppingCart);
    shoppingCart.splice(index, 1);

    sessionStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
    //update shopping cart;
    //update amount
}

const cartTotal = () => {
    let shoppingCart = sessionStorage.getItem("shopping-cart");
    let total = 0, i = 0;
    shoppingCart = JSON.parse(shoppingCart);

    for(i=0; i < shoppingCart.length; i++){
        total = total+shoppingCart[i].amount;
    }

    return total;
}