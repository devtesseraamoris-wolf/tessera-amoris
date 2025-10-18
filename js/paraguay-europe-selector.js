/**
 * Paraguay-Europe Country Selector
 * Provides full country → state/region → city hierarchy
 * while keeping the existing expansion modal experience.
 */

(function() {
    'use strict';

    // Expose a flag so other scripts know a custom location selector is active
    window.tesseraLocationSelectorActive = 'paraguay-europe-v2';

    const LOCATION_DATA = {
        PY: {
            label: 'Paraguay',
            regions: [
                { value: 'asuncion', label: 'Asunción Capital District', cities: ['Asunción', 'Villa Morra', 'Recoleta'] },
                { value: 'central', label: 'Central', cities: ['San Lorenzo', 'Fernando de la Mora', 'Luque', 'Lambaré'] },
                { value: 'alto-parana', label: 'Alto Paraná', cities: ['Ciudad del Este', 'Presidente Franco', 'Hernandarias', 'Minga Guazú'] },
                { value: 'itapua', label: 'Itapúa', cities: ['Encarnación', 'Hohenau', 'Obligado', 'Bella Vista'] },
                { value: 'caaguazu', label: 'Caaguazú', cities: ['Coronel Oviedo', 'Caaguazú', 'Repatriación'] },
                { value: 'misiones', label: 'Misiones', cities: ['San Juan Bautista', 'San Ignacio', 'Santa Rosa'] },
                { value: 'presidente-hayes', label: 'Presidente Hayes', cities: ['Villa Hayes', 'Benjamín Aceval', 'Nanawa'] },
                { value: 'amambay', label: 'Amambay', cities: ['Pedro Juan Caballero', 'Bella Vista Norte', 'Capitán Bado'] }
            ]
        },
        AL: {
            label: 'Albania',
            regions: [
                { value: 'tirana', label: 'Tirana County', cities: ['Tirana', 'Durrës', 'Kavajë'] },
                { value: 'shkoder', label: 'Shkodër County', cities: ['Shkodër', 'Lezhë', 'Pukë'] },
                { value: 'vlore', label: 'Vlorë County', cities: ['Vlorë', 'Fier', 'Sarandë'] }
            ]
        },
        AD: {
            label: 'Andorra',
            regions: [
                { value: 'andorra-la-vella', label: 'Andorra la Vella Parish', cities: ['Andorra la Vella', 'Santa Coloma', 'La Margineda'] },
                { value: 'escaldes-engordany', label: 'Escaldes-Engordany Parish', cities: ['Escaldes-Engordany', 'Engolasters', 'Les Escaldes'] },
                { value: 'encamp', label: 'Encamp Parish', cities: ['Encamp', 'Pas de la Casa', 'Vila'] }
            ]
        },
        AT: {
            label: 'Austria',
            regions: [
                { value: 'vienna', label: 'Vienna', cities: ['Vienna', 'Döbling', 'Favoriten'] },
                { value: 'upper-austria', label: 'Upper Austria', cities: ['Linz', 'Wels', 'Steyr'] },
                { value: 'tyrol', label: 'Tyrol', cities: ['Innsbruck', 'Kufstein', 'Lienz'] }
            ]
        },
        BY: {
            label: 'Belarus',
            regions: [
                { value: 'minsk-region', label: 'Minsk Region', cities: ['Minsk', 'Barysaw', 'Maladzyechna'] },
                { value: 'brest', label: 'Brest Region', cities: ['Brest', 'Baranavichy', 'Pinsk'] },
                { value: 'vitebsk', label: 'Vitebsk Region', cities: ['Vitebsk', 'Orsha', 'Polotsk'] }
            ]
        },
        BE: {
            label: 'Belgium',
            regions: [
                { value: 'flanders', label: 'Flanders', cities: ['Antwerp', 'Ghent', 'Bruges'] },
                { value: 'wallonia', label: 'Wallonia', cities: ['Liège', 'Namur', 'Mons'] },
                { value: 'brussels', label: 'Brussels-Capital', cities: ['Brussels', 'Schaerbeek', 'Ixelles'] }
            ]
        },
        BA: {
            label: 'Bosnia and Herzegovina',
            regions: [
                { value: 'federation', label: 'Federation of Bosnia and Herzegovina', cities: ['Sarajevo', 'Mostar', 'Tuzla'] },
                { value: 'republika-srpska', label: 'Republika Srpska', cities: ['Banja Luka', 'Bijeljina', 'Prijedor'] },
                { value: 'brcko', label: 'Brčko District', cities: ['Brčko'] }
            ]
        },
        BG: {
            label: 'Bulgaria',
            regions: [
                { value: 'sofia', label: 'Sofia City Province', cities: ['Sofia', 'Bankya', 'Novi Iskar'] },
                { value: 'plovdiv', label: 'Plovdiv Province', cities: ['Plovdiv', 'Asenovgrad', 'Karlovo'] },
                { value: 'varna', label: 'Varna Province', cities: ['Varna', 'Devnya', 'Provadiya'] }
            ]
        },
        HR: {
            label: 'Croatia',
            regions: [
                { value: 'zagreb', label: 'Zagreb Region', cities: ['Zagreb', 'Samobor', 'Velika Gorica'] },
                { value: 'split-dalmatia', label: 'Split-Dalmatia', cities: ['Split', 'Makarska', 'Trogir'] },
                { value: 'istria', label: 'Istria', cities: ['Pula', 'Rovinj', 'Poreč'] }
            ]
        },
        CZ: {
            label: 'Czech Republic',
            regions: [
                { value: 'prague', label: 'Prague Region', cities: ['Prague', 'Prague 4', 'Prague 6'] },
                { value: 'south-moravian', label: 'South Moravian', cities: ['Brno', 'Znojmo', 'Břeclav'] },
                { value: 'moravian-silesian', label: 'Moravian-Silesian', cities: ['Ostrava', 'Opava', 'Karviná'] }
            ]
        },
        DK: {
            label: 'Denmark',
            regions: [
                { value: 'capital-region', label: 'Capital Region', cities: ['Copenhagen', 'Frederiksberg', 'Hillerød'] },
                { value: 'central-denmark', label: 'Central Denmark', cities: ['Aarhus', 'Randers', 'Viborg'] },
                { value: 'southern-denmark', label: 'Southern Denmark', cities: ['Odense', 'Esbjerg', 'Kolding'] }
            ]
        },
        EE: {
            label: 'Estonia',
            regions: [
                { value: 'harju', label: 'Harju County', cities: ['Tallinn', 'Maardu', 'Keila'] },
                { value: 'tartu', label: 'Tartu County', cities: ['Tartu', 'Elva', 'Võru'] },
                { value: 'ida-viru', label: 'Ida-Viru County', cities: ['Narva', 'Kohtla-Järve', 'Jõhvi'] }
            ]
        },
        FI: {
            label: 'Finland',
            regions: [
                { value: 'uusimaa', label: 'Uusimaa', cities: ['Helsinki', 'Espoo', 'Vantaa'] },
                { value: 'pirkanmaa', label: 'Pirkanmaa', cities: ['Tampere', 'Nokia', 'Ylöjärvi'] },
                { value: 'southwest-finland', label: 'Southwest Finland', cities: ['Turku', 'Salo', 'Raisio'] }
            ]
        },
        FR: {
            label: 'France',
            regions: [
                { value: 'ile-de-france', label: 'Île-de-France', cities: ['Paris', 'Versailles', 'Boulogne-Billancourt'] },
                { value: 'auvergne-rhone-alpes', label: 'Auvergne-Rhône-Alpes', cities: ['Lyon', 'Grenoble', 'Saint-Étienne'] },
                { value: 'provence-alpes-cote-dazur', label: 'Provence-Alpes-Côte d\'Azur', cities: ['Marseille', 'Nice', 'Toulon'] }
            ]
        },
        DE: {
            label: 'Germany',
            regions: [
                { value: 'bavaria', label: 'Bavaria', cities: ['Munich', 'Nuremberg', 'Augsburg'] },
                { value: 'north-rhine-westphalia', label: 'North Rhine-Westphalia', cities: ['Cologne', 'Düsseldorf', 'Dortmund'] },
                { value: 'berlin', label: 'Berlin', cities: ['Berlin', 'Charlottenburg', 'Spandau'] }
            ]
        },
        GR: {
            label: 'Greece',
            regions: [
                { value: 'attica', label: 'Attica', cities: ['Athens', 'Piraeus', 'Marousi'] },
                { value: 'central-macedonia', label: 'Central Macedonia', cities: ['Thessaloniki', 'Katerini', 'Serres'] },
                { value: 'crete', label: 'Crete', cities: ['Heraklion', 'Chania', 'Rethymno'] }
            ]
        },
        VA: {
            label: 'Vatican City',
            regions: [
                { value: 'vatican-city', label: 'Vatican City', cities: ['Vatican City'] }
            ]
        },
        HU: {
            label: 'Hungary',
            regions: [
                { value: 'central-hungary', label: 'Central Hungary', cities: ['Budapest', 'Érd', 'Szentendre'] },
                { value: 'central-transdanubia', label: 'Central Transdanubia', cities: ['Székesfehérvár', 'Tatabánya', 'Dunaújváros'] },
                { value: 'northern-great-plain', label: 'Northern Great Plain', cities: ['Debrecen', 'Nyíregyháza', 'Szolnok'] }
            ]
        },
        IS: {
            label: 'Iceland',
            regions: [
                { value: 'capital-region', label: 'Capital Region', cities: ['Reykjavík', 'Kópavogur', 'Hafnarfjörður'] },
                { value: 'southern-region', label: 'Southern Region', cities: ['Selfoss', 'Hveragerði', 'Vestmannaeyjar'] },
                { value: 'northern-region', label: 'Northern Region', cities: ['Akureyri', 'Húsavík', 'Sauðárkrókur'] }
            ]
        },
        IE: {
            label: 'Ireland',
            regions: [
                { value: 'dublin', label: 'Dublin Region', cities: ['Dublin', 'Dún Laoghaire', 'Swords'] },
                { value: 'munster', label: 'Munster', cities: ['Cork', 'Limerick', 'Waterford'] },
                { value: 'connacht', label: 'Connacht', cities: ['Galway', 'Sligo', 'Castlebar'] }
            ]
        },
        IT: {
            label: 'Italy',
            regions: [
                { value: 'lazio', label: 'Lazio', cities: ['Rome', 'Frosinone', 'Viterbo'] },
                { value: 'lombardy', label: 'Lombardy', cities: ['Milan', 'Bergamo', 'Brescia'] },
                { value: 'sicily', label: 'Sicily', cities: ['Palermo', 'Catania', 'Messina'] }
            ]
        },
        LV: {
            label: 'Latvia',
            regions: [
                { value: 'riga', label: 'Riga Region', cities: ['Riga', 'Jūrmala', 'Sigulda'] },
                { value: 'vidzeme', label: 'Vidzeme', cities: ['Valmiera', 'Cēsis', 'Madona'] },
                { value: 'latgale', label: 'Latgale', cities: ['Daugavpils', 'Rēzekne', 'Ludza'] }
            ]
        },
        LI: {
            label: 'Liechtenstein',
            regions: [
                { value: 'oberland', label: 'Oberland', cities: ['Vaduz', 'Triesen', 'Balzers'] },
                { value: 'unterland', label: 'Unterland', cities: ['Eschen', 'Mauren', 'Schellenberg'] }
            ]
        },
        LT: {
            label: 'Lithuania',
            regions: [
                { value: 'vilnius', label: 'Vilnius County', cities: ['Vilnius', 'Trakai', 'Elektrėnai'] },
                { value: 'kaunas', label: 'Kaunas County', cities: ['Kaunas', 'Kėdainiai', 'Jonava'] },
                { value: 'klaipeda', label: 'Klaipėda County', cities: ['Klaipėda', 'Palanga', 'Šilutė'] }
            ]
        },
        LU: {
            label: 'Luxembourg',
            regions: [
                { value: 'luxembourg-district', label: 'Luxembourg District', cities: ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange'] },
                { value: 'grevenmacher', label: 'Grevenmacher District', cities: ['Grevenmacher', 'Echternach', 'Remich'] },
                { value: 'diekirch', label: 'Diekirch District', cities: ['Diekirch', 'Ettelbruck', 'Wiltz'] }
            ]
        },
        MT: {
            label: 'Malta',
            regions: [
                { value: 'northern-harbour', label: 'Northern Harbour', cities: ['Birkirkara', 'Mosta', 'Sliema'] },
                { value: 'southern-harbour', label: 'Southern Harbour', cities: ['Valletta', 'Birgu', 'Żabbar'] },
                { value: 'gozo', label: 'Gozo', cities: ['Victoria', 'Xewkija', 'Nadur'] }
            ]
        },
        MD: {
            label: 'Moldova',
            regions: [
                { value: 'chisinau', label: 'Chișinău Municipality', cities: ['Chișinău', 'Codru', 'Durlești'] },
                { value: 'balti', label: 'Bălți Municipality', cities: ['Bălți', 'Fălești', 'Râșcani'] },
                { value: 'gagauzia', label: 'Gagauzia', cities: ['Comrat', 'Ceadîr-Lunga', 'Vulcănești'] }
            ]
        },
        MC: {
            label: 'Monaco',
            regions: [
                { value: 'monte-carlo', label: 'Monte Carlo', cities: ['Monte Carlo', 'Larvotto', 'Saint Roman'] },
                { value: 'la-condamine', label: 'La Condamine', cities: ['La Condamine', 'Port Hercules', 'Moneghetti'] },
                { value: 'fontvieille', label: 'Fontvieille', cities: ['Fontvieille', 'Jardin Exotique', 'Les Révoires'] }
            ]
        },
        ME: {
            label: 'Montenegro',
            regions: [
                { value: 'podgorica', label: 'Podgorica Region', cities: ['Podgorica', 'Tuzi', 'Danilovgrad'] },
                { value: 'budva', label: 'Budva Riviera', cities: ['Budva', 'Kotor', 'Tivat'] },
                { value: 'niksic', label: 'Nikšić Region', cities: ['Nikšić', 'Plužine', 'Šavnik'] }
            ]
        },
        NL: {
            label: 'Netherlands',
            regions: [
                { value: 'north-holland', label: 'North Holland', cities: ['Amsterdam', 'Haarlem', 'Alkmaar'] },
                { value: 'south-holland', label: 'South Holland', cities: ['Rotterdam', 'The Hague', 'Leiden'] },
                { value: 'north-brabant', label: 'North Brabant', cities: ['Eindhoven', 'Breda', 'Tilburg'] }
            ]
        },
        MK: {
            label: 'North Macedonia',
            regions: [
                { value: 'skopje', label: 'Skopje Region', cities: ['Skopje', 'Tetovo', 'Kumanovo'] },
                { value: 'polog', label: 'Polog', cities: ['Gostivar', 'Debar', 'Mavrovo'] },
                { value: 'pelagonia', label: 'Pelagonia', cities: ['Bitola', 'Prilep', 'Kruševo'] }
            ]
        },
        NO: {
            label: 'Norway',
            regions: [
                { value: 'eastern-norway', label: 'Eastern Norway', cities: ['Oslo', 'Drammen', 'Fredrikstad'] },
                { value: 'western-norway', label: 'Western Norway', cities: ['Bergen', 'Stavanger', 'Haugesund'] },
                { value: 'northern-norway', label: 'Northern Norway', cities: ['Tromsø', 'Bodø', 'Narvik'] }
            ]
        },
        PL: {
            label: 'Poland',
            regions: [
                { value: 'masovian', label: 'Masovian Voivodeship', cities: ['Warsaw', 'Radom', 'Płock'] },
                { value: 'lesser-poland', label: 'Lesser Poland Voivodeship', cities: ['Kraków', 'Tarnów', 'Nowy Sącz'] },
                { value: 'silesian', label: 'Silesian Voivodeship', cities: ['Katowice', 'Częstochowa', 'Gliwice'] }
            ]
        },
        PT: {
            label: 'Portugal',
            regions: [
                { value: 'lisbon', label: 'Lisbon Metropolitan Area', cities: ['Lisbon', 'Sintra', 'Cascais'] },
                { value: 'porto', label: 'Porto Metropolitan Area', cities: ['Porto', 'Vila Nova de Gaia', 'Braga'] },
                { value: 'algarve', label: 'Algarve', cities: ['Faro', 'Albufeira', 'Lagos'] }
            ]
        },
        RO: {
            label: 'Romania',
            regions: [
                { value: 'bucharest-ilfov', label: 'Bucharest-Ilfov', cities: ['Bucharest', 'Otopeni', 'Voluntari'] },
                { value: 'cluj', label: 'Cluj County', cities: ['Cluj-Napoca', 'Turda', 'Dej'] },
                { value: 'timis', label: 'Timiș County', cities: ['Timișoara', 'Lugoj', 'Sânnicolau Mare'] }
            ]
        },
        RU: {
            label: 'Russia',
            regions: [
                { value: 'moscow', label: 'Moscow', cities: ['Moscow', 'Zelenograd', 'Khimki'] },
                { value: 'saint-petersburg', label: 'Saint Petersburg', cities: ['Saint Petersburg', 'Pushkin', 'Kronstadt'] },
                { value: 'novosibirsk', label: 'Novosibirsk Oblast', cities: ['Novosibirsk', 'Berdsk', 'Iskitim'] }
            ]
        },
        SM: {
            label: 'San Marino',
            regions: [
                { value: 'san-marino', label: 'San Marino City', cities: ['San Marino', 'Fiorentino', 'Acquaviva'] },
                { value: 'serravalle', label: 'Serravalle', cities: ['Serravalle', 'Dogana', 'Falciano'] },
                { value: 'borgo-maggiore', label: 'Borgo Maggiore', cities: ['Borgo Maggiore', 'Cailungo', 'Valdragone'] }
            ]
        },
        RS: {
            label: 'Serbia',
            regions: [
                { value: 'belgrade', label: 'Belgrade Region', cities: ['Belgrade', 'Zemun', 'Pančevo'] },
                { value: 'vojvodina', label: 'Vojvodina', cities: ['Novi Sad', 'Subotica', 'Sombor'] },
                { value: 'sumadija', label: 'Šumadija and Western Serbia', cities: ['Kragujevac', 'Čačak', 'Užice'] }
            ]
        },
        SK: {
            label: 'Slovakia',
            regions: [
                { value: 'bratislava', label: 'Bratislava Region', cities: ['Bratislava', 'Pezinok', 'Malacky'] },
                { value: 'kosice', label: 'Košice Region', cities: ['Košice', 'Michalovce', 'Trebišov'] },
                { value: 'zilina', label: 'Žilina Region', cities: ['Žilina', 'Martin', 'Ružomberok'] }
            ]
        },
        SI: {
            label: 'Slovenia',
            regions: [
                { value: 'central-slovenia', label: 'Central Slovenia', cities: ['Ljubljana', 'Domžale', 'Kamnik'] },
                { value: 'drava', label: 'Drava Region', cities: ['Maribor', 'Ptuj', 'Slovenska Bistrica'] },
                { value: 'coastal-karst', label: 'Coastal–Karst', cities: ['Koper', 'Izola', 'Piran'] }
            ]
        },
        ES: {
            label: 'Spain',
            regions: [
                { value: 'madrid', label: 'Community of Madrid', cities: ['Madrid', 'Alcalá de Henares', 'Getafe'] },
                { value: 'catalonia', label: 'Catalonia', cities: ['Barcelona', 'Girona', 'Tarragona'] },
                { value: 'andalusia', label: 'Andalusia', cities: ['Seville', 'Málaga', 'Granada'] }
            ]
        },
        SE: {
            label: 'Sweden',
            regions: [
                { value: 'stockholm', label: 'Stockholm County', cities: ['Stockholm', 'Solna', 'Södertälje'] },
                { value: 'vastra-gotaland', label: 'Västra Götaland County', cities: ['Gothenburg', 'Borås', 'Trollhättan'] },
                { value: 'skane', label: 'Skåne County', cities: ['Malmö', 'Lund', 'Helsingborg'] }
            ]
        },
        CH: {
            label: 'Switzerland',
            regions: [
                { value: 'zurich', label: 'Canton of Zurich', cities: ['Zurich', 'Winterthur', 'Uster'] },
                { value: 'geneva', label: 'Canton of Geneva', cities: ['Geneva', 'Carouge', 'Lancy'] },
                { value: 'bern', label: 'Canton of Bern', cities: ['Bern', 'Thun', 'Biel/Bienne'] }
            ]
        },
        UA: {
            label: 'Ukraine',
            regions: [
                { value: 'kyiv', label: 'Kyiv City & Region', cities: ['Kyiv', 'Brovary', 'Boryspil'] },
                { value: 'lviv', label: 'Lviv Oblast', cities: ['Lviv', 'Drohobych', 'Truskavets'] },
                { value: 'odessa', label: 'Odessa Oblast', cities: ['Odessa', 'Chornomorsk', 'Izmail'] }
            ]
        },
        GB: {
            label: 'United Kingdom',
            regions: [
                { value: 'england', label: 'England', cities: ['London', 'Manchester', 'Birmingham'] },
                { value: 'scotland', label: 'Scotland', cities: ['Edinburgh', 'Glasgow', 'Aberdeen'] },
                { value: 'wales', label: 'Wales', cities: ['Cardiff', 'Swansea', 'Newport'] },
                { value: 'northern-ireland', label: 'Northern Ireland', cities: ['Belfast', 'Londonderry', 'Lisburn'] }
            ]
        }
    };

    const RAW_COUNTRIES = [
        { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
        { code: 'AL', name: 'Albania', flag: '🇦🇱' },
        { code: 'AD', name: 'Andorra', flag: '🇦🇩' },
        { code: 'AT', name: 'Austria', flag: '🇦🇹' },
        { code: 'BY', name: 'Belarus', flag: '🇧🇾' },
        { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
        { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
        { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
        { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
        { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
        { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
        { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
        { code: 'FI', name: 'Finland', flag: '🇫🇮' },
        { code: 'FR', name: 'France', flag: '🇫🇷' },
        { code: 'DE', name: 'Germany', flag: '🇩🇪' },
        { code: 'GR', name: 'Greece', flag: '🇬🇷' },
        { code: 'VA', name: 'Holy See (Vatican City)', flag: '🇻🇦' },
        { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
        { code: 'IS', name: 'Iceland', flag: '🇮🇸' },
        { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
        { code: 'IT', name: 'Italy', flag: '🇮🇹' },
        { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
        { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮' },
        { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
        { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
        { code: 'MT', name: 'Malta', flag: '🇲🇹' },
        { code: 'MD', name: 'Moldova', flag: '🇲🇩' },
        { code: 'MC', name: 'Monaco', flag: '🇲🇨' },
        { code: 'ME', name: 'Montenegro', flag: '🇲🇪' },
        { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
        { code: 'MK', name: 'North Macedonia', flag: '🇲🇰' },
        { code: 'NO', name: 'Norway', flag: '🇳🇴' },
        { code: 'PL', name: 'Poland', flag: '🇵🇱' },
        { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
        { code: 'RO', name: 'Romania', flag: '🇷🇴' },
        { code: 'RU', name: 'Russia', flag: '🇷🇺' },
        { code: 'SM', name: 'San Marino', flag: '🇸🇲' },
        { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
        { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
        { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
        { code: 'ES', name: 'Spain', flag: '🇪🇸' },
        { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
        { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
        { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
        { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' }
    ];

    const AVAILABLE_COUNTRIES = RAW_COUNTRIES.map(country => ({
        ...country,
        hasStates: Boolean(LOCATION_DATA[country.code]?.regions?.length)
    }));

    const EXPANSION_REGIONS = [
        { value: 'americas', label: 'Americas', icon: '🌎', examples: 'USA, Canada, Brazil, Argentina, Chile, Mexico...' },
        { value: 'asia', label: 'Asia', icon: '🌏', examples: 'Japan, Singapore, South Korea, India, China...' },
        { value: 'middle_east', label: 'Middle East', icon: '🕌', examples: 'UAE, Israel, Saudi Arabia, Qatar, Turkey...' },
        { value: 'oceania', label: 'Oceania', icon: '🦘', examples: 'Australia, New Zealand, Fiji, Papua New Guinea...' },
        { value: 'africa', label: 'Africa', icon: '🦁', examples: 'South Africa, Kenya, Egypt, Morocco, Nigeria...' }
    ];

    function slugify(value) {
        return value
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function getPersistedLocation() {
        try {
            const stored = localStorage.getItem('tessera_form_data');
            if (stored) {
                const parsed = JSON.parse(stored);
                return {
                    country: parsed.country || '',
                    state: parsed.state || '',
                    city: parsed.city || ''
                };
            }
        } catch (error) {
            console.warn('Unable to read persisted location data:', error);
        }
        return { country: '', state: '', city: '' };
    }

    function populateCountries(countrySelect, selectedCountry) {
        countrySelect.innerHTML = '<option value="">Select your country</option>';

        const paraguay = AVAILABLE_COUNTRIES.find(country => country.code === 'PY');
        if (paraguay) {
            countrySelect.appendChild(createCountryOption(paraguay));
        }

        const europeDivider = document.createElement('option');
        europeDivider.disabled = true;
        europeDivider.textContent = '─────────────── Europe ───────────────';
        europeDivider.style.fontWeight = '600';
        europeDivider.style.color = '#D4AF37';
        europeDivider.style.textAlign = 'center';
        europeDivider.style.backgroundColor = '#f7fafc';
        countrySelect.appendChild(europeDivider);

        AVAILABLE_COUNTRIES.filter(country => country.code !== 'PY').forEach(country => {
            countrySelect.appendChild(createCountryOption(country));
        });

        const bottomDivider = document.createElement('option');
        bottomDivider.disabled = true;
        bottomDivider.textContent = '───────────────────────────────────';
        bottomDivider.style.fontWeight = '600';
        bottomDivider.style.color = '#D4AF37';
        bottomDivider.style.textAlign = 'center';
        countrySelect.appendChild(bottomDivider);

        const otherOption = document.createElement('option');
        otherOption.value = 'OTHER';
        otherOption.textContent = '🌍 My country isn\'t listed yet';
        otherOption.style.fontWeight = '500';
        otherOption.style.color = '#4299e1';
        otherOption.style.fontStyle = 'italic';
        countrySelect.appendChild(otherOption);

        if (selectedCountry && countrySelect.querySelector(`option[value="${selectedCountry}"]`)) {
            countrySelect.value = selectedCountry;
        } else {
            countrySelect.value = '';
        }
    }

    function createCountryOption(country) {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.flag} ${country.name}`;
        return option;
    }

    function resetStateCity(stateSelect, citySelect) {
        stateSelect.innerHTML = '<option value="">Select your state/province</option>';
        stateSelect.disabled = true;
        citySelect.innerHTML = '<option value="">Select your city</option>';
        citySelect.disabled = true;
    }

    function populateStates(stateSelect, citySelect, countryCode, preservedState, preservedCity) {
        const countryData = LOCATION_DATA[countryCode];
        if (!countryData || !countryData.regions || countryData.regions.length === 0) {
            resetStateCity(stateSelect, citySelect);
            return;
        }

        stateSelect.disabled = false;
        stateSelect.innerHTML = '<option value="">Select your state/province</option>';

        countryData.regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region.value;
            option.textContent = region.label;
            stateSelect.appendChild(option);
        });

        if (preservedState && stateSelect.querySelector(`option[value="${preservedState}"]`)) {
            stateSelect.value = preservedState;
            populateCities(citySelect, countryCode, preservedState, preservedCity);
        } else {
            citySelect.innerHTML = '<option value="">Select your city</option>';
            citySelect.disabled = true;
        }
    }

    function populateCities(citySelect, countryCode, stateValue, preservedCity) {
        const countryData = LOCATION_DATA[countryCode];
        const region = countryData?.regions?.find(entry => entry.value === stateValue);
        citySelect.innerHTML = '<option value="">Select your city</option>';

        if (!region) {
            citySelect.disabled = true;
            return;
        }

        citySelect.disabled = false;
        region.cities.forEach(city => {
            const option = document.createElement('option');
            const value = slugify(city);
            option.value = value;
            option.textContent = city;
            citySelect.appendChild(option);
        });

        const otherOption = document.createElement('option');
        otherOption.value = 'other';
        otherOption.textContent = 'Other (specify)';
        citySelect.appendChild(otherOption);

        if (preservedCity && citySelect.querySelector(`option[value="${preservedCity}"]`)) {
            citySelect.value = preservedCity;
        }
    }

    function handleCountryChange(countrySelect, stateSelect, citySelect) {
        const selectedCountry = countrySelect.value;

        if (!selectedCountry) {
            resetStateCity(stateSelect, citySelect);
            return;
        }

        if (selectedCountry === 'OTHER') {
            showExpansionModal();
            resetStateCity(stateSelect, citySelect);
            return;
        }

        populateStates(stateSelect, citySelect, selectedCountry);
    }

    function handleStateChange(countrySelect, stateSelect, citySelect) {
        const countryCode = countrySelect.value;
        const stateValue = stateSelect.value;

        if (!countryCode || !stateValue) {
            citySelect.innerHTML = '<option value="">Select your city</option>';
            citySelect.disabled = true;
            return;
        }

        populateCities(citySelect, countryCode, stateValue);
    }

    function initializeParaguayEuropeSelector() {
        const countrySelect = document.getElementById('country');
        const stateSelect = document.getElementById('state');
        const citySelect = document.getElementById('city');

        if (!countrySelect || !stateSelect || !citySelect) {
            console.warn('Location selectors not found on the page.');
            return;
        }

        const persisted = getPersistedLocation();

        populateCountries(countrySelect, persisted.country);
        resetStateCity(stateSelect, citySelect);

        countrySelect.addEventListener('change', function() {
            handleCountryChange(countrySelect, stateSelect, citySelect);
        });

        stateSelect.addEventListener('change', function() {
            handleStateChange(countrySelect, stateSelect, citySelect);
        });

        if (persisted.country && persisted.country !== 'OTHER') {
            populateStates(stateSelect, citySelect, persisted.country, persisted.state, persisted.city);
        }

        createExpansionModal();
    }

    function showExpansionModal() {
        const modal = document.getElementById('expansionModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeExpansionModal() {
        const modal = document.getElementById('expansionModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        const countrySelect = document.getElementById('country');
        if (countrySelect) {
            countrySelect.value = '';
        }

        const form = document.getElementById('expansionForm');
        if (form) {
            form.style.display = 'block';
        }

        const footer = document.getElementById('expansionFooter');
        if (footer) {
            footer.style.display = 'flex';
        }

        const success = document.getElementById('expansionSuccess');
        if (success) {
            success.classList.remove('active');
        }

        document.querySelectorAll('input[name="expansion-region"]').forEach(input => input.checked = false);
        const countryInput = document.getElementById('expansionCountry');
        if (countryInput) countryInput.value = '';
        const emailInput = document.getElementById('expansionEmail');
        if (emailInput) emailInput.value = '';
    }

    function createExpansionModal() {
        if (document.getElementById('expansionModal')) {
            return;
        }

        const modalHTML = `
        <div id="expansionModal" class="expansion-modal-overlay">
            <div class="expansion-modal">
                <div class="expansion-modal-header">
                    <div class="expansion-modal-icon">🌍</div>
                    <h2 class="expansion-modal-title">We're Growing Globally</h2>
                    <p class="expansion-modal-subtitle">Help shape our expansion roadmap</p>
                </div>

                <div class="expansion-modal-body" id="expansionForm">
                    <div class="expansion-intro">
                        <p>We're thrilled by your interest in Tessera Amoris! Currently, we're focused on creating exceptional matches between <strong>Paraguay and Europe</strong> as we refine our process and build our community.</p>
                        <p style="margin-top: 16px;"><strong>Your input matters:</strong> By sharing where you're from, you help us prioritize which regions to launch next. We'll keep you informed as we expand and would love to welcome you when we reach your area.</p>
                    </div>

                    <div class="expansion-form-group">
                        <label class="expansion-form-label">Which region are you from?</label>
                        <div class="expansion-region-options">
                            ${EXPANSION_REGIONS.map(region => `
                                <div class="expansion-region-option">
                                    <input type="radio" id="region-${region.value}" name="expansion-region" value="${region.value}">
                                    <label for="region-${region.value}" class="expansion-region-label">
                                        <span class="expansion-region-icon">${region.icon}</span>
                                        <span class="expansion-region-text">
                                            <span class="expansion-region-name">${region.label}</span>
                                            <span class="expansion-region-examples">${region.examples}</span>
                                        </span>
                                    </label>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="expansion-form-group">
                        <label for="expansionCountry" class="expansion-form-label">Your specific country</label>
                        <input type="text" id="expansionCountry" class="expansion-input" placeholder="e.g., United States, Brazil, Australia...">
                    </div>

                    <div class="expansion-form-group">
                        <label for="expansionEmail" class="expansion-form-label">Stay in touch (optional)</label>
                        <input type="email" id="expansionEmail" class="expansion-input" placeholder="your@email.com">
                        <div class="expansion-input-hint">
                            <i class="fas fa-bell"></i> Be the first to know when we launch in your region
                        </div>
                    </div>
                </div>

                <div class="expansion-success-message" id="expansionSuccess">
                    <div class="expansion-success-icon">✨</div>
                    <h3 class="expansion-success-title">Thank You for Your Interest!</h3>
                    <p class="expansion-success-text">We've recorded your interest and will prioritize regions based on demand. You're helping us build something truly special.</p>

                    <div class="expansion-next-steps">
                        <div class="expansion-step-item">
                            <div class="expansion-step-icon">📊</div>
                            <div class="expansion-step-text">
                                <strong>We'll analyze demand</strong>
                                <span>Your region will be considered for our next phase</span>
                            </div>
                        </div>
                        <div class="expansion-step-item">
                            <div class="expansion-step-icon">🚀</div>
                            <div class="expansion-step-text">
                                <strong>We'll notify you first</strong>
                                <span>When we launch in your area, you'll be among the first to know</span>
                            </div>
                        </div>
                        <div class="expansion-step-item">
                            <div class="expansion-step-icon">💝</div>
                            <div class="expansion-step-text">
                                <strong>You'll get priority access</strong>
                                <span>Early supporters receive special consideration</span>
                            </div>
                        </div>
                    </div>

                    <p class="expansion-timeline-note">
                        <i class="fas fa-info-circle"></i> We're currently focused on Paraguay-Europe connections. We'll reach out when we're ready to expand to your region—typically within 6-12 months based on demand.
                    </p>

                    <button class="expansion-btn expansion-btn-primary" onclick="closeExpansionModal()">Got It, Thanks!</button>
                </div>

                <div class="expansion-modal-footer" id="expansionFooter">
                    <button class="expansion-btn expansion-btn-secondary" onclick="closeExpansionModal()">Maybe Later</button>
                    <button class="expansion-btn expansion-btn-primary" onclick="submitExpansionInterest()">Share My Interest</button>
                </div>
            </div>
        </div>
    `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        document.getElementById('expansionModal').addEventListener('click', function(e) {
            if (e.target.id === 'expansionModal') {
                closeExpansionModal();
            }
        });
    }

    async function submitExpansionInterest() {
        const region = document.querySelector('input[name="expansion-region"]:checked')?.value;
        const country = document.getElementById('expansionCountry')?.value.trim();
        const email = document.getElementById('expansionEmail')?.value.trim();

        if (!region || !country) {
            alert('Please select a region and specify your country.');
            return;
        }

        const data = { region, country, email, timestamp: new Date().toISOString() };

        try {
            const existing = JSON.parse(localStorage.getItem('expansionInterests') || '[]');
            existing.push(data);
            localStorage.setItem('expansionInterests', JSON.stringify(existing));
            console.log('Expansion interest saved:', data);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }

        try {
            await fetch('/api/submit-expansion-interest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log('API not available, saved to localStorage only');
        }

        document.getElementById('expansionForm').style.display = 'none';
        document.getElementById('expansionFooter').style.display = 'none';
        document.getElementById('expansionSuccess').classList.add('active');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeParaguayEuropeSelector);
    } else {
        initializeParaguayEuropeSelector();
    }

    window.closeExpansionModal = closeExpansionModal;
    window.submitExpansionInterest = submitExpansionInterest;
})();
