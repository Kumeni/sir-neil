function Orders(props){
    const {useState, useEffect} = React;

    return(
        <div class="orders-container">
            <div class="orders-table-container">
                <table>
                    <tbody>
                        <tr className="orders-table-head">
                            <th>id</th>
                            <th>Product name</th>
                            <th>Cost</th>
                            <th>Quantity</th>
                            <th>Payment</th>
                            <th>Phone number</th>
                            <th>Email</th>
                            <th>Maps link</th>
                            <th>Location description</th>
                            <th>Delivered</th>
                        </tr>
                        <tr className="order">
                            <td>1</td>
                            <td>Toy 3</td>
                            <td>Ksh. 3,400</td>
                            <td>2 pcs</td>
                            <td>Mpesa</td>
                            <td>+254712 345678</td>
                            <td>johndoe@example.com</td>
                            <td>http://localhost/collyapparel/</td>
                            <td>Kahawa ridge estate near kimathi street</td>
                            <td><Delivered /></td>
                        </tr>
                        <tr className="order">
                            <td>1</td>
                            <td>Toy 3</td>
                            <td>Ksh. 3,400</td>
                            <td>2 pcs</td>
                            <td>Mpesa</td>
                            <td>+254712 345678</td>
                            <td>johndoe@example.com</td>
                            <td>http://localhost/collyapparel/</td>
                            <td>Kahawa ridge estate near kimathi street</td>
                            <td><Delivered /></td>
                        </tr>
                        <tr className="order">
                            <td>1</td>
                            <td>Toy 3</td>
                            <td>Ksh. 3,400</td>
                            <td>2 pcs</td>
                            <td>Mpesa</td>
                            <td>+254712 345678</td>
                            <td>johndoe@example.com</td>
                            <td>http://localhost/collyapparel/</td>
                            <td>Kahawa ridge estate near kimathi street</td>
                            <td><Delivered /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="orders-table-container-delivered">
                <table>
                    <tbody>
                    <   tr className="orders-table-head">
                            <th>id</th>
                            <th>Product name</th>
                            <th>Cost</th>
                            <th>Quantity</th>
                            <th>Payment</th>
                            <th>Phone number</th>
                            <th>Email</th>
                            <th>Maps link</th>
                            <th>Location description</th>
                            <th>Delivered</th>
                        </tr>
                        <tr className="order">
                            <td>1</td>
                            <td>Toy 3</td>
                            <td>Ksh. 3,400</td>
                            <td>2 pcs</td>
                            <td>Mpesa</td>
                            <td>+254712 345678</td>
                            <td>johndoe@example.com</td>
                            <td>http://localhost/collyapparel/</td>
                            <td>Kahawa ridge estate near kimathi street</td>
                            <td><Delivered /></td>
                        </tr>
                        <tr className="order">
                            <td>1</td>
                            <td>Toy 3</td>
                            <td>Ksh. 3,400</td>
                            <td>2 pcs</td>
                            <td>Mpesa</td>
                            <td>+254712 345678</td>
                            <td>johndoe@example.com</td>
                            <td>http://localhost/collyapparel/</td>
                            <td>Kahawa ridge estate near kimathi street</td>
                            <td><Delivered /></td>
                        </tr>
                        <tr className="order">
                            <td>1</td>
                            <td>Toy 3</td>
                            <td>Ksh. 3,400</td>
                            <td>2 pcs</td>
                            <td>Mpesa</td>
                            <td>+254712 345678</td>
                            <td>johndoe@example.com</td>
                            <td>http://localhost/collyapparel/</td>
                            <td>Kahawa ridge estate near kimathi street</td>
                            <td><Delivered /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}