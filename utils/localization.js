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
    },

};

i18n.fallbacks = true;
i18n.translations = { en };
i18n.locale = Localization.locale;

export default (key, options) => i18n.translate(key, options);
