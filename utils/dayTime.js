import moment from "moment";
import localization, {isRTL} from "./localization";

export const dayTimeToDate = (dt) => {
    if (!dt) {
        return new Date();
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

export const dayTimeToDisplayString = (dt) => {
    let {hour, minute} = dt;
    let suffix = "";
    if (!isRTL) {
        suffix = ` ${hour <= 11 ? localization('am') : localization('pm')}`;
        hour = hour % 12;
    }

    return `${hour <= 9 ? '0' + hour : hour}:${minute <= 9 ? '0' + minute : minute}${suffix}`;
};

export const momentToDisplayString = (momentDate) => momentDate.format("dddd, MMMM D");

export const momentToWixDate = (momentDate) => momentDate.format("YYYY-MM-DD");

export const wixDateToMoment = (wixDate) => moment.utc(wixDate, 'YYYY-MM-DD');

export const daysBetween = (earlier, later) => !earlier ? 0 : moment.duration(later.utc().startOf('day').diff(earlier.utc().startOf('day'))).asDays();

export const momentsEquals = (moment1, moment2) =>
    moment1.year() === moment2.year() &&
    moment1.dayOfYear() === moment2.dayOfYear();

export const isAfterOrEquals = (current, compared) => current.isAfter(compared) || momentsEquals(current, compared);

export const addDays = (momentDate, days) => momentDate.clone().add(days, 'days');

export const isInFuture = (momentDate) => momentDate.isAfter(moment());
