const formatDateddmm = dateString => {
    const options = {
        //day:'numeric',
        month:'long'
    };
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', options);
    const suffix = getDaySuffix(day);

    return `${day}${suffix} ${month}`
}

const formatDateddmmyyyy = dateString => {
    const options = {
        //day:'numeric',
        month:'long'
    };
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', options);
    const year = date.getFullYear();
    const suffix = getDaySuffix(day);

    return `${day}${suffix} ${month}, ${year}`
}
const formatDatemmyyyy = dateString => {
    const options = {
        //day:'numeric',
        month:'long'
    };
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleDateString('en-US', options);

    return `${month} ${year}`;
}
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
const getCurrentDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day =String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const getTime = dateString => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
}

const get12hrTime = dateString => {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', hour12:true});
    return formattedTime;
}