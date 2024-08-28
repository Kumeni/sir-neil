const getTickets = () => {
    const API_ENDPOINT = "./server/purchased-tickets.php?google_user_name=samson&google_user_email=johndoe@gmail.com";
    const request = new XMLHttpRequest();
    let response;

    request.open("GET", API_ENDPOINT, true);
    request.onreadystatechange = () => {
        if(request.readyState === 4 && request.status === 200){
            response = request.response;
            //console.log(request);
            response = JSON.parse(response);
            updateTickets(response);
        }
    }

    request.send();
}
getTickets();
console.log("SSup bruh");
/**
 * Front-end for the tickets
 */

const getDaySuffix = day => {
    if( day >= 11 && day <=13){
        return 'th';
    }

    switch (day%10){
        case 1: return'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}
const downloadTicket = orderedTicket => {
    // Replace 'IMAGE_URL' with the actual URL of the image you want to download
    var imageUrl = orderedTicket.ticket;

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

const fetchTicket = (event) => {
    event.preventDefault();
    const windowFeatures = "left=100,top=100,width=600,height=320";
    const myWindow = window.open("../server/download-ticket.php?ticket-id=1", "Download Ticket", windowFeatures);

    setInterval(()=>{
        const API_ENDPOINT = "../server/get-ticket.php?ticket-id="+id;
        const request = new XMLHttpRequest();

        request.open("GET", API_ENDPOINT, true);
        request.onreadystatechange = () => {
            if(request.readyState === 4 && request.status === 200){
                let response = JSON.parse(request.response);
                //console.log(response);
                if(response.ticket){
                    //If the ticket exists close the window
                    downloadTicket(response);
                    myWindow.close();
                }
            }
        }

        request.send();
    }, 3000);
}
const updateTickets = (tickets) => {
    let ticketsContainer = document.getElementById("upcoming-events");
    console.log("Holla");
    /**
     * Create the innerHTML for the tickets container then update it.
     */

    let innerHTML = ``
    tickets.forEach(ticket => {
        let orderDate = formatDateddmmyyyy(ticket.date);
        innerHTML = innerHTML + `
                <h2 class="order-date">DDDate: ${orderDate}</h2>
                <div class="underline"></div>
                    <div class='images-display'>
            `;

        let startDateTime = formatDateddmmyyyy(ticket.event.start_datetime);
        let venue = ticket.event.venue;
        let status = Boolean(!Number(ticket.paymentConfirmed))? 
                        `<a class='to-s-event' onclick="fetchTicket(event)"  href='./single-event.php?id=${ticket.id}'>Download</a>`
                        :`<a class='to-s-event' onclick="fetchTicket(event)" href='./single-event.php?id=${ticket.id}'>Pendin confirmation</a>`;
        status ="";
        ticket.purchasedTickets.forEach(purchasedTicket => {
            let ticketNo = purchasedTicket.id;
            let ticketType = Boolean(Number(purchasedTicket.regular))? "REGULAR":
                             Boolean(Number(purchasedTicket.vvip))? "VVIP":
                             "VIP";
            innerHTML = innerHTML + `
                <div class='gallery'>
                    <a target='_blank' href='./uploads/poster2.png'>
                        <img src='./uploads/poster2.png' alt='Cinque Terre' width='600' height='400'>
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