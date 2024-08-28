"use strict";
let tickets = [];
let mpesaPhoneNumber;
let signedIn = true, paymentInitiated = false, paymentCompleted = false, orderDetails;

const handleNoOfTicketsChange = (value, index) => {
    let ticketTypes = document.getElementsByClassName("ticket-type")[0];
    ticketTypes = ticketTypes.getElementsByClassName("paymentOptions");
    let amount = document.getElementsByClassName("event-ticket-amount");
    document.getElementById("ticket-type-error").innerHTML = "";


    if(value == 'increment'){
        value = Number(ticketTypes[index].getElementsByTagName("input")[0].value) + 1;
    } else if (value == 'decrement'){
        value = Number(ticketTypes[index].getElementsByTagName("input")[0].value) - 1;
        if(value < 0) value = 0;
    }

    if((Number(tickets[index].availableTickets) - value) >= 0){
        let input = ticketTypes[index].getElementsByTagName("input")[0];
        input.value = value;

        let remaining = ticketTypes[index].getElementsByTagName("p")[0];
        remaining.innerHTML = tickets[index].availableTickets - value + " remaining!";

        tickets[index].noOfTickets = value;
    } else {
        let input = ticketTypes[index].getElementsByTagName("input")[0];
        input.value = tickets[index].availableTickets;

        let remaining = ticketTypes[index].getElementsByTagName("p")[0];
        remaining.innerHTML = 0 + " remaining!";

        tickets[index].noOfTickets = tickets[index].availableTickets;
    }

    let i = 0;
    for(i = 0; i < amount.length; i++){
        amount[i].innerHTML = "Ksh. " + updateAmount(tickets)
    }
    //amount.innerHTML = "Ksh. " + updateAmount(tickets);
}

const handlePopup = event => {
    tickets = [];
    
    let googleSignin = document.getElementsByClassName("google-sign-in")[0],
    eventPayment = document.getElementsByClassName("event-payment")[0],
    paymentComplete = document.getElementsByClassName("complete-payment")[0],
    paymentSuccessful = document.getElementsByClassName("payment-successful")[0],
    eventPoster = document.getElementById("event-poster"),
    eventDate = document.getElementById("event-date"),
    eventVenue = document.getElementById("event-venue"),
    eventStartTime = document.getElementById("event-start-time"),
    eventEndTime = document.getElementById("event-end-time"),
    eventTicketAmount = document.getElementById("event-ticket-amount"),
    ticketTypes = document.getElementsByClassName("ticket-type")[0],
    baseURL = "http://localhost/sir-neil/sir-neil";
    //baseURL = "https://sirneil.com";
    document.getElementById("mpesaPhoneNumberError").innerHTML="";
    document.getElementById("ticket-type-error").innerHTML = "";    

    //event = JSON.parse(event);
    if(event){

        /**
         * If the user isn't signed in, prompt signing in immediately;
         */


        let credential = sessionStorage.getItem("credential");
        if(credential == "" || credential == null){
            /**
             * Show the google signin on the popup
             */
            //initiateGoogleSignin();
            signedIn = false;
        } else {
            signedIn = true;
        }

        activeEvent = event;
        document.getElementsByClassName("popup")[0].style.display = "block";
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        let ticket = {};
        console.log(event);
        if(event.available_vvip_tickets){
            ticket = {};
            ticket.availableTickets = Number(event.available_vvip_tickets);
            ticket.amount = Number(event.vvip);
            ticket.name = "Vvip";
            ticket.noOfTickets = 0;
            tickets = tickets.concat(ticket);
        }
        if(event.available_vip_tickets){
            ticket = {};
            ticket.availableTickets = Number(event.available_vip_tickets);
            ticket.amount = Number(event.vip);
            ticket.name = "Vip";
            ticket.noOfTickets = 0;
            tickets = tickets.concat(ticket);
        }
        if(event.available_regular_tickets){
            ticket = {};
            ticket.availableTickets = Number(event.available_regular_tickets);
            ticket.amount = Number(event.regular);
            ticket.name = "Regular";
            ticket.noOfTickets = 0;
            tickets = tickets.concat(ticket);
        }

        if(signedIn == false) {
            googleSignin.style.display = "block";
            eventPayment.style.display = "none";
            paymentComplete.style.display = "none";
            paymentSuccessful.style.display = "none";
        }
        if(signedIn == true){
            googleSignin.style.display = "none";
            eventPayment.style.display = "block";
            paymentComplete.style.display = "none";
            paymentSuccessful.style.display = "none";

            if(event.posters.length > 0)
                eventPoster.src = "." + event.posters[0].path;
                //eventPoster.src = baseURL + event.posters[0].path;
            eventDate.innerHTML = formatDateddmm(event.start_datetime);
            eventVenue.innerHTML = event.venue;
            eventStartTime.innerHTML = get12hrTime(event.start_datetime);
            eventEndTime.innerHTML = get12hrTime(event.end_datetime);
            ticketTypes.innerHTML = ticketTypesAvailable(tickets);
        } 
        if (paymentInitiated == true){
            googleSignin.style.display = "none";
            eventPayment.style.display = "none";
            paymentComplete.style.display = "grid";
            paymentSuccessful.style.display = "none";
        } 
        if(paymentCompleted == true){
            googleSignin.style.display = "none";
            eventPayment.style.display = "none";
            paymentComplete.style.display = "none";
            paymentSuccessful.style.display = "grid";
        }
    } else {
        activeEvent = undefined;
        console.log("setting payment initiated false");
        paymentInitiated = false;
        paymentCompleted = false;
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        document.getElementsByClassName("popup")[0].style.display = "none";
    }
}

const updateAmount = tickets => {
    let amount = 0;
    tickets.forEach(ticket => {
        amount = amount + ticket.amount * ticket.noOfTickets;
    });
    return amount;
}

const handleMpesaPhoneNumberChange = event => {
    mpesaPhoneNumber = event.target.value;
    document.getElementById("mpesaPhoneNumberError").innerHTML="";
}

const ticketTypesAvailable = tickets => {
    let availableTickets = ``;
    tickets.map((ticket, index) => {
        availableTickets = availableTickets + `
            <span class="paymentOptions">
                <label for="${ticket.name}"><strong>${ticket.name}(Ksh. ${ticket.amount})</strong></label>
                <div class="my-order-quantity">
                    <span onclick="handleNoOfTicketsChange('decrement', ${index})">-</span>
                    <input onchange="handleNoOfTicketsChange(event.target.value, ${index})" type="number" value="0" />
                    <span onclick="handleNoOfTicketsChange('increment', ${index})">+</span>
                </div>
                <p>${ticket.availableTickets} remaining!</p>
            </span>
        `
    });

    return availableTickets;
}

let activeEvent;
const handleTicketPurchase = event => {
    event.preventDefault();

    /**
     * Check if the user is signed in
     */
    let credential = sessionStorage.getItem("credential");
    /*if(credential == null){
        google.accounts.id.prompt();
        console.log("Unauthorized yet");
        return;
    }*/

    let ticketTypeError = document.getElementById("ticket-type-error"),
    mpesaPhoneNumberError = document.getElementById("mpesaPhoneNumberError");

    let canSubmit = true;
    if(updateAmount(tickets) == 0){
        //handle error to say select ticket
        ticketTypeError.innerHTML = "Kindly select a ticket!";
        canSubmit = false;
    }
    
    const mpesaPhoneNumberRegex = /^254[17]\d{8}$/;
    if(mpesaPhoneNumberRegex.test(mpesaPhoneNumber) == false){
        //handle error to say invalid phone number
        mpesaPhoneNumberError.innerHTML = "Invalid Mpesa phone number, use format 254712345678!";
        canSubmit = false;
    }


    if(canSubmit){
        //paymentInitiated = true;
        //handlePopup(activeEvent);
        let formData = new FormData();
        document.getElementById("mpesaPhoneNumber").innerHTML = "+" + mpesaPhoneNumber;
        formData.append("mpesaPhoneNumber", mpesaPhoneNumber);
        formData.append("tickets", JSON.stringify(tickets));
        formData.append("event_id", activeEvent.id);
        formData.append("credential", sessionStorage.getItem("credential"));

        const API_ENDPOINT = "../server/purchase-tickets.php";
        const request = new XMLHttpRequest();

        request.open("POST", API_ENDPOINT, true);
        request.onreadystatechange = () => {
            if(request.readyState === 4 && request.status === 200){
                console.log(request.response);
                orderDetails = JSON.parse(request.response);
                paymentInitiated = true;
                handlePopup(activeEvent);
            } else {
                console.log(request);
            }
        }

        request.send(formData);
    }
}

const handlePaymentCompleted = () => {
    let formData = new FormData();
        
    formData.append("paymentCompleted", 1);
    formData.append("order_id", orderDetails.orderId);
    formData.append("credential", sessionStorage.getItem("credential"));

    const API_ENDPOINT = "../server/update-payment-status.php";
    const request = new XMLHttpRequest();

    request.open("POST", API_ENDPOINT, true);
    request.onreadystatechange = () => {
        if(request.readyState === 4 && request.status === 200){
            console.log(request.response);
            paymentInitiated = true;
            paymentCompleted = true;
            handlePopup(activeEvent);
            getAvailableTickets();
        }
    }

    request.send(formData);
}
let groupedEvents = [];
const getAvailableTickets = () => {
    const API_ENDPOINT = "../server/events.php";
    const request = new XMLHttpRequest();

    console.log("Fetching available tickets!");
    request.open("GET", API_ENDPOINT, true);
    request.onreadystatechange = () => {
        if(request.readyState === 4 && request.status === 200){
            groupedEvents = JSON.parse(request.response);
            updateEvents(groupedEvents);
        }
    }

    request.send();
    return tickets;
}
getAvailableTickets();
const updateEvents = groupedEvents => {
    console.log(groupedEvents);
    let innerHTML = `
        <h1>Upcoming events</h1>
        <p>Book Now</p>`;

    let month, image, date, venue;
    groupedEvents.forEach((groupedEvent, index) => {

        month = groupedEvent.month;
        innerHTML += `<h2>${formatDatemmyyyy(month)}</h2>`;
        innerHTML += `<div class='images-display'>`;
        
        groupedEvent.events.forEach((event, index) => {

            if(event.posters.length > 0){
                image = event.posters[0].path;
            } else {
                image = "";
            }

            date = event.start_datetime;
            venue = event.venue;

            innerHTML += 
                `<div class='gallery'>
                    <a target='_blank' href='$path'>
                        <img src='.${image}' alt='Event poster' width='600' height='400'>
                    </a>
                    <div class='desc'>
                        <p><strong>Date:</strong> ${formatDateddmmyyyy(date)}</p>
                        <p><strong>Venue:</strong> ${venue}</p>
                        <div class='buttons-div'>
                            <a class='to-s-event' href='./single-event.php?id=${event.id}'>More Info</a>
                            <button onclick='handlePopup(${JSON.stringify(event)})' class='to-paybox'>Buy</button>
                        </div>
                    </div>
                </div>`;
        });
        
        innerHTML += `</div>`;

    });
    
    document.getElementById("upcoming-events").innerHTML = innerHTML;
}