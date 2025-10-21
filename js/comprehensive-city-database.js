// Dynamic Location Data Service for Paraguay and European Countries
(function() {
    const allowedCountries = {
        "PY": { label: "Paraguay", apiName: "Paraguay" },
        "AL": { label: "Albania", apiName: "Albania" },
        "AD": { label: "Andorra", apiName: "Andorra" },
        "AT": { label: "Austria", apiName: "Austria" },
        "BY": { label: "Belarus", apiName: "Belarus" },
        "BE": { label: "Belgium", apiName: "Belgium" },
        "BA": { label: "Bosnia and Herzegovina", apiName: "Bosnia and Herzegovina" },
        "BG": { label: "Bulgaria", apiName: "Bulgaria" },
        "HR": { label: "Croatia", apiName: "Croatia" },
        "CY": { label: "Cyprus", apiName: "Cyprus" },
        "CZ": { label: "Czech Republic", apiName: "Czech Republic" },
        "DK": { label: "Denmark", apiName: "Denmark" },
        "EE": { label: "Estonia", apiName: "Estonia" },
        "FI": { label: "Finland", apiName: "Finland" },
        "FR": { label: "France", apiName: "France" },
        "DE": { label: "Germany", apiName: "Germany" },
        "GR": { label: "Greece", apiName: "Greece" },
        "VA": { label: "Holy See (Vatican City)", apiName: "Holy See (Vatican City State)" },
        "HU": { label: "Hungary", apiName: "Hungary" },
        "IS": { label: "Iceland", apiName: "Iceland" },
        "IE": { label: "Ireland", apiName: "Ireland" },
        "IT": { label: "Italy", apiName: "Italy" },
        "LV": { label: "Latvia", apiName: "Latvia" },
        "LI": { label: "Liechtenstein", apiName: "Liechtenstein" },
        "LT": { label: "Lithuania", apiName: "Lithuania" },
        "LU": { label: "Luxembourg", apiName: "Luxembourg" },
        "MT": { label: "Malta", apiName: "Malta" },
        "MD": { label: "Moldova", apiName: "Moldova" },
        "MC": { label: "Monaco", apiName: "Monaco" },
        "ME": { label: "Montenegro", apiName: "Montenegro" },
        "NL": { label: "Netherlands", apiName: "Netherlands" },
        "MK": { label: "North Macedonia", apiName: "North Macedonia" },
        "NO": { label: "Norway", apiName: "Norway" },
        "PL": { label: "Poland", apiName: "Poland" },
        "PT": { label: "Portugal", apiName: "Portugal" },
        "RO": { label: "Romania", apiName: "Romania" },
        "RU": { label: "Russia", apiName: "Russia" },
        "SM": { label: "San Marino", apiName: "San Marino" },
        "RS": { label: "Serbia", apiName: "Serbia" },
        "SK": { label: "Slovakia", apiName: "Slovakia" },
        "SI": { label: "Slovenia", apiName: "Slovenia" },
        "ES": { label: "Spain", apiName: "Spain" },
        "SE": { label: "Sweden", apiName: "Sweden" },
        "CH": { label: "Switzerland", apiName: "Switzerland" },
        "UA": { label: "Ukraine", apiName: "Ukraine" },
        "GB": { label: "United Kingdom", apiName: "United Kingdom" }
    };

    const stateCache = {};
    const stateLookup = {};
    const cityCache = {};
    const fallbackDatasets = {};
    const fallbackCityMap = {};

    function sanitizeCode(value) {
        if (!value) return "";
        return value
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    function cleanList(items) {
        return Array.from(new Set(
            (items || [])
                .map(item => (item || "").toString().trim())
                .filter(item => item.length > 0)
        ));
    }

    function registerFallbackDataset(countryCode, states) {
        if (!states || !states.length) return;
        const preparedStates = states.map(state => {
            const name = (state.name || "").trim();
            if (!name) return null;
            const code = sanitizeCode(state.code || name);
            let cities = cleanList(state.cities || []);
            if (!cities.length) {
                cities = [name];
            }
            fallbackCityMap[`${countryCode}::${code}`] = cities;
            return { code, name };
        }).filter(Boolean);

        if (preparedStates.length) {
            fallbackDatasets[countryCode] = preparedStates.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    const curatedDatasets = {
        "PY": [
            { code: "asuncion", name: "Asunción (Capital District)", cities: ["Asunción"] },
            { code: "alto-paraguay", name: "Alto Paraguay", cities: ["Fuerte Olimpo", "Bahía Negra", "Carmelo Peralta", "Puerto Casado"] },
            { code: "alto-parana", name: "Alto Paraná", cities: ["Ciudad del Este", "Presidente Franco", "Hernandarias", "Minga Guazú", "Santa Rita"] },
            { code: "amambay", name: "Amambay", cities: ["Pedro Juan Caballero", "Bella Vista Norte", "Capitán Bado", "Zanja Pytã"] },
            { code: "boqueron", name: "Boquerón", cities: ["Filadelfia", "Loma Plata", "Mariscal Estigarribia", "Neuland"] },
            { code: "caaguazu", name: "Caaguazú", cities: ["Coronel Oviedo", "Caaguazú", "Repatriación", "Juan E. O'Leary", "Doctor Cecilio Báez"] },
            { code: "caazapa", name: "Caazapá", cities: ["Caazapá", "San Juan Nepomuceno", "Abaí", "Yuty", "Tavaí"] },
            { code: "canindeyu", name: "Canindeyú", cities: ["Salto del Guairá", "Curuguaty", "Katueté", "Ybyrarobaná", "Villa Ygatimí"] },
            { code: "central", name: "Central", cities: ["San Lorenzo", "Luque", "Capiatá", "Fernando de la Mora", "Ñemby", "Lambaré"] },
            { code: "concepcion", name: "Concepción", cities: ["Concepción", "Horqueta", "Loreto", "Vallemí", "Belén"] },
            { code: "cordillera", name: "Cordillera", cities: ["Caacupé", "Eusebio Ayala", "Itacurubí de la Cordillera", "Tobatí", "San Bernardino"] },
            { code: "guaira", name: "Guairá", cities: ["Villarrica", "Iturbe", "Coronel Martínez", "Borja", "Mbocayaty"] },
            { code: "itapua", name: "Itapúa", cities: ["Encarnación", "Hohenau", "Obligado", "Bella Vista", "Capitán Miranda", "Fram"] },
            { code: "misiones", name: "Misiones", cities: ["San Juan Bautista", "Ayolas", "San Ignacio", "Santa Rosa", "Villa Florida"] },
            { code: "neembucu", name: "Ñeembucú", cities: ["Pilar", "Humaitá", "Paso de Patria", "Isla Umbú", "Villalbín"] },
            { code: "paraguari", name: "Paraguarí", cities: ["Paraguarí", "Carapeguá", "Yaguarón", "Pirayú", "Quiindy"] },
            { code: "presidente-hayes", name: "Presidente Hayes", cities: ["Villa Hayes", "Nanawa", "Pozo Colorado", "José Falcón", "Benjamín Aceval"] },
            { code: "san-pedro", name: "San Pedro", cities: ["San Pedro de Ycuamandiyú", "Santa Rosa del Aguaray", "Choré", "Itacurubí del Rosario", "Lima"] }
        ],
        "AL": [
            { code: "tirana", name: "Tirana County", cities: ["Tirana", "Kamëz", "Kavajë", "Vorë"] },
            { code: "durres", name: "Durrës County", cities: ["Durrës", "Shijak", "Krujë", "Manëz"] },
            { code: "shkoder", name: "Shkodër County", cities: ["Shkodër", "Lezhë", "Koplik", "Pukë"] },
            { code: "vlore", name: "Vlorë County", cities: ["Vlorë", "Sarandë", "Himarë", "Delvinë"] },
            { code: "korce", name: "Korçë County", cities: ["Korçë", "Pogradec", "Ersekë", "Maliq"] },
            { code: "elbasan", name: "Elbasan County", cities: ["Elbasan", "Librazhd", "Cërrik", "Gramsh"] }
        ],
        "AD": [
            { code: "andorra-la-vella", name: "Andorra la Vella", cities: ["Andorra la Vella", "Santa Coloma", "La Margineda"] },
            { code: "canillo", name: "Canillo", cities: ["Canillo", "Soldeu", "El Tarter"] },
            { code: "encamp", name: "Encamp", cities: ["Encamp", "Pas de la Casa", "Vila"] },
            { code: "escaldes-engordany", name: "Escaldes-Engordany", cities: ["Escaldes-Engordany", "Engolasters", "Els Vilars"] },
            { code: "la-massana", name: "La Massana", cities: ["La Massana", "Arinsal", "Anyós"] },
            { code: "ordino", name: "Ordino", cities: ["Ordino", "La Cortinada", "El Serrat"] },
            { code: "sant-julia", name: "Sant Julià de Lòria", cities: ["Sant Julià de Lòria", "Fontaneda", "Bixessarri"] }
        ],
        "AT": [
            { code: "burgenland", name: "Burgenland", cities: ["Eisenstadt", "Mattersburg", "Neusiedl am See", "Oberwart"] },
            { code: "carinthia", name: "Carinthia", cities: ["Klagenfurt", "Villach", "Wolfsberg", "Spittal an der Drau"] },
            { code: "lower-austria", name: "Lower Austria", cities: ["St. Pölten", "Wiener Neustadt", "Krems an der Donau", "Baden"] },
            { code: "upper-austria", name: "Upper Austria", cities: ["Linz", "Wels", "Steyr", "Leonding"] },
            { code: "salzburg", name: "Salzburg", cities: ["Salzburg", "Hallein", "Bischofshofen", "Saalfelden"] },
            { code: "styria", name: "Styria", cities: ["Graz", "Leoben", "Kapfenberg", "Bruck an der Mur"] },
            { code: "tyrol", name: "Tyrol", cities: ["Innsbruck", "Kufstein", "Lienz", "Telfs"] },
            { code: "vorarlberg", name: "Vorarlberg", cities: ["Bregenz", "Dornbirn", "Feldkirch", "Bludenz"] },
            { code: "vienna", name: "Vienna", cities: ["Vienna", "Donaustadt", "Favoriten", "Leopoldstadt"] }
        ],
        "BY": [
            { code: "brest", name: "Brest Region", cities: ["Brest", "Baranavichy", "Pinsk", "Kobryn"] },
            { code: "gomel", name: "Gomel Region", cities: ["Gomel", "Mozyr", "Zhlobin", "Rechytsa"] },
            { code: "grodno", name: "Grodno Region", cities: ["Grodno", "Lida", "Slonim", "Volkovysk"] },
            { code: "minsk-region", name: "Minsk Region", cities: ["Minsk", "Barysaw", "Maladzyechna", "Zhodzina"] },
            { code: "minsk-city", name: "Minsk City", cities: ["Minsk", "Smalyavichy", "Fanipol"] },
            { code: "mogilev", name: "Mogilev Region", cities: ["Mogilev", "Babruysk", "Asipovichy", "Horki"] },
            { code: "vitebsk", name: "Vitebsk Region", cities: ["Vitebsk", "Orsha", "Polotsk", "Novopolotsk"] }
        ],
        "BE": [
            { code: "brussels", name: "Brussels-Capital Region", cities: ["Brussels", "Anderlecht", "Schaerbeek", "Ixelles"] },
            { code: "antwerp", name: "Antwerp Province", cities: ["Antwerp", "Mechelen", "Turnhout", "Geel"] },
            { code: "east-flanders", name: "East Flanders", cities: ["Ghent", "Aalst", "Sint-Niklaas", "Dendermonde"] },
            { code: "flemish-brabant", name: "Flemish Brabant", cities: ["Leuven", "Vilvoorde", "Halle", "Tienen"] },
            { code: "limburg", name: "Limburg", cities: ["Hasselt", "Genk", "Tongeren", "Beringen"] },
            { code: "west-flanders", name: "West Flanders", cities: ["Bruges", "Kortrijk", "Ostend", "Roeselare"] },
            { code: "hainaut", name: "Hainaut", cities: ["Charleroi", "Mons", "Tournai", "La Louvière"] },
            { code: "liege", name: "Liège", cities: ["Liège", "Verviers", "Seraing", "Huy"] },
            { code: "luxembourg", name: "Luxembourg Province", cities: ["Arlon", "Marche-en-Famenne", "Bastogne", "Virton"] },
            { code: "namur", name: "Namur", cities: ["Namur", "Dinant", "Andenne", "Gembloux"] },
            { code: "walloon-brabant", name: "Walloon Brabant", cities: ["Wavre", "Nivelles", "Ottignies-Louvain-la-Neuve", "Tubize"] }
        ],
        "BA": [
            { code: "sarajevo", name: "Sarajevo Canton", cities: ["Sarajevo", "Ilidža", "Vogošća", "Hadžići"] },
            { code: "tuzla", name: "Tuzla Canton", cities: ["Tuzla", "Živinice", "Srebrenik", "Gračanica"] },
            { code: "herzegovina-neretva", name: "Herzegovina-Neretva Canton", cities: ["Mostar", "Konjic", "Čapljina", "Jablanica"] },
            { code: "una-sana", name: "Una-Sana Canton", cities: ["Bihać", "Cazin", "Velika Kladuša", "Sanski Most"] },
            { code: "zenica", name: "Zenica-Doboj Canton", cities: ["Zenica", "Doboj", "Visoko", "Kakanj"] },
            { code: "republika-srpska", name: "Republika Srpska", cities: ["Banja Luka", "Prijedor", "Bijeljina", "Trebinje"] },
            { code: "brcko", name: "Brčko District", cities: ["Brčko", "Gornji Rahić", "Ravne-Brčko"] }
        ],
        "BG": [
            { code: "sofia-city", name: "Sofia City Province", cities: ["Sofia", "Bankya", "Novi Iskar", "Buhovo"] },
            { code: "sofia-province", name: "Sofia Province", cities: ["Botevgrad", "Samokov", "Etropole", "Pirdop"] },
            { code: "plovdiv", name: "Plovdiv Province", cities: ["Plovdiv", "Asenovgrad", "Karlovo", "Rakovski"] },
            { code: "varna", name: "Varna Province", cities: ["Varna", "Devnya", "Provadia", "Balchik"] },
            { code: "burgas", name: "Burgas Province", cities: ["Burgas", "Nesebar", "Pomorie", "Sozopol"] },
            { code: "veliko-tarnovo", name: "Veliko Tarnovo Province", cities: ["Veliko Tarnovo", "Gorna Oryahovitsa", "Svishtov", "Lyaskovets"] }
        ],
        "HR": [
            { code: "zagreb", name: "City of Zagreb", cities: ["Zagreb", "Sesvete", "Zaprešić", "Velika Gorica"] },
            { code: "split-dalmatia", name: "Split-Dalmatia County", cities: ["Split", "Trogir", "Makarska", "Sinj"] },
            { code: "primorje-gorski", name: "Primorje-Gorski Kotar County", cities: ["Rijeka", "Crikvenica", "Opatija", "Delnice"] },
            { code: "istria", name: "Istria County", cities: ["Pula", "Rovinj", "Poreč", "Umag"] },
            { code: "osijek-baranja", name: "Osijek-Baranja County", cities: ["Osijek", "Đakovo", "Našice", "Beli Manastir"] },
            { code: "zadar", name: "Zadar County", cities: ["Zadar", "Biograd na Moru", "Pag", "Benkovac"] }
        ],
        "CY": [
            { code: "nicosia", name: "Nicosia District", cities: ["Nicosia", "Strovolos", "Lakatamia", "Engomi"] },
            { code: "limassol", name: "Limassol District", cities: ["Limassol", "Kato Polemidia", "Ypsonas", "Germasogeia"] },
            { code: "larnaca", name: "Larnaca District", cities: ["Larnaca", "Aradippou", "Livadia", "Athienou"] },
            { code: "paphos", name: "Paphos District", cities: ["Paphos", "Pegeia", "Geroskipou", "Polis"] },
            { code: "famagusta", name: "Famagusta District", cities: ["Famagusta", "Paralimni", "Deryneia", "Sotira"] },
            { code: "kyrenia", name: "Kyrenia District", cities: ["Kyrenia", "Lapithos", "Karavas", "Bellapais"] }
        ],
        "CZ": [
            { code: "prague", name: "Prague", cities: ["Prague 1", "Prague 4", "Prague 6", "Prague 10"] },
            { code: "central-bohemian", name: "Central Bohemian Region", cities: ["Kladno", "Mladá Boleslav", "Kolín", "Benešov"] },
            { code: "south-moravian", name: "South Moravian Region", cities: ["Brno", "Znojmo", "Hodonín", "Břeclav"] },
            { code: "moravian-silesian", name: "Moravian-Silesian Region", cities: ["Ostrava", "Opava", "Karviná", "Frýdek-Místek"] },
            { code: "plzen", name: "Plzeň Region", cities: ["Plzeň", "Klatovy", "Rokycany", "Tachov"] },
            { code: "south-bohemian", name: "South Bohemian Region", cities: ["České Budějovice", "Tábor", "Písek", "Jindřichův Hradec"] },
            { code: "hradec-kralove", name: "Hradec Králové Region", cities: ["Hradec Králové", "Trutnov", "Jičín", "Náchod"] }
        ],
        "DK": [
            { code: "capital", name: "Capital Region", cities: ["Copenhagen", "Frederiksberg", "Lyngby", "Hillerød"] },
            { code: "central", name: "Central Denmark Region", cities: ["Aarhus", "Randers", "Silkeborg", "Horsens"] },
            { code: "north", name: "North Denmark Region", cities: ["Aalborg", "Hjørring", "Frederikshavn", "Thisted"] },
            { code: "zealand", name: "Region Zealand", cities: ["Roskilde", "Næstved", "Køge", "Holbæk"] },
            { code: "southern", name: "Region of Southern Denmark", cities: ["Odense", "Esbjerg", "Kolding", "Sønderborg"] }
        ],
        "EE": [
            { code: "harju", name: "Harju County", cities: ["Tallinn", "Maardu", "Keila", "Saue"] },
            { code: "tartu", name: "Tartu County", cities: ["Tartu", "Elva", "Nõo", "Kambja"] },
            { code: "ida-viru", name: "Ida-Viru County", cities: ["Narva", "Kohtla-Järve", "Jõhvi", "Sillamäe"] },
            { code: "parnu", name: "Pärnu County", cities: ["Pärnu", "Sindi", "Kilingi-Nõmme", "Audru"] },
            { code: "viljandi", name: "Viljandi County", cities: ["Viljandi", "Abja-Paluoja", "Mõisaküla", "Karksi-Nuia"] }
        ],
        "FI": [
            { code: "uusimaa", name: "Uusimaa", cities: ["Helsinki", "Espoo", "Vantaa", "Porvoo"] },
            { code: "pirkanmaa", name: "Pirkanmaa", cities: ["Tampere", "Nokia", "Ylöjärvi", "Kangasala"] },
            { code: "southwest", name: "Southwest Finland", cities: ["Turku", "Salo", "Kaarina", "Naantali"] },
            { code: "north-ostrobothnia", name: "North Ostrobothnia", cities: ["Oulu", "Raahe", "Kuusamo", "Kempele"] },
            { code: "lapland", name: "Lapland", cities: ["Rovaniemi", "Kemi", "Tornio", "Kemijärvi"] }
        ],
        "FR": [
            { code: "ile-de-france", name: "Île-de-France", cities: ["Paris", "Boulogne-Billancourt", "Saint-Denis", "Versailles"] },
            { code: "paca", name: "Provence-Alpes-Côte d'Azur", cities: ["Marseille", "Nice", "Toulon", "Avignon"] },
            { code: "auvergne-rhone", name: "Auvergne-Rhône-Alpes", cities: ["Lyon", "Grenoble", "Clermont-Ferrand", "Saint-Étienne"] },
            { code: "occitanie", name: "Occitanie", cities: ["Toulouse", "Montpellier", "Nîmes", "Perpignan"] },
            { code: "nouvelle-aquitaine", name: "Nouvelle-Aquitaine", cities: ["Bordeaux", "Limoges", "Poitiers", "Bayonne"] },
            { code: "hauts-de-france", name: "Hauts-de-France", cities: ["Lille", "Amiens", "Roubaix", "Dunkerque"] },
            { code: "pays-de-la-loire", name: "Pays de la Loire", cities: ["Nantes", "Angers", "Le Mans", "Saint-Nazaire"] },
            { code: "grand-est", name: "Grand Est", cities: ["Strasbourg", "Reims", "Metz", "Nancy"] }
        ],
        "DE": [
            { code: "baden-wuerttemberg", name: "Baden-Württemberg", cities: ["Stuttgart", "Mannheim", "Karlsruhe", "Freiburg im Breisgau"] },
            { code: "bavaria", name: "Bavaria", cities: ["Munich", "Nuremberg", "Augsburg", "Regensburg"] },
            { code: "berlin", name: "Berlin", cities: ["Mitte", "Charlottenburg", "Prenzlauer Berg", "Kreuzberg"] },
            { code: "brandenburg", name: "Brandenburg", cities: ["Potsdam", "Cottbus", "Brandenburg an der Havel", "Frankfurt (Oder)"] },
            { code: "bremen", name: "Bremen", cities: ["Bremen", "Bremerhaven"] },
            { code: "hamburg", name: "Hamburg", cities: ["Hamburg", "Altona", "Wandsbek", "Harburg"] },
            { code: "hesse", name: "Hesse", cities: ["Frankfurt", "Wiesbaden", "Kassel", "Darmstadt"] },
            { code: "lower-saxony", name: "Lower Saxony", cities: ["Hanover", "Braunschweig", "Oldenburg", "Osnabrück"] },
            { code: "mecklenburg", name: "Mecklenburg-Vorpommern", cities: ["Rostock", "Schwerin", "Neubrandenburg", "Stralsund"] },
            { code: "north-rhine", name: "North Rhine-Westphalia", cities: ["Cologne", "Düsseldorf", "Dortmund", "Essen"] },
            { code: "rhineland-palatinate", name: "Rhineland-Palatinate", cities: ["Mainz", "Ludwigshafen", "Koblenz", "Trier"] },
            { code: "saarland", name: "Saarland", cities: ["Saarbrücken", "Neunkirchen", "Homburg", "Völklingen"] },
            { code: "saxony", name: "Saxony", cities: ["Dresden", "Leipzig", "Chemnitz", "Zwickau"] },
            { code: "saxony-anhalt", name: "Saxony-Anhalt", cities: ["Magdeburg", "Halle", "Dessau", "Wittenberg"] },
            { code: "schleswig-holstein", name: "Schleswig-Holstein", cities: ["Kiel", "Lübeck", "Flensburg", "Neumünster"] },
            { code: "thuringia", name: "Thuringia", cities: ["Erfurt", "Jena", "Gera", "Weimar"] }
        ],
        "GR": [
            { code: "attica", name: "Attica", cities: ["Athens", "Piraeus", "Peristeri", "Kallithea"] },
            { code: "central-macedonia", name: "Central Macedonia", cities: ["Thessaloniki", "Katerini", "Serres", "Véroia"] },
            { code: "crete", name: "Crete", cities: ["Heraklion", "Chania", "Rethymno", "Agios Nikolaos"] },
            { code: "western-greece", name: "Western Greece", cities: ["Patras", "Agrinio", "Pyrgos", "Missolonghi"] },
            { code: "thessaly", name: "Thessaly", cities: ["Larissa", "Volos", "Trikala", "Karditsa"] },
            { code: "epirus", name: "Epirus", cities: ["Ioannina", "Arta", "Preveza", "Igoumenitsa"] },
            { code: "peloponnese", name: "Peloponnese", cities: ["Kalamata", "Tripoli", "Corinth", "Sparta"] },
            { code: "south-aegean", name: "South Aegean", cities: ["Rhodes", "Syros", "Kos", "Paros"] }
        ],
        "VA": [
            { code: "vatican", name: "Vatican City", cities: ["Vatican City"] }
        ],
        "HU": [
            { code: "central-hungary", name: "Central Hungary", cities: ["Budapest", "Érd", "Szigetszentmiklós", "Vác"] },
            { code: "central-transdanubia", name: "Central Transdanubia", cities: ["Székesfehérvár", "Tatabánya", "Dunaújváros", "Esztergom"] },
            { code: "western-transdanubia", name: "Western Transdanubia", cities: ["Győr", "Zalaegerszeg", "Szombathely", "Keszthely"] },
            { code: "southern-transdanubia", name: "Southern Transdanubia", cities: ["Pécs", "Kaposvár", "Szekszárd", "Siófok"] },
            { code: "northern-hungary", name: "Northern Hungary", cities: ["Miskolc", "Eger", "Salgótarján", "Ózd"] },
            { code: "northern-great-plain", name: "Northern Great Plain", cities: ["Debrecen", "Nyíregyháza", "Szolnok", "Hajdúböszörmény"] },
            { code: "southern-great-plain", name: "Southern Great Plain", cities: ["Szeged", "Kecskemét", "Békéscsaba", "Hódmezővásárhely"] }
        ],
        "IS": [
            { code: "capital-region", name: "Capital Region", cities: ["Reykjavík", "Kópavogur", "Hafnarfjörður", "Garðabær"] },
            { code: "southern-region", name: "Southern Region", cities: ["Selfoss", "Hveragerði", "Vestmannaeyjar", "Hella"] },
            { code: "western-region", name: "Western Region", cities: ["Akranes", "Borgarnes", "Stykkishólmur", "Grundarfjörður"] },
            { code: "westfjords", name: "Westfjords", cities: ["Ísafjörður", "Bolungarvík", "Patreksfjörður", "Hólmavík"] },
            { code: "northwestern", name: "Northwestern Region", cities: ["Sauðárkrókur", "Siglufjörður", "Blönduós", "Hvammstangi"] },
            { code: "northeastern", name: "Northeastern Region", cities: ["Akureyri", "Húsavík", "Egilsstaðir", "Dalvík"] },
            { code: "eastern-region", name: "Eastern Region", cities: ["Egilsstaðir", "Reyðarfjörður", "Neskaupstaður", "Fáskrúðsfjörður"] },
            { code: "southern-peninsula", name: "Southern Peninsula", cities: ["Keflavík", "Sandgerði", "Grindavík", "Vogar"] }
        ],
        "IE": [
            { code: "leinster", name: "Leinster", cities: ["Dublin", "Kilkenny", "Drogheda", "Waterford"] },
            { code: "munster", name: "Munster", cities: ["Cork", "Limerick", "Tralee", "Ennis"] },
            { code: "connacht", name: "Connacht", cities: ["Galway", "Sligo", "Castlebar", "Ballina"] },
            { code: "ulster", name: "Ulster (Republic)", cities: ["Letterkenny", "Monaghan", "Cavan", "Ballybofey"] }
        ],
        "IT": [
            { code: "lombardy", name: "Lombardy", cities: ["Milan", "Bergamo", "Brescia", "Monza"] },
            { code: "lazio", name: "Lazio", cities: ["Rome", "Fiumicino", "Latina", "Viterbo"] },
            { code: "campania", name: "Campania", cities: ["Naples", "Salerno", "Caserta", "Benevento"] },
            { code: "sicily", name: "Sicily", cities: ["Palermo", "Catania", "Messina", "Syracuse"] },
            { code: "veneto", name: "Veneto", cities: ["Venice", "Verona", "Padua", "Treviso"] },
            { code: "emilia-romagna", name: "Emilia-Romagna", cities: ["Bologna", "Modena", "Parma", "Ravenna"] },
            { code: "piedmont", name: "Piedmont", cities: ["Turin", "Novara", "Asti", "Alessandria"] },
            { code: "tuscany", name: "Tuscany", cities: ["Florence", "Pisa", "Prato", "Siena"] },
            { code: "apulia", name: "Apulia", cities: ["Bari", "Lecce", "Taranto", "Foggia"] },
            { code: "liguria", name: "Liguria", cities: ["Genoa", "La Spezia", "Savona", "Sanremo"] }
        ],
        "LV": [
            { code: "riga", name: "Riga Region", cities: ["Riga", "Jūrmala", "Sigulda", "Ogre"] },
            { code: "latgale", name: "Latgale", cities: ["Daugavpils", "Rēzekne", "Ludza", "Krāslava"] },
            { code: "kurzeme", name: "Kurzeme", cities: ["Liepāja", "Ventspils", "Tukums", "Kuldīga"] },
            { code: "vidzeme", name: "Vidzeme", cities: ["Valmiera", "Cēsis", "Limbaži", "Smiltene"] },
            { code: "zemgale", name: "Zemgale", cities: ["Jelgava", "Bauska", "Dobele", "Jēkabpils"] }
        ],
        "LI": [
            { code: "balzers", name: "Balzers", cities: ["Balzers"] },
            { code: "eschen", name: "Eschen", cities: ["Eschen"] },
            { code: "gamprin", name: "Gamprin", cities: ["Gamprin", "Bendern"] },
            { code: "mauren", name: "Mauren", cities: ["Mauren", "Schaanwald"] },
            { code: "planken", name: "Planken", cities: ["Planken"] },
            { code: "ruggell", name: "Ruggell", cities: ["Ruggell"] },
            { code: "schaan", name: "Schaan", cities: ["Schaan"] },
            { code: "schellenberg", name: "Schellenberg", cities: ["Schellenberg"] },
            { code: "triesen", name: "Triesen", cities: ["Triesen"] },
            { code: "triesenberg", name: "Triesenberg", cities: ["Triesenberg", "Masescha", "Malbun"] },
            { code: "vaduz", name: "Vaduz", cities: ["Vaduz"] }
        ],
        "LT": [
            { code: "vilnius", name: "Vilnius County", cities: ["Vilnius", "Trakai", "Ukmergė", "Šalčininkai"] },
            { code: "kaunas", name: "Kaunas County", cities: ["Kaunas", "Kėdainiai", "Jonava", "Prienai"] },
            { code: "klaipeda", name: "Klaipėda County", cities: ["Klaipėda", "Palanga", "Kretinga", "Šilutė"] },
            { code: "siauliai", name: "Šiauliai County", cities: ["Šiauliai", "Kuršėnai", "Radviliškis", "Joniškis"] },
            { code: "panevezys", name: "Panevėžys County", cities: ["Panevėžys", "Biržai", "Pasvalys", "Rokiškis"] },
            { code: "alytus", name: "Alytus County", cities: ["Alytus", "Druskininkai", "Varėna", "Lazdijai"] },
            { code: "taurage", name: "Tauragė County", cities: ["Tauragė", "Šilalė", "Pagėgiai", "Jurbarkas"] },
            { code: "telsiai", name: "Telšiai County", cities: ["Telšiai", "Plungė", "Mažeikiai", "Rietavas"] },
            { code: "utena", name: "Utena County", cities: ["Utena", "Anykščiai", "Molėtai", "Visaginas"] },
            { code: "marijampole", name: "Marijampolė County", cities: ["Marijampolė", "Vilkaviškis", "Kazlų Rūda", "Šakiai"] }
        ],
        "LU": [
            { code: "luxembourg", name: "Luxembourg District", cities: ["Luxembourg City", "Esch-sur-Alzette", "Differdange", "Dudelange"] },
            { code: "diekirch", name: "Diekirch District", cities: ["Diekirch", "Ettelbruck", "Wiltz", "Clervaux"] },
            { code: "grevenmacher", name: "Grevenmacher District", cities: ["Grevenmacher", "Echternach", "Remich", "Junglinster"] }
        ],
        "MT": [
            { code: "northern", name: "Northern Region", cities: ["Mellieħa", "St. Paul's Bay", "Mġarr", "Naxxar"] },
            { code: "southern", name: "Southern Region", cities: ["Żejtun", "Żurrieq", "Birżebbuġa", "Fgura"] },
            { code: "central", name: "Central Region", cities: ["Birkirkara", "Qormi", "Mosta", "Attard"] },
            { code: "south-eastern", name: "South Eastern Region", cities: ["Marsaxlokk", "Żabbar", "Għaxaq", "Kirkop"] },
            { code: "western", name: "Western Region", cities: ["Rabat", "Żebbuġ", "Siġġiewi", "Mtarfa"] },
            { code: "gozo", name: "Gozo Region", cities: ["Victoria", "Xewkija", "Xagħra", "Żebbuġ (Gozo)"] }
        ],
        "MD": [
            { code: "chisinau", name: "Chișinău Municipality", cities: ["Chișinău", "Codru", "Durlești", "Cricova"] },
            { code: "balti", name: "Bălți Municipality", cities: ["Bălți", "Fălești", "Rîșcani", "Glodeni"] },
            { code: "gagauzia", name: "Gagauzia", cities: ["Comrat", "Ceadîr-Lunga", "Vulcănești", "Congaz"] },
            { code: "cahul", name: "Cahul District", cities: ["Cahul", "Taraclia", "Cantemir", "Vulcănești"] },
            { code: "orhei", name: "Orhei District", cities: ["Orhei", "Rezina", "Telenești", "Șoldănești"] },
            { code: "soroca", name: "Soroca District", cities: ["Soroca", "Drochia", "Florești", "Briceni"] },
            { code: "ungheni", name: "Ungheni District", cities: ["Ungheni", "Nisporeni", "Călărași", "Strășeni"] }
        ],
        "MC": [
            { code: "fontvieille", name: "Fontvieille", cities: ["Fontvieille"] },
            { code: "la-condamine", name: "La Condamine", cities: ["La Condamine"] },
            { code: "monaco-ville", name: "Monaco-Ville", cities: ["Monaco-Ville"] },
            { code: "monte-carlo", name: "Monte Carlo", cities: ["Monte Carlo"] },
            { code: "moneghetti", name: "Les Moneghetti", cities: ["Les Moneghetti"] },
            { code: "larvotto", name: "Larvotto", cities: ["Larvotto"] },
            { code: "la-rousse", name: "La Rousse", cities: ["La Rousse"] }
        ],
        "ME": [
            { code: "podgorica", name: "Podgorica Capital City", cities: ["Podgorica", "Tuzi", "Golubovci", "Zeta"] },
            { code: "central", name: "Central Region", cities: ["Nikšić", "Cetinje", "Danilovgrad", "Šavnik"] },
            { code: "coastal", name: "Coastal Region", cities: ["Budva", "Kotor", "Bar", "Herceg Novi"] },
            { code: "northern", name: "Northern Region", cities: ["Bijelo Polje", "Berane", "Pljevlja", "Rožaje"] }
        ],
        "NL": [
            { code: "drenthe", name: "Drenthe", cities: ["Assen", "Emmen", "Hoogeveen", "Meppel"] },
            { code: "flevoland", name: "Flevoland", cities: ["Lelystad", "Almere", "Dronten", "Zeewolde"] },
            { code: "friesland", name: "Friesland", cities: ["Leeuwarden", "Drachten", "Sneek", "Heerenveen"] },
            { code: "gelderland", name: "Gelderland", cities: ["Nijmegen", "Arnhem", "Apeldoorn", "Ede"] },
            { code: "groningen", name: "Groningen", cities: ["Groningen", "Delfzijl", "Winschoten", "Veendam"] },
            { code: "limburg", name: "Limburg", cities: ["Maastricht", "Heerlen", "Venlo", "Sittard"] },
            { code: "north-brabant", name: "North Brabant", cities: ["Eindhoven", "Tilburg", "Breda", "'s-Hertogenbosch"] },
            { code: "north-holland", name: "North Holland", cities: ["Amsterdam", "Haarlem", "Alkmaar", "Hilversum"] },
            { code: "overijssel", name: "Overijssel", cities: ["Zwolle", "Enschede", "Deventer", "Hengelo"] },
            { code: "south-holland", name: "South Holland", cities: ["Rotterdam", "The Hague", "Leiden", "Dordrecht"] },
            { code: "utrecht", name: "Utrecht", cities: ["Utrecht", "Amersfoort", "Nieuwegein", "Zeist"] },
            { code: "zeeland", name: "Zeeland", cities: ["Middelburg", "Vlissingen", "Terneuzen", "Goes"] }
        ],
        "MK": [
            { code: "skopje", name: "Skopje Region", cities: ["Skopje", "Tetovo", "Kumanovo", "Gostivar"] },
            { code: "polog", name: "Polog", cities: ["Tetovo", "Gostivar", "Kičevo", "Debar"] },
            { code: "pelagonia", name: "Pelagonia", cities: ["Bitola", "Prilep", "Kruševo", "Resen"] },
            { code: "southwestern", name: "Southwestern", cities: ["Ohrid", "Struga", "Kičevo", "Debarca"] },
            { code: "eastern", name: "Eastern", cities: ["Štip", "Strumica", "Kočani", "Radoviš"] },
            { code: "vardar", name: "Vardar", cities: ["Veles", "Kavadarci", "Negotino", "Demir Kapija"] },
            { code: "northeastern", name: "Northeastern", cities: ["Kumanovo", "Kriva Palanka", "Kratovo", "Rankovce"] },
            { code: "southeastern", name: "Southeastern", cities: ["Strumica", "Gevgelija", "Valandovo", "Bogdanci"] }
        ],
        "NO": [
            { code: "oslo", name: "Oslo", cities: ["Oslo", "Bærum", "Asker", "Lillestrøm"] },
            { code: "viken", name: "Viken", cities: ["Drammen", "Fredrikstad", "Sarpsborg", "Moss"] },
            { code: "innlandet", name: "Innlandet", cities: ["Hamar", "Lillehammer", "Gjøvik", "Kongsvinger"] },
            { code: "vestfold-telemark", name: "Vestfold og Telemark", cities: ["Tønsberg", "Skien", "Porsgrunn", "Sandefjord"] },
            { code: "agder", name: "Agder", cities: ["Kristiansand", "Arendal", "Grimstad", "Flekkefjord"] },
            { code: "rogaland", name: "Rogaland", cities: ["Stavanger", "Sandnes", "Haugesund", "Eigersund"] },
            { code: "vestland", name: "Vestland", cities: ["Bergen", "Stord", "Førde", "Voss"] },
            { code: "more-romsdal", name: "Møre og Romsdal", cities: ["Ålesund", "Molde", "Kristiansund", "Åndalsnes"] },
            { code: "trondelag", name: "Trøndelag", cities: ["Trondheim", "Steinkjer", "Stjørdal", "Levanger"] },
            { code: "nordland", name: "Nordland", cities: ["Bodø", "Narvik", "Mo i Rana", "Sandnessjøen"] },
            { code: "troms-finnmark", name: "Troms og Finnmark", cities: ["Tromsø", "Alta", "Harstad", "Hammerfest"] }
        ],
        "PL": [
            { code: "masovian", name: "Masovian Voivodeship", cities: ["Warsaw", "Radom", "Płock", "Siedlce"] },
            { code: "lesser-poland", name: "Lesser Poland Voivodeship", cities: ["Kraków", "Tarnów", "Nowy Sącz", "Oświęcim"] },
            { code: "silesian", name: "Silesian Voivodeship", cities: ["Katowice", "Gliwice", "Częstochowa", "Bielsko-Biała"] },
            { code: "greater-poland", name: "Greater Poland Voivodeship", cities: ["Poznań", "Kalisz", "Gniezno", "Piła"] },
            { code: "lower-silesian", name: "Lower Silesian Voivodeship", cities: ["Wrocław", "Legnica", "Wałbrzych", "Jelenia Góra"] },
            { code: "pomeranian", name: "Pomeranian Voivodeship", cities: ["Gdańsk", "Gdynia", "Sopot", "Tczew"] },
            { code: "lodz", name: "Łódź Voivodeship", cities: ["Łódź", "Piotrków Trybunalski", "Pabianice", "Bełchatów"] },
            { code: "lublin", name: "Lublin Voivodeship", cities: ["Lublin", "Chełm", "Zamość", "Biała Podlaska"] },
            { code: "podkarpackie", name: "Podkarpackie Voivodeship", cities: ["Rzeszów", "Przemyśl", "Krosno", "Stalowa Wola"] },
            { code: "podlaskie", name: "Podlaskie Voivodeship", cities: ["Białystok", "Łomża", "Suwałki", "Augustów"] },
            { code: "west-pomeranian", name: "West Pomeranian Voivodeship", cities: ["Szczecin", "Koszalin", "Świnoujście", "Stargard"] },
            { code: "kuyavian-pomeranian", name: "Kuyavian-Pomeranian Voivodeship", cities: ["Bydgoszcz", "Toruń", "Włocławek", "Inowrocław"] }
        ],
        "PT": [
            { code: "lisbon", name: "Lisbon District", cities: ["Lisbon", "Amadora", "Cascais", "Sintra"] },
            { code: "porto", name: "Porto District", cities: ["Porto", "Vila Nova de Gaia", "Matosinhos", "Maia"] },
            { code: "setubal", name: "Setúbal District", cities: ["Setúbal", "Barreiro", "Almada", "Montijo"] },
            { code: "braga", name: "Braga District", cities: ["Braga", "Guimarães", "Barcelos", "Fafe"] },
            { code: "aveiro", name: "Aveiro District", cities: ["Aveiro", "Ílhavo", "Ovar", "Espinho"] },
            { code: "coimbra", name: "Coimbra District", cities: ["Coimbra", "Figueira da Foz", "Lousã", "Oliveira do Hospital"] },
            { code: "faro", name: "Faro District (Algarve)", cities: ["Faro", "Albufeira", "Lagos", "Portimão"] },
            { code: "madeira", name: "Madeira", cities: ["Funchal", "Machico", "Santa Cruz", "Câmara de Lobos"] },
            { code: "azores", name: "Azores", cities: ["Ponta Delgada", "Angra do Heroísmo", "Horta", "Ribeira Grande"] },
            { code: "leiria", name: "Leiria District", cities: ["Leiria", "Caldas da Rainha", "Marinha Grande", "Pombal"] }
        ],
        "RO": [
            { code: "bucharest-ilfov", name: "Bucharest-Ilfov", cities: ["Bucharest", "Voluntari", "Otopeni", "Chitila"] },
            { code: "transylvania", name: "Transylvania", cities: ["Cluj-Napoca", "Brașov", "Sibiu", "Târgu Mureș"] },
            { code: "wallachia", name: "Wallachia", cities: ["Ploiești", "Craiova", "Târgoviște", "Slatina"] },
            { code: "moldavia", name: "Moldavia", cities: ["Iași", "Bacău", "Suceava", "Botoșani"] },
            { code: "banat", name: "Banat", cities: ["Timișoara", "Arad", "Reșița", "Lugoj"] },
            { code: "dobruja", name: "Dobruja", cities: ["Constanța", "Tulcea", "Mangalia", "Medgidia"] },
            { code: "crisana", name: "Crișana", cities: ["Oradea", "Satu Mare", "Zalău", "Ștei"] },
            { code: "maramures", name: "Maramureș", cities: ["Baia Mare", "Sighetu Marmației", "Borșa", "Vișeu de Sus"] }
        ],
        "RU": [
            { code: "central", name: "Central Federal District", cities: ["Moscow", "Tula", "Ryazan", "Kaluga"] },
            { code: "northwestern", name: "Northwestern Federal District", cities: ["Saint Petersburg", "Kaliningrad", "Pskov", "Murmansk"] },
            { code: "southern", name: "Southern Federal District", cities: ["Rostov-on-Don", "Krasnodar", "Volgograd", "Sochi"] },
            { code: "volga", name: "Volga Federal District", cities: ["Nizhny Novgorod", "Kazan", "Samara", "Ufa"] },
            { code: "ural", name: "Ural Federal District", cities: ["Yekaterinburg", "Chelyabinsk", "Tyumen", "Surgut"] },
            { code: "siberian", name: "Siberian Federal District", cities: ["Novosibirsk", "Krasnoyarsk", "Irkutsk", "Omsk"] },
            { code: "far-eastern", name: "Far Eastern Federal District", cities: ["Vladivostok", "Khabarovsk", "Yakutsk", "Komsomolsk-on-Amur"] }
        ],
        "SM": [
            { code: "acquaviva", name: "Acquaviva", cities: ["Acquaviva"] },
            { code: "borgo-maggiore", name: "Borgo Maggiore", cities: ["Borgo Maggiore"] },
            { code: "chiesanuova", name: "Chiesanuova", cities: ["Chiesanuova"] },
            { code: "domagnano", name: "Domagnano", cities: ["Domagnano"] },
            { code: "faetano", name: "Faetano", cities: ["Faetano"] },
            { code: "fiorentino", name: "Fiorentino", cities: ["Fiorentino"] },
            { code: "montegiardino", name: "Montegiardino", cities: ["Montegiardino"] },
            { code: "san-marino", name: "San Marino", cities: ["City of San Marino"] },
            { code: "serravalle", name: "Serravalle", cities: ["Serravalle"] }
        ],
        "RS": [
            { code: "belgrade", name: "Belgrade Region", cities: ["Belgrade", "Zemun", "Novi Beograd", "Zvezdara"] },
            { code: "vojvodina", name: "Vojvodina", cities: ["Novi Sad", "Subotica", "Zrenjanin", "Sombor"] },
            { code: "sumadija-west", name: "Šumadija and Western Serbia", cities: ["Kragujevac", "Čačak", "Užice", "Kraljevo"] },
            { code: "southern-eastern", name: "Southern and Eastern Serbia", cities: ["Niš", "Leskovac", "Vranje", "Zaječar"] },
            { code: "kosovo", name: "Kosovo and Metohija", cities: ["Priština", "Mitrovica", "Peja", "Prizren"] }
        ],
        "SK": [
            { code: "bratislava", name: "Bratislava Region", cities: ["Bratislava", "Pezinok", "Malacky", "Senec"] },
            { code: "trnava", name: "Trnava Region", cities: ["Trnava", "Piešťany", "Hlohovec", "Skalica"] },
            { code: "trencin", name: "Trenčín Region", cities: ["Trenčín", "Prievidza", "Považská Bystrica", "Partizánske"] },
            { code: "nitra", name: "Nitra Region", cities: ["Nitra", "Nové Zámky", "Komárno", "Levice"] },
            { code: "zilina", name: "Žilina Region", cities: ["Žilina", "Martin", "Liptovský Mikuláš", "Ružomberok"] },
            { code: "banska-bystrica", name: "Banská Bystrica Region", cities: ["Banská Bystrica", "Zvolen", "Lučenec", "Brezno"] },
            { code: "presov", name: "Prešov Region", cities: ["Prešov", "Poprad", "Humenné", "Bardejov"] },
            { code: "kosice", name: "Košice Region", cities: ["Košice", "Michalovce", "Spišská Nová Ves", "Rožňava"] }
        ],
        "SI": [
            { code: "central-slovenia", name: "Central Slovenia", cities: ["Ljubljana", "Domžale", "Kamnik", "Vrhnika"] },
            { code: "drava", name: "Drava", cities: ["Maribor", "Ptuj", "Slovenska Bistrica", "Ruše"] },
            { code: "savinja", name: "Savinja", cities: ["Celje", "Žalec", "Velenje", "Šoštanj"] },
            { code: "carinthia", name: "Carinthia", cities: ["Dravograd", "Ravne na Koroškem", "Slovenj Gradec", "Prevalje"] },
            { code: "coastal-karst", name: "Coastal-Karst", cities: ["Koper", "Piran", "Izola", "Sežana"] },
            { code: "upper-carniola", name: "Upper Carniola", cities: ["Kranj", "Škofja Loka", "Jesenice", "Radovljica"] },
            { code: "southeast", name: "Southeast Slovenia", cities: ["Novo Mesto", "Črnomelj", "Kočevje", "Trebnje"] },
            { code: "mura", name: "Mura", cities: ["Murska Sobota", "Lendava", "Gornja Radgona", "Ljutomer"] }
        ],
        "ES": [
            { code: "andalusia", name: "Andalusia", cities: ["Seville", "Málaga", "Córdoba", "Granada"] },
            { code: "aragon", name: "Aragon", cities: ["Zaragoza", "Huesca", "Teruel", "Calatayud"] },
            { code: "asturias", name: "Asturias", cities: ["Oviedo", "Gijón", "Avilés", "Langreo"] },
            { code: "balearic", name: "Balearic Islands", cities: ["Palma", "Ibiza Town", "Manacor", "Mahón"] },
            { code: "basque", name: "Basque Country", cities: ["Bilbao", "Vitoria-Gasteiz", "San Sebastián", "Barakaldo"] },
            { code: "canary", name: "Canary Islands", cities: ["Las Palmas", "Santa Cruz de Tenerife", "La Laguna", "Telde"] },
            { code: "cantabria", name: "Cantabria", cities: ["Santander", "Torrelavega", "Castro Urdiales", "Camargo"] },
            { code: "castile-leon", name: "Castile and León", cities: ["Valladolid", "Burgos", "León", "Salamanca"] },
            { code: "castilla-la-mancha", name: "Castilla-La Mancha", cities: ["Toledo", "Albacete", "Ciudad Real", "Guadalajara"] },
            { code: "catalonia", name: "Catalonia", cities: ["Barcelona", "Tarragona", "Lleida", "Girona"] },
            { code: "extremadura", name: "Extremadura", cities: ["Mérida", "Badajoz", "Cáceres", "Plasencia"] },
            { code: "galicia", name: "Galicia", cities: ["A Coruña", "Vigo", "Santiago de Compostela", "Lugo"] },
            { code: "la-rioja", name: "La Rioja", cities: ["Logroño", "Calahorra", "Arnedo", "Haro"] },
            { code: "madrid", name: "Community of Madrid", cities: ["Madrid", "Móstoles", "Alcalá de Henares", "Getafe"] },
            { code: "murcia", name: "Region of Murcia", cities: ["Murcia", "Cartagena", "Lorca", "Molina de Segura"] },
            { code: "navarre", name: "Navarre", cities: ["Pamplona", "Tudela", "Barañain", "Estella"] },
            { code: "valencian", name: "Valencian Community", cities: ["Valencia", "Alicante", "Elche", "Castellón de la Plana"] }
        ],
        "SE": [
            { code: "stockholm", name: "Stockholm County", cities: ["Stockholm", "Solna", "Södertälje", "Nacka"] },
            { code: "vastra-gotaland", name: "Västra Götaland County", cities: ["Gothenburg", "Borås", "Trollhättan", "Skövde"] },
            { code: "skane", name: "Skåne County", cities: ["Malmö", "Helsingborg", "Lund", "Kristianstad"] },
            { code: "uppsala", name: "Uppsala County", cities: ["Uppsala", "Enköping", "Östhammar", "Tierp"] },
            { code: "ostergotland", name: "Östergötland County", cities: ["Linköping", "Norrköping", "Motala", "Finspång"] },
            { code: "varmland", name: "Värmland County", cities: ["Karlstad", "Kristinehamn", "Arvika", "Säffle"] },
            { code: "norrbotten", name: "Norrbotten County", cities: ["Luleå", "Piteå", "Kiruna", "Boden"] },
            { code: "dalarna", name: "Dalarna County", cities: ["Falun", "Borlänge", "Mora", "Avesta"] },
            { code: "jonkoping", name: "Jönköping County", cities: ["Jönköping", "Värnamo", "Nässjö", "Eksjö"] }
        ],
        "CH": [
            { code: "zurich", name: "Zürich", cities: ["Zürich", "Winterthur", "Uster", "Dübendorf"] },
            { code: "geneva", name: "Geneva", cities: ["Geneva", "Carouge", "Lancy", "Meyrin"] },
            { code: "basel", name: "Basel-Stadt", cities: ["Basel", "Riehen", "Bettingen"] },
            { code: "bern", name: "Bern", cities: ["Bern", "Biel/Bienne", "Thun", "Interlaken"] },
            { code: "vaud", name: "Vaud", cities: ["Lausanne", "Yverdon-les-Bains", "Montreux", "Nyon"] },
            { code: "aargau", name: "Aargau", cities: ["Aarau", "Baden", "Wettingen", "Zofingen"] },
            { code: "st-gallen", name: "St. Gallen", cities: ["St. Gallen", "Rapperswil-Jona", "Gossau", "Wil"] },
            { code: "ticino", name: "Ticino", cities: ["Lugano", "Bellinzona", "Locarno", "Mendrisio"] },
            { code: "lucerne", name: "Lucerne", cities: ["Lucerne", "Emmen", "Kriens", "Horw"] }
        ],
        "UA": [
            { code: "kyiv-city", name: "Kyiv City", cities: ["Kyiv", "Brovary", "Irpin", "Vyshhorod"] },
            { code: "kyiv-oblast", name: "Kyiv Oblast", cities: ["Bila Tserkva", "Boryspil", "Fastiv", "Obukhiv"] },
            { code: "lviv", name: "Lviv Oblast", cities: ["Lviv", "Drohobych", "Chervonohrad", "Stryi"] },
            { code: "odesa", name: "Odesa Oblast", cities: ["Odesa", "Izmail", "Bilhorod-Dnistrovskyi", "Chornomorsk"] },
            { code: "kharkiv", name: "Kharkiv Oblast", cities: ["Kharkiv", "Izium", "Kupiansk", "Lozova"] },
            { code: "dnipro", name: "Dnipropetrovsk Oblast", cities: ["Dnipro", "Kryvyi Rih", "Kamianske", "Nikopol"] },
            { code: "vinnytsia", name: "Vinnytsia Oblast", cities: ["Vinnytsia", "Zhmerynka", "Mohyliv-Podilskyi", "Khmilnyk"] },
            { code: "zaporizhzhia", name: "Zaporizhzhia Oblast", cities: ["Zaporizhzhia", "Melitopol", "Berdyansk", "Enerhodar"] },
            { code: "poltava", name: "Poltava Oblast", cities: ["Poltava", "Kremenchuk", "Lubny", "Myrhorod"] },
            { code: "chernihiv", name: "Chernihiv Oblast", cities: ["Chernihiv", "Nizhyn", "Pryluky", "Bakhmach"] },
            { code: "ivano-frankivsk", name: "Ivano-Frankivsk Oblast", cities: ["Ivano-Frankivsk", "Kolomyia", "Kalush", "Yaremche"] }
        ],
        "GB": [
            { code: "england", name: "England", cities: ["London", "Manchester", "Birmingham", "Bristol"] },
            { code: "scotland", name: "Scotland", cities: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee"] },
            { code: "wales", name: "Wales", cities: ["Cardiff", "Swansea", "Newport", "Wrexham"] },
            { code: "northern-ireland", name: "Northern Ireland", cities: ["Belfast", "Derry", "Lisburn", "Newry"] }
        ]
    };
    Object.entries(curatedDatasets).forEach(([countryCode, states]) => {
        registerFallbackDataset(countryCode, states);
    });

    const supportsFetch = typeof fetch === "function";

    async function fetchStatesFromApi(countryCode) {
        if (!supportsFetch) return [];
        const country = allowedCountries[countryCode];
        if (!country) return [];

        try {
            const response = await fetch(LOCATION_API_ENDPOINTS.states, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
                const name = (state.name || state.state_code || "").toString().trim();
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
            console.error("Failed to load states for", countryCode, error);
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
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ country: country.apiName, state: stateName })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const result = await response.json();
            if (!result || result.error) return [];

            const cities = cleanList(result.data);
            cities.sort((a, b) => a.localeCompare(b));
            return cities;
        } catch (error) {
            console.error("Failed to load cities for", countryCode, stateCode, error);
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
            stateCache[countryCode] = [];
            stateLookup[countryCode] = {};
            return [];
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
        return allowedCountries[countryCode] ? allowedCountries[countryCode].label : "";
    }

    function getStateLabel(countryCode, stateCode) {
        if (!stateLookup[countryCode]) return "";
        return stateLookup[countryCode][stateCode] || "";
    }

    const service = {
        countries: allowedCountries,
        getStates,
        getCities,
        getCountryLabel,
        getStateLabel
    };

    if (typeof window !== "undefined") {
        window.locationDataService = service;
        window.comprehensiveCityDatabase = {};
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = service;
    }
})();
