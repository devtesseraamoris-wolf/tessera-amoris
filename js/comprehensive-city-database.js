// Dynamic Location Data Service for Paraguay and European Countries
(function() {
    const LOCATION_API_ENDPOINTS = {
        states: 'https://countriesnow.space/api/v0.1/countries/states',
        cities: 'https://countriesnow.space/api/v0.1/countries/state/cities'
    };

    const allowedCountries = {
        'PY': { label: 'Paraguay', apiName: 'Paraguay' },
        'AL': { label: 'Albania', apiName: 'Albania' },
        'AD': { label: 'Andorra', apiName: 'Andorra' },
        'AT': { label: 'Austria', apiName: 'Austria' },
        'BY': { label: 'Belarus', apiName: 'Belarus' },
        'BE': { label: 'Belgium', apiName: 'Belgium' },
        'BA': { label: 'Bosnia and Herzegovina', apiName: 'Bosnia and Herzegovina' },
        'BG': { label: 'Bulgaria', apiName: 'Bulgaria' },
        'HR': { label: 'Croatia', apiName: 'Croatia' },
        'CZ': { label: 'Czech Republic', apiName: 'Czech Republic' },
        'DK': { label: 'Denmark', apiName: 'Denmark' },
        'EE': { label: 'Estonia', apiName: 'Estonia' },
        'FI': { label: 'Finland', apiName: 'Finland' },
        'FR': { label: 'France', apiName: 'France' },
        'DE': { label: 'Germany', apiName: 'Germany' },
        'GR': { label: 'Greece', apiName: 'Greece' },
        'VA': { label: 'Holy See (Vatican City)', apiName: 'Holy See (Vatican City State)' },
        'HU': { label: 'Hungary', apiName: 'Hungary' },
        'IS': { label: 'Iceland', apiName: 'Iceland' },
        'IE': { label: 'Ireland', apiName: 'Ireland' },
        'IT': { label: 'Italy', apiName: 'Italy' },
        'LV': { label: 'Latvia', apiName: 'Latvia' },
        'LI': { label: 'Liechtenstein', apiName: 'Liechtenstein' },
        'LT': { label: 'Lithuania', apiName: 'Lithuania' },
        'LU': { label: 'Luxembourg', apiName: 'Luxembourg' },
        'MT': { label: 'Malta', apiName: 'Malta' },
        'MD': { label: 'Moldova', apiName: 'Moldova' },
        'MC': { label: 'Monaco', apiName: 'Monaco' },
        'ME': { label: 'Montenegro', apiName: 'Montenegro' },
        'NL': { label: 'Netherlands', apiName: 'Netherlands' },
        'MK': { label: 'North Macedonia', apiName: 'Macedonia' },
        'NO': { label: 'Norway', apiName: 'Norway' },
        'PL': { label: 'Poland', apiName: 'Poland' },
        'PT': { label: 'Portugal', apiName: 'Portugal' },
        'RO': { label: 'Romania', apiName: 'Romania' },
        'RU': { label: 'Russia', apiName: 'Russia' },
        'SM': { label: 'San Marino', apiName: 'San Marino' },
        'RS': { label: 'Serbia', apiName: 'Serbia' },
        'SK': { label: 'Slovakia', apiName: 'Slovakia' },
        'SI': { label: 'Slovenia', apiName: 'Slovenia' },
        'ES': { label: 'Spain', apiName: 'Spain' },
        'SE': { label: 'Sweden', apiName: 'Sweden' },
        'CH': { label: 'Switzerland', apiName: 'Switzerland' },
        'UA': { label: 'Ukraine', apiName: 'Ukraine' },
        'GB': { label: 'United Kingdom', apiName: 'United Kingdom' }
    };

    const stateCache = {};
    const stateLookup = {};
    const cityCache = {};
    const fallbackDatasets = {};
    const fallbackCityMap = {};

    function sanitizeCode(value) {
        if (!value) return '';
        return value
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function cleanList(items) {
        return Array.from(new Set(
            (items || [])
                .map(item => (item || '').toString().trim())
                .filter(item => item.length > 0)
        ));
    }

    function registerFallbackDataset(countryCode, states) {
        if (!states || !states.length) return;
        const preparedStates = states.map(state => {
            const name = (state.name || '').trim();
            if (!name) return null;
            const code = sanitizeCode(state.code || name);
            const cities = cleanList(state.cities || []);
            fallbackCityMap[`${countryCode}::${code}`] = cities;
            return { code, name };
        }).filter(Boolean);

        if (preparedStates.length) {
            fallbackDatasets[countryCode] = preparedStates.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    const curatedDatasets = {
        'PY': [
            { code: 'asuncion', name: 'Asunción (Capital District)', cities: ['Asunción'] },
            { name: 'Alto Paraguay', cities: ['Fuerte Olimpo', 'Bahía Negra', 'Carmelo Peralta', 'Puerto Casado'] },
            { name: 'Alto Paraná', cities: ['Ciudad del Este', 'Presidente Franco', 'Hernandarias', 'Minga Guazú', 'Santa Rita'] },
            { name: 'Amambay', cities: ['Pedro Juan Caballero', 'Capitán Bado', 'Bella Vista Norte', 'Zanja Pytã'] },
            { name: 'Boquerón', cities: ['Filadelfia', 'Loma Plata', 'Mariscal Estigarribia', 'Neuland'] },
            { name: 'Caaguazú', cities: ['Coronel Oviedo', 'Caaguazú', 'Repatriación', 'Juan Manuel Frutos', 'José Domingo Ocampos'] },
            { name: 'Caazapá', cities: ['Caazapá', 'San Juan Nepomuceno', 'Abaí', 'Yuty', 'Tavaí'] },
            { name: 'Canindeyú', cities: ['Salto del Guairá', 'Curuguaty', 'Katueté', 'Ybyrarobana', 'Villa Ygatimí'] },
            { name: 'Central', cities: ['San Lorenzo', 'Luque', 'Capiatá', 'Lambaré', 'Fernando de la Mora', 'Ñemby', 'Mariano Roque Alonso', 'Villa Elisa', 'Itauguá', 'Limpio'] },
            { name: 'Concepción', cities: ['Concepción', 'Horqueta', 'Loreto', 'Belén', 'Vallemí'] },
            { name: 'Cordillera', cities: ['Caacupé', 'Eusebio Ayala', 'Itacurubí de la Cordillera', 'Tobatí', 'San Bernardino'] },
            { name: 'Guairá', cities: ['Villarrica', 'Coronel Martínez', 'Borja', 'Iturbe', 'Mbocayaty'] },
            { name: 'Itapúa', cities: ['Encarnación', 'Hohenau', 'Obligado', 'Bella Vista', 'Capitán Miranda', 'Fram'] },
            { name: 'Misiones', cities: ['San Juan Bautista', 'Ayolas', 'San Ignacio', 'San Miguel', 'Villa Florida'] },
            { name: 'Ñeembucú', cities: ['Pilar', 'Humaitá', 'Paso de Patria', 'Isla Umbú', 'Desmochados'] },
            { name: 'Paraguarí', cities: ['Paraguarí', 'Carapeguá', 'Pirayú', 'Yaguarón', 'La Colmena'] },
            { name: 'Presidente Hayes', cities: ['Villa Hayes', 'Nanawa', 'Pozo Colorado', 'Teniente Irala Fernández', 'Nueva Asunción'] },
            { name: 'San Pedro', cities: ['San Pedro de Ycuamandiyú', 'Santa Rosa del Aguaray', 'Choré', 'Lima', 'Itacurubí del Rosario'] }
        ],
        'AL': [
            { name: 'Tirana County', cities: ['Tirana', 'Kamëz', 'Vorë', 'Kavajë'] },
            { name: 'Shkodër County', cities: ['Shkodër', 'Lezhë', 'Koplik', 'Pukë'] },
            { name: 'Vlorë County', cities: ['Vlorë', 'Sarandë', 'Himarë', 'Delvinë'] }
        ],
        'AD': [
            { name: 'Andorra la Vella', cities: ['Andorra la Vella', 'Santa Coloma', 'La Margineda'] },
            { name: 'Canillo', cities: ['Canillo', 'Soldeu', 'El Tarter'] },
            { name: 'Encamp', cities: ['Encamp', 'Pas de la Casa', 'Vila'] },
            { name: 'Escaldes-Engordany', cities: ['Escaldes-Engordany', 'Engolasters', 'Els Vilars'] },
            { name: 'La Massana', cities: ['La Massana', 'Arinsal', 'Anyós'] },
            { name: 'Ordino', cities: ['Ordino', 'La Cortinada', 'El Serrat'] },
            { name: 'Sant Julià de Lòria', cities: ['Sant Julià de Lòria', 'Fontaneda', 'Bixessarri'] }
        ],
        'AT': [
            { name: 'Vienna', cities: ['Vienna', 'Donaustadt', 'Favoriten', 'Leopoldstadt'] },
            { name: 'Lower Austria', cities: ['St. Pölten', 'Wiener Neustadt', 'Krems an der Donau', 'Baden'] },
            { name: 'Tyrol', cities: ['Innsbruck', 'Kufstein', 'Lienz', 'Telfs'] },
            { name: 'Styria', cities: ['Graz', 'Leoben', 'Kapfenberg', 'Bruck an der Mur'] }
        ],
        'BY': [
            { name: 'Minsk Region', cities: ['Minsk', 'Zhodzina', 'Barysaw', 'Maladzyechna'] },
            { name: 'Brest Region', cities: ['Brest', 'Baranavichy', 'Pinsk', 'Kobryn'] },
            { name: 'Vitebsk Region', cities: ['Vitebsk', 'Orsha', 'Polotsk', 'Novopolotsk'] }
        ],
        'BE': [
            { name: 'Brussels-Capital Region', cities: ['Brussels', 'Anderlecht', 'Schaerbeek', 'Ixelles'] },
            { name: 'Flanders', cities: ['Antwerp', 'Ghent', 'Bruges', 'Leuven'] },
            { name: 'Wallonia', cities: ['Liège', 'Namur', 'Charleroi', 'Mons'] }
        ],
        'BA': [
            { name: 'Sarajevo Canton', cities: ['Sarajevo', 'Ilidža', 'Vogošća', 'Hadžići'] },
            { name: 'Herzegovina-Neretva Canton', cities: ['Mostar', 'Konjic', 'Čapljina', 'Jablanica'] },
            { name: 'Banja Luka Region', cities: ['Banja Luka', 'Prijedor', 'Gradiška', 'Laktaši'] }
        ],
        'BG': [
            { name: 'Sofia Province', cities: ['Sofia', 'Bankya', 'Novi Iskar', 'Botevgrad'] },
            { name: 'Plovdiv Province', cities: ['Plovdiv', 'Asenovgrad', 'Karlovo', 'Rakovski'] },
            { name: 'Varna Province', cities: ['Varna', 'Devnya', 'Provadia', 'Balchik'] }
        ],
        'HR': [
            { name: 'City of Zagreb', cities: ['Zagreb', 'Sesvete', 'Samobor', 'Velika Gorica'] },
            { name: 'Split-Dalmatia County', cities: ['Split', 'Trogir', 'Makarska', 'Sinj'] },
            { name: 'Istria County', cities: ['Pula', 'Rovinj', 'Poreč', 'Umag'] }
        ],
        'CZ': [
            { name: 'Prague', cities: ['Prague 1', 'Prague 4', 'Prague 6', 'Prague 10'] },
            { name: 'South Moravian Region', cities: ['Brno', 'Znojmo', 'Hodonín', 'Břeclav'] },
            { name: 'Central Bohemian Region', cities: ['Kladno', 'Mladá Boleslav', 'Kolín', 'Benešov'] }
        ],
        'DK': [
            { name: 'Capital Region', cities: ['Copenhagen', 'Frederiksberg', 'Lyngby', 'Hillerød'] },
            { name: 'Central Denmark Region', cities: ['Aarhus', 'Randers', 'Silkeborg', 'Horsens'] },
            { name: 'Southern Denmark Region', cities: ['Odense', 'Esbjerg', 'Kolding', 'Sønderborg'] }
        ],
        'EE': [
            { name: 'Harju County', cities: ['Tallinn', 'Maardu', 'Keila', 'Saue'] },
            { name: 'Tartu County', cities: ['Tartu', 'Elva', 'Nõo', 'Kambja'] },
            { name: 'Ida-Viru County', cities: ['Narva', 'Kohtla-Järve', 'Jõhvi', 'Sillamäe'] }
        ],
        'FI': [
            { name: 'Uusimaa', cities: ['Helsinki', 'Espoo', 'Vantaa', 'Porvoo'] },
            { name: 'Pirkanmaa', cities: ['Tampere', 'Nokia', 'Ylöjärvi', 'Kangasala'] },
            { name: 'Southwest Finland', cities: ['Turku', 'Salo', 'Kaarina', 'Naantali'] }
        ],
        'FR': [
            { name: 'Île-de-France', cities: ['Paris', 'Boulogne-Billancourt', 'Saint-Denis', 'Versailles'] },
            { name: 'Provence-Alpes-Côte d\'Azur', cities: ['Marseille', 'Nice', 'Toulon', 'Avignon'] },
            { name: 'Auvergne-Rhône-Alpes', cities: ['Lyon', 'Grenoble', 'Clermont-Ferrand', 'Annecy'] }
        ],
        'DE': [
            { name: 'Bavaria', cities: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg'] },
            { name: 'North Rhine-Westphalia', cities: ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen'] },
            { name: 'Baden-Württemberg', cities: ['Stuttgart', 'Mannheim', 'Karlsruhe', 'Freiburg'] },
            { name: 'Berlin', cities: ['Berlin Mitte', 'Charlottenburg', 'Prenzlauer Berg', 'Kreuzberg'] },
            { name: 'Hamburg', cities: ['Hamburg', 'Altona', 'Wandsbek', 'Harburg'] }
        ],
        'GR': [
            { name: 'Attica', cities: ['Athens', 'Piraeus', 'Peristeri', 'Kallithea'] },
            { name: 'Central Macedonia', cities: ['Thessaloniki', 'Katerini', 'Serres', 'Veroia'] },
            { name: 'Crete', cities: ['Heraklion', 'Chania', 'Rethymno', 'Agios Nikolaos'] }
        ],
        'VA': [
            { name: 'Vatican City', cities: ['Vatican City'] }
        ],
        'HU': [
            { name: 'Central Hungary', cities: ['Budapest', 'Érd', 'Vác', 'Szentendre'] },
            { name: 'Transdanubia', cities: ['Győr', 'Székesfehérvár', 'Pécs', 'Veszprém'] },
            { name: 'Great Plain and North', cities: ['Debrecen', 'Szeged', 'Nyíregyháza', 'Miskolc'] }
        ],
        'IS': [
            { name: 'Capital Region', cities: ['Reykjavík', 'Kópavogur', 'Hafnarfjörður', 'Garðabær'] },
            { name: 'Southern Peninsula', cities: ['Keflavík', 'Sandgerði', 'Grindavík', 'Vogar'] },
            { name: 'Northeastern Region', cities: ['Akureyri', 'Húsavík', 'Egilsstaðir', 'Dalvík'] }
        ],
        'IE': [
            { name: 'Dublin Province', cities: ['Dublin', 'Swords', 'Tallaght', 'Dún Laoghaire'] },
            { name: 'Munster', cities: ['Cork', 'Limerick', 'Waterford', 'Tralee'] },
            { name: 'Connacht', cities: ['Galway', 'Sligo', 'Castlebar', 'Ballina'] }
        ],
        'IT': [
            { name: 'Lombardy', cities: ['Milan', 'Bergamo', 'Brescia', 'Monza'] },
            { name: 'Lazio', cities: ['Rome', 'Fiumicino', 'Latina', 'Viterbo'] },
            { name: 'Veneto', cities: ['Venice', 'Verona', 'Padua', 'Treviso'] },
            { name: 'Campania', cities: ['Naples', 'Salerno', 'Caserta', 'Benevento'] }
        ],
        'LV': [
            { name: 'Riga Planning Region', cities: ['Riga', 'Jūrmala', 'Sigulda', 'Ogre'] },
            { name: 'Latgale', cities: ['Daugavpils', 'Rēzekne', 'Ludza', 'Krāslava'] },
            { name: 'Kurzeme', cities: ['Liepāja', 'Ventspils', 'Tukums', 'Kuldīga'] }
        ],
        'LI': [
            { name: 'Balzers', cities: ['Balzers'] },
            { name: 'Eschen', cities: ['Eschen'] },
            { name: 'Gamprin', cities: ['Gamprin', 'Bendern'] },
            { name: 'Mauren', cities: ['Mauren', 'Schaanwald'] },
            { name: 'Planken', cities: ['Planken'] },
            { name: 'Ruggell', cities: ['Ruggell'] },
            { name: 'Schaan', cities: ['Schaan'] },
            { name: 'Schellenberg', cities: ['Schellenberg'] },
            { name: 'Triesen', cities: ['Triesen'] },
            { name: 'Triesenberg', cities: ['Triesenberg', 'Masescha', 'Malbun'] },
            { name: 'Vaduz', cities: ['Vaduz'] }
        ],
        'LT': [
            { name: 'Vilnius County', cities: ['Vilnius', 'Trakai', 'Ukmergė', 'Šalčininkai'] },
            { name: 'Kaunas County', cities: ['Kaunas', 'Kėdainiai', 'Jonava', 'Prienai'] },
            { name: 'Klaipėda County', cities: ['Klaipėda', 'Palanga', 'Kretinga', 'Šilutė'] }
        ],
        'LU': [
            { name: 'Diekirch District', cities: ['Diekirch', 'Ettelbruck', 'Wiltz'] },
            { name: 'Grevenmacher District', cities: ['Grevenmacher', 'Echternach', 'Remich'] },
            { name: 'Luxembourg District', cities: ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange'] }
        ],
        'MT': [
            { name: 'Northern Region', cities: ['Mellieħa', 'St. Paul\'s Bay', 'Mġarr', 'Naxxar'] },
            { name: 'Southern Region', cities: ['Żejtun', 'Żurrieq', 'Birżebbuġa', 'Fgura'] },
            { name: 'Central Region', cities: ['Birkirkara', 'Qormi', 'Mosta', 'Attard'] },
            { name: 'South Eastern Region', cities: ['Marsaxlokk', 'Żabbar', 'Għaxaq', 'Kirkop'] },
            { name: 'Western Region', cities: ['Rabat', 'Żebbuġ', 'Siġġiewi', 'Mtarfa'] },
            { name: 'Gozo Region', cities: ['Victoria', 'Xewkija', 'Xagħra', 'Żebbuġ (Gozo)'] }
        ],
        'MD': [
            { name: 'Chișinău Municipality', cities: ['Chișinău', 'Codru', 'Durlești', 'Cricova'] },
            { name: 'Bălți Municipality', cities: ['Bălți', 'Fălești', 'Râșcani', 'Glodeni'] },
            { name: 'Gagauzia', cities: ['Comrat', 'Ceadîr-Lunga', 'Vulcănești', 'Congaz'] }
        ],
        'MC': [
            { name: 'Fontvieille', cities: ['Fontvieille'] },
            { name: 'La Condamine', cities: ['La Condamine'] },
            { name: 'Monte Carlo', cities: ['Monte Carlo'] },
            { name: 'Monaco-Ville', cities: ['Monaco-Ville'] }
        ],
        'ME': [
            { name: 'Podgorica Capital City', cities: ['Podgorica', 'Tuzi', 'Golubovci', 'Danilovgrad'] },
            { name: 'Coastal Region', cities: ['Budva', 'Kotor', 'Bar', 'Herceg Novi'] },
            { name: 'Northern Region', cities: ['Nikšić', 'Bijelo Polje', 'Pljevlja', 'Berane'] }
        ],
        'NL': [
            { name: 'North Holland', cities: ['Amsterdam', 'Haarlem', 'Hilversum', 'Alkmaar'] },
            { name: 'South Holland', cities: ['Rotterdam', 'The Hague', 'Leiden', 'Dordrecht'] },
            { name: 'Utrecht', cities: ['Utrecht', 'Amersfoort', 'Nieuwegein', 'Zeist'] }
        ],
        'MK': [
            { name: 'Skopje Region', cities: ['Skopje', 'Tetovo', 'Kumanovo', 'Gostivar'] },
            { name: 'Pelagonia', cities: ['Bitola', 'Prilep', 'Kruševo', 'Resen'] },
            { name: 'Eastern Region', cities: ['Štip', 'Strumica', 'Kočani', 'Delčevo'] }
        ],
        'NO': [
            { name: 'Oslo og Viken', cities: ['Oslo', 'Drammen', 'Bærum', 'Fredrikstad'] },
            { name: 'Vestland', cities: ['Bergen', 'Stavanger', 'Haugesund', 'Florø'] },
            { name: 'Trøndelag', cities: ['Trondheim', 'Steinkjer', 'Stjørdal', 'Namsos'] }
        ],
        'PL': [
            { name: 'Masovian Voivodeship', cities: ['Warsaw', 'Radom', 'Płock', 'Siedlce'] },
            { name: 'Lesser Poland Voivodeship', cities: ['Kraków', 'Tarnów', 'Nowy Sącz', 'Oświęcim'] },
            { name: 'Silesian Voivodeship', cities: ['Katowice', 'Gliwice', 'Częstochowa', 'Bielsko-Biała'] }
        ],
        'PT': [
            { name: 'Lisbon District', cities: ['Lisbon', 'Amadora', 'Cascais', 'Sintra'] },
            { name: 'Porto District', cities: ['Porto', 'Vila Nova de Gaia', 'Matosinhos', 'Maia'] },
            { name: 'Faro District', cities: ['Faro', 'Albufeira', 'Lagos', 'Portimão'] }
        ],
        'RO': [
            { name: 'Bucharest-Ilfov', cities: ['Bucharest', 'Voluntari', 'Otopeni', 'Chitila'] },
            { name: 'Transylvania', cities: ['Cluj-Napoca', 'Brașov', 'Sibiu', 'Târgu Mureș'] },
            { name: 'Moldova Region', cities: ['Iași', 'Bacău', 'Suceava', 'Botoșani'] }
        ],
        'RU': [
            { name: 'Central Federal District', cities: ['Moscow', 'Tula', 'Ryazan', 'Kaluga'] },
            { name: 'Northwestern Federal District', cities: ['Saint Petersburg', 'Kaliningrad', 'Pskov', 'Murmansk'] },
            { name: 'Siberian Federal District', cities: ['Novosibirsk', 'Krasnoyarsk', 'Irkutsk', 'Omsk'] }
        ],
        'SM': [
            { name: 'Acquaviva', cities: ['Acquaviva'] },
            { name: 'Borgo Maggiore', cities: ['Borgo Maggiore'] },
            { name: 'Chiesanuova', cities: ['Chiesanuova'] },
            { name: 'Domagnano', cities: ['Domagnano'] },
            { name: 'Faetano', cities: ['Faetano'] },
            { name: 'Fiorentino', cities: ['Fiorentino'] },
            { name: 'Montegiardino', cities: ['Montegiardino'] },
            { name: 'San Marino', cities: ['City of San Marino'] },
            { name: 'Serravalle', cities: ['Serravalle'] }
        ],
        'RS': [
            { name: 'Belgrade District', cities: ['Belgrade', 'Zemun', 'Novi Beograd', 'Zvezdara'] },
            { name: 'Vojvodina', cities: ['Novi Sad', 'Subotica', 'Zrenjanin', 'Sombor'] },
            { name: 'Šumadija and Western Serbia', cities: ['Kragujevac', 'Čačak', 'Užice', 'Kraljevo'] }
        ],
        'SK': [
            { name: 'Bratislava Region', cities: ['Bratislava', 'Pezinok', 'Malacky', 'Senec'] },
            { name: 'Košice Region', cities: ['Košice', 'Michalovce', 'Spišská Nová Ves', 'Rožňava'] },
            { name: 'Žilina Region', cities: ['Žilina', 'Martin', 'Liptovský Mikuláš', 'Ružomberok'] }
        ],
        'SI': [
            { name: 'Central Slovenia', cities: ['Ljubljana', 'Domžale', 'Kamnik', 'Vrhnika'] },
            { name: 'Drava', cities: ['Maribor', 'Ptuj', 'Slovenska Bistrica', 'Ruše'] },
            { name: 'Coastal-Karst', cities: ['Koper', 'Piran', 'Izola', 'Sežana'] }
        ],
        'ES': [
            { name: 'Community of Madrid', cities: ['Madrid', 'Alcalá de Henares', 'Getafe', 'Leganés'] },
            { name: 'Catalonia', cities: ['Barcelona', 'Girona', 'Lleida', 'Tarragona'] },
            { name: 'Andalusia', cities: ['Seville', 'Málaga', 'Córdoba', 'Granada'] }
        ],
        'SE': [
            { name: 'Stockholm County', cities: ['Stockholm', 'Solna', 'Södertälje', 'Nacka'] },
            { name: 'Västra Götaland County', cities: ['Gothenburg', 'Borås', 'Trollhättan', 'Skövde'] },
            { name: 'Skåne County', cities: ['Malmö', 'Helsingborg', 'Lund', 'Kristianstad'] }
        ],
        'CH': [
            { name: 'Zürich', cities: ['Zürich', 'Winterthur', 'Uster', 'Dübendorf'] },
            { name: 'Geneva', cities: ['Geneva', 'Carouge', 'Lancy', 'Meyrin'] },
            { name: 'Basel-Stadt', cities: ['Basel', 'Riehen', 'Bettingen'] }
        ],
        'UA': [
            { name: 'Kyiv City', cities: ['Kyiv', 'Brovary', 'Irpin', 'Boryspil'] },
            { name: 'Lviv Oblast', cities: ['Lviv', 'Drohobych', 'Chervonohrad', 'Stryi'] },
            { name: 'Odessa Oblast', cities: ['Odessa', 'Chornomorsk', 'Izmail', 'Bilhorod-Dnistrovskyi'] }
        ],
        'GB': [
            { name: 'England', cities: ['London', 'Manchester', 'Birmingham', 'Bristol'] },
            { name: 'Scotland', cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'] },
            { name: 'Wales', cities: ['Cardiff', 'Swansea', 'Newport', 'Wrexham'] },
            { name: 'Northern Ireland', cities: ['Belfast', 'Derry', 'Lisburn', 'Newry'] }
        ]
    };

    Object.entries(curatedDatasets).forEach(([countryCode, states]) => {
        registerFallbackDataset(countryCode, states);
    });

    const supportsFetch = typeof fetch === 'function';

    async function fetchStatesFromApi(countryCode) {
        if (!supportsFetch) return [];
        const country = allowedCountries[countryCode];
        if (!country) return [];

        try {
            const response = await fetch(LOCATION_API_ENDPOINTS.states, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: country.apiName })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const result = await response.json();
            if (!result || result.error || !result.data || !Array.isArray(result.data.states)) {
                return [];
            }

            const uniqueStates = [];
            const seen = new Set();

            result.data.states.forEach(state => {
                const name = (state.name || state.state_code || '').toString().trim();
                if (!name) return;
                const key = name.toLowerCase();
                if (seen.has(key)) return;
                seen.add(key);
                uniqueStates.push({
                    code: sanitizeCode(state.state_code || name),
                    name
                });
            });

            return uniqueStates.sort((a, b) => a.name.localeCompare(b.name));
        } catch (error) {
            console.error('Failed to load states for', countryCode, error);
            return [];
        }
    }

    async function fetchCitiesFromApi(countryCode, stateCode) {
        if (!supportsFetch) return [];
        const country = allowedCountries[countryCode];
        const stateName = stateLookup[countryCode] ? stateLookup[countryCode][stateCode] : null;
        if (!country || !stateName) return [];

        try {
            const response = await fetch(LOCATION_API_ENDPOINTS.cities, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: country.apiName, state: stateName })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const result = await response.json();
            if (!result || result.error) return [];

            const cities = cleanList(result.data);
            cities.sort((a, b) => a.localeCompare(b));
            return cities;
        } catch (error) {
            console.error('Failed to load cities for', countryCode, stateCode, error);
            return [];
        }
    }

    async function getStates(countryCode) {
        if (stateCache[countryCode]) {
            return stateCache[countryCode];
        }

        let states = fallbackDatasets[countryCode] ? [...fallbackDatasets[countryCode]] : [];
        if (!states.length) {
            states = await fetchStatesFromApi(countryCode);
        }

        if (!states.length) {
            const countryLabel = allowedCountries[countryCode] ? allowedCountries[countryCode].label : 'General Region';
            states = [{ code: sanitizeCode(`${countryCode}-all`), name: `${countryLabel} - All Regions` }];
        }

        stateCache[countryCode] = states;
        stateLookup[countryCode] = states.reduce((lookup, state) => {
            lookup[state.code] = state.name;
            return lookup;
        }, {});

        return states;
    }

    async function getCities(countryCode, stateCode) {
        const cacheKey = `${countryCode}::${stateCode}`;
        if (cityCache[cacheKey]) {
            return cityCache[cacheKey];
        }

        let cities = fallbackCityMap[cacheKey] ? [...fallbackCityMap[cacheKey]] : [];
        if (!cities.length) {
            cities = await fetchCitiesFromApi(countryCode, stateCode);
        }

        cityCache[cacheKey] = cities;
        return cities;
    }

    function getCountryLabel(countryCode) {
        return allowedCountries[countryCode] ? allowedCountries[countryCode].label : '';
    }

    function getStateLabel(countryCode, stateCode) {
        if (!stateLookup[countryCode]) return '';
        return stateLookup[countryCode][stateCode] || '';
    }

    const service = {
        countries: allowedCountries,
        getStates,
        getCities,
        getCountryLabel,
        getStateLabel
    };

    if (typeof window !== 'undefined') {
        window.locationDataService = service;
        window.comprehensiveCityDatabase = {};
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = service;
    }
})();
