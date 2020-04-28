import _ from "lodash";

export const getLocaleOrDefault = (locale) => {
    if (locales[locale]) {
        return locale;
    }
    return "en";
};

const locales = {
    'en': 'English',
    'he': 'עברית',

};

export const localesForAutocomplete = _.keys(locales).map(
    locale => ({name: locales[locale], aliases: [locales[locale]]})
);

export default locales
