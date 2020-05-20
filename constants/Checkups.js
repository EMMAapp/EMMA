import localization from "../utils/localization";
import _ from "lodash";

const checkups = [
    {
        key: 'ultrasound',
        aliases: [
            'ultrasound', 'follicles', '2d', '3d',
            'אולטראסאונד', 'זקיקים', 'דו מימד', 'תלת מימד'
        ]
    },
    {
        key: 'bloodTest',
        aliases: [
            'blood test', 'lh', 'progesterone', 'estradiol',
            'בדיקת דם', 'פרוגסטרון', 'אסטרדיול'
        ]
    },
    {
        key: 'zift',
        aliases: [
            'zift', 'zygote intrafallopian transfer',
            'זיפט'
        ]
    },
    {
        key: 'embryoTransfer',
        aliases: [
            'embryo transfer', 'et',
            'הפריה חוץ גופית', 'החזרת עוברים'
        ]
    },
    {
        key: 'oocytesRetrieval',
        aliases: [
            'oocytes retrieval', 'ivf', 'in vitro fertilisation',
            'הפריה חוץ גופית', 'שאיבת ביציות'
        ]
    },
    {
        key: 'ici',
        aliases: [
            'ici', 'intracervical insemination', 'artificial insemination',
            'הפריה מלאכותית'
        ]
    },
    {
        key: 'iui',
        aliases: [
            'iui', 'intrauterine insemination',
            'הזרעה תוך רחמית', 'הפריה תוך רחמית'
        ]
    },
    {
        key: 'fertilityCheck',
        aliases: [
            'fertility check up',
            'בדיקת פוריות'
        ]
    },
    {
        key: 'geneticTest',
        aliases: [
            'genetic testing', 'dna',
            'בדיקה גנטית'
        ]
    },
    {
        key: 'pipelleTest',
        aliases: [
            'pipelle test', 'endometrial biopsy',
            'בדיקת פיפל'
        ]
    },
    {
        key: 'receptivaTest',
        aliases: [
            'receptiva test', 'dx'
        ]
    },
    {
        key: 'surgicalHysteroscopy',
        aliases: [
            'surgical hysteroscopy',
            'היסטרוסקופיה ניתוחית', 'היסטרוסקופיה כירורגית'
        ]
    },
    {
        key: 'diagnosticHysteroscopy',
        aliases: [
            'diagnostic hysteroscopy',
            'היסטרוסקופיה אבחנתית'
        ]
    },
    {
        key: 'eraTest',
        aliases: [
            'era test', 'endometrial receptivity test',
            'בדיקת חלון ההשתרשות'
        ]
    },
    {
        key: 'aliceTest',
        aliases: [
            'alice test', 'analysis of infectious chronic endometritis'
        ]
    },
    {
        key: 'emmaTest',
        aliases: [
            'emma test', 'environmental mold and mycotoxin assessment'
        ]
    },
    {
        key: 'hydrosonography',
        aliases: [
            'hydrosonography', '3d sono hcg',
            'הידרוסונוגרפיה', 'הדמיות'
        ]
    },
    {
        key: 'hsg',
        aliases: [
            'hsg', 'hysterosonography',
            'צילום רחם'
        ]
    },
    {
        key: 'obgyn',
        aliases: [
            'obgyn', 'appointment',
            'גינקולוגית', 'גניקולוגית'
        ]
    },
    {
        key: 'reproductiveEndocrinologis',
        aliases: [
            'reproductive endocrinologist', 'appointment',
            'אנדוקרינולוגית'
        ]
    },
    {
        key: 'cervicalMucus',
        aliases: [
            'cervical mucus',
            'ריר צוואר הרחם'
        ]
    },
    {
        key: 'ovulationStick',
        aliases: [
            'ovulation stick',
            'בדיקת ביוץ'
        ]
    },
    {
        key: 'pregnancyCheck',
        aliases: [
            'pregnancy stick', 'pregnancy check',
            'בדיקת הריון'
        ]
    },
];

const nameToKeyMap = _.memoize(() => _.keyBy(checkups.map(checkup => checkup.key), key => localization(`checkups.${key}`)));
const keyToNameMap = _.memoize(() => _.invert(nameToKeyMap()));

export const checkupsService = {
    getKeyByName: (name) => _.get(nameToKeyMap(), name, name),
    getNameByKey: (key) => _.get(keyToNameMap(), key, key),
    items: _.sortBy(checkups.map(checkup => ({name: keyToNameMap()[checkup.key], aliases: checkup.aliases})), item => item.name)
};
