import React, {useState} from 'react'
import {TouchableOpacity, View} from 'react-native'
import localization from "../../../utils/localization";
import Autocomplete from "../../../components/Autocomplete";
import {medicationsService} from '../../../constants/Medications';
import {checkupsService} from '../../../constants/Checkups';
import NumericInput from "../../../components/NumericInput";
import CalendarDayPicker from "./CalendarDayPicker";
import CalendarOvulationDayPicker from "./CalendarOvulationDayPicker";
import {CALENDAR, EDIT_EVENT} from "../../../navigation/Routes";
import {store, syncPatientData} from "../../../store";
import EventDetailsPicker from "./EventDetailsPicker";
import shortid from 'shortid';
import ValidationModal from "../../../components/ValidationModal";
import _ from "lodash";
import {addOrRemove} from "../../../utils/utils";
import {addDays, daysBetween, isInFuture, momentToWixDate, wixDateToMoment} from "../../../utils/dayTime";
import {syncEvents} from "../../../utils/eventsSync";
import Text from "../../../components/Text";
import ButtonPrimary from "../../../components/ButtonPrimary";
import Button from "../../../components/Button";
import Colors from "../../../constants/Colors";
import {borderRadiusStyle, eventColor, marginStyle, paddingStyle, shadowStyle} from "../../../constants/Styles";
import Divider from "../../../components/Divider";
import Row from "../../../components/Row";
import Container from "../../../components/Container";
import TextInput from "../../../components/TextInput";
import Icon from "../../../components/Icon";
import {unsetAllNotifications} from "../../../utils/notificationsSync";
import Balloon from "../../../components/Balloon";
import appContext from "../../../utils/context";
import RouteGuard from "../../../navigation/RouteGuard";

const initialState = {
    id: null,
    medication: null,
    checkup: null,
    dailyDose: null,
    timesPerDay: 1,
    selectedDates: [],
    eventsAndReminders: [],
    notificationIds: [],
    note: '',
    results: {}
};

const DEFAULT_MIN_HOUR = 8;
const EVENT_TYPE_MEDICATION = 'MEDICATION';
const EVENT_TYPE_CHECKUP = 'CHECKUP';

const EditEventTab = ({navigation, setMainCalendarRefresh, currentEditedEventId, setCurrentEditedEventId, setIsLoading}) => {
    RouteGuard(navigation, EDIT_EVENT);
    if (store.noData()) {
        return <View/>
    }

    const [eventType, setEventType] = useState(EVENT_TYPE_MEDICATION);
    const [state, setState] = useState({...initialState});
    const [isNewEvent, setIsNewEvent] = useState(true);
    const [showDeleteValidationModal, setShowDeleteValidationModal] = useState(false);
    const [showPastValidationModal, setShowPastValidationModal] = useState(false);
    const [closeAfterPastValidation, setCloseAfterPastValidation] = useState(false);
    const isMedicationEvent = eventType === EVENT_TYPE_MEDICATION;
    const lastPeriodMoment = wixDateToMoment(_.last(store.patientData.periods).date);

    if (!currentEditedEventId) {
        setCurrentEditedEventId(shortid.generate());
        return <View/>;
    }
    if (state.id !== currentEditedEventId) {
        let storedState = store.patientData.events[currentEditedEventId];
        if (!storedState) {
            setState({...initialState, id: currentEditedEventId});
        }
        else {
            setIsNewEvent(false);
            setState({...storedState});
            setEventType(storedState.medication ? EVENT_TYPE_MEDICATION : EVENT_TYPE_CHECKUP);
        }
        return <View/>;
    }

    const timesPerDayNormalized = state.timesPerDay ? Number(state.timesPerDay) : 0;
    if (timesPerDayNormalized !== state.eventsAndReminders.length) {
        let eventsAndReminders = [];
        for (let i = 0; i < timesPerDayNormalized; i++) {
            const hour = (DEFAULT_MIN_HOUR + i) % 24;
            const reminderHour = isMedicationEvent ? hour : (hour - 1) % 24;
            eventsAndReminders.push({
                event: {hour: hour, minute: 0},
                reminder: {hour: reminderHour, minute: 0},
                reminderDisabled: true
            });
        }
        setState({...state, eventsAndReminders: eventsAndReminders});
        return <View/>;
    }

    const setEventsAndReminder = (eventAndReminder, i) => {
        const {eventsAndReminders} = state;
        eventsAndReminders[i] = eventAndReminder;
        setState({...state, eventsAndReminders: eventsAndReminders});
    };

    const canSave =
        ((eventType === EVENT_TYPE_MEDICATION && state.medication) || (eventType === EVENT_TYPE_CHECKUP && state.checkup)) &&
        !_.isEmpty(state.selectedDates) && state.timesPerDay;

    const flush = async (patientData) => {
        patientData.events[state.id] = state;
        setMainCalendarRefresh(shortid.generate()); // to refresh main calendar
        await syncPatientData(patientData);
    };

    const close = () => {
        setCurrentEditedEventId(null);
        setState({...state, id: null});
        setIsNewEvent(true);
        navigation.navigate(CALENDAR);
    };

    const reset = () => {
        setCurrentEditedEventId(null);
        setState({...state, id: null, isNewEvent: true});
        setIsNewEvent(true);
    };

    const deleteEvent = async () => {
        try {
            const {patientData} = store;
            setIsLoading(true);
            delete patientData.events[state.id];
            await unsetAllNotifications(state);
            setMainCalendarRefresh(shortid.generate()); // to refresh main calendar
            await syncPatientData(patientData);
        } finally {
            setIsLoading(false);
            close();
        }
    };

    const EventTypeButton = ({targetEventType, titleKey}) => {
        const isSelected = eventType === targetEventType;
        const contextColor = eventColor(targetEventType === EVENT_TYPE_MEDICATION);
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{width: '50%'}}
                disabled={eventType === targetEventType}
                onPress={() => {
                    setState({...initialState, id: currentEditedEventId});
                    setEventType(targetEventType);
                }}
            >
                <Text alignCenter bold size={10} color={isSelected ? contextColor : Colors.grayDark}>
                    {localization(titleKey)}
                </Text>
                <Divider color={isSelected ? contextColor : 'transparent'} bright bold style={{width: '60%', alignSelf: 'center', marginBottom: 0}}/>
            </TouchableOpacity>
        );
    };

    const ovulationDayToDate = (day) => momentToWixDate(addDays(lastPeriodMoment, day - 1));

    const dateToOvulationDay = (date) => daysBetween(lastPeriodMoment, wixDateToMoment(date)) + 1;

    const submit = async (shouldClose) => {
        if (state.selectedDates.some(date => !isInFuture(addDays(wixDateToMoment(date), 1)))) {
            setShowPastValidationModal(true);
            setCloseAfterPastValidation(shouldClose);
        }
        else {
            await syncEvents(setIsLoading, flush, [state]);
            if (shouldClose) {
                close();
            }
            else {
                reset();
            }
        }
    };

    const numericInputStyle = [borderRadiusStyle(5), marginStyle(3, 'top'), {backgroundColor: Colors.grayLight, borderColor: Colors.grayMedium}];

    return (
        <Container>
            <ValidationModal
                isVisible={showDeleteValidationModal}
                title={localization('areYouSureDelete')}
                positive={localization('deleteEvent')}
                setResult={async (shouldDelete) => {
                    setShowDeleteValidationModal(false);
                    if (shouldDelete) {
                        await deleteEvent();
                    }
                }}
            />
            <ValidationModal
                isVisible={showPastValidationModal}
                title={localization('areYouSurePast')}
                positive={localization('yes')}
                setResult={async (approve) => {
                    setShowPastValidationModal(false);
                    if (approve) {
                        await syncEvents(setIsLoading, flush, [state]);
                        if (closeAfterPastValidation) {
                            close();
                        }
                        else {
                            reset();
                        }
                    }
                }}
            />
            {
                isNewEvent ?
                    <Row style={[
                        {shadowOffset: {height: 2}, shadowTopRadius: 10},
                        shadowStyle(10),
                        marginStyle(15, 'bottom')
                    ]}>
                        <EventTypeButton targetEventType={EVENT_TYPE_MEDICATION} titleKey='medicationTitle'/>
                        <EventTypeButton targetEventType={EVENT_TYPE_CHECKUP} titleKey='checkupTitle'/>
                    </Row>
                    : null
            }
            <View style={[paddingStyle(10, 'left'), paddingStyle(10, 'right')]}>
                <Text>{localization(isMedicationEvent ? 'medicationSubTitle' : 'checkupSubTitle')}</Text>
                <Autocomplete
                    style={{zIndex: 2}}
                    items={isMedicationEvent ? medicationsService.items : checkupsService.items}
                    selectedItem={{
                        item:
                            isMedicationEvent ? medicationsService.getNameByKey(state.medication)
                                : checkupsService.getNameByKey(state.checkup)
                    }}
                    setSelectedItem={item => setState(
                        isMedicationEvent
                            ? {
                                ...state, medication: medicationsService.getKeyByName(item)
                            }
                            : {
                                ...state, checkup: checkupsService.getKeyByName(item)
                            }
                    )}
                />
                {
                    isMedicationEvent ?
                        <Row style={marginStyle(10, 'top')}>
                            <View style={marginStyle(25, 'right')}>
                                <Text>{localization('dailyDose')}</Text>
                                <NumericInput
                                    width={65}
                                    style={numericInputStyle}
                                    value={state.dailyDose}
                                    setValue={dailyDose => setState({...state, dailyDose: dailyDose})}
                                />
                            </View>
                            <View>
                                <Text>{localization('timesPerDay')}</Text>
                                <NumericInput
                                    style={numericInputStyle}
                                    value={state.timesPerDay}
                                    setValue={timesPerDay => setState({...state, timesPerDay})}
                                />
                            </View>
                        </Row> : null
                }
                <Row>
                    <Text style={marginStyle(10, 'top')}>{localization(isMedicationEvent ? 'ovulationCalendar' : 'calendar')}</Text>
                    {
                        isMedicationEvent ? <View><Icon name='drop' style={{position: 'absolute', top: 3, left: 6}}/></View> : null
                    }
                </Row>
                <Text style={marginStyle(5, 'top')} color={eventColor(isMedicationEvent)}>{localization(isMedicationEvent ? 'selectDaysOfMedicine' : 'selectDaysOfCheckup')}</Text>
                {
                    isMedicationEvent &&
                    <Row>
                        <Balloon pointDown width={100} text={localization('firstDayOfPeriod')}/>
                    </Row>
                }
                {
                    isMedicationEvent ?
                        <CalendarOvulationDayPicker
                            onDayPress={(day) => {
                                const selectedDates = addOrRemove(state.selectedDates, ovulationDayToDate(day));
                                setState({...state, selectedDates});
                            }}
                            coloredDays={state.selectedDates.map(date => dateToOvulationDay(date))}
                        />
                        :
                        <CalendarDayPicker
                            onDayPress={(day) => {
                                const selectedDates = [day.dateString];
                                setState({...state, selectedDates});
                            }}
                            coloredDays={state.selectedDates}
                        />
                }
                <View style={marginStyle(10, 'top')}>
                    {
                        [...Array(timesPerDayNormalized).keys()].map(i => {
                            return (
                                <EventDetailsPicker
                                    key={i}
                                    eventAndReminder={state.eventsAndReminders[i]}
                                    setEventAndReminder={(eventAndReminder) => setEventsAndReminder(eventAndReminder, i)}
                                    color={eventColor(isMedicationEvent)}
                                />
                            )
                        })
                    }
                </View>
                <Text style={marginStyle(5, 'top')}>{localization('note')}</Text>
                <TextInput
                    style={[
                        marginStyle(5, 'top'),
                        borderRadiusStyle(5),
                        {backgroundColor: Colors.grayLight, borderColor: Colors.grayMedium, borderWidth: 1, width: '100%'}
                    ]}
                    height={85}
                    alignLeft
                    value={state.note}
                    setValue={note => setState({...state, note: note})}
                />
                <Row center>
                    <ButtonPrimary
                        style={marginStyle(5, 'top')}
                        width={125}
                        disabled={!canSave}
                        onPress={async () => await submit(true)}>
                        {localization('imDone')}
                    </ButtonPrimary>
                </Row>
                <Row center>
                    <ButtonPrimary
                        style={marginStyle(3, 'top')}
                        width={125}
                        inverted
                        disabled={!canSave}
                        onPress={async () => await submit(false)}>
                        {localization(isMedicationEvent ? 'addAnotherMedication' : 'addAnotherCheckup')}
                    </ButtonPrimary>
                </Row>
                {
                    !isNewEvent &&
                    <Row center>
                        <Button
                            style={marginStyle(3, 'top')}
                            width={125}
                            onPress={() => close()}
                        >
                            {localization('cancel')}
                        </Button>
                    </Row>
                }
                <Row center style={marginStyle(40, 'bottom')}>
                    <Button
                        style={marginStyle(3, 'top')}
                        width={125}
                        onPress={() => {
                            if (isNewEvent) {
                                close();
                            }
                            else {
                                setShowDeleteValidationModal(true);
                            }
                        }}
                    >
                        {localization(isNewEvent ? 'clearEvent' : 'deleteEvent')}
                    </Button>
                </Row>
            </View>
        </Container>
    )
};

const {Consumer} = appContext;

export default (props) => <Consumer>
    {
        context => <EditEventTab {...props} {...context}/>
    }
</Consumer>

