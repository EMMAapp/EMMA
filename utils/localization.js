import {I18nManager} from 'react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {logInfo} from "./log";
import en from './strings/en.js'
import he from './strings/he.js'
import moment from "moment";
import 'moment/locale/he';
import {LocaleConfig} from 'react-native-calendars';
import _ from "lodash";

i18n.fallbacks = true;
i18n.translations = {en, he};
i18n.locale = Localization.locale;
export const isRTL = i18n.locale.indexOf('he') === 0 || i18n.locale.indexOf('ar') === 0;

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

logInfo(`Locale: ${i18n.locale}, RTL: ${Localization.isRTL}`);

export default (key, options) => i18n.translate(key, options);
