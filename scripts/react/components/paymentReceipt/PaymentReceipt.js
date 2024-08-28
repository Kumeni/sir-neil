function PaymentReceipt(props){
    return(
        <div className="payment-receipt-container">
            <h1>Receipt</h1>
            <div className="payment-receipt-payee">
                <img src="../images/sir-neil-logo-realgold-transp-cropped.png" alt="sir-neil logo" />
                <p><strong>Sir Neil</strong></p>
                <a href="mailto:sir-neil@gmail.com">sirneil@gmail.com</a>
                <a href="tel:+254712345678">+254717551542</a>
            </div>

            <div className="payment-receipt-payer">
                <div>
                    <p><strong>Payer</strong></p>
                    <p><strong>John Doe</strong></p>
                    <a href="mailto:sirneil@gmail.com">johndoe@gmail.com</a>
                </div>
                <div>
                    <p><strong>Receipt no#</strong></p>
                    <p>1</p>
                    <p><strong>Ticket no#</strong></p>
                    <p>24</p>
                    <p><strong>Receipt date</strong></p>
                    <p>{Date()}</p>
                </div>
            </div>
            <div className="payment-receipt-total">
                <p><strong>Receipt Total</strong></p>
                <p><strong>Ksh. 59,999</strong></p>
            </div>
            <h2>Event</h2>
            <EventDetails />
        </div>
    )
}