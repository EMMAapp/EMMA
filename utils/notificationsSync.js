import {setNotification, unsetNotification} from "./notifications";
import {dayTimeToDisplayString, isInFuture, wixDateToMoment} from "./dayTime";
import localization from "./localization";

export const unsetAllNotifications = async (event) => {
    for (const id of event.notificationIds) {
        await unsetNotification(id);
    }
};

export const setNewNotifications = async (event) => {
    const notificationIds = [];
    for (const date of event.selectedDates) {
        for (const eventAndReminder of event.eventsAndReminders) {
            if (!eventAndReminder.reminderDisabled) {
                const {hour, minute} = eventAndReminder.reminder;
                const notificationMoment = wixDateToMoment(date).add(hour, 'hours').add(minute, "minutes");
                if (!isInFuture(notificationMoment)) {
                    continue;
                }
                const id = await setNotification(
                    localization(event.medication ? 'medicationReminder' : 'checkupReminder'),
                    `${localization('reminderAt')} ${dayTimeToDisplayString(eventAndReminder.event)}. ${event.note}`,
                    notificationMoment
                );
                notificationIds.push(id);
            }
        }
    }
    return notificationIds;
};
