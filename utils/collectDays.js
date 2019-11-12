import _ from 'lodash'

export function collectByDay(events) {
    let eventsByDay = {};
    _.forOwn(events, (event, eventId) => {
        event.selectedDays.forEach(selectedDay => {
            const group = eventsByDay[selectedDay];
            if (group) {
                eventsByDay[selectedDay] = [...group, event];
            } else {
                eventsByDay[selectedDay] = [event];
            }
        });
    });
    return eventsByDay;
}

export function eventsForDay(eventsByDay, selectedDay) {
    const eventsForDay = eventsByDay[selectedDay];
    if (!eventsForDay || !eventsForDay.length) {
        return [];
    }
    let eventsForSelected = [];
    eventsForDay.forEach(calendarEvent => {
        calendarEvent.eventsAndReminders.forEach(eventAndReminder => {
            eventsForSelected.push({dayTime: eventAndReminder.event, details: calendarEvent});
        });
    });
    const comparer = (dt1, dt2) => {
        if (dt1.hour !== dt2.hour) {
            return dt1.hour - dt2.hour;
        }
        return dt1.minute - dt2.minute;
    };
    eventsForSelected.sort((event1, event2) => comparer(event1.dayTime, event2.dayTime));
    return eventsForSelected;
}
