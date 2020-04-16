import React, {useState} from 'react';
import {addDays, daysBetween, isAfterOrEquals, momentsEquals, momentToWixDate, wixDateToMoment} from "../../../utils/dayTime";
import _ from "lodash";
import store, {syncPatientData} from "../../../store";
import SetPeriodComponent from "./SetPeriodComponent";
import SyncEventsModal from "./SyncEventsComponent";
import {syncEvents} from "../../../utils/eventsSync";
import Modal from "../../../components/Modal";
import Loading from "../../../components/Loading";
import {logInfo} from "../../../utils/log";
import shortid from "shortid";

export default function SetAndSyncPeriodModal({isVisible, dismiss, setMainCalendarRefresh}) {

    const [isSyncing, setIsSyncing] = useState(false);
    const [newPeriodMoment, setNewPeriodMoment] = useState(null);
    const [potentialSyncEvents, setPotentialSyncEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {patientData} = store;
    const prevPeriodEndMoment = addDays(wixDateToMoment(_.last(patientData.periods).date), patientData.averagePeriodCycleDays);

    const setPeriod = async (period) => {

        if (!period) {
            finish();
            return;
        }

        const newPeriodMoment = wixDateToMoment(period.date);
        setNewPeriodMoment(newPeriodMoment);

        setIsLoading(true);

        const {patientData} = store;
        patientData.periods.push(period);
        await syncPatientData(patientData);

        if (momentsEquals(newPeriodMoment, prevPeriodEndMoment)) {
            setIsLoading(false);
            finish();
            return;
        }

        const potentialEvents = [];
        _.forOwn(store.patientData.events, (event, eventId) => {
            const {selectedDates} = event;
            let count = _.filter(selectedDates, date => isAfterOrEquals(wixDateToMoment(date), prevPeriodEndMoment)).length;
            if (count > 0) {
                potentialEvents.push({event, count});
            }
        });

        setIsLoading(false);

        if (_.isEmpty(potentialEvents)) {
            finish();
        }
        else {
            setPotentialSyncEvents(potentialEvents);
            setIsSyncing(true);
        }
    };

    const syncEventsWithNewPeriod = async (eventIdsToSync) => {

        if (_.isEmpty(eventIdsToSync)) {
            finish();
            return;
        }

        setIsLoading(true);

        const daysDiff = daysBetween(prevPeriodEndMoment, newPeriodMoment);
        const {events} = store.patientData;
        const eventsToSync = [];
        for (const eventId of eventIdsToSync) {
            const event = events[eventId];
            event.selectedDates = event.selectedDates.map(date => {
                if (!isAfterOrEquals(wixDateToMoment(date), prevPeriodEndMoment)) {
                    return date;
                }
                else {
                    logInfo(`Moving ${date} of event ${eventId} ${daysDiff} days`);
                    return momentToWixDate(addDays(wixDateToMoment(date), daysDiff));
                }
            });
            eventsToSync.push(event);
        }
        await syncEvents(setIsLoading, async (patientData) => await syncPatientData(patientData), eventsToSync);

        setIsLoading(false);
        finish();
    };

    const finish = () => {
        setMainCalendarRefresh(shortid.generate());
        dismiss();
    };

    return (
        <Modal isVisible={isVisible} noContainer onBackdropPress={dismiss}>
            {
                isLoading ? <Loading/> :
                    isSyncing ?
                        <SyncEventsModal
                            dismiss={finish}
                            potentialSyncEvents={potentialSyncEvents}
                            syncEventsWithNewPeriod={syncEventsWithNewPeriod}
                        />
                        :
                        <SetPeriodComponent
                            lastPeriod={_.last(patientData.periods)}
                            setPeriod={setPeriod}
                        />
            }
        </Modal>
    )
}