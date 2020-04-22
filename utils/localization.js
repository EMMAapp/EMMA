import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const en = {

    'connectFacebook': 'Connect with Facebook',
    'connectGoogle': 'Connect with Google',
    'treatmentPlan': 'Treatment Plan',
    'addTreatmentPlan': 'Add Your Treatment Plan',
    'editPeriod': 'Period',
    'editPeriodMessage': 'Please Update Period!',
    'yes': 'Yes',
    'no': 'No',
    'save': 'Save',
    'medicationTitle': 'MEDICATION',
    'checkupTitle': 'CHECKUP',
    'medicationSubTitle': 'Drug/Supplement',
    'checkupSubTitle': 'Process',
    'calendar': 'Calender',
    'ovulationCalendar': 'Ovulation Calender',
    'timeOfEvent': 'Time of event',
    'reminder': 'Reminder Notification',
    'dailyDose': 'Daily dose (iu/pills)',
    'timesPerDay': 'Times a day',
    'selectDaysOfMedicine': 'Select the days of medicine administration',
    'selectDaysOfCheckup': 'Select the day of the scheduled process',
    'note': 'Note',
    'imDone': 'I\'m Done',
    'addAnotherMedication': 'Add Another Medication',
    'addAnotherCheckup': 'Add Another Checkup',
    'clearEvent': 'Clear Event',
    'deleteEvent': 'Delete Event',
    'delete': 'Delete',
    'autocompletePlaceholder': 'Start typing or choose from list',
    'pickTime': 'Pick time of day',
    'loading': 'Loading...',
    'areYouSureDelete': 'Are you sure you want to delete this event?',
    'areYouSurePast': 'Some dates have already passed, are you sure?',
    'cancel': 'Cancel',
    'close': 'Close',
    'confirm': 'Confirm',
    'onboardingTitle': 'Let\'s Begin Our Journey!',
    'profileTitle': 'Profile Settings',
    'onboardingSubTitle': 'Just a few short questions',
    'onboardingSubmit': 'OK, Done',
    'whenBorn': 'When were you born?',
    'lastPeriod': 'Last period date:',
    'regularPeriod': 'Do you have a regular menstrual cycle?',
    'periodCyclePrefix': 'I usually get my period once in',
    'periodCycleSuffix': 'days.',
    'selectDay': 'Click to pick a date from calendar',
    'medicationReminder': 'Medication reminder',
    'checkupReminder': 'Checkup reminder',
    'reminderAt': 'at',
    'acceptTermsPrefix': 'I\'ve read and accept the',
    'acceptTermsLink': 'Terms and Conditions',
    'syncEventsTitle': 'You\'ve Changed Your Period Date',
    'syncEventsSubTitle': 'Select the events you wish to sync with the new date*',
    'syncEventsNote': '*Unselected events will remain at original date',
    'sync': 'Synchronize',
    'dontSync': 'Do not synchronize',
    'selectAllEvents': 'Select all events',
    'eventsCountSuffix': 'events',
    'today': 'Today',
    'cycleDay': 'Cycle day ',
    'insertBloodTest': 'Please insert blood test variables',
    'insertUltrasound': 'Please insert the number of follicles for each size',
    'chooseTestUnits': 'Choose test units',
    'testUnits': 'Test units',
    'rightOvary': 'Right Ovary',
    'leftOvary': 'Left Ovary',
    'folliclesSize': 'Follicles size',
    'folliclesNumber': 'Number of follicles',
    'endoThickness': 'Endometrium Thickness (mm)',
    'pleaseUpdatePeriod': 'Please update period!',
    'calendarTitlesPeriod': 'period',
    'calendarTitlesOvulationEst': 'est ovu',
    'currentPeriod': 'Current period',
    'prevPeriod': 'Previous period',
    'nextPeriod': 'Next period',
    'noResults': 'Currently no results to display.',
    'followUpTitle': 'Period follow up',
    'cycleDays': 'Cycle days',
    'ultrasoundResults': 'Ultrasound Results',
    'firstDayOfPeriod': 'First day of period',
    'noTasks': 'No tasks scheduled for today',
    'sunday': 'Sunday',
    'monday': 'Monday',
    'myWeekStartOn': 'My week starts on',
    'logout': 'Logout',
    'deleteAllData': 'Delete all stored data',
    'areYouSureDeleteAllData': 'Are you sure you want to delete all stored data? It could not be recovered.',
    'openSourceRef': 'Open source licenses used by Emma',
    'openSourceTitle': 'Below is a list of open source licenses by package, used by Emma.',
    'setFor': 'Set for',
    'selectMonth': 'Select month',
    'selectYear': 'Select year',
    'appVersion': 'App Version',

    'months': {
        '1': 'January',
        '2': 'February',
        '3': 'March',
        '4': 'April',
        '5': 'May',
        '6': 'June',
        '7': 'July',
        '8': 'August',
        '9': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
    }
};

i18n.fallbacks = true;
i18n.translations = {en};
i18n.locale = Localization.locale;

export default (key, options) => i18n.translate(key, options);
