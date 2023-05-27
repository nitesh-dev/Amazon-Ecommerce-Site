export function unixMillisecondsToDateString(unixMilliseconds: number) {
    // Create a new Date object with the Unix timestamp in milliseconds
    const date = new Date(unixMilliseconds);

    // Extract the day, month, and year from the date object
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();


    // Construct the date string in the desired format
    const dateString = `${day} ${month} ${year}`;

    return dateString;
}


export function stringToNumber(text: string) {
    var t = text.replace(/\D/g, "")
    if (t == "") {
        t = "0"
    }
    return parseInt(t);
}