import localization from "../utils/localization";

export default [
    'cos',
    'diminished-reserve',
    'unexplained',
    'endometriosis',
    'tubal-factor',
    'male-low-count',
    'male-low-motility',
    'male-morphology',
    'uterine',
    'pgd',
    'rec-pregnancy-loss',
    'fertility-preservation',
    'other'
]

export function diagnosisTitle(diagnosis) {
    return localization(`diagnosis.${diagnosis}`);
}
