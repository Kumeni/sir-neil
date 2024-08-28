function Order(props){
    return (
        <div className={"order"}>
            <section className={"order-title"}>
                <h3>Order 1</h3> 
                <div>
                    <span>Delivered</span>
                    <Delivered />
                </div>
                
            </section>
            <h3 className={"order-product-title"}>Product</h3>
            <section className={"order-product"}>
                <img className={"order-product-image"} src={props.baseURL + "/img/products/f6.jpg"} />
                <div>
                    <p>Product name</p>
                    <p>Ksh. 300</p>
                    <p>3 pcs</p>
                </div>
            </section>
            <h3 className={"order-delivery-title"}>Delivery</h3>
            <section className={"order-delivery-details"}>
                <table>
                    <tbody>
                        <tr>
                            <td>Phone number</td>
                            <td>+254717551542</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>johndoe@example</td>
                        </tr>
                        <tr>
                            <td>Maps link</td>
                            <td>https://localhost.com</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>Kahawa ridge estate, near my place</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <h3 className={"order-transaction-title"}>Transaction</h3>
            <section>
                {/* Transaction details go here */}
            </section>
        </div>
    )
}