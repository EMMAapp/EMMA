import {store} from "../store";
import {setNewNotifications, unsetAllNotifications} from "./notificationsSync";

export const syncEvents = async (setIsLoading, flush, events) => {
    try {
        const {patientData} = store;
        setIsLoading(true);
        for (const event of events) {
            await unsetAllNotifications(event);
            event.notificationIds = await setNewNotifications(event);
            patientData.events[event.id] = {...event};
        }
        await flush(patientData);
    }
    finally {
        setIsLoading(false);
    }
};
