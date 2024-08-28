function EventStats(props){

    const {useState, useEffect} = React;

    const [popup, setPopup] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState();

    const showPaymentDetails = paymentDetails => {
        if(paymentDetails){
            setPopup(true);
            setPaymentDetails(paymentDetails);
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
        } else {
            setPopup(false);
            setPaymentDetails();
            document.getElementsByTagName("body")[0].style.overflow = "auto";
        }
    }
    return(
        <div className="event-status-container">
            <a href=""> back</a>
            <section>
                <EventDetails />
            </section>
            <section className="event-status-tickets">
                <h1>Tickets(23 Bought)</h1>
                <Tickets 
                    showPaymentDetails = { paymentDetails => showPaymentDetails(paymentDetails)}
                />
            </section>

            <Popup
                popup = {popup}
                handlePopup = { state => showPaymentDetails(state)}
            >
                <PaymentReceipt />
            </Popup>
        </div>
    )
}

const domNode = document.getElementById('event-stats');
const root = ReactDOM.createRoot(domNode);
root.render(<EventStats />)