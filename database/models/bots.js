const { Schema, model } = require('mongoose');

const botsData = Schema({
    // Bot base
    ownerID: { type: String, default: null },
    ownerTag: { type: String, default: null },
    additionalOwners: { type: Array, default: null },
    botID: { type: String, default: null },
    botName: { type: String, default: null },
    botDiscriminator: { type: String, default: null },
    botAvatar: { type: String, default: null },
    library: { type: String, default: null },
    // Bot data for public page
    background: { type: String, default: null },
    customPic: { type: String, default: null },
    shortDesc: { type: String, default: null },
    longDesc: { type: String, default: null },
    prefix: { type: String, default: null },
    tags: { type: Array, default: null },
    mainLanguage: { type: String, default: null },
    subLanguages: { type: Array, default: null },
    inviteURL: { type: String, default: null },
    supportURL: { type: String, default: null },
    socials: {
        twitter: { type: String, default: null },
        reddit: { type: String, default: null },
        telegram: { type: String, default: null },
        tiktok: { type: String, default: null },
        instagram: { type: String, default: null },
        facebook: { type: String, default: null },
        youtube: { type: String, default: null },
    },
    website: { type: String, default: null },
    github: { type: String, default: null },
    donationLink: { type: String, default: null },
    // FindBots data for bot
    status: { type: String, default: 'waiting for verification' },
    isPremium: { type: Boolean, default: false },
    joinDate: { type: Date, default: null },
    certificate: { type: Boolean, default: false },
    upvotes: { type: Number, default: 0 },
    token: { type: String, default: null },
    serverCount: { type: Number, default: null },
    shardCount: { type: Number, default: null },
    // Dashboard data for bot
    views: { type: Number, default: null },
    invites: { type: Number, default: null },
    referLink: { type: Array, default: null },
    countryVisit: {
        // Afghanistan	
        AF: { type: Number, default: 0 },
        // Albania	
        AL: { type: Number, default: 0 },
        // Algeria	
        DZ: { type: Number, default: 0 },
        // American Samoa	
        AS: { type: Number, default: 0 },
        // Andorra	
        AD: { type: Number, default: 0 },
        // Angola	
        AO: { type: Number, default: 0 },
        // Anguilla	
        AI: { type: Number, default: 0 },
        // Antarctica	
        AQ: { type: Number, default: 0 },
        // Antigua and Barbuda	
        AG: { type: Number, default: 0 },
        // Argentina	
        AR: { type: Number, default: 0 },
        // Armenia	
        AM: { type: Number, default: 0 },
        // Aruba	
        AW: { type: Number, default: 0 },
        // Australia	
        AU: { type: Number, default: 0 },
        // Austria	
        AT: { type: Number, default: 0 },
        // Azerbaijan	
        AZ: { type: Number, default: 0 },
        // Bahamas (the)	
        BS: { type: Number, default: 0 },
        // Bahrain	
        BH: { type: Number, default: 0 },
        // Bangladesh	
        BD: { type: Number, default: 0 },
        // Barbados	
        BB: { type: Number, default: 0 },
        // Belarus	
        BY: { type: Number, default: 0 },
        // Belgium	
        BE: { type: Number, default: 0 },
        // Belize	
        BZ: { type: Number, default: 0 },
        // Benin	
        BJ: { type: Number, default: 0 },
        // Bermuda	
        BM: { type: Number, default: 0 },
        // Bhutan	
        BT: { type: Number, default: 0 },
        // Bolivia (Plurinational State of)	
        BO: { type: Number, default: 0 },
        // Bonaire, Sint Eustatius and Saba	
        BQ: { type: Number, default: 0 },
        // Bosnia and Herzegovina	
        BA: { type: Number, default: 0 },
        // Botswana	
        BW: { type: Number, default: 0 },
        // Bouvet Island	
        BV: { type: Number, default: 0 },
        // Brazil	
        BR: { type: Number, default: 0 },
        // British Indian Ocean Territory (the)	
        IO: { type: Number, default: 0 },
        // Brunei Darussalam	
        BN: { type: Number, default: 0 },
        // Bulgaria	
        BG: { type: Number, default: 0 },
        // Burkina Faso	
        BF: { type: Number, default: 0 },
        // Burundi	
        BI: { type: Number, default: 0 },
        // Cabo Verde	
        CV: { type: Number, default: 0 },
        // Cambodia	
        KH: { type: Number, default: 0 },
        // Cameroon	
        CM: { type: Number, default: 0 },
        // Canada	
        CA: { type: Number, default: 0 },
        // Cayman Islands (the)	
        KY: { type: Number, default: 0 },
        // Central African Republic (the)	
        CF: { type: Number, default: 0 },
        // Chad	
        TD: { type: Number, default: 0 },
        // Chile	
        CL: { type: Number, default: 0 },
        // China	
        CN: { type: Number, default: 0 },
        // Christmas Island	
        CX: { type: Number, default: 0 },
        // Cocos (Keeling) Islands (the)	
        CC: { type: Number, default: 0 },
        // Colombia	
        CO: { type: Number, default: 0 },
        // Comoros (the)	
        KM: { type: Number, default: 0 },
        // Congo (the Democratic Republic of the)	
        CD: { type: Number, default: 0 },
        // Congo (the)	
        CG: { type: Number, default: 0 },
        // Cook Islands (the)	
        CK: { type: Number, default: 0 },
        // Costa Rica	
        CR: { type: Number, default: 0 },
        // Croatia	
        HR: { type: Number, default: 0 },
        // Cuba	
        CU: { type: Number, default: 0 },
        // Curaçao	
        CW: { type: Number, default: 0 },
        // Cyprus	
        CY: { type: Number, default: 0 },
        // Czechia	
        CZ: { type: Number, default: 0 },
        // Côte d'Ivoire	
        CI: { type: Number, default: 0 },
        // Denmark	
        DK: { type: Number, default: 0 },
        // Djibouti	
        DJ: { type: Number, default: 0 },
        // Dominica	
        DM: { type: Number, default: 0 },
        // Dominican Republic (the)	
        DO: { type: Number, default: 0 },
        // Ecuador	
        EC: { type: Number, default: 0 },
        // Egypt	
        EG: { type: Number, default: 0 },
        // El Salvador	
        SV: { type: Number, default: 0 },
        // Equatorial Guinea	
        GQ: { type: Number, default: 0 },
        // Eritrea	
        ER: { type: Number, default: 0 },
        // Estonia	
        EE: { type: Number, default: 0 },
        // Eswatini	
        SZ: { type: Number, default: 0 },
        // Ethiopia	
        ET: { type: Number, default: 0 },
        // Falkland Islands (the) [Malvinas]	
        FK: { type: Number, default: 0 },
        // Faroe Islands (the)	
        FO: { type: Number, default: 0 },
        // Fiji	
        FJ: { type: Number, default: 0 },
        // Finland	
        FI: { type: Number, default: 0 },
        // France	
        FR: { type: Number, default: 0 },
        // French Guiana	
        GF: { type: Number, default: 0 },
        // French Polynesia	
        PF: { type: Number, default: 0 },
        // French Southern Territories (the)	
        TF: { type: Number, default: 0 },
        // Gabon	
        GA: { type: Number, default: 0 },
        // Gambia (the)	
        GM: { type: Number, default: 0 },
        // Georgia	
        GE: { type: Number, default: 0 },
        // Germany	
        DE: { type: Number, default: 0 },
        // Ghana	
        GH: { type: Number, default: 0 },
        // Gibraltar	
        GI: { type: Number, default: 0 },
        // Greece	
        GR: { type: Number, default: 0 },
        // Greenland	
        GL: { type: Number, default: 0 },
        // Grenada	
        GD: { type: Number, default: 0 },
        // Guadeloupe	
        GP: { type: Number, default: 0 },
        // Guam	
        GU: { type: Number, default: 0 },
        // Guatemala	
        GT: { type: Number, default: 0 },
        // Guernsey	
        GG: { type: Number, default: 0 },
        // Guinea	
        GN: { type: Number, default: 0 },
        // Guinea-Bissau	
        GW: { type: Number, default: 0 },
        // Guyana	
        GY: { type: Number, default: 0 },
        // Haiti	
        HT: { type: Number, default: 0 },
        // Heard Island and McDonald Islands	
        HM: { type: Number, default: 0 },
        // Holy See (the)	
        VA: { type: Number, default: 0 },
        // Honduras	
        HN: { type: Number, default: 0 },
        // Hong Kong	
        HK: { type: Number, default: 0 },
        // Hungary	
        HU: { type: Number, default: 0 },
        // Iceland	
        IS: { type: Number, default: 0 },
        // India	
        IN: { type: Number, default: 0 },
        // Indonesia	
        ID: { type: Number, default: 0 },
        // Iran (Islamic Republic of)	
        IR: { type: Number, default: 0 },
        // Iraq	
        IQ: { type: Number, default: 0 },
        // Ireland	
        IE: { type: Number, default: 0 },
        // Isle of Man	
        IM: { type: Number, default: 0 },
        // Israel	
        IL: { type: Number, default: 0 },
        // Italy	
        IT: { type: Number, default: 0 },
        // Jamaica	
        JM: { type: Number, default: 0 },
        // Japan	
        JP: { type: Number, default: 0 },
        // Jersey	
        JE: { type: Number, default: 0 },
        // Jordan	
        JO: { type: Number, default: 0 },
        // Kazakhstan	
        KZ: { type: Number, default: 0 },
        // Kenya	
        KE: { type: Number, default: 0 },
        // Kiribati	
        KI: { type: Number, default: 0 },
        // Korea (the Democratic People's Republic of)	
        KP: { type: Number, default: 0 },
        // Korea (the Republic of)	
        KR: { type: Number, default: 0 },
        // Kuwait	
        KW: { type: Number, default: 0 },
        // Kyrgyzstan	
        KG: { type: Number, default: 0 },
        // Lao People's Democratic Republic (the)	
        LA: { type: Number, default: 0 },
        // Latvia	
        LV: { type: Number, default: 0 },
        // Lebanon	
        LB: { type: Number, default: 0 },
        // Lesotho	
        LS: { type: Number, default: 0 },
        // Liberia	
        LR: { type: Number, default: 0 },
        // Libya	
        LY: { type: Number, default: 0 },
        // Liechtenstein	
        LI: { type: Number, default: 0 },
        // Lithuania	
        LT: { type: Number, default: 0 },
        // Luxembourg	
        LU: { type: Number, default: 0 },
        // Macao	
        MO: { type: Number, default: 0 },
        // adagascar	
        MG: { type: Number, default: 0 },
        // Malawi	
        MW: { type: Number, default: 0 },
        // Malaysia	
        MY: { type: Number, default: 0 },
        // Maldives	
        MV: { type: Number, default: 0 },
        // Mali	
        ML: { type: Number, default: 0 },
        // Malta	
        MT: { type: Number, default: 0 },
        // Marshall Islands (the)	
        MH: { type: Number, default: 0 },
        // Martinique	
        MQ: { type: Number, default: 0 },
        // Mauritania	
        MR: { type: Number, default: 0 },
        // Mauritius	
        MU: { type: Number, default: 0 },
        // Mayotte	
        YT: { type: Number, default: 0 },
        // Mexico	
        MX: { type: Number, default: 0 },
        // Micronesia (Federated States of)	
        FM: { type: Number, default: 0 },
        // Moldova (the Republic of)	
        MD: { type: Number, default: 0 },
        // Monaco	
        MC: { type: Number, default: 0 },
        // Mongolia	
        MN: { type: Number, default: 0 },
        // Montenegro	
        ME: { type: Number, default: 0 },
        // Montserrat	
        MS: { type: Number, default: 0 },
        // Morocco	
        MA: { type: Number, default: 0 },
        // Mozambique	
        MZ: { type: Number, default: 0 },
        // Myanmar	
        MM: { type: Number, default: 0 },
        // Namibia	
        NA: { type: Number, default: 0 },
        // Nauru	
        NR: { type: Number, default: 0 },
        // Nepal	
        NP: { type: Number, default: 0 },
        // Netherlands (the)	
        NL: { type: Number, default: 0 },
        // New Caledonia	
        NC: { type: Number, default: 0 },
        // New Zealand	
        NZ: { type: Number, default: 0 },
        // Nicaragua	
        NI: { type: Number, default: 0 },
        // Niger (the)	
        NE: { type: Number, default: 0 },
        // Nigeria	
        NG: { type: Number, default: 0 },
        // Niue	
        NU: { type: Number, default: 0 },
        // Norfolk Island	
        NF: { type: Number, default: 0 },
        // Northern Mariana Islands (the)	
        MP: { type: Number, default: 0 },
        // Norway	
        NO: { type: Number, default: 0 },
        // Oman	
        OM: { type: Number, default: 0 },
        // Pakistan	
        PK: { type: Number, default: 0 },
        // Palau	
        PW: { type: Number, default: 0 },
        // Palestine, State of	
        PS: { type: Number, default: 0 },
        // Panama	
        PA: { type: Number, default: 0 },
        // Papua New Guinea	
        PG: { type: Number, default: 0 },
        // Paraguay	
        PY: { type: Number, default: 0 },
        // Peru	
        PE: { type: Number, default: 0 },
        // Philippines (the)	
        PH: { type: Number, default: 0 },
        // Pitcairn	
        PN: { type: Number, default: 0 },
        // Poland	
        PL: { type: Number, default: 0 },
        // Portugal	
        PT: { type: Number, default: 0 },
        // Puerto Rico	
        PR: { type: Number, default: 0 },
        // Qatar	
        QA: { type: Number, default: 0 },
        // Republic of North Macedonia	
        MK: { type: Number, default: 0 },
        // Romania	
        RO: { type: Number, default: 0 },
        // Russian Federation (the)	
        RU: { type: Number, default: 0 },
        // Rwanda	
        RW: { type: Number, default: 0 },
        // Réunion	
        RE: { type: Number, default: 0 },
        // Saint Barthélemy	
        BL: { type: Number, default: 0 },
        // Saint Helena, Ascension and Tristan da Cunha	
        SH: { type: Number, default: 0 },
        // Saint Kitts and Nevis	
        KN: { type: Number, default: 0 },
        // Saint Lucia	
        LC: { type: Number, default: 0 },
        // Saint Martin (French part)	
        MF: { type: Number, default: 0 },
        // Saint Pierre and Miquelon	
        PM: { type: Number, default: 0 },
        // Saint Vincent and the Grenadines	
        VC: { type: Number, default: 0 },
        // Samoa	
        WS: { type: Number, default: 0 },
        // San Marino	
        SM: { type: Number, default: 0 },
        // Sao Tome and Principe	
        ST: { type: Number, default: 0 },
        // Saudi Arabia	
        SA: { type: Number, default: 0 },
        // Senegal	
        SN: { type: Number, default: 0 },
        // Serbia	
        RS: { type: Number, default: 0 },
        // Seychelles	
        SC: { type: Number, default: 0 },
        // Sierra Leone	
        SL: { type: Number, default: 0 },
        // Singapore	
        SG: { type: Number, default: 0 },
        // Sint Maarten (Dutch part)	
        SX: { type: Number, default: 0 },
        // Slovakia	
        SK: { type: Number, default: 0 },
        // Slovenia	
        SI: { type: Number, default: 0 },
        // Solomon Islands	
        SB: { type: Number, default: 0 },
        // Somalia	
        SO: { type: Number, default: 0 },
        // South Africa	
        ZA: { type: Number, default: 0 },
        // South Georgia and the South Sandwich Islands	
        GS: { type: Number, default: 0 },
        // South Sudan	
        SS: { type: Number, default: 0 },
        // Spain	
        ES: { type: Number, default: 0 },
        // Sri Lanka	
        LK: { type: Number, default: 0 },
        // Sudan (the)	
        SD: { type: Number, default: 0 },
        // Suriname	
        SR: { type: Number, default: 0 },
        // Svalbard and Jan Mayen	
        SJ: { type: Number, default: 0 },
        // Sweden	
        SE: { type: Number, default: 0 },
        // Switzerland	
        CH: { type: Number, default: 0 },
        // Syrian Arab Republic	
        SY: { type: Number, default: 0 },
        // Taiwan (Province of China)	
        TW: { type: Number, default: 0 },
        // Tajikistan	
        TJ: { type: Number, default: 0 },
        // Tanzania, United Republic of	
        TZ: { type: Number, default: 0 },
        // Thailand	
        TH: { type: Number, default: 0 },
        // Timor-Leste	
        TL: { type: Number, default: 0 },
        // Togo	
        TG: { type: Number, default: 0 },
        // Tokelau	
        TK: { type: Number, default: 0 },
        // Tonga	
        TO: { type: Number, default: 0 },
        // Trinidad and Tobago	
        TT: { type: Number, default: 0 },
        // Tunisia	
        TN: { type: Number, default: 0 },
        // Turkey	
        TR: { type: Number, default: 0 },
        // Turkmenistan	
        TM: { type: Number, default: 0 },
        // Turks and Caicos Islands (the)	
        TC: { type: Number, default: 0 },
        // Tuvalu	
        TV: { type: Number, default: 0 },
        // Uganda	
        UG: { type: Number, default: 0 },
        // Ukraine	
        UA: { type: Number, default: 0 },
        // United Arab Emirates (the)	
        AE: { type: Number, default: 0 },
        // United Kingdom of Great Britain and Northern Ireland (the)	
        GB: { type: Number, default: 0 },
        // United States Minor Outlying Islands (the)	
        UM: { type: Number, default: 0 },
        // United States of America (the)	
        US: { type: Number, default: 0 },
        // Uruguay	
        UY: { type: Number, default: 0 },
        // Uzbekistan	
        UZ: { type: Number, default: 0 },
        // Vanuatu	
        VU: { type: Number, default: 0 },
        // Venezuela (Bolivarian Republic of)	
        VE: { type: Number, default: 0 },
        // Viet Nam	
        VN: { type: Number, default: 0 },
        // Virgin Islands (British)	
        VG: { type: Number, default: 0 },
        // Virgin Islands (U.S.)	
        VI: { type: Number, default: 0 },
        // Wallis and Futuna	
        WF: { type: Number, default: 0 },
        // Western Sahara	
        EH: { type: Number, default: 0 },
        // Yemen	
        YE: { type: Number, default: 0 },
        // Zambia	
        ZM: { type: Number, default: 0 },
        // Zimbabwe	
        ZW: { type: Number, default: 0 },
        // Åland Islands	
        AX: { type: Number, default: 0 },
    }
});

module.exports = model('bots', botsData);
