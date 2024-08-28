"use strict";
let tickets = [];
let mpesaPhoneNumber;
let signedIn = true, paymentInitiated = false, paymentCompleted = false, orderDetails;
const handleNoOfTicketsChange = (value, index) => {
    let ticketTypes = document.getElementsByClassName("ticket-type")[0];
    ticketTypes = ticketTypes.getElementsByClassName("paymentOptions");
    let amount = document.getElementById("event-ticket-amount");
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

    amount.innerHTML = "Ksh. " + updateAmount(tickets);
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
        activeEvent = event;
        document.getElementsByClassName("popup")[0].style.display = "block";
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        let ticket = {};
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
        //1. If not signed in, show google signin
        //2. If signed in show payment form
        //3. If payment made, show payment processing
        //4. If payment failed, show form, else show link to tickets page
        //5. 

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
        
        formData.append("mpesaPhoneNumber", mpesaPhoneNumber);
        formData.append("tickets", JSON.stringify(tickets));
        formData.append("event_id", activeEvent.id);
        formData.append("google_user_name", "John Doe");
        formData.append("google_user_email", "johndoe@gmail.com");
        formData.append("google_user_id_token", "something");

        const API_ENDPOINT = "./server/purchase-tickets.php";
        const request = new XMLHttpRequest();

        request.open("POST", API_ENDPOINT, true);
        request.onreadystatechange = () => {
            if(request.readyState === 4 && request.status === 200){
                orderDetails = JSON.parse(request.response);
                paymentInitiated = true;
                handlePopup(activeEvent);
            }
        }

        request.send(formData);
    }
}

const handlePaymentCompleted = () => {
    let formData = new FormData();
        
    formData.append("paymentCompleted", 1);
    formData.append("order_id", orderDetails.orderId);
    formData.append("google_user_name", "John Doe");
    formData.append("google_user_email", "johndoe@gmail.com");
    formData.append("google_user_id_token", "something");

    const API_ENDPOINT = "./server/update-payment-status.php";
    const request = new XMLHttpRequest();

    request.open("POST", API_ENDPOINT, true);
    request.onreadystatechange = () => {
        if(request.readyState === 4 && request.status === 200){
            paymentInitiated = true;
            paymentCompleted = true;
            handlePopup(activeEvent);
            //props.getProducts();
        }
    }

    request.send(formData);
}