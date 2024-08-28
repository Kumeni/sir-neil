function Event(props){

    const eventDate = date => {
        //code to format date as 12 November
    }
    const posterURL = () => {
        if(props.event.posters[0])
            return props.baseURL + props.event.posters[0].path;

        return "";
    }

    const posterAlt = () => {
        return props.event.name;
    }

    if(props.event)
        return(
            <div className="gallery">
                <a target="_blank" href={posterURL()}>
                    <img src={posterURL()} alt={posterAlt()} width="600" height="400" />
                </a>
                <div className="desc">
                    <p><strong>Date:</strong> {formatDateddmm(props.event.start_datetime)}</p>
                    <p><strong>Venue:</strong> {props.event.venue}</p>
                    <div className="buttons-div">
                        <a style={{visibility:"hidden"}} href="./event.html" className="to-paybox">More Info</a>
                        <button 
                            onClick={() => props.handleEdit()}
                            className="to-s-event">Edit</button>
                    </div>
                </div>
            </div>
        )
    
    return null;
}