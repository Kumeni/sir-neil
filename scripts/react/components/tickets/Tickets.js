function Tickets(props){
    const {useState, useEffect} = React;

    return(
        <div className="orders-container">
            <div className="orders-table-container">
                <table>
                    <tbody>
                        <tr className="orders-table-head">
                            <th>id</th>
                            <th>Ticket</th>
                            <th>Cost</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Payment</th>
                        </tr>
                        <tr className="order" onClick = { () => props.showPaymentDetails({})}>
                            <td>1</td>
                            <td>VVIP</td>
                            <td>Ksh. 3,400</td>
                            <td>johndoe@example.com</td>
                            <td>John Doe</td>
                            <td>Mpesa</td>
                            <td><button>Resend Payment Confirmation</button></td>
                        </tr>
                        <tr className="order" onClick = { () => props.showPaymentDetails({})}>
                            <td>1</td>
                            <td>VVIP</td>
                            <td>Ksh. 3,400</td>
                            <td>johndoe@example.com</td>
                            <td>John Doe</td>
                            <td>VISA</td>
                            <td><button>Resend Payment Confirmation</button></td>
                        </tr>
                        <tr className="order" onClick = { () => props.showPaymentDetails({})}>
                            <td>1</td>
                            <td>VVIP</td>
                            <td>Ksh. 3,400</td>
                            <td>johndoe@example.com</td>
                            <td>John Doe</td>
                            <td>Mpesa</td>
                            <td><button>Resend Payment Confirmation</button></td>
                        </tr>
                        <tr className="order" onClick = { () => props.showPaymentDetails({})}>
                            <td>1</td>
                            <td>VVIP</td>
                            <td>Ksh. 3,400</td>
                            <td>johndoe@example.com</td>
                            <td>John Doe</td>
                            <td>Mpesa</td>
                            <td><button>Resend Payment Confirmation</button></td>
                        </tr>
                        <tr className="order" onClick = { () => props.showPaymentDetails({})}>
                            <td>1</td>
                            <td>VVIP</td>
                            <td>Ksh. 3,400</td>
                            <td>johndoe@example.com</td>
                            <td>John Doe</td>
                            <td>Mpesa</td>
                            <td><button>Resend Payment Confirmation</button></td>
                        </tr>
                        <tr className="order" onClick = { () => props.showPaymentDetails({})}>
                            <td>1</td>
                            <td>VVIP</td>
                            <td>Ksh. 3,400</td>
                            <td>johndoe@example.com</td>
                            <td>John Doe</td>
                            <td>Mpesa</td>
                            <td><button>Resend Payment Confirmation</button></td>
                        </tr>
                        <tr className="order" onClick = { () => props.showPaymentDetails({})}>
                            <td>1</td>
                            <td>VVIP</td>
                            <td>Ksh. 3,400</td>
                            <td>johndoe@example.com</td>
                            <td>John Doe</td>
                            <td>Mpesa</td>
                            <td><button>Resend Payment Confirmation</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}