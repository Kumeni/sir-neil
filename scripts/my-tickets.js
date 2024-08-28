const getTickets = () => {

    let credential = sessionStorage.getItem("credential");
    const API_ENDPOINT = "./server/purchased-tickets.php";
    const request = new XMLHttpRequest();
    
    let response;

    request.open("GET", API_ENDPOINT, true);

    request.setRequestHeader("Authorization", "Bearer " + credential);
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

/**
 * For the user to sign in using google sign in;
 */
 const promptSignIn = () => {
    tickets = [];
    let googleSignin = document.getElementsByClassName("google-sign-in")[0]; 
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
        document.getElementsByClassName("popup")[0].style.display = "block";
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        googleSignin.style.display = "block";
    } else {
        googleSignin.style.display = "none";
        signedIn = true;
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        document.getElementsByClassName("popup")[0].style.display = "none";
    } 
}

/**
 * Front-end for the tickets
 */
 const downloadTicket = orderedTicket => {
    // Replace 'IMAGE_URL' with the actual URL of the image you want to download
    var imageUrl = "." + orderedTicket.ticket;
    console.log(imageUrl);
    // Create a hidden anchor element
    var anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = imageUrl;
    anchor.download = 'Ticket ' + orderedTicket.id;

    // Append the anchor to the document
    document.body.appendChild(anchor);

    // Trigger a click event on the anchor
    anchor.click();

    // Remove the anchor from the document
    document.body.removeChild(anchor);
}

const fetchTicket = (event, ticketId) => {
    event.preventDefault();
    const windowFeatures = "left=100,top=100,width=1200,height=320";
    const myWindow = window.open("./server/download-ticket.php?ticket-id=" + ticketId, "Download Ticket", windowFeatures);

    const check = setInterval(()=>{
        const API_ENDPOINT = "./server/get-ticket.php?ticket-id=" + ticketId;
        const request = new XMLHttpRequest();

        request.open("GET", API_ENDPOINT, true);
        request.onreadystatechange = () => {
            if(request.readyState === 4 && request.status === 200){
                let response = JSON.parse(request.response);
                console.log(response);
                //console.log(response);
                console.log(response.ticket);
                if(response.ticket){
                    //If the ticket exists close the window
                    downloadTicket(response);
                    clearInterval(check);
                    myWindow.close();
                }
            }
        }

        request.send();
    }, 3000);
}

const updateTickets = (tickets) => {
    let ticketsContainer = document.getElementById("upcoming-events");

    /**
     * Create the innerHTML for the tickets container then update it.
     */

    let innerHTML = ``
    tickets.forEach( (ticket, index) => {
        let orderDate = formatDateddmmyyyy(ticket.date);
        innerHTML = innerHTML + `
                <h2 class="order-date">Date: ${orderDate}</h2>
                <div class="underline"></div>
                    <div class='images-display'>
            `;
        
        
        ticket.purchasedTickets.forEach(purchasedTicket => {

            let status = Boolean(Number(ticket.paymentConfirmed))? 
            `<button class='to-s-event'><a href="/uploads/tickets/${purchasedTicket.ticket}" download>Download</a></button>`
            :`<button class='to-s-event'>Pending confirmation</button>`;

            let startDateTime = formatDateddmmyyyy(purchasedTicket.event.start_datetime);
            let venue = purchasedTicket.event.venue;
            let ticketNo = purchasedTicket.id;
            let ticketType = Boolean(Number(purchasedTicket.regular))? "REGULAR":
                             Boolean(Number(purchasedTicket.vvip))? "VVIP":
                             "VIP";

            let poster = "." + purchasedTicket.event.posters[0].path;
            innerHTML = innerHTML + `
                <div class='gallery'>
                    <a target='_blank' href='./uploads/poster2.png'>
                        <img src='${poster}' alt='Cinque Terre' width='600' height='400'>
                    </a>
                    <div class='desc'>
                        <p><strong>Ticket #:</strong> ${ticketNo}</p>
                        <p><strong>Type #:</strong> ${ticketType}</p>
                        <p><strong>Date:</strong> ${startDateTime}</p>
                        <p><strong>Venue:</strong> ${venue}</p>
                        <div class='buttons-div'>` + status +
                        `</div>
                    </div>
                </div>
            `;
        });
    
        innerHTML = innerHTML + `</div>`;
    });
    
    ticketsContainer.innerHTML = innerHTML;
    
}