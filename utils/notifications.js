import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import {logError, logInfo} from "./log";

const createNotification = (title, body) => {
    return {
        title: title,
        body: body,
        ios: {
            _displayInForeground: true
        },
        android: {
            icon: 'https://cdn3.iconfinder.com/data/icons/web-15/128/RSSvgLink-2-512.png' // TODO
        }
    }
};

export const setNotification = async (title, body, dateMoment) => {
    try {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
        const id = await Notifications.scheduleLocalNotificationAsync(createNotification(title, body), {time: dateMoment.toDate()});
        logInfo(`Registered notification ${id} at ${dateMoment}`);
        return id;
    }
    catch (e) {
        logError(`Failed to set notification: ${e}`);
        return "";
    }
};

export const unsetNotification = async (id) => {
    try {
        if (id) {
            await Notifications.cancelScheduledNotificationAsync(id);
        }
    }
    catch (e) {
        logError(`Failed to unset notification ${id}: ${e}`);
    }
};
