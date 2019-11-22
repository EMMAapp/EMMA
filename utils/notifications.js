import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {logInfo} from "./log";

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
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
    const id = await Notifications.scheduleLocalNotificationAsync(createNotification(title, body), {time: dateMoment.toDate()});
    logInfo(`Registered notification ${id} at ${dateMoment}`);
    return id;
};

export const unsetNotification = async (id) => {
    await Notifications.cancelScheduledNotificationAsync(id);
};
