import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const en = {
    'error': {
        'generic': 'Something went wrong',
        'mail-in-use': 'Email is invalid or already in use',
        'weak-password': 'Password is too weak',
        'login-generic': 'Email or password are incorrect',
    },

    'auth': {
        'email-placeholder': 'Email',
        'password-placeholder': 'Password',
        'dont-have-an-account': 'Don\'t have an account?',
        'already-have-an-account': 'Already have an account?',
        'signup': 'Sign Up',
        'signin': 'Login',
        'signout': 'Logout',
    },

    'tabs': {
        'calendar': 'Calendar',
        'profile': 'Profile',
        'adding': 'Add',
    },

    'treatmentPlan': 'Treatment Plan',
    'addTreatmentPlan': 'Add Your Treatment Plan',
    'editPeriod': 'Period/Plan',
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
    'reminder': 'Reminder',
    'dailyDose': 'Daily dose (iu/pills)',
    'timesPerDay': 'Times a day',
    'selectDaysOfMedicine': 'Select the days of medicine administration',
    'selectDaysOfCheckup': 'Select the days of scheduled process',
    'note': 'Note',
    'imDone': 'I\'m Done',
    'addAnotherMedication': 'Add Another Medication',
    'addAnotherCheckup': 'Add Another Checkup',
    'clearEvent': 'Clear Event',
    'deleteEvent': 'Delete Event',
    'autocompletePlaceholder': 'Start typing or choose from list',
    'pickTime': 'Pick time of day',
    'loading': 'Loading...',
    'areYouSureDelete': 'Are you sure you want to remove this event?',
    'areYouSurePast': 'Some dates have already passed, are you sure?',
    'cancel': 'Cancel',
    'close': 'Close',
    'onboardingTitle': 'Let\'s Begin Our Journey!',
    'onboardingSubTitle': 'Just a few short questions',
    'onboardingSubmit': 'OK, Done',
    'yourPlan': 'The current cycle plan:',
    'howOldAreYou': 'How old are you?',
    'lastPeriod': 'Last period date:',
    'regularPeriod': 'Do you have a regular menstrual cycle?',
    'periodCyclePrefix': 'I usually get my period once in',
    'periodCycleSuffix': 'days.',
    'selectDay': 'Click to pick a date from calendar',
    'medicationReminder': 'Medication reminder',
    'checkupReminder': 'Checkup reminder',
    'reminderAt': 'at',
    'acceptTermsPrefix': 'I agree to the',
    'acceptTermsLink': 'Terms and Conditions',
    'syncEventsTitle': 'You\'ve Changed Your Period Date',
    'syncEventsSubTitle': 'Select the events you wish to sync with the new date*',
    'syncEventsNote': '*Unselected events will remain at original date',
    'sync': 'Synchronize',
    'selectAllEvents': 'Select all events',
    'eventsCountSuffix': 'events',

    'calendarTitles': {
        'period': 'period',
        'ovulationEst': 'est ovu'
    },

    'plan': {
        'ICI_title': 'ICI',
        'IUI_title': 'IUI',
        'IVF_title': 'IVF',
        'Intercourse_title': 'Intercourse',
        'MedicalExploration_title': 'Medical Exploration',
        'ICI': 'Intra Cervical Insemination',
        'IUI': 'Intra Uterine Insemination',
        'IVF': 'In Vitro Fertilization',
        'Intercourse': '',
        'MedicalExploration': ''
    },

    'diagnosis': {
        'cos': "COS (Anovulatory)",
        'diminished-reserve': "Diminished reserve",
        'unexplained': "Unexplained",
        'endometriosis': "Endometriosis",
        'tubal-factor': "Tubal factor",
        'male-low-count': "Male - low count",
        'male-low-motility': "Male - low motility",
        'male-morphology': "Male - morphology",
        'uterine': "Uterine",
        'pgd': "PGD",
        'rec-pregnancy-loss': "Recurrent pregnancy loss",
        'fertility-preservation': "Fertility preservation",
        'other': "Other"
    }
};

i18n.fallbacks = true;
i18n.translations = {en};
i18n.locale = Localization.locale;

export default (key, options) => i18n.translate(key, options);
