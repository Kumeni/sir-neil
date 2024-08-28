function PaymentDetails(props){

    const {useState, useEffect } = React;

    const countTickets = purchasedTickets => {
        let tickets = {
            vvip:0,
            vip:0,
            regular:0
        };

        purchasedTickets.forEach(purchasedTicket => {
            if(purchasedTicket.regular  == "1"){
                tickets.regular++;
            } else if(purchasedTicket.vvip  == "1"){
                tickets.vvip++;
            } else if(purchasedTicket.vip  == "1"){
                tickets.vip++;
            }
        });

        return tickets;
    }
    return(
        <div className="payment-receipt-container">
            <h1>Receipt</h1>
            <div className="payment-receipt-payee">
                <img src="../images/sir-neil-logo-realgold-transp-cropped.png" alt="sir-neil logo" />
                <p><strong>Sir Neil</strong></p>
                <a href="mailto:sirneil@sirneil.com">sirneil@sirneil.com</a>
                <a href="tel:+254727909136">+254727909136</a>
            </div>

            <div className="payment-receipt-payer">
                <div>
                    <p><strong>From</strong></p>
                    <p><strong>{props.activePaymentDetails && props.activePaymentDetails.user.username}</strong></p>
                    <a href="mailto:sirneil@sirneil.com">{props.activePaymentDetails && props.activePaymentDetails.user.email}</a><br />
                    <a href={"tel:" + props.activePaymentDetails && props.activePaymentDetails.phone_number}>+{props.activePaymentDetails && props.activePaymentDetails.phone_number}</a>
                </div>
                <div>
                    <p><strong>Order no#</strong></p>
                    <p>{props.activePaymentDetails &&props.activePaymentDetails.id}</p>
                    <p><strong>Tickets</strong></p>
                    <table>
                        {
                            props.activePaymentDetails &&
                                Number(countTickets(props.activePaymentDetails.purchasedTickets).vvip) > 0 &&
                                (
                                    <tr>
                                        <th>VVIP</th>
                                        <td> { Number(countTickets(props.activePaymentDetails.purchasedTickets).vvip) }</td>
                                    </tr>
                                )
                        }
                        {
                            props.activePaymentDetails &&
                                Number(countTickets(props.activePaymentDetails.purchasedTickets).vip) > 0 &&
                                (
                                    <tr>
                                        <th>VIP</th>
                                        <td> { Number(countTickets(props.activePaymentDetails.purchasedTickets).vip) }</td>
                                    </tr>
                                )
                        }
                        {
                            props.activePaymentDetails &&
                                Number(countTickets(props.activePaymentDetails.purchasedTickets).regular) > 0 &&
                                (
                                    <tr>
                                        <th>Regular</th>
                                        <td> { Number(countTickets(props.activePaymentDetails.purchasedTickets).regular) }</td>
                                    </tr>
                                )
                        }
                    </table>
                    <p><strong>Receipt date</strong></p>
                    <p>{props.activePaymentDetails&&props.activePaymentDetails.date}</p>
                </div>
            </div>
            <div className="payment-receipt-total">
                <p><strong>Receipt Total</strong></p>
                <p><strong>{props.activePaymentDetails&&props.activePaymentDetails.amount}</strong></p>
            </div>
            {/* <h2>Event</h2>
            <EventDetails eventDetails = {props.activePaymentDetails.event}/> */}
        </div>
    )
}