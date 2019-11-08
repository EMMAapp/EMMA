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

    'ovulationCalendar': 'Ovulation Calender',
    'timeOfEvent': 'Time of event',
    'reminder': 'Reminder',
    'drugOrSupplement': 'Drug/Supplement',
    'dailyDose': 'Daily dose (iu/pills)',
    'timesPerDay': 'Times a day',
    'selectDaysOfMedicine': 'Select the days of medicine administration',
    'note': 'Note',
    'imDone': 'I\'m Done',
    'addAnotherMedication': 'Add Another Medication',
    'clearEvent': 'Clear Event',
    'autocompletePlaceholder': 'Start typing or choose from list',
    'pickTime': 'Pick time of day',

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
