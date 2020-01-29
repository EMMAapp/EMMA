import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const en = {
    'error': {
        'generic': 'Something went wrong',
        'mail-in-use': 'Email is invalid or already in use',
        'weak-password': 'Password is too weak',
        'login-generic': 'Email or password are incorrect',
    },

    'tabs': {
        'calendar': 'Calendar',
        'profile': 'Profile',
        'adding': 'Add',
    },

    'connectFacebook': 'Connect with Facebook',
    'connectGoogle': 'Connect with Google',
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
    'areYouSureDelete': 'Are you sure you want to delete this event?',
    'areYouSurePast': 'Some dates have already passed, are you sure?',
    'cancel': 'Cancel',
    'close': 'Close',
    'confirm': 'Confirm',
    'onboardingTitle': 'Let\'s Begin Our Journey!',
    'onboardingSubTitle': 'Just a few short questions',
    'onboardingSubmit': 'OK, Done',
    'yourPlan': 'The current cycle plan:',
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
    'selectAllEvents': 'Select all events',
    'eventsCountSuffix': 'events',
    'today': 'Today',
    'cycleDay': 'Cycle day ',
    'insertBloodTest': 'Please insert blood test variables',
    'insertUltrasound': 'Please insert the number of follicels for each size',
    'chooseTestUnits': 'Choose test units',
    'testUnits': 'Test units',
    'rightOvary': 'Right Ovary',
    'leftOvary': 'Left Ovary',
    'follicelsSize': 'Follicels size',
    'follicelsNumber': 'Number of follicels',
    'endoThickness': 'Endometrium Thickness (mm)',

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
