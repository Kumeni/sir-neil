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

    const getTickets = () => {

        //let credential = sessionStorage.getItem("credential");
        const API_ENDPOINT = "../server/purchased-tickets.php";
        const request = new XMLHttpRequest();
        
        let response;
    
        request.open("GET", API_ENDPOINT, true);
    
        //request.setRequestHeader("Authorization", "Bearer " + credential);
        request.onreadystatechange = () => {
            if(request.readyState === 4 && request.status === 200){
                response = request.response;
                //console.log(request);
                //console.log(response);
                response = JSON.parse(response);
                tickets = response;
                console.log(response);
                updateTickets(response);
            }
        }
    
        request.send();
    }
    getTickets();

    return(
        <div className="event-status-container">
            <a href=""> back</a>
            {/* <section>
                <EventDetails />
            </section> */}
            <section className="event-status-tickets">
                <h1>Orders(23 Bought)</h1>
                {/*<Tickets 
                    showPaymentDetails = { paymentDetails => showPaymentDetails(paymentDetails)}
                />*/}
                <Orders />
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