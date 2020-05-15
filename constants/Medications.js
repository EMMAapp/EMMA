import _ from "lodash";

const MEDICATIONS = [
    "Acupuncture",
    "Antagon",
    "Aspirin",
    "Betamethasone",
    "Bravelle",
    "Cetrotide",
    "Climara",
    "Climaval",
    "Clomid",
    "Crinone",
    "Cyclogest",
    "DHEA",
    "Decapeptyl",
    "Desogen",
    "Dostinex",
    "Doxycycline Caps",
    "Enantone",
    "Endometrin",
    "Estrace",
    "Estraderm",
    "Estradot",
    "Factrel",
    "Fertinex",
    "Follistim",
    "Fostimon",
    "Gonal-F",
    "Humegon",
    "Ikaclomin",
    "Letrozole",
    "Lupron",
    "Lutrepulse",
    "Marvellon",
    "Menopur 1200IU",
    "Menopur 600IU",
    "Merionale",
    "Metformin",
    "Methylprednisolone",
    "Metrodin",
    "Naferelin Acetate Spray",
    "Novarel",
    "Orgalutran",
    "Ovidrel",
    "Parlodel",
    "Pergonal",
    "Pregnyl",
    "Procrin",
    "Profasi",
    "Prometrium",
    "Psychoogical Therapy",
    "Puregon",
    "Repronex",
    "Serophene",
    "Steroids",
    "Synarel",
    "Utrogestan",
    "Vivelle",
    "Zoladex"
];

const MEDICATIONS_WITH_ALIASES = MEDICATIONS.map(medication => {
    let aliases = [medication.toLowerCase()];
    switch (medication) {
        case "DHEA":
            aliases.push("Dehydroepiandrosterone");
            break;
        case "Letrozole":
            aliases.push("Femara");
            break;
    }
    return {
        name: medication,
        aliases
    }
});

export default _.sortBy(MEDICATIONS_WITH_ALIASES, item => item.name)
