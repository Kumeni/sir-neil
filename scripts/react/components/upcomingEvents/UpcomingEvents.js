function UpcomingEvents(props){

    const {useState, useEffect} = React;

    const [popup, setPopup] = useState(false);
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState();
    //const [baseURL, setBaseURL] = useState("http://localhost/sir-neil/sir-neil");
    const [baseURL, setBaseURL] = useState("https://sirneil.com");

    const fetchEvents = query => {
        if(query){
            //fetch events with the query
        } else {
            axios.get("../server/events.php")
                .then( res => {
                    setEvents(res.data);
                    handleEditEvent();
                    //console.log(res);
                })
                .catch( err => {
                    console.log(err);
                })
        }
    }

    useEffect(()=>{
        if(sessionStorage.getItem("credential")){
            fetchEvents();
        } else {
            window.onstorage = event => {
                if(sessionStorage.getItem("credential")){
                    fetchEvents();
                }
            }
        }
    }, [])

    const handleEditEvent = event => {
        if(event){
            setPopup(true);
            if(event.id) setEvent(event);
            else setEvent();
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
        } else {
            setPopup(false);
            setEvent();
            document.getElementsByTagName("body")[0].style.overflow = "auto";
        }
    }
    
    return(
        <div className="upcoming-events-container">
            <section>
                <button 
                    onClick={()=>handleEditEvent({})}
                    className="upload-upcoming-event">Upload upcoming event</button>
            </section>
            <section>
                <h1>Upcoming Events</h1>
                <div className="underline"></div>

                {console.log(events)}
                {
                    events && events.map( (element, index) => (
                        <>
                            <h2 key={index} className="events-date">{formatDatemmyyyy(element.month)}</h2>
                            <div key={"events"+index} className="events">
                                {
                                    element.events.map((element, index) => (
                                        <Event
                                            key={"event"+index}
                                            event = {element}
                                            baseURL={baseURL}
                                            handleEdit = {() => handleEditEvent(element)}/>
                                    ))
                                }
                            </div>
                        </>
                    ))
                }
            </section>
            <section>
                {/*<h1 >Past Events</h1>
                <h2 className="events-date">May 2023</h2>
                <div className="events">
                    <Event 
                        handleEdit = {() => handleEditEvent({})}/>
                    <Event 
                        handleEdit = {() => handleEditEvent({})}/>
                    <Event 
                        handleEdit = {() => handleEditEvent({})}/>
                </div>
                <h2 className="events-date">March 2023</h2>
                <div className="events">
                    <Event 
                        handleEdit = {() => handleEditEvent({})}/>
                    <Event 
                        handleEdit = {() => handleEditEvent({})}/>
                    <Event 
                        handleEdit = {() => handleEditEvent({})}/>
                </div>
                <h2 className="events-date">February 2023</h2>
                <div className="events">
                    <Event 
                        handleEdit = {() => handleEditEvent({})}/>
                    <Event 
                        handleEdit = {() => handleEditEvent({})}/>
                    <Event 
                        handleEdit = {() => handleEditEvent({})}/>
                </div> */}
            </section>
            <Popup
                popup = {popup}
                handlePopup = { () => handleEditEvent()}
            >
                <EditEvent 
                    event={event}
                    baseURL={baseURL}
                    fetchEvents = {() => fetchEvents()}
                />
            </Popup>
        </div>
    )
}

const domNode = document.getElementById('upcoming-events');
const root = ReactDOM.createRoot(domNode);
root.render(<UpcomingEvents />)