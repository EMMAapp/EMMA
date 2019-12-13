import {setNotification, unsetNotification} from "./notifications";
import {dayTimeToDisplayString, isInFuture, wixDateToMoment} from "./dayTime";
import localization from "./localization";
import {store} from "../store";

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
                const reminderMoment = wixDateToMoment(date).add(hour, 'hours').add(minute, "minutes");
                if (!isInFuture(reminderMoment)) {
                    continue;
                }
                const id = await setNotification(
                    localization(event.medication ? 'medicationReminder' : 'checkupReminder'),
                    `${localization('reminderAt')} ${dayTimeToDisplayString(eventAndReminder.event)}. ${event.note}`,
                    reminderMoment
                );
                notificationIds.push(id);
            }
        }
    }
    return notificationIds;
};

export const syncEvents = async (setIsLoading, flush, events) => {
    const {patientData} = store;
    setIsLoading(true);
    for (const event of events) {
        await unsetAllNotifications(event);
        event.notificationIds = await setNewNotifications(event);
        patientData.events[event.id] = {...event};
    }
    await flush(patientData);
    setIsLoading(false);
};
