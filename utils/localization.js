import {I18nManager} from 'react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {logInfo} from "./log";
import en from './translations/en.js'
import he from './translations/he.js'
import moment from "moment";
import 'moment/locale/he';
import {LocaleConfig} from 'react-native-calendars';
import _ from "lodash";
import {getItem, setItem} from "./storage";
import {Updates} from "expo";
import {getLocaleOrDefault} from "./locales";

export let isRTL = false;
i18n.fallbacks = true;
i18n.translations = {en, he};

const applyLocale = (locale) => {
    i18n.locale = getLocaleOrDefault(locale);
    isRTL = i18n.locale.indexOf('he') === 0 || i18n.locale.indexOf('ar') === 0;
    moment.locale(i18n.locale);
    I18nManager.forceRTL(isRTL);

    if (i18n.locale === 'he') {

        LocaleConfig.locales['he'] = {
            monthNames: _.values(he["months"]),
            monthNamesShort: _.values(he["months"]),
            dayNames: he["days"],
            dayNamesShort: he["days"],
            today: he["today"]
        };
        LocaleConfig.defaultLocale = i18n.locale;
    }
};

export const initializeLocalization = async () => {
    let locale = await getItem("locale");
    if (!locale) {
        locale = Localization.locale;
    }
    applyLocale(locale);
    logInfo(`Locale: ${i18n.locale}, RTL: ${isRTL}`);
};

export const changeLanguage = async (locale) => {
    await setItem("locale", locale);
    applyLocale(locale);
    await Updates.reload();
};

export default (key, options) => i18n.translate(key, options);
