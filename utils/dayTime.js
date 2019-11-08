export const dayTimeToDate = (dt) => {
    if (!dt) {
        return Date.now();
    }
    let dateTime = new Date();
    dateTime.setHours(dt.hour);
    dateTime.setMinutes(dt.minute);
    dateTime.setSeconds(0);
    dateTime.setMilliseconds(0);
    return dateTime;
};

export const dateToDayTime = (date) => {
    return {hour: date.getHours(), minute: date.getMinutes()};
};

export const dayTimeToString = (dt) => {
    let {hour, minute} = dt;
    const suffix = hour <= 11 ? 'AM' : 'PM';
    hour = hour % 12;
    return `${hour <= 9 ? '0' + hour : hour}:${minute <= 9 ? '0' + minute : minute} ${suffix}`;
};
