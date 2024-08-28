function MyOrders(props){

    const [popup, setPopup] = React.useState(true);
    //const [products, setProducts] = React.useState([]);
    //const [activeProduct, setActiveProduct] = React.useState();
    const [baseURL, setBaseURL] = React.useState("http://localhost/colly-apparel-2");

    const handlePopup = state => {
        setPopup(state);
        if(state == false){
            setActiveProduct();
        }
    }

    const handleCreateProduct = () => {
        setPopup(true);
    }

    /*const editProduct = product =>{
        //algorithm to edit product
        //let the form know which product is being edited
        console.log("Editing product");
        setActiveProduct(product);
        setPopup(true);
    }*/

    const deleteProduct = index => {
        //algrithm to delete a product
        //make a put request to delete the product,
        //get the products
    }

    const disableProduct = index => {
        //algorithm to disable a product
        //make a put request to disable the product
        //get the products
    }

    /*const getProducts = () => {
        axios.get(baseURL+"/server/products.php")
        .then( res => {
            console.log(res.data);
            setProducts(res.data);
        })
        .catch( err => {
            console.log(err);
        })
    }*/

    /*React.useEffect(()=>{
        getProducts();
    }, [])*/

    return(
        <div>
            {/* <button 
                className={"button create-product-button"}
                onClick={event=>handleCreateProduct(event)}>
                    Create product
                </button> */}
            <div className="my-orders-list">
                {/* The orders go here */}
                <h1 className="pending-orders-title">Pending orders</h1>
                <Orders />
                <h1 className="delivered-orders-title">Delivered orders</h1>
                <Orders />
            </div>
            <Popup 
                popup = {popup}
                handlePopup = { state => handlePopup(state)}>
                    <Order 
                        baseURL={baseURL}
                    />
            </Popup>
        </div>
    )
}

const domNode = document.getElementById('orders');
const root = ReactDOM.createRoot(domNode);
root.render(<MyOrders />)