export interface CountryCode {
  name: string;
  telCode: string;
  dualCode: string; // ISO 3166-1 alpha-2
  tripleCode: string; // ISO 3166-1 alpha-3
  numericCode?: string; // TODO: Numeric Country Code
}

export const countryCodes: CountryCode[] = [
  {
    name: 'Afghanistan',
    telCode: '+93',
    dualCode: 'AF',
    tripleCode: 'AFG',
  },
  {
    name: 'Aland Islands',
    telCode: '+358',
    dualCode: 'AX',
    tripleCode: 'ALA',
  },
  {
    name: 'Albania',
    telCode: '+355',
    dualCode: 'AL',
    tripleCode: 'ALB',
  },
  {
    name: 'Algeria',
    telCode: '+213',
    dualCode: 'DZ',
    tripleCode: 'DZA',
  },
  {
    name: 'American Samoa',
    telCode: '+1684',
    dualCode: 'AS',
    tripleCode: 'ASM',
  },
  {
    name: 'Andorra',
    telCode: '+376',
    dualCode: 'AD',
    tripleCode: 'AND',
  },
  {
    name: 'Angola',
    telCode: '+244',
    dualCode: 'AO',
    tripleCode: 'AGO',
  },
  {
    name: 'Anguilla',
    telCode: '+1264',
    dualCode: 'AI',
    tripleCode: 'AIA',
  },
  {
    name: 'Antarctica',
    telCode: '+672',
    dualCode: 'AQ',
    tripleCode: 'ATA',
  },
  {
    name: 'Antigua and Barbuda',
    telCode: '+1268',
    dualCode: 'AG',
    tripleCode: 'ATG',
  },
  {
    name: 'Argentina',
    telCode: '+54',
    dualCode: 'AR',
    tripleCode: 'ARG',
  },
  {
    name: 'Armenia',
    telCode: '+374',
    dualCode: 'AM',
    tripleCode: 'ARM',
  },
  {
    name: 'Aruba',
    telCode: '+297',
    dualCode: 'AW',
    tripleCode: 'ABW',
  },
  {
    name: 'Australia',
    telCode: '+61',
    dualCode: 'AU',
    tripleCode: 'AUS',
  },
  {
    name: 'Austria',
    telCode: '+43',
    dualCode: 'AT',
    tripleCode: 'AUT',
  },
  {
    name: 'Azerbaijan',
    telCode: '+994',
    dualCode: 'AZ',
    tripleCode: 'AZE',
  },
  {
    name: 'Bahamas',
    telCode: '+1242',
    dualCode: 'BS',
    tripleCode: 'BHS',
  },
  {
    name: 'Bahrain',
    telCode: '+973',
    dualCode: 'BH',
    tripleCode: 'BHR',
  },
  {
    name: 'Bangladesh',
    telCode: '+880',
    dualCode: 'BD',
    tripleCode: 'BGD',
  },
  {
    name: 'Barbados',
    telCode: '+1246',
    dualCode: 'BB',
    tripleCode: 'BRB',
  },
  {
    name: 'Belarus',
    telCode: '+375',
    dualCode: 'BY',
    tripleCode: 'BLR',
  },
  {
    name: 'Belgium',
    telCode: '+32',
    dualCode: 'BE',
    tripleCode: 'BEL',
  },
  {
    name: 'Belize',
    telCode: '+501',
    dualCode: 'BZ',
    tripleCode: 'BLZ',
  },
  {
    name: 'Benin',
    telCode: '+229',
    dualCode: 'BJ',
    tripleCode: 'BEN',
  },
  {
    name: 'Bermuda',
    telCode: '+1441',
    dualCode: 'BM',
    tripleCode: 'BMU',
  },
  {
    name: 'Bhutan',
    telCode: '+975',
    dualCode: 'BT',
    tripleCode: 'BTN',
  },
  {
    name: 'Bolivia, Plurinational State of Bolivia',
    telCode: '+591',
    dualCode: 'BO',
    tripleCode: 'BOL',
  },
  {
    name: 'Bosnia and Herzegovina',
    telCode: '+387',
    dualCode: 'BA',
    tripleCode: 'BIH',
  },
  {
    name: 'Botswana',
    telCode: '+267',
    dualCode: 'BW',
    tripleCode: 'BWA',
  },
  {
    name: 'Brazil',
    telCode: '+55',
    dualCode: 'BR',
    tripleCode: 'BRA',
  },
  {
    name: 'British Indian Ocean Territory',
    telCode: '+246',
    dualCode: 'IO',
    tripleCode: 'IOT',
  },
  {
    name: 'Brunei Darussalam',
    telCode: '+673',
    dualCode: 'BN',
    tripleCode: 'BRN',
  },
  {
    name: 'Bulgaria',
    telCode: '+359',
    dualCode: 'BG',
    tripleCode: 'BGR',
  },
  {
    name: 'Burkina Faso',
    telCode: '+226',
    dualCode: 'BF',
    tripleCode: 'BFA',
  },
  {
    name: 'Burundi',
    telCode: '+257',
    dualCode: 'BI',
    tripleCode: 'BDI',
  },
  {
    name: 'Cambodia',
    telCode: '+855',
    dualCode: 'KH',
    tripleCode: 'KHM',
  },
  {
    name: 'Cameroon',
    telCode: '+237',
    dualCode: 'CM',
    tripleCode: 'CMR',
  },
  {
    name: 'Canada',
    telCode: '+1',
    dualCode: 'CA',
    tripleCode: 'CAN',
  },
  {
    name: 'Cape Verde',
    telCode: '+238',
    dualCode: 'CV',
    tripleCode: 'CPV',
  },
  {
    name: 'Cayman Islands',
    telCode: '+ 345',
    dualCode: 'KY',
    tripleCode: 'CYM',
  },
  {
    name: 'Central African Republic',
    telCode: '+236',
    dualCode: 'CF',
    tripleCode: 'CAF',
  },
  {
    name: 'Chad',
    telCode: '+235',
    dualCode: 'TD',
    tripleCode: 'TCD',
  },
  {
    name: 'Chile',
    telCode: '+56',
    dualCode: 'CL',
    tripleCode: 'CHL',
  },
  {
    name: 'China',
    telCode: '+86',
    dualCode: 'CN',
    tripleCode: 'CHN',
  },
  {
    name: 'Christmas Island',
    telCode: '+61',
    dualCode: 'CX',
    tripleCode: 'CXR',
  },
  {
    name: 'Cocos (Keeling) Islands',
    telCode: '+61',
    dualCode: 'CC',
    tripleCode: 'CCK',
  },
  {
    name: 'Colombia',
    telCode: '+57',
    dualCode: 'CO',
    tripleCode: 'COL',
  },
  {
    name: 'Comoros',
    telCode: '+269',
    dualCode: 'KM',
    tripleCode: 'COM',
  },
  {
    name: 'Congo',
    telCode: '+242',
    dualCode: 'CG',
    tripleCode: 'COG',
  },
  {
    name: 'Congo, Democratic Republic of the Congo',
    telCode: '+243',
    dualCode: 'CD',
    tripleCode: 'COD',
  },
  {
    name: 'Cook Islands',
    telCode: '+682',
    dualCode: 'CK',
    tripleCode: 'COK',
  },
  {
    name: 'Costa Rica',
    telCode: '+506',
    dualCode: 'CR',
    tripleCode: 'CRI',
  },
  {
    name: "Cote d'Ivoire",
    telCode: '+225',
    dualCode: 'CI',
    tripleCode: 'CIV',
  },
  {
    name: 'Croatia',
    telCode: '+385',
    dualCode: 'HR',
    tripleCode: 'HRV',
  },
  {
    name: 'Cuba',
    telCode: '+53',
    dualCode: 'CU',
    tripleCode: 'CUB',
  },
  {
    name: 'Cyprus',
    telCode: '+357',
    dualCode: 'CY',
    tripleCode: 'CYP',
  },
  {
    name: 'Czechia',
    telCode: '+420',
    dualCode: 'CZ',
    tripleCode: 'CZE',
  },
  {
    name: 'Denmark',
    telCode: '+45',
    dualCode: 'DK',
    tripleCode: 'DNK',
  },
  {
    name: 'Djibouti',
    telCode: '+253',
    dualCode: 'DJ',
    tripleCode: 'DJI',
  },
  {
    name: 'Dominica',
    telCode: '+1767',
    dualCode: 'DM',
    tripleCode: 'DMA',
  },
  {
    name: 'Dominican Republic',
    telCode: '+1849',
    dualCode: 'DO',
    tripleCode: 'DOM',
  },
  {
    name: 'Ecuador',
    telCode: '+593',
    dualCode: 'EC',
    tripleCode: 'ECU',
  },
  {
    name: 'Egypt',
    telCode: '+20',
    dualCode: 'EG',
    tripleCode: 'EGY',
  },
  {
    name: 'El Salvador',
    telCode: '+503',
    dualCode: 'SV',
    tripleCode: 'SLV',
  },
  {
    name: 'Equatorial Guinea',
    telCode: '+240',
    dualCode: 'GQ',
    tripleCode: 'GNQ',
  },
  {
    name: 'Eritrea',
    telCode: '+291',
    dualCode: 'ER',
    tripleCode: 'ERI',
  },
  {
    name: 'Estonia',
    telCode: '+372',
    dualCode: 'EE',
    tripleCode: 'EST',
  },
  {
    name: 'Ethiopia',
    telCode: '+251',
    dualCode: 'ET',
    tripleCode: 'ETH',
  },
  {
    name: 'Falkland Islands (Malvinas)',
    telCode: '+500',
    dualCode: 'FK',
    tripleCode: 'FLK',
  },
  {
    name: 'Faroe Islands',
    telCode: '+298',
    dualCode: 'FO',
    tripleCode: 'FRO',
  },
  {
    name: 'Fiji',
    telCode: '+679',
    dualCode: 'FJ',
    tripleCode: 'FJI',
  },
  {
    name: 'Finland',
    telCode: '+358',
    dualCode: 'FI',
    tripleCode: 'FIN',
  },
  {
    name: 'France',
    telCode: '+33',
    dualCode: 'FR',
    tripleCode: 'FRA',
  },
  {
    name: 'French Guiana',
    telCode: '+594',
    dualCode: 'GF',
    tripleCode: 'GUF',
  },
  {
    name: 'French Polynesia',
    telCode: '+689',
    dualCode: 'PF',
    tripleCode: 'PYF',
  },
  {
    name: 'Gabon',
    telCode: '+241',
    dualCode: 'GA',
    tripleCode: 'GAB',
  },
  {
    name: 'Gambia',
    telCode: '+220',
    dualCode: 'GM',
    tripleCode: 'GMB',
  },
  {
    name: 'Georgia',
    telCode: '+995',
    dualCode: 'GE',
    tripleCode: 'GEO',
  },
  {
    name: 'Germany',
    telCode: '+49',
    dualCode: 'DE',
    tripleCode: 'DEU',
  },
  {
    name: 'Ghana',
    telCode: '+233',
    dualCode: 'GH',
    tripleCode: 'GHA',
  },
  {
    name: 'Gibraltar',
    telCode: '+350',
    dualCode: 'GI',
    tripleCode: 'GIB',
  },
  {
    name: 'Greece',
    telCode: '+30',
    dualCode: 'GR',
    tripleCode: 'GRC',
  },
  {
    name: 'Greenland',
    telCode: '+299',
    dualCode: 'GL',
    tripleCode: 'GRL',
  },
  {
    name: 'Grenada',
    telCode: '+1473',
    dualCode: 'GD',
    tripleCode: 'GRD',
  },
  {
    name: 'Guadeloupe',
    telCode: '+590',
    dualCode: 'GP',
    tripleCode: 'GLP',
  },
  {
    name: 'Guam',
    telCode: '+1671',
    dualCode: 'GU',
    tripleCode: 'GUM',
  },
  {
    name: 'Guatemala',
    telCode: '+502',
    dualCode: 'GT',
    tripleCode: 'GTM',
  },
  {
    name: 'Guernsey',
    telCode: '+44',
    dualCode: 'GG',
    tripleCode: 'GGY',
  },
  {
    name: 'Guinea',
    telCode: '+224',
    dualCode: 'GN',
    tripleCode: 'GIN',
  },
  {
    name: 'Guinea-Bissau',
    telCode: '+245',
    dualCode: 'GW',
    tripleCode: 'GNB',
  },
  {
    name: 'Guyana',
    telCode: '+595',
    dualCode: 'GY',
    tripleCode: 'GUY',
  },
  {
    name: 'Haiti',
    telCode: '+509',
    dualCode: 'HT',
    tripleCode: 'HTI',
  },
  {
    name: 'Holy See',
    telCode: '+379',
    dualCode: 'VA',
    tripleCode: 'VAT',
  },
  {
    name: 'Honduras',
    telCode: '+504',
    dualCode: 'HN',
    tripleCode: 'HND',
  },
  {
    name: 'Hong Kong',
    telCode: '+852',
    dualCode: 'HK',
    tripleCode: 'HKG',
  },
  {
    name: 'Hungary',
    telCode: '+36',
    dualCode: 'HU',
    tripleCode: 'HUN',
  },
  {
    name: 'Iceland',
    telCode: '+354',
    dualCode: 'IS',
    tripleCode: 'ISL',
  },
  {
    name: 'India',
    telCode: '+91',
    dualCode: 'IN',
    tripleCode: 'IND',
  },
  {
    name: 'Indonesia',
    telCode: '+62',
    dualCode: 'ID',
    tripleCode: 'IDN',
  },
  {
    name: 'Iran, Islamic Republic of Persian Gulf',
    telCode: '+98',
    dualCode: 'IR',
    tripleCode: 'IRN',
  },
  {
    name: 'Iraq',
    telCode: '+964',
    dualCode: 'IQ',
    tripleCode: 'IRQ',
  },
  {
    name: 'Ireland',
    telCode: '+353',
    dualCode: 'IE',
    tripleCode: 'IRL',
  },
  {
    name: 'Isle of Man',
    telCode: '+44',
    dualCode: 'IM',
    tripleCode: 'IMN',
  },
  {
    name: 'Israel',
    telCode: '+972',
    dualCode: 'IL',
    tripleCode: 'ISR',
  },
  {
    name: 'Italy',
    telCode: '+39',
    dualCode: 'IT',
    tripleCode: 'ITA',
  },
  {
    name: 'Jamaica',
    telCode: '+1876',
    dualCode: 'JM',
    tripleCode: 'JAM',
  },
  {
    name: 'Japan',
    telCode: '+81',
    dualCode: 'JP',
    tripleCode: 'JPN',
  },
  {
    name: 'Jersey',
    telCode: '+44',
    dualCode: 'JE',
    tripleCode: 'JEY',
  },
  {
    name: 'Jordan',
    telCode: '+962',
    dualCode: 'JO',
    tripleCode: 'JOR',
  },
  {
    name: 'Kazakhstan',
    telCode: '+77',
    dualCode: 'KZ',
    tripleCode: 'KAZ',
  },
  {
    name: 'Kenya',
    telCode: '+254',
    dualCode: 'KE',
    tripleCode: 'KEN',
  },
  {
    name: 'Kiribati',
    telCode: '+686',
    dualCode: 'KI',
    tripleCode: 'KIR',
  },
  {
    name: "Korea, Democratic People's Republic of Korea",
    telCode: '+850',
    dualCode: 'KP',
    tripleCode: 'PRK',
  },
  {
    name: 'Korea, Republic of South Korea',
    telCode: '+82',
    dualCode: 'KR',
    tripleCode: 'KOR',
  },
  {
    name: 'Kuwait',
    telCode: '+965',
    dualCode: 'KW',
    tripleCode: 'KWT',
  },
  {
    name: 'Kyrgyzstan',
    telCode: '+996',
    dualCode: 'KG',
    tripleCode: 'KGZ',
  },
  {
    name: "Lao, People's Democratic Republic of Lao",
    telCode: '+856',
    dualCode: 'LA',
    tripleCode: 'LAO',
  },
  {
    name: 'Latvia',
    telCode: '+371',
    dualCode: 'LV',
    tripleCode: 'LVA',
  },
  {
    name: 'Lebanon',
    telCode: '+961',
    dualCode: 'LB',
    tripleCode: 'LBN',
  },
  {
    name: 'Lesotho',
    telCode: '+266',
    dualCode: 'LS',
    tripleCode: 'LSO',
  },
  {
    name: 'Liberia',
    telCode: '+231',
    dualCode: 'LR',
    tripleCode: 'LBR',
  },
  {
    name: 'Libya',
    telCode: '+218',
    dualCode: 'LY',
    tripleCode: 'LBY',
  },
  {
    name: 'Liechtenstein',
    telCode: '+423',
    dualCode: 'LI',
    tripleCode: 'LIE',
  },
  {
    name: 'Lithuania',
    telCode: '+370',
    dualCode: 'LT',
    tripleCode: 'LTU',
  },
  {
    name: 'Luxembourg',
    telCode: '+352',
    dualCode: 'LU',
    tripleCode: 'LUX',
  },
  {
    name: 'Macao',
    telCode: '+853',
    dualCode: 'MO',
    tripleCode: 'MAC',
  },
  {
    name: 'Macedonia',
    telCode: '+389',
    dualCode: 'MK',
    tripleCode: 'MKD',
  },
  {
    name: 'Madagascar',
    telCode: '+261',
    dualCode: 'MG',
    tripleCode: 'MDG',
  },
  {
    name: 'Malawi',
    telCode: '+265',
    dualCode: 'MW',
    tripleCode: 'MWI',
  },
  {
    name: 'Malaysia',
    telCode: '+60',
    dualCode: 'MY',
    tripleCode: 'MYS',
  },
  {
    name: 'Maldives',
    telCode: '+960',
    dualCode: 'MV',
    tripleCode: 'MDV',
  },
  {
    name: 'Mali',
    telCode: '+223',
    dualCode: 'ML',
    tripleCode: 'MLI',
  },
  {
    name: 'Malta',
    telCode: '+356',
    dualCode: 'MT',
    tripleCode: 'MLT',
  },
  {
    name: 'Marshall Islands',
    telCode: '+692',
    dualCode: 'MH',
    tripleCode: 'MHL',
  },
  {
    name: 'Martinique',
    telCode: '+596',
    dualCode: 'MQ',
    tripleCode: 'MTQ',
  },
  {
    name: 'Mauritania',
    telCode: '+222',
    dualCode: 'MR',
    tripleCode: 'MRT',
  },
  {
    name: 'Mauritius',
    telCode: '+230',
    dualCode: 'MU',
    tripleCode: 'MUS',
  },
  {
    name: 'Mayotte',
    telCode: '+262',
    dualCode: 'YT',
    tripleCode: 'MYT',
  },
  {
    name: 'Mexico',
    telCode: '+52',
    dualCode: 'MX',
    tripleCode: 'MEX',
  },
  {
    name: 'Micronesia, Federated States of Micronesia',
    telCode: '+691',
    dualCode: 'FM',
    tripleCode: 'FSM',
  },
  {
    name: 'Moldova, Republic of Moldova',
    telCode: '+373',
    dualCode: 'MD',
    tripleCode: 'MDA',
  },
  {
    name: 'Monaco',
    telCode: '+377',
    dualCode: 'MC',
    tripleCode: 'MCO',
  },
  {
    name: 'Mongolia',
    telCode: '+976',
    dualCode: 'MN',
    tripleCode: 'MNG',
  },
  {
    name: 'Montenegro',
    telCode: '+382',
    dualCode: 'ME',
    tripleCode: 'MNE',
  },
  {
    name: 'Montserrat',
    telCode: '+1664',
    dualCode: 'MS',
    tripleCode: 'MSR',
  },
  {
    name: 'Morocco',
    telCode: '+212',
    dualCode: 'MA',
    tripleCode: 'MAR',
  },
  {
    name: 'Mozambique',
    telCode: '+258',
    dualCode: 'MZ',
    tripleCode: 'MOZ',
  },
  {
    name: 'Myanmar',
    telCode: '+95',
    dualCode: 'MM',
    tripleCode: 'MMR',
  },
  {
    name: 'Namibia',
    telCode: '+264',
    dualCode: 'NA',
    tripleCode: 'NAM',
  },
  {
    name: 'Nauru',
    telCode: '+674',
    dualCode: 'NR',
    tripleCode: 'NRU',
  },
  {
    name: 'Nepal',
    telCode: '+977',
    dualCode: 'NP',
    tripleCode: 'NPL',
  },
  {
    name: 'Netherlands',
    telCode: '+31',
    dualCode: 'NL',
    tripleCode: 'NLD',
  },
  {
    name: 'Netherlands Antilles',
    telCode: '+599',
    dualCode: 'AN',
    tripleCode: 'ANT',
  },
  {
    name: 'New Caledonia',
    telCode: '+687',
    dualCode: 'NC',
    tripleCode: 'NCL',
  },
  {
    name: 'New Zealand',
    telCode: '+64',
    dualCode: 'NZ',
    tripleCode: 'NZL',
  },
  {
    name: 'Nicaragua',
    telCode: '+505',
    dualCode: 'NI',
    tripleCode: 'NIC',
  },
  {
    name: 'Niger',
    telCode: '+227',
    dualCode: 'NE',
    tripleCode: 'NER',
  },
  {
    name: 'Nigeria',
    telCode: '+234',
    dualCode: 'NG',
    tripleCode: 'NGA',
  },
  {
    name: 'Niue',
    telCode: '+683',
    dualCode: 'NU',
    tripleCode: 'NIU',
  },
  {
    name: 'Norfolk Island',
    telCode: '+672',
    dualCode: 'NF',
    tripleCode: 'NFK',
  },
  {
    name: 'Northern Mariana Islands',
    telCode: '+1670',
    dualCode: 'MP',
    tripleCode: 'MNP',
  },
  {
    name: 'Norway',
    telCode: '+47',
    dualCode: 'NO',
    tripleCode: 'NOR',
  },
  {
    name: 'Oman',
    telCode: '+968',
    dualCode: 'OM',
    tripleCode: 'OMN',
  },
  {
    name: 'Pakistan',
    telCode: '+92',
    dualCode: 'PK',
    tripleCode: 'PAK',
  },
  {
    name: 'Palau',
    telCode: '+680',
    dualCode: 'PW',
    tripleCode: 'PLW',
  },
  {
    name: 'Panama',
    telCode: '+507',
    dualCode: 'PA',
    tripleCode: 'PAN',
  },
  {
    name: 'Papua New Guinea',
    telCode: '+675',
    dualCode: 'PG',
    tripleCode: 'PNG',
  },
  {
    name: 'Paraguay',
    telCode: '+595',
    dualCode: 'PY',
    tripleCode: 'PRY',
  },
  {
    name: 'Peru',
    telCode: '+51',
    dualCode: 'PE',
    tripleCode: 'PER',
  },
  {
    name: 'Philippines',
    telCode: '+63',
    dualCode: 'PH',
    tripleCode: 'PHL',
  },
  {
    name: 'Pitcairn',
    telCode: '+872',
    dualCode: 'PN',
    tripleCode: 'PCN',
  },
  {
    name: 'Poland',
    telCode: '+48',
    dualCode: 'PL',
    tripleCode: 'POL',
  },
  {
    name: 'Portugal',
    telCode: '+351',
    dualCode: 'PT',
    tripleCode: 'PRT',
  },
  {
    name: 'Puerto Rico',
    telCode: '+1939',
    dualCode: 'PR',
    tripleCode: 'PRI',
  },
  {
    name: 'Qatar',
    telCode: '+974',
    dualCode: 'QA',
    tripleCode: 'QAT',
  },
  {
    name: 'Romania',
    telCode: '+40',
    dualCode: 'RO',
    tripleCode: 'ROU',
  },
  {
    name: 'Russia',
    telCode: '+7',
    dualCode: 'RU',
    tripleCode: 'RUS',
  },
  {
    name: 'Rwanda',
    telCode: '+250',
    dualCode: 'RW',
    tripleCode: 'RWA',
  },
  {
    name: 'Reunion',
    telCode: '+262',
    dualCode: 'RE',
    tripleCode: 'REU',
  },
  {
    name: 'Saint Barthelemy',
    telCode: '+590',
    dualCode: 'BL',
    tripleCode: 'BLM',
  },
  {
    name: 'Saint Helena, Ascension and Tristan Da Cunha',
    telCode: '+290',
    dualCode: 'SH',
    tripleCode: 'SHN',
  },
  {
    name: 'Saint Kitts and Nevis',
    telCode: '+1869',
    dualCode: 'KN',
    tripleCode: 'KNA',
  },
  {
    name: 'Saint Lucia',
    telCode: '+1758',
    dualCode: 'LC',
    tripleCode: 'LCA',
  },
  {
    name: 'Saint Martin',
    telCode: '+590',
    dualCode: 'MF',
    tripleCode: 'MAF',
  },
  {
    name: 'Saint Pierre and Miquelon',
    telCode: '+508',
    dualCode: 'PM',
    tripleCode: 'SPM',
  },
  {
    name: 'Saint Vincent and the Grenadines',
    telCode: '+1784',
    dualCode: 'VC',
    tripleCode: 'VCT',
  },
  {
    name: 'Samoa',
    telCode: '+685',
    dualCode: 'WS',
    tripleCode: 'WSM',
  },
  {
    name: 'San Marino',
    telCode: '+378',
    dualCode: 'SM',
    tripleCode: 'SMR',
  },
  {
    name: 'Sao Tome and Principe',
    telCode: '+239',
    dualCode: 'ST',
    tripleCode: 'STP',
  },
  {
    name: 'Saudi Arabia',
    telCode: '+966',
    dualCode: 'SA',
    tripleCode: 'SAU',
  },
  {
    name: 'Senegal',
    telCode: '+221',
    dualCode: 'SN',
    tripleCode: 'SEN',
  },
  {
    name: 'Serbia',
    telCode: '+381',
    dualCode: 'RS',
    tripleCode: 'SRB',
  },
  {
    name: 'Seychelles',
    telCode: '+248',
    dualCode: 'SC',
    tripleCode: 'SYC',
  },
  {
    name: 'Sierra Leone',
    telCode: '+232',
    dualCode: 'SL',
    tripleCode: 'SLE',
  },
  {
    name: 'Singapore',
    telCode: '+65',
    dualCode: 'SG',
    tripleCode: 'SGP',
  },
  {
    name: 'Slovakia',
    telCode: '+421',
    dualCode: 'SK',
    tripleCode: 'SVK',
  },
  {
    name: 'Slovenia',
    telCode: '+386',
    dualCode: 'SI',
    tripleCode: 'SVN',
  },
  {
    name: 'Solomon Islands',
    telCode: '+677',
    dualCode: 'SB',
    tripleCode: 'SLB',
  },
  {
    name: 'Somalia',
    telCode: '+252',
    dualCode: 'SO',
    tripleCode: 'SOM',
  },
  {
    name: 'South Africa',
    telCode: '+27',
    dualCode: 'ZA',
    tripleCode: 'ZAF',
  },
  {
    name: 'South Sudan',
    telCode: '+211',
    dualCode: 'SS',
    tripleCode: 'SSD',
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    telCode: '+500',
    dualCode: 'GS',
    tripleCode: 'SGS',
  },
  {
    name: 'Spain',
    telCode: '+34',
    dualCode: 'ES',
    tripleCode: 'ESP',
  },
  {
    name: 'Sri Lanka',
    telCode: '+94',
    dualCode: 'LK',
    tripleCode: 'LKA',
  },
  {
    name: 'Sudan',
    telCode: '+249',
    dualCode: 'SD',
    tripleCode: 'SDN',
  },
  {
    name: 'Suriname',
    telCode: '+597',
    dualCode: 'SR',
    tripleCode: 'SUR',
  },
  {
    name: 'Svalbard and Jan Mayen',
    telCode: '+47',
    dualCode: 'SJ',
    tripleCode: 'SJM',
  },
  {
    name: 'Eswatini',
    telCode: '+268',
    dualCode: 'SZ',
    tripleCode: 'SWZ',
  },
  {
    name: 'Sweden',
    telCode: '+46',
    dualCode: 'SE',
    tripleCode: 'SWE',
  },
  {
    name: 'Switzerland',
    telCode: '+41',
    dualCode: 'CH',
    tripleCode: 'CHE',
  },
  {
    name: 'Syrian Arab Republic',
    telCode: '+963',
    dualCode: 'SY',
    tripleCode: 'SYR',
  },
  {
    name: 'Taiwan, Province of China',
    telCode: '+886',
    dualCode: 'TW',
    tripleCode: 'TWN',
  },
  {
    name: 'Tajikistan',
    telCode: '+992',
    dualCode: 'TJ',
    tripleCode: 'TJK',
  },
  {
    name: 'Tanzania, United Republic of Tanzania',
    telCode: '+255',
    dualCode: 'TZ',
    tripleCode: 'TZA',
  },
  {
    name: 'Thailand',
    telCode: '+66',
    dualCode: 'TH',
    tripleCode: 'THA',
  },
  {
    name: 'Timor-Leste',
    telCode: '+670',
    dualCode: 'TL',
    tripleCode: 'TLS',
  },
  {
    name: 'Togo',
    telCode: '+228',
    dualCode: 'TG',
    tripleCode: 'TGO',
  },
  {
    name: 'Tokelau',
    telCode: '+690',
    dualCode: 'TK',
    tripleCode: 'TKL',
  },
  {
    name: 'Tonga',
    telCode: '+676',
    dualCode: 'TO',
    tripleCode: 'TON',
  },
  {
    name: 'Trinidad and Tobago',
    telCode: '+1868',
    dualCode: 'TT',
    tripleCode: 'TTO',
  },
  {
    name: 'Tunisia',
    telCode: '+216',
    dualCode: 'TN',
    tripleCode: 'TUN',
  },
  {
    name: 'Turkey',
    telCode: '+90',
    dualCode: 'TR',
    tripleCode: 'TUR',
  },
  {
    name: 'Turkmenistan',
    telCode: '+993',
    dualCode: 'TM',
    tripleCode: 'TKM',
  },
  {
    name: 'Turks and Caicos Islands',
    telCode: '+1649',
    dualCode: 'TC',
    tripleCode: 'TCA',
  },
  {
    name: 'Tuvalu',
    telCode: '+688',
    dualCode: 'TV',
    tripleCode: 'TUV',
  },
  {
    name: 'Uganda',
    telCode: '+256',
    dualCode: 'UG',
    tripleCode: 'UGA',
  },
  {
    name: 'Ukraine',
    telCode: '+380',
    dualCode: 'UA',
    tripleCode: 'UKR',
  },
  {
    name: 'United Arab Emirates',
    telCode: '+971',
    dualCode: 'AE',
    tripleCode: 'ARE',
  },
  {
    name: 'United Kingdom of Great Britain and Northern Ireland',
    telCode: '+44',
    dualCode: 'GB',
    tripleCode: 'GBR',
  },
  {
    name: 'United States of America',
    telCode: '+1',
    dualCode: 'US',
    tripleCode: 'USA',
  },
  {
    name: 'Uruguay',
    telCode: '+598',
    dualCode: 'UY',
    tripleCode: 'URY',
  },
  {
    name: 'Uzbekistan',
    telCode: '+998',
    dualCode: 'UZ',
    tripleCode: 'UZB',
  },
  {
    name: 'Vanuatu',
    telCode: '+678',
    dualCode: 'VU',
    tripleCode: 'VUT',
  },
  {
    name: 'Venezuela, Bolivarian Republic of Venezuela',
    telCode: '+58',
    dualCode: 'VE',
    tripleCode: 'VEN',
  },
  {
    name: 'Vietnam',
    telCode: '+84',
    dualCode: 'VN',
    tripleCode: 'VNM',
  },
  {
    name: 'Virgin Islands, British',
    telCode: '+1284',
    dualCode: 'VG',
    tripleCode: 'VGB',
  },
  {
    name: 'Virgin Islands, U.S.',
    telCode: '+1340',
    dualCode: 'VI',
    tripleCode: 'VIR',
  },
  {
    name: 'Wallis and Futuna',
    telCode: '+681',
    dualCode: 'WF',
    tripleCode: 'WLF',
  },
  {
    name: 'Yemen',
    telCode: '+967',
    dualCode: 'YE',
    tripleCode: 'YEM',
  },
  {
    name: 'Zambia',
    telCode: '+260',
    dualCode: 'ZM',
    tripleCode: 'ZMB',
  },
  {
    name: 'Zimbabwe',
    telCode: '+263',
    dualCode: 'ZW',
    tripleCode: 'ZWE',
  },
];
