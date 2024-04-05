import moment from "moment";

export const getMatchTime = (timeStr) => {
    // Create date from input value
    const newDate = new Date(timeStr);

    // Get today's date
    const todaysDate = new Date();
    let time;
    if (newDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
        time = moment(timeStr).format("h:mm A");
    } else {
        time = moment(timeStr).format("DD MMM, yyyy");
    }

    // call setHours to take the time out of the comparison
    return time;
}