import {Platform} from 'react-native';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import {logError, logInfo} from "./log";

const localOffsetMilliSec = new Date().getTimezoneOffset() * 60 * 1000;

const NOTIFICATIONS_CHANNEL = 'emma';

const createNotification = (title, body) => {
    return {
        title: title,
        body: body,
        ios: {
            _displayInForeground: true,
            sound: true
        },
        android: {
            channelId: NOTIFICATIONS_CHANNEL,
            icon: 'https://i.imgur.com/3sEaZRt.png'
        }
    }
};

const setup = async () => {
    if (Platform.OS === 'android') {
        await Notifications.createChannelAndroidAsync(NOTIFICATIONS_CHANNEL, {
            name: NOTIFICATIONS_CHANNEL,
            sound: true,
            vibrate: true,
        });
    }
    else if (Platform.OS === 'ios') {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
};

export const testNotification = async () => {
    await setup();
    await Notifications.presentLocalNotificationAsync(createNotification("Test", "test!"));
};

export const setNotification = async (title, body, dateMoment) => {
    try {
        await setup();
        const epochTimestamp = dateMoment.valueOf() + localOffsetMilliSec;
        const id = await Notifications.scheduleLocalNotificationAsync(createNotification(title, body), {time: epochTimestamp});
        logInfo(`Registered notification ${id} at ${epochTimestamp}`);
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
        logInfo(`Failed to unset notification ${id}: ${e}`);
    }
};
