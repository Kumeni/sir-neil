function EditEvent(props){

    const {useState, useEffect} = React;

    const [images, setImages] = useState([]);
    const [imagesError, setImagesError] = useState();
    const [deletedImages, setDeletedImages] = useState([]);

    const [eventName, setEventName] = useState({
        value:undefined,
        error:undefined
    });

    const [eventDescription, setEventDescription] = useState({
        value:undefined,
        error:undefined
    })

    const [host, setHost] = useState({
        value:undefined,
        error:undefined
    })

    const [date , setDate] = useState({
        value:undefined,
        error:undefined
    })

    const [startTime, setStartTime] = useState({
        value:undefined,
        error:undefined
    })

    const [endTime, setEndTime] = useState({
        value:undefined,
        error:undefined
    })
    const [venue, setVenue] = useState({
        value:undefined,
        error:undefined
    })

    const [mapsLink, setMapsLink] = useState({
        value:undefined,
        error:undefined
    })

    const [vvip, setVvip] = useState({
        value:undefined,
        error:undefined
    })

    const [availableVvipTickets, setAvailableVvipTickets] = useState({
        value:undefined,
        error:undefined
    })

    const [vip, setVip] = useState({
        value:undefined,
        error:undefined
    })

    const [availableVipTickets, setAvailableVipTickets] = useState({
        value:undefined,
        error:undefined
    })

    const [regular, setRegular] = useState({
        value:undefined,
        error:undefined
    });

    const [availableRegularTickets, setAvailableRegularTickets] = useState({
        value:undefined,
        error:undefined
    })

    const [eventDeleted, setEventDeleted] = useState(false);

    useEffect(()=>{
        if(props.event && props.event.id){
            //fill in all the required fields
            if(props.event.posters.length > 0)
                handlePosterImage(props.event.posters);
            handleNameChange({value:props.event.name});
            handleDescriptionChange({value:props.event.description});
            handleHostChange({value:props.event.host});
            handleVenueChange({value:props.event.venue});
            handleMapsLinkChange({value:props.event.google_maps_direction});
            handleVvipChange({value:props.event.vvip});
            handleVipChange({value:props.event.vip});
            handleRegularChange({value:props.event.regular});
            handleAvailableVvipTicketsChange({value:props.event.total_vvip_tickets});
            handleAvailableVipTicketsChange({value:props.event.total_vip_tickets});
            handleAvailableRegularTicketsChange({value:props.event.total_regular_tickets});
            handleDeleteChange(Boolean(props.event.deleted));

            handleDateChange({value:getCurrentDate(props.event.start_datetime)});
            handleStartTimeChange({value:getTime(props.event.start_datetime)});
            handleEndTimeChange({value:getTime(props.event.end_datetime)});
        }
    }, [props.event])

    const handlePosterImage = files => {
        setImages([files[0]]);
        setImagesError();
    }

    const handlePosterDelete = index => {
        let holder = [ ...images ];
        let holder2 = [ ...deletedImages ];
        if(images[index].id){
            holder2 = holder2.concat(images[index].id);
            setDeletedImages(holder2);
        }

        holder.splice(index, 1);
        setImages(holder);
    }

    const handleNameChange = data => {
        let holder = {...eventName};
        holder.value = data.value;
        holder.error = undefined;
        setEventName(holder);
    }

    const handleDescriptionChange = data => {
        let holder = {...eventDescription};
        holder.value = data.value;
        holder.error = undefined;
        setEventDescription(holder);
    }

    const handleHostChange = data => {
        let holder = {...host};
        holder.value = data.value;
        holder.error = undefined;
        setHost(holder);
    }

    const handleDateChange = data => {
        let holder = {...date};
        holder.value = data.value;
        console.log(data.value);
        holder.error = undefined;
        setDate(holder);
    }

    const handleStartTimeChange = data => {
        let holder = {...startTime};
        holder.value = data.value;
        console.log(data.value);
        holder.error = undefined;
        setStartTime(holder);
    }

    const handleEndTimeChange = data => {
        let holder = { ...endTime};
        holder.value = data.value;
        console.log(data.value);
        holder.error = undefined;
        setEndTime(holder);
    }

    const handleVenueChange = data => {
        let holder = {...venue};
        holder.value = data.value;
        holder.error = undefined;
        setVenue(holder);
    }

    const handleMapsLinkChange = data => {
        let holder = {...mapsLink};
        holder.value = data.value;
        holder.error = undefined;
        setMapsLink(holder);
    }

    const handleVvipChange = data => {
        let holder = {...vvip};
        holder.value = data.value;
        holder.error = undefined;
        setVvip(holder);
    }

    const handleAvailableVvipTicketsChange = data => {
        let holder = {...availableVvipTickets};
        holder.value = data.value;
        holder.error = undefined;
        setAvailableVvipTickets(holder);
    }

    const handleVipChange = data => {
        let holder = { ...vip};
        holder.value = data.value;
        holder.error = undefined;
        setVip(holder);
    }

    const handleAvailableVipTicketsChange = data => {
        let holder = {...availableVipTickets};
        holder.value = data.value;
        holder.error = undefined;
        setAvailableVipTickets(holder);
    }

    const handleRegularChange = data => {
        let holder = { ...regular};
        holder.value = data.value;
        holder.error = undefined;
        setRegular(holder);
    }

    const handleAvailableRegularTicketsChange = data => {
        let holder = {...availableRegularTickets};
        holder.value = data.value;
        holder.error = undefined;
        setAvailableRegularTickets(holder);
    }

    const handleDeleteChange = state => {
        setEventDeleted(state);
        console.log(state);
    }

    const convertTo12HourFormat = time24hr =>{
        //split the input time string into hours and minutes
        const [hours, minutes] = time24hr.split(':').map(Number);

        //Determine AM or PM
        const period = hours >= 12 ? 'PM' : 'AM';

        //Convert hours to 12-hour format
        const hours12hr = hours % 12 || 12;

        //create the formatted time string
        const time12hr = `${hours12hr}:${minutes < 10 ? '0': ''}${minutes} ${period}`;

        return time12hr;
    }
    const handleSubmit = event => {
        event.preventDefault();
        let canSubmit = true;

        //validating images
        if(images.length == 0){
            setImagesError("Event poster is required");
        }

        //validating event name
        console.log(eventName.value);
        if(eventName.value == undefined || validator.isEmpty(eventName.value)){
            let holder = { ...eventName};
            holder.error = "Event name is required!";
            setEventName(holder);
            canSubmit = false;
        }
        
        //validating event description
        console.log(eventDescription.value);
        if(eventDescription.value == undefined || validator.isEmpty(eventDescription.value)){
            let holder = { ...eventDescription};
            holder.error = "Event description is required!";
            setEventDescription(holder);
            canSubmit = false;
        }
        
        //validating host
        console.log(host.value);
        if(host.value == undefined || validator.isEmpty(host.value)){
            let holder = { ...host};
            holder.error = "Host name is required!";
            setHost(holder);
            canSubmit = false;
        }
        
        //validating venue
        console.log(venue.value);
        if(venue.value == undefined || validator.isEmpty(venue.value)){
            let holder = { ...venue};
            holder.error = "Venue is required!";
            setVenue(holder);
            canSubmit = false;
        }
        
        //validating date
        console.log(date.value);
        if(date.value == undefined || validator.isEmpty(date.value)){
            let holder = { ...date};
            holder.error = "Date is required!";
            setDate(holder);
            canSubmit = false;
        } else {
            if(validator.isDate(date.value) == false){
                let holder = { ...date};
                holder.error = "Invalid date!";
                setDate(holder);
                canSubmit = false;
            }
        }
        
        //validating start-time
        console.log(startTime.value);
        if(startTime.value == undefined || validator.isEmpty(startTime.value)){
            let holder = { ...startTime};
            holder.error = "Start time is required!";
            setStartTime(holder);
            canSubmit = false;
        } else {
            if(validator.isTime(startTime.value) == false){
                let holder = { ...startTime};
                holder.error = "Invalid time!";
                setStartTime(holder);
                canSubmit = false;
            }
        }
        
        //validating end-time
        console.log(endTime.value);
        if(endTime.value == undefined || validator.isEmpty(endTime.value)){
            let holder = { ...endTime};
            holder.error = "End time is required!";
            setEndTime(holder);
            canSubmit = false;
        } else {
            if(validator.isTime(endTime.value) == false){
                let holder = { ...endTime};
                holder.error = "Invalid time!";
                setEndTime(holder);
                canSubmit = false;
            }
        }
        
        //validating google maps link
        console.log(mapsLink.value);
        if(mapsLink.value == undefined || validator.isEmpty(mapsLink.value)){
            let holder = { ...mapsLink};
            holder.error = "Google maps link is required!";
            setMapsLink(holder);
            canSubmit = false;
        } else {
            if(validator.isURL(mapsLink.value) == false){
                let holder = { ...mapsLink};
                holder.error = "Invalid google maps link!";
                setMapsLink(holder);
                canSubmit = false;
            }
        }

        //validating vvip
        console.log(vvip.value);
        if(vvip.value == undefined || validator.isEmpty(vvip.value)){
            let holder = { ...vvip};
            holder.error = "Warning! Vvip price not included!";
            setVvip(holder);
        }

        //validating available vvip tickets
        console.log(availableVvipTickets.value);
        if(availableVvipTickets.value == undefined || validator.isEmpty(availableVvipTickets.value.toString())){
            let holder = { ...availableVvipTickets};
            holder.error = "Warning! Number of available vvip tickets isn't specified";
            setAvailableVvipTickets(holder);
        }

        //validating vip
        console.log(vip.value);
        if(vip.value == undefined || validator.isEmpty(vip.value)){
            let holder = { ...vip};
            holder.error = "Warning! Vip price not included!";
            setVip(holder);
        }

        //validating available vip tickets
        console.log(availableVipTickets.value);
        if(availableVipTickets.value == undefined || validator.isEmpty(availableVipTickets.value.toString())){
            let holder = { ...availableVipTickets};
            holder.error = "Warning! Number of available Vip tickets isn't specified";
            setAvailableVipTickets(holder);
        }
        
        //validating regular
        console.log(regular.value);
        if(regular.value == undefined || validator.isEmpty(regular.value)){
            let holder = { ...regular};
            holder.error = "Warning! Regular price not included!";
            setRegular(holder);
        }

        //validating available regular tickets
        console.log(availableRegularTickets.value);
        if(availableRegularTickets.value == undefined || validator.isEmpty(availableRegularTickets.value.toString())){
            let holder = { ...availableRegularTickets};
            holder.error = "Warning! Number of available Regular tickets isn't specified";
            setAvailableRegularTickets(holder);
        }

        console.log(canSubmit);
        if(canSubmit == false)
            return;

        //organize the data for sending to the database, all the fields are required;
        let formData = new FormData();

        if(images[0] && images[0].id == undefined)
            formData.append("posters[]", images[0]);

        formData.append("event-name", eventName.value);
        formData.append("description", eventDescription.value);
        formData.append("host", host.value);
        formData.append("date", date.value);
        formData.append("start-time", convertTo12HourFormat(startTime.value));
        formData.append("end-time", convertTo12HourFormat(endTime.value));
        formData.append("venue", venue.value);
        formData.append("google-maps-direction", mapsLink.value);
        formData.append("vvip", vvip.value);
        formData.append("available-vvip-tickets", availableVipTickets.value);
        formData.append("vip", vip.value);
        formData.append("available-vip-tickets", availableVipTickets.value);
        formData.append("regular", regular.value);
        formData.append("deleted-posters", JSON.stringify(deletedImages));
        formData.append("available-regular-tickets", availableRegularTickets.value);
        formData.append("deleted", eventDeleted?'1':'0');
        console.log(eventDeleted?'1':'0');

        if(props.event){
            formData.append("id", props.event.id);
        } else {
            formData.append("id", 0);
        }

        let credential = sessionStorage.getItem("credential");
        console.log(credential);

        const API_ENDPOINT = "../server/events.php";
        const request = new XMLHttpRequest();

        request.open("POST", API_ENDPOINT, true);
        console.log(credential);
        request.setRequestHeader("Authorization", "Bearer " + credential);
        request.onreadystatechange = () => {
            if(request.readyState === 4 && request.status === 200){
                console.log(request);
                props.fetchEvents();
            } else {
                console.log(request);
            }
        }

        request.send(formData);
    }

    return(
        <form className="edit-event-container" onSubmit = { event => handleSubmit(event)}>
            <h2>{props.event?"Edit":"Upload"} Event</h2>
            <div className="underline"></div>
            <div>
                <label>Poster<span className="required">*</span></label>
                <div>
                    <ImageUpload 
                        images = {images}
                        maximumImages = {1}
                        baseURL = {props.baseURL}
                        handleChange = {files => handlePosterImage(files)}
                        handleDelete = { index => handlePosterDelete(index)}
                    />
                    <span className="error">{imagesError}</span>
                </div>
                <label>Name<span className="required">*</span></label>
                <Input
                    value={eventName.value}
                    error={eventName.error}
                    placeholder="Event name"
                    handleChange={data => handleNameChange(data)}
                />
                <label>Description<span className="required">*</span></label>
                <TextArea 
                    value={eventDescription.value}
                    error={eventDescription.error}
                    placeholder={"A brief intro about the event"}
                    handleChange ={ data => handleDescriptionChange(data)}
                />
                <label>Host<span className="required">*</span></label>
                <Input
                    value={host.value}
                    error={host.error}
                    placeholder = {"John Doe"}
                    handleChange= { data => handleHostChange(data)}
                />
                <label>Date<span className="required">*</span></label>
                <DateComponent
                    value={date.value}
                    error={date.error}
                    handleChange = { data => handleDateChange(data)}
                />
                <label>Start-time<span className="required">*</span></label>
                <TimeComponent
                    value={startTime.value}
                    error={startTime.error}
                    handleChange = { data => handleStartTimeChange(data)}
                />
                <label>End-time<span className="required">*</span></label>
                <TimeComponent
                    value={endTime.value}
                    error={endTime.error}
                    handleChange = { data => handleEndTimeChange(data)}
                />
                <label>Venue<span className="required">*</span></label>
                <Input
                    value={venue.value}
                    error = {venue.error}
                    placeholder = {"Hilton hotel"}
                    handleChange = { data => handleVenueChange(data)}
                />
                <label>Google Maps Directions<span className="required">*</span></label>
                <Input 
                    value={mapsLink.value}
                    error={mapsLink.error}
                    placeholder={"https://www.google.com/maps/dir/?api=1&parameters"}
                    handleChange = { data => handleMapsLinkChange(data)}
                />
                <label>Ticket prices<span className="required">*</span></label><div style={{"height":"60px"}}></div>
                <label>VVIP(Ksh.)</label>
                <Input
                    value={vvip.value}
                    error={vvip.error}
                    placeholder={"40,999"}
                    handleChange = { data => handleVvipChange(data)}
                    type={"number"}
                />
                <label>Available Vvip Tickets</label>
                <Input
                    value={availableVvipTickets.value}
                    error={availableVvipTickets.error}
                    placeholder={200}
                    type={'number'}
                    handleChange={ data => handleAvailableVvipTicketsChange(data)}
                />
                <label>VIP(Ksh.)</label>
                <Input
                    value={vip.value}
                    error={vip.error}
                    placeholder={"29,999"}
                    handleChange = { data => handleVipChange(data)}
                />
                <label>Available Vip Tickets</label>
                <Input
                    value={availableVipTickets.value}
                    error={availableVipTickets.error}
                    placeholder={200}
                    type={'number'}
                    handleChange={ data => handleAvailableVipTicketsChange(data)}
                />
                <label>Regular(Ksh.)</label>
                <Input
                    value={regular.value}
                    error={regular.error}
                    placeholder={"9,999"}
                    handleChange = { data => handleRegularChange(data)}
                />
                <label>Available Regular Tickets</label>
                <Input
                    value={availableRegularTickets.value}
                    error={availableRegularTickets.error}
                    placeholder={200}
                    type={'number'}
                    handleChange={ data => handleAvailableRegularTicketsChange(data)}
                />
                {
                    props.event && 
                        <>
                            <label style={{"color":"red"}}>Delete event</label>
                            <Delete 
                                handleChange = { state => handleDeleteChange(state)}
                            />
                        </>
                }
                
            </div>

            <input className="edit-event-submit-button" type="submit" value="UPLOAD"/>
        </form>
    )
}