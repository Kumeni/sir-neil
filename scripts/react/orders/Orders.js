function Orders(props){
    const {useState, useEffect} = React;

    const confirmPayment = (order, state) => {
        let credential = sessionStorage.getItem("credential");

        let formData = new FormData();
        formData.append("id", order.id);

        if(state){
             formData.append("confirmed", 1); //confirm payment
        } else {
            formData.append("confirmed", 0); //unconfirm payment
        }

        const API_ENDPOINT = "/server/orders.php";
        const request = new XMLHttpRequest();

        request.open("POST", API_ENDPOINT, true);

        request.setRequestHeader("Authorization", "Bearer " + credential);
        request.onreadystatechange = () => {
            if(request.readyState === 4 && request.status === 200){
                console.log(request);
                props.getTickets();
            } else {
                console.log(request);
            }
        }

        request.send(formData);
    }
    if(props.tickets == undefined || props.tickets.length == 0)
        return(
            <div className="orders-container">
                <div className="orders-table-container">
                    <table>
                        <tbody>
                            <tr className="orders-table-head">
                                <th>id</th>
                                <th>Tickets</th>
                                <th>Amount</th>
                                <th>Phone Number</th>
                                <th>Date</th>
                                <th>Email</th>
                                <th></th>
                                {/* <th>Delivered</th> */}
                            </tr>
                            <tr className="order">
                                <td>1</td>
                                <td >2</td>
                                <td className="order-table-number">4,000</td>
                                <td>+254712 345678</td>
                                <td>March 13, 2024 4:48 PM</td>
                                <td>johndoe@example.com</td>
                                <td><button onClick = {()=>props.showPaymentDetails({})}>More Details</button></td>
                                <td><Available /></td>
                            </tr>
                            <tr className="order">
                                <td>1</td>
                                <td >4</td>
                                <td className="order-table-number">2,000</td>
                                <td>+254712 345678</td>
                                <td>March 13, 2024 4:48 PM</td>
                                <td>johndoe@example.com</td>
                                <td><button onClick = {()=>props.showPaymentDetails({})}>More Details</button></td>
                                <td><Available /></td>
                            </tr>
                            <tr className="order">
                                <td>1</td>
                                <td >2</td>
                                <td className="order-table-number">1,000</td>
                                <td>+254712 345678</td>
                                <td>March 13, 2024 4:48 PM</td>
                                <td>johndoe@example.com</td>
                                <td><button onClick = {()=>props.showPaymentDetails({})}>More Details</button></td>
                                <td><Available /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="orders-table-container-delivered">
                    <table>
                        <tbody>
                            <tr className="orders-table-head">
                            <th>id</th>
                                <th>Tickets</th>
                                <th>Amount</th>
                                <th>Phone Number</th>
                                <th>Date</th>
                                <th>Email</th>
                                <th></th>
                                <th>Confirm payment</th>
                            </tr>
                            <tr className="order">
                                <td>1</td>
                                <td >2</td>
                                <td className="order-table-number">4,000</td>
                                <td>+254712 345678</td>
                                <td>March 13, 2024 4:48 PM</td>
                                <td>johndoe@example.com</td>
                                <td><button>More Details</button></td>
                                <td><Available /></td>
                            </tr>
                            <tr className="order">
                                <td>1</td>
                                <td >4</td>
                                <td className="order-table-number">2,000</td>
                                <td>+254712 345678</td>
                                <td>March 13, 2024 4:48 PM</td>
                                <td>johndoe@example.com</td>
                                <td><button>More Details</button></td>
                                <td><Available /></td>
                            </tr>
                            <tr className="order">
                                <td>1</td>
                                <td >2</td>
                                <td className="order-table-number">1,000</td>
                                <td>+254712 345678</td>
                                <td>March 13, 2024 4:48 PM</td>
                                <td>johndoe@example.com</td>
                                <td><button>More Details</button></td>
                                <td><Available /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )

    return(
        <div className="orders-container">
            <div className="orders-table-container">
                <table>
                    <tbody>
                        <tr className="orders-table-head">
                            <th>id</th>
                            <th>Tickets</th>
                            <th>Amount</th>
                            <th>Phone Number</th>
                            <th>Date</th>
                            <th>Email</th>
                            <th></th>
                            {/* <th>Delivered</th> */}
                        </tr>
                        {
                            props.tickets.map((order, index) => (
                                <tr key={index} className="order">
                                    <td>{order.id}</td>
                                    <td >{order.purchasedTickets.length}</td>
                                    <td className="order-table-number">{order.amount}</td>
                                    <td>{"+"+order.phone_number}</td>
                                    <td>{order.date}</td>
                                    <td>{order.user?order.user.email:"--"}</td>
                                    <td><button onClick = {()=>props.showPaymentDetails({})}>More Details</button></td>
                                    <td>
                                        <Available 
                                            paymentConfirmed = {Boolean(Number(order.paymentConfirmed))}
                                            handleChange = { state => confirmPayment(order, state)}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="orders-table-container-delivered">
                <table>
                    <tbody>
                        <tr className="orders-table-head">
                            <th>id</th>
                            <th>Tickets</th>
                            <th>Amount</th>
                            <th>Phone Number</th>
                            <th>Date</th>
                            <th>Email</th>
                            <th></th>
                            <th>Confirm payment</th>
                        </tr>
                        {
                            props.tickets.map((order, index) => (
                                <tr key={index} className="order">
                                    <td>{order.id}</td>
                                    <td >{order.purchasedTickets.length}</td>
                                    <td className="order-table-number">{order.amount}</td>
                                    <td>{"+"+order.phone_number}</td>
                                    <td>{order.date}</td>
                                    <td>{order.user?order.user.email:"--"}</td>
                                    <td><button>More Details</button></td>
                                    <td>
                                        <Available 
                                            paymentConfirmed = {Boolean(Number(order.paymentConfirmed))}
                                            handleChange = { state => confirmPayment(order, state)}
                                    /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}