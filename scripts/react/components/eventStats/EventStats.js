function EventStats(props){

    const {useState, useEffect} = React;

    const [popup, setPopup] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState();
    const [tickets, setTickets] = useState();

    const showPaymentDetails = paymentDetails => {
        if(paymentDetails){
            setPopup(true);
            setPaymentDetails(paymentDetails);
            console.log(paymentDetails);
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
        } else {
            setPopup(false);
            setPaymentDetails();
            document.getElementsByTagName("body")[0].style.overflow = "auto";
        }
    }

    const getTickets = () => {

        let credential = sessionStorage.getItem("credential");
        const API_ENDPOINT = "/server/orders.php";
        const request = new XMLHttpRequest();
        
        let response;
    
        request.open("GET", API_ENDPOINT, true);
    
        request.setRequestHeader("Authorization", "Bearer " + credential);
        request.onreadystatechange = () => {
            if(request.readyState === 4 && request.status === 200){
                response = request.response;
                //console.log(request);
                console.log(request.response);
                response = JSON.parse(response);
                console.log(response);
                setTickets(response.slice());
                //updateTickets(response);
            }
        }
    
        request.send();
    }

    useEffect(()=>{
        if(sessionStorage.getItem("credential")){
            getTickets();
        }
    }, []);

    /*useEffect(()=>{
        if(tickets) console.log(tickets);
    }, [tickets])*/
    
    return(
        <div className="event-status-container">
            {/* <section>
                <EventDetails />
            </section> */}
            <section className="event-status-tickets">
                <h1>Orders(23 Bought)</h1>
                {/*<Tickets 
                    showPaymentDetails = { paymentDetails => showPaymentDetails(paymentDetails)}
                />*/}
                <Orders 
                    showPaymentDetails = { paymentDetails => showPaymentDetails(paymentDetails)}
                    tickets = {tickets}
                    getTickets = { ()=> getTickets()}
                    />
            </section>

            <Popup
                popup = {popup}
                handlePopup = { state => showPaymentDetails(state)}
            >
                <PaymentDetails
                    activePaymentDetails = {paymentDetails}
                    />
            </Popup>
        </div>
    )
}

const domNode = document.getElementById('event-stats');
const root = ReactDOM.createRoot(domNode);
root.render(<EventStats />)