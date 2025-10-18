// Curated Location Data Service for Paraguay and European Countries
(function() {
    const curatedDatasets = {
        "PY": {
            label: "Paraguay",
            apiName: "Paraguay",
            states: [
                { code: "asuncion", name: "Asunción (Capital District)", cities: ["Asunción"] },
                { code: "alto-paraguay", name: "Alto Paraguay", cities: ["Fuerte Olimpo", "Bahía Negra", "Carmelo Peralta", "Puerto Casado"] },
                { code: "alto-parana", name: "Alto Paraná", cities: ["Ciudad del Este", "Presidente Franco", "Hernandarias", "Minga Guazú", "Santa Rita"] },
                { code: "amambay", name: "Amambay", cities: ["Pedro Juan Caballero", "Capitán Bado", "Bella Vista Norte", "Zanja Pytã"] },
                { code: "boqueron", name: "Boquerón", cities: ["Filadelfia", "Loma Plata", "Mariscal Estigarribia", "Neuland"] },
                { code: "caaguazu", name: "Caaguazú", cities: ["Coronel Oviedo", "Caaguazú", "Repatriación", "Juan Manuel Frutos", "José Domingo Ocampos"] },
                { code: "caazapa", name: "Caazapá", cities: ["Caazapá", "San Juan Nepomuceno", "Abaí", "Yuty", "Tavaí"] },
                { code: "canindeyu", name: "Canindeyú", cities: ["Salto del Guairá", "Curuguaty", "Katueté", "Ybyrarobana", "Villa Ygatimí"] },
                { code: "central", name: "Central", cities: ["San Lorenzo", "Luque", "Capiatá", "Lambaré", "Fernando de la Mora", "Ñemby", "Mariano Roque Alonso", "Villa Elisa", "Itauguá", "Limpio"] },
                { code: "concepcion", name: "Concepción", cities: ["Concepción", "Horqueta", "Loreto", "Belén", "Vallemí"] },
                { code: "cordillera", name: "Cordillera", cities: ["Caacupé", "Eusebio Ayala", "Itacurubí de la Cordillera", "Tobatí", "San Bernardino"] },
                { code: "guaira", name: "Guairá", cities: ["Villarrica", "Coronel Martínez", "Borja", "Iturbe", "Mbocayaty"] },
                { code: "itapua", name: "Itapúa", cities: ["Encarnación", "Hohenau", "Obligado", "Bella Vista", "Capitán Miranda", "Fram"] },
                { code: "misiones", name: "Misiones", cities: ["San Juan Bautista", "Ayolas", "San Ignacio", "San Miguel", "Villa Florida"] },
                { code: "neembucu", name: "Ñeembucú", cities: ["Pilar", "Humaitá", "Paso de Patria", "Isla Umbú", "Desmochados"] },
                { code: "paraguari", name: "Paraguarí", cities: ["Paraguarí", "Carapeguá", "Pirayú", "Yaguarón", "La Colmena"] },
                { code: "presidente-hayes", name: "Presidente Hayes", cities: ["Villa Hayes", "Nanawa", "Pozo Colorado", "Teniente Irala Fernández", "Nueva Asunción"] },
                { code: "san-pedro", name: "San Pedro", cities: ["San Pedro de Ycuamandiyú", "Santa Rosa del Aguaray", "Choré", "Lima", "Itacurubí del Rosario"] }
            ]
        },
        "AL": {
            label: "Albania",
            apiName: "Albania",
            states: [
                { code: "tirana", name: "Tirana County", cities: ["Tirana", "Kamëz", "Vorë", "Kavajë"] },
                { code: "durres", name: "Durrës County", cities: ["Durrës", "Shijak", "Sukth"] },
                { code: "shkoder", name: "Shkodër County", cities: ["Shkodër", "Koplik", "Vau i Dejës"] },
                { code: "fier", name: "Fier County", cities: ["Fier", "Lushnjë", "Patos", "Ballsh"] },
                { code: "vlore", name: "Vlorë County", cities: ["Vlorë", "Sarandë", "Himarë"] },
                { code: "elbasan", name: "Elbasan County", cities: ["Elbasan", "Cërrik", "Peqin", "Belsh"] },
                { code: "korce", name: "Korçë County", cities: ["Korçë", "Pogradec", "Ersekë"] }
            ]
        },
        "AD": {
            label: "Andorra",
            apiName: "Andorra",
            states: [
                { code: "andorra-la-vella", name: "Andorra la Vella", cities: ["Andorra la Vella", "Santa Coloma", "La Margineda"] },
                { code: "canillo", name: "Canillo", cities: ["Canillo", "Soldeu", "El Tarter"] },
                { code: "encamp", name: "Encamp", cities: ["Encamp", "Pas de la Casa", "Vila"] },
                { code: "escaldes-engordany", name: "Escaldes-Engordany", cities: ["Escaldes-Engordany", "Engolasters", "Els Vilars"] },
                { code: "la-massana", name: "La Massana", cities: ["La Massana", "Arinsal", "Anyós"] },
                { code: "ordino", name: "Ordino", cities: ["Ordino", "La Cortinada", "El Serrat"] },
                { code: "sant-julia-de-loria", name: "Sant Julià de Lòria", cities: ["Sant Julià de Lòria", "Fontaneda", "Bixessarri"] }
            ]
        },
        "AT": {
            label: "Austria",
            apiName: "Austria",
            states: [
                { code: "vienna", name: "Vienna", cities: ["Vienna"] },
                { code: "lower-austria", name: "Lower Austria", cities: ["St. Pölten", "Wiener Neustadt", "Krems an der Donau", "Baden"] },
                { code: "upper-austria", name: "Upper Austria", cities: ["Linz", "Wels", "Steyr", "Leonding"] },
                { code: "styria", name: "Styria", cities: ["Graz", "Leoben", "Kapfenberg", "Bruck an der Mur"] },
                { code: "tyrol", name: "Tyrol", cities: ["Innsbruck", "Kufstein", "Lienz", "Imst"] },
                { code: "salzburg", name: "Salzburg", cities: ["Salzburg", "Hallein", "Saalfelden am Steinernen Meer"] },
                { code: "carinthia", name: "Carinthia", cities: ["Klagenfurt", "Villach", "Feldkirchen in Kärnten", "Spittal an der Drau"] },
                { code: "vorarlberg", name: "Vorarlberg", cities: ["Bregenz", "Dornbirn", "Feldkirch", "Bludenz"] },
                { code: "burgenland", name: "Burgenland", cities: ["Eisenstadt", "Mattersburg", "Oberwart", "Neusiedl am See"] }
            ]
        },
        "BY": {
            label: "Belarus",
            apiName: "Belarus",
            states: [
                { code: "minsk-city", name: "Minsk City", cities: ["Minsk"] },
                { code: "minsk-region", name: "Minsk Region", cities: ["Maladzyechna", "Barysaw", "Salihorsk", "Zhodzina"] },
                { code: "brest-region", name: "Brest Region", cities: ["Brest", "Baranavichy", "Pinsk", "Kobryn"] },
                { code: "gomel-region", name: "Gomel Region", cities: ["Gomel", "Mazyr", "Rechytsa", "Zhlobin"] },
                { code: "grodno-region", name: "Grodno Region", cities: ["Grodno", "Lida", "Slonim", "Volkovysk"] },
                { code: "mogilev-region", name: "Mogilev Region", cities: ["Mogilev", "Babruysk", "Asipovichy", "Horki"] },
                { code: "vitebsk-region", name: "Vitebsk Region", cities: ["Vitebsk", "Orsha", "Polotsk", "Novopolotsk"] }
            ]
        },
        "BE": {
            label: "Belgium",
            apiName: "Belgium",
            states: [
                { code: "brussels-capital", name: "Brussels-Capital Region", cities: ["Brussels", "Ixelles", "Anderlecht", "Schaerbeek"] },
                { code: "antwerp", name: "Antwerp Province", cities: ["Antwerp", "Mechelen", "Turnhout", "Lier"] },
                { code: "east-flanders", name: "East Flanders Province", cities: ["Ghent", "Aalst", "Sint-Niklaas", "Dendermonde"] },
                { code: "flemish-brabant", name: "Flemish Brabant Province", cities: ["Leuven", "Vilvoorde", "Tienen", "Dilbeek"] },
                { code: "limburg", name: "Limburg Province", cities: ["Hasselt", "Genk", "Sint-Truiden", "Tongeren"] },
                { code: "west-flanders", name: "West Flanders Province", cities: ["Bruges", "Kortrijk", "Ostend", "Roeselare"] },
                { code: "hainaut", name: "Hainaut Province", cities: ["Charleroi", "Mons", "Tournai", "La Louvière"] },
                { code: "liege", name: "Liège Province", cities: ["Liège", "Verviers", "Seraing", "Huy"] },
                { code: "namur", name: "Namur Province", cities: ["Namur", "Dinant", "Gembloux", "Andenne"] },
                { code: "walloon-brabant", name: "Walloon Brabant Province", cities: ["Wavre", "Ottignies-Louvain-la-Neuve", "Nivelles", "Braine-l'Alleud"] },
                { code: "luxembourg-province", name: "Luxembourg Province", cities: ["Arlon", "Bastogne", "Marche-en-Famenne", "Virton"] }
            ]
        },
        "BA": {
            label: "Bosnia and Herzegovina",
            apiName: "Bosnia and Herzegovina",
            states: [
                { code: "federation", name: "Federation of Bosnia and Herzegovina", cities: ["Sarajevo", "Mostar", "Zenica", "Tuzla"] },
                { code: "republika-srpska", name: "Republika Srpska", cities: ["Banja Luka", "Bijeljina", "Prijedor", "Doboj"] },
                { code: "brcko", name: "Brčko District", cities: ["Brčko", "Gornji Rahić", "Breške"] }
            ]
        },
        "BG": {
            label: "Bulgaria",
            apiName: "Bulgaria",
            states: [
                { code: "sofia-city", name: "Sofia City Province", cities: ["Sofia"] },
                { code: "sofia-province", name: "Sofia Province", cities: ["Botevgrad", "Samokov", "Ihtiman", "Etropole"] },
                { code: "plovdiv", name: "Plovdiv Province", cities: ["Plovdiv", "Asenovgrad", "Karlovo", "Pazardzhik"] },
                { code: "varna", name: "Varna Province", cities: ["Varna", "Devnya", "Provadia", "Aksakovo"] },
                { code: "burgas", name: "Burgas Province", cities: ["Burgas", "Pomorie", "Nesebar", "Sozopol"] },
                { code: "stara-zagora", name: "Stara Zagora Province", cities: ["Stara Zagora", "Kazanlak", "Radnevo", "Chirpan"] },
                { code: "pleven", name: "Pleven Province", cities: ["Pleven", "Cherven Bryag", "Knezha", "Belene"] }
            ]
        },
        "HR": {
            label: "Croatia",
            apiName: "Croatia",
            states: [
                { code: "zagreb", name: "City of Zagreb", cities: ["Zagreb"] },
                { code: "split-dalmatia", name: "Split-Dalmatia County", cities: ["Split", "Makarska", "Sinj", "Trogir"] },
                { code: "primorje-gorski-kotar", name: "Primorje-Gorski Kotar County", cities: ["Rijeka", "Opatija", "Crikvenica", "Krk"] },
                { code: "istria", name: "Istria County", cities: ["Pula", "Rovinj", "Poreč", "Umag"] },
                { code: "osijek-baranja", name: "Osijek-Baranja County", cities: ["Osijek", "Đakovo", "Beli Manastir", "Valpovo"] },
                { code: "zadar", name: "Zadar County", cities: ["Zadar", "Biograd na Moru", "Benkovac", "Pag"] }
            ]
        },
        "CZ": {
            label: "Czech Republic",
            apiName: "Czech Republic",
            states: [
                { code: "prague", name: "Prague", cities: ["Prague"] },
                { code: "central-bohemian", name: "Central Bohemian Region", cities: ["Kladno", "Mladá Boleslav", "Kolín", "Benešov"] },
                { code: "south-moravian", name: "South Moravian Region", cities: ["Brno", "Znojmo", "Břeclav", "Hodonín"] },
                { code: "moravian-silesian", name: "Moravian-Silesian Region", cities: ["Ostrava", "Opava", "Karviná", "Frýdek-Místek"] },
                { code: "south-bohemian", name: "South Bohemian Region", cities: ["České Budějovice", "Tábor", "Písek", "Český Krumlov"] },
                { code: "plzen", name: "Plzeň Region", cities: ["Plzeň", "Klatovy", "Domažlice", "Tachov"] },
                { code: "hradec-kralove", name: "Hradec Králové Region", cities: ["Hradec Králové", "Trutnov", "Náchod", "Jičín"] },
                { code: "pardubice", name: "Pardubice Region", cities: ["Pardubice", "Chrudim", "Ústí nad Orlicí", "Svitavy"] }
            ]
        },
        "DK": {
            label: "Denmark",
            apiName: "Denmark",
            states: [
                { code: "capital-region", name: "Capital Region of Denmark", cities: ["Copenhagen", "Frederiksberg", "Helsingør", "Hillerød"] },
                { code: "central-denmark", name: "Central Denmark Region", cities: ["Aarhus", "Randers", "Silkeborg", "Viborg"] },
                { code: "north-denmark", name: "North Denmark Region", cities: ["Aalborg", "Hjørring", "Frederikshavn", "Thisted"] },
                { code: "zealand", name: "Region Zealand", cities: ["Roskilde", "Køge", "Næstved", "Slagelse"] },
                { code: "southern-denmark", name: "Region of Southern Denmark", cities: ["Odense", "Esbjerg", "Kolding", "Vejle", "Sønderborg"] }
            ]
        },
        "EE": {
            label: "Estonia",
            apiName: "Estonia",
            states: [
                { code: "harju", name: "Harju County", cities: ["Tallinn", "Maardu", "Keila", "Saue"] },
                { code: "tartu", name: "Tartu County", cities: ["Tartu", "Elva", "Kambja", "Nõo"] },
                { code: "parnu", name: "Pärnu County", cities: ["Pärnu", "Sindi", "Kilingi-Nõmme", "Audru"] },
                { code: "ida-viru", name: "Ida-Viru County", cities: ["Narva", "Kohtla-Järve", "Jõhvi", "Sillamäe"] },
                { code: "viljandi", name: "Viljandi County", cities: ["Viljandi", "Abja-Paluoja", "Karksi-Nuia", "Mõisaküla"] },
                { code: "voru", name: "Võru County", cities: ["Võru", "Antsla", "Räpina", "Misso"] }
            ]
        },
        "FI": {
            label: "Finland",
            apiName: "Finland",
            states: [
                { code: "uusimaa", name: "Uusimaa Region", cities: ["Helsinki", "Espoo", "Vantaa", "Porvoo"] },
                { code: "pirkanmaa", name: "Pirkanmaa Region", cities: ["Tampere", "Nokia", "Ylöjärvi", "Lempäälä"] },
                { code: "southwest-finland", name: "Southwest Finland Region", cities: ["Turku", "Salo", "Kaarina", "Naantali"] },
                { code: "north-ostrobothnia", name: "North Ostrobothnia Region", cities: ["Oulu", "Raahe", "Kuusamo", "Kempele"] },
                { code: "central-finland", name: "Central Finland Region", cities: ["Jyväskylä", "Äänekoski", "Laukaa", "Jämsä"] },
                { code: "lapland", name: "Lapland Region", cities: ["Rovaniemi", "Kemi", "Tornio", "Kemijärvi"] },
                { code: "ostrobothnia", name: "Ostrobothnia Region", cities: ["Vaasa", "Seinäjoki", "Kokkola", "Pietarsaari"] }
            ]
        },
        "FR": {
            label: "France",
            apiName: "France",
            states: [
                { code: "ile-de-france", name: "Île-de-France", cities: ["Paris", "Boulogne-Billancourt", "Saint-Denis", "Versailles"] },
                { code: "provence-alpes-cote-d-azur", name: "Provence-Alpes-Côte d'Azur", cities: ["Marseille", "Nice", "Toulon", "Avignon"] },
                { code: "auvergne-rhone-alpes", name: "Auvergne-Rhône-Alpes", cities: ["Lyon", "Grenoble", "Saint-Étienne", "Annecy"] },
                { code: "occitanie", name: "Occitanie", cities: ["Toulouse", "Montpellier", "Nîmes", "Perpignan"] },
                { code: "nouvelle-aquitaine", name: "Nouvelle-Aquitaine", cities: ["Bordeaux", "Limoges", "Poitiers", "Bayonne"] },
                { code: "hauts-de-france", name: "Hauts-de-France", cities: ["Lille", "Amiens", "Dunkirk", "Calais"] },
                { code: "grand-est", name: "Grand Est", cities: ["Strasbourg", "Reims", "Metz", "Mulhouse"] },
                { code: "pays-de-la-loire", name: "Pays de la Loire", cities: ["Nantes", "Angers", "Le Mans", "Saint-Nazaire"] },
                { code: "brittany", name: "Brittany", cities: ["Rennes", "Brest", "Quimper", "Saint-Malo"] }
            ]
        },
        "DE": {
            label: "Germany",
            apiName: "Germany",
            states: [
                { code: "baden-wurttemberg", name: "Baden-Württemberg", cities: ["Stuttgart", "Karlsruhe", "Mannheim", "Freiburg im Breisgau"] },
                { code: "bavaria", name: "Bavaria", cities: ["Munich", "Nuremberg", "Augsburg", "Regensburg"] },
                { code: "berlin", name: "Berlin", cities: ["Berlin"] },
                { code: "brandenburg", name: "Brandenburg", cities: ["Potsdam", "Cottbus", "Brandenburg an der Havel", "Frankfurt (Oder)"] },
                { code: "bremen", name: "Bremen", cities: ["Bremen", "Bremerhaven"] },
                { code: "hamburg", name: "Hamburg", cities: ["Hamburg"] },
                { code: "hesse", name: "Hesse", cities: ["Frankfurt", "Wiesbaden", "Kassel", "Darmstadt"] },
                { code: "lower-saxony", name: "Lower Saxony", cities: ["Hanover", "Braunschweig", "Osnabrück", "Oldenburg"] },
                { code: "mecklenburg-western-pomerania", name: "Mecklenburg-Vorpommern", cities: ["Schwerin", "Rostock", "Neubrandenburg", "Greifswald"] },
                { code: "north-rhine-westphalia", name: "North Rhine-Westphalia", cities: ["Cologne", "Düsseldorf", "Dortmund", "Essen", "Bonn"] },
                { code: "rhineland-palatinate", name: "Rhineland-Palatinate", cities: ["Mainz", "Ludwigshafen", "Koblenz", "Trier"] },
                { code: "saarland", name: "Saarland", cities: ["Saarbrücken", "Neunkirchen", "Homburg", "Saarlouis"] },
                { code: "saxony", name: "Saxony", cities: ["Dresden", "Leipzig", "Chemnitz", "Zwickau"] },
                { code: "saxony-anhalt", name: "Saxony-Anhalt", cities: ["Magdeburg", "Halle (Saale)", "Dessau-Roßlau", "Wittenberg"] },
                { code: "schleswig-holstein", name: "Schleswig-Holstein", cities: ["Kiel", "Lübeck", "Flensburg", "Neumünster"] },
                { code: "thuringia", name: "Thuringia", cities: ["Erfurt", "Jena", "Gera", "Weimar"] }
            ]
        },
        "GR": {
            label: "Greece",
            apiName: "Greece",
            states: [
                { code: "attica", name: "Attica", cities: ["Athens", "Piraeus", "Kifisia", "Peristeri"] },
                { code: "central-macedonia", name: "Central Macedonia", cities: ["Thessaloniki", "Serres", "Katerini", "Veria"] },
                { code: "crete", name: "Crete", cities: ["Heraklion", "Chania", "Rethymno", "Agios Nikolaos"] },
                { code: "thessaly", name: "Thessaly", cities: ["Larissa", "Volos", "Trikala", "Karditsa"] },
                { code: "western-greece", name: "Western Greece", cities: ["Patras", "Agrinio", "Pyrgos", "Missolonghi"] },
                { code: "peloponnese", name: "Peloponnese", cities: ["Kalamata", "Tripoli", "Corinth", "Argos"] },
                { code: "epirus", name: "Epirus", cities: ["Ioannina", "Arta", "Preveza", "Igoumenitsa"] },
                { code: "south-aegean", name: "South Aegean", cities: ["Rhodes", "Kos", "Syros", "Mykonos"] },
                { code: "ionian-islands", name: "Ionian Islands", cities: ["Corfu", "Zakynthos", "Argostoli", "Lefkada"] }
            ]
        },
        "VA": {
            label: "Holy See (Vatican City)",
            apiName: "Holy See (Vatican City State)",
            states: [
                { code: "vatican-city", name: "Vatican City", cities: ["Vatican City"] }
            ]
        },
        "HU": {
            label: "Hungary",
            apiName: "Hungary",
            states: [
                { code: "budapest", name: "Budapest", cities: ["Budapest"] },
                { code: "pest", name: "Pest County", cities: ["Érd", "Szentendre", "Vác", "Dunakeszi"] },
                { code: "borsod-abauj-zemplen", name: "Borsod-Abaúj-Zemplén County", cities: ["Miskolc", "Ózd", "Kazincbarcika", "Sátoraljaújhely"] },
                { code: "hajdu-bihar", name: "Hajdú-Bihar County", cities: ["Debrecen", "Hajdúböszörmény", "Hajdúszoboszló", "Berettyóújfalu"] },
                { code: "csongrad-csanad", name: "Csongrád-Csanád County", cities: ["Szeged", "Hódmezővásárhely", "Makó", "Szentes"] },
                { code: "gyor-moson-sopron", name: "Győr-Moson-Sopron County", cities: ["Győr", "Mosonmagyaróvár", "Sopron", "Csorna"] },
                { code: "baranya", name: "Baranya County", cities: ["Pécs", "Komló", "Mohács", "Szigetvár"] },
                { code: "fejer", name: "Fejér County", cities: ["Székesfehérvár", "Dunaújváros", "Bicske", "Gárdony"] }
            ]
        },
        "IS": {
            label: "Iceland",
            apiName: "Iceland",
            states: [
                { code: "capital-region", name: "Capital Region", cities: ["Reykjavík", "Kópavogur", "Hafnarfjörður", "Garðabær"] },
                { code: "southern-peninsula", name: "Southern Peninsula", cities: ["Keflavík", "Grindavík", "Sandgerði", "Vogar"] },
                { code: "west-region", name: "West Region", cities: ["Borgarnes", "Akranes", "Stykkishólmur", "Ólafsvík"] },
                { code: "westfjords", name: "Westfjords", cities: ["Ísafjörður", "Bolungarvík", "Patreksfjörður", "Hólmavík"] },
                { code: "north-east", name: "North East", cities: ["Akureyri", "Húsavík", "Dalvík", "Ólafsfjörður"] },
                { code: "east-region", name: "East Region", cities: ["Egilsstaðir", "Reyðarfjörður", "Neskaupstaður", "Seyðisfjörður"] },
                { code: "south-region", name: "South Region", cities: ["Selfoss", "Hella", "Hvolsvöllur", "Vík"] },
                { code: "north-west", name: "North West", cities: ["Sauðárkrókur", "Blönduós", "Skagaströnd", "Siglufjörður"] }
            ]
        },
        "IE": {
            label: "Ireland",
            apiName: "Ireland",
            states: [
                { code: "dublin", name: "County Dublin", cities: ["Dublin", "Swords", "Balbriggan", "Tallaght"] },
                { code: "cork", name: "County Cork", cities: ["Cork", "Cobh", "Mallow", "Midleton"] },
                { code: "galway", name: "County Galway", cities: ["Galway", "Tuam", "Ballinasloe", "Clifden"] },
                { code: "limerick", name: "County Limerick", cities: ["Limerick", "Newcastle West", "Abbeyfeale", "Kilmallock"] },
                { code: "kildare", name: "County Kildare", cities: ["Naas", "Newbridge", "Athy", "Maynooth"] },
                { code: "meath", name: "County Meath", cities: ["Navan", "Ashbourne", "Trim", "Kells"] },
                { code: "wicklow", name: "County Wicklow", cities: ["Bray", "Wicklow", "Arklow", "Greystones"] }
            ]
        },
        "IT": {
            label: "Italy",
            apiName: "Italy",
            states: [
                { code: "lombardy", name: "Lombardy", cities: ["Milan", "Brescia", "Bergamo", "Monza"] },
                { code: "lazio", name: "Lazio", cities: ["Rome", "Latina", "Viterbo", "Frosinone"] },
                { code: "campania", name: "Campania", cities: ["Naples", "Salerno", "Caserta", "Benevento"] },
                { code: "veneto", name: "Veneto", cities: ["Venice", "Verona", "Padua", "Vicenza"] },
                { code: "emilia-romagna", name: "Emilia-Romagna", cities: ["Bologna", "Parma", "Modena", "Ravenna"] },
                { code: "piedmont", name: "Piedmont", cities: ["Turin", "Novara", "Alessandria", "Asti"] },
                { code: "tuscany", name: "Tuscany", cities: ["Florence", "Pisa", "Siena", "Lucca"] },
                { code: "sicily", name: "Sicily", cities: ["Palermo", "Catania", "Messina", "Syracuse"] },
                { code: "sardinia", name: "Sardinia", cities: ["Cagliari", "Sassari", "Olbia", "Nuoro"] },
                { code: "apulia", name: "Apulia", cities: ["Bari", "Taranto", "Brindisi", "Lecce"] },
                { code: "liguria", name: "Liguria", cities: ["Genoa", "La Spezia", "Savona", "Imperia"] }
            ]
        },
        "LV": {
            label: "Latvia",
            apiName: "Latvia",
            states: [
                { code: "riga", name: "Riga Planning Region", cities: ["Riga", "Jūrmala", "Salaspils", "Ogre"] },
                { code: "vidzeme", name: "Vidzeme Region", cities: ["Valmiera", "Cēsis", "Sigulda", "Smiltene"] },
                { code: "latgale", name: "Latgale Region", cities: ["Daugavpils", "Rēzekne", "Līvāni", "Krāslava"] },
                { code: "kurzeme", name: "Kurzeme Region", cities: ["Liepāja", "Ventspils", "Kuldīga", "Saldus"] },
                { code: "zemgale", name: "Zemgale Region", cities: ["Jelgava", "Bauska", "Dobele", "Aizkraukle"] }
            ]
        },
        "LI": {
            label: "Liechtenstein",
            apiName: "Liechtenstein",
            states: [
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
            ]
        },
        "LT": {
            label: "Lithuania",
            apiName: "Lithuania",
            states: [
                { code: "vilnius", name: "Vilnius County", cities: ["Vilnius", "Trakai", "Ukmergė", "Šalčininkai"] },
                { code: "kaunas", name: "Kaunas County", cities: ["Kaunas", "Kėdainiai", "Jonava", "Prienai"] },
                { code: "klaipeda", name: "Klaipėda County", cities: ["Klaipėda", "Palanga", "Kretinga", "Gargždai"] },
                { code: "siauliai", name: "Šiauliai County", cities: ["Šiauliai", "Kuršėnai", "Radviliškis", "Joniškis"] },
                { code: "panevezys", name: "Panevėžys County", cities: ["Panevėžys", "Biržai", "Rokiškis", "Kupiškis"] },
                { code: "alytus", name: "Alytus County", cities: ["Alytus", "Druskininkai", "Varėna", "Lazdijai"] }
            ]
        },
        "LU": {
            label: "Luxembourg",
            apiName: "Luxembourg",
            states: [
                { code: "diekirch", name: "Diekirch District", cities: ["Diekirch", "Ettelbruck", "Wiltz"] },
                { code: "grevenmacher", name: "Grevenmacher District", cities: ["Grevenmacher", "Echternach", "Remich"] },
                { code: "luxembourg", name: "Luxembourg District", cities: ["Luxembourg City", "Esch-sur-Alzette", "Differdange"] }
            ]
        },
        "MT": {
            label: "Malta",
            apiName: "Malta",
            states: [
                { code: "northern", name: "Northern Region", cities: ["Mellieħa", "St. Paul's Bay", "Mġarr"] },
                { code: "southern", name: "Southern Region", cities: ["Żejtun", "Żurrieq", "Birżebbuġa"] },
                { code: "central", name: "Central Region", cities: ["Birkirkara", "Qormi", "Mosta"] },
                { code: "south-eastern", name: "South Eastern Region", cities: ["Marsaxlokk", "Żabbar", "Għaxaq"] },
                { code: "western", name: "Western Region", cities: ["Rabat", "Żebbuġ", "Siġġiewi"] },
                { code: "gozo", name: "Gozo Region", cities: ["Victoria", "Xewkija", "Xagħra"] }
            ]
        },
        "MD": {
            label: "Moldova",
            apiName: "Moldova",
            states: [
                { code: "chisinau", name: "Chișinău Municipality", cities: ["Chișinău", "Codru", "Durlești", "Vadul lui Vodă"] },
                { code: "balti", name: "Bălți Municipality", cities: ["Bălți", "Sîngerei", "Fălești", "Glodeni"] },
                { code: "gagauzia", name: "Gagauzia", cities: ["Comrat", "Ceadîr-Lunga", "Vulcănești", "Congaz"] },
                { code: "cahul", name: "Cahul District", cities: ["Cahul", "Cantemir", "Taraclia", "Leova"] },
                { code: "orhei", name: "Orhei District", cities: ["Orhei", "Rezina", "Telenești", "Șoldănești"] },
                { code: "soroca", name: "Soroca District", cities: ["Soroca", "Drochia", "Florești", "Ocnita"] }
            ]
        },
        "MC": {
            label: "Monaco",
            apiName: "Monaco",
            states: [
                { code: "fontvieille", name: "Fontvieille", cities: ["Fontvieille"] },
                { code: "la-condamine", name: "La Condamine", cities: ["La Condamine"] },
                { code: "monte-carlo", name: "Monte Carlo", cities: ["Monte Carlo"] },
                { code: "monaco-ville", name: "Monaco-Ville", cities: ["Monaco-Ville"] }
            ]
        },
        "ME": {
            label: "Montenegro",
            apiName: "Montenegro",
            states: [
                { code: "podgorica", name: "Podgorica Municipality", cities: ["Podgorica", "Tuzi", "Golubovci", "Danilovgrad"] },
                { code: "niksic", name: "Nikšić Municipality", cities: ["Nikšić", "Šavnik", "Plužine", "Žabljak"] },
                { code: "bar", name: "Bar Municipality", cities: ["Bar", "Sutomore", "Ulcinj", "Stari Bar"] },
                { code: "budva", name: "Budva Municipality", cities: ["Budva", "Tivat", "Kotor", "Petrovac"] },
                { code: "herceg-novi", name: "Herceg Novi Municipality", cities: ["Herceg Novi", "Igalo", "Meljine", "Zelenika"] },
                { code: "berane", name: "Berane Municipality", cities: ["Berane", "Andrijevica", "Rožaje", "Plav"] },
                { code: "pljevlja", name: "Pljevlja Municipality", cities: ["Pljevlja", "Bijelo Polje", "Mojkovac", "Kolašin"] }
            ]
        },
        "NL": {
            label: "Netherlands",
            apiName: "Netherlands",
            states: [
                { code: "north-holland", name: "North Holland", cities: ["Amsterdam", "Haarlem", "Alkmaar", "Hilversum"] },
                { code: "south-holland", name: "South Holland", cities: ["Rotterdam", "The Hague", "Leiden", "Dordrecht"] },
                { code: "utrecht", name: "Utrecht", cities: ["Utrecht", "Amersfoort", "Nieuwegein", "Veenendaal"] },
                { code: "north-brabant", name: "North Brabant", cities: ["Eindhoven", "Tilburg", "Breda", "'s-Hertogenbosch"] },
                { code: "gelderland", name: "Gelderland", cities: ["Arnhem", "Nijmegen", "Apeldoorn", "Ede"] },
                { code: "overijssel", name: "Overijssel", cities: ["Enschede", "Zwolle", "Deventer", "Hengelo"] },
                { code: "limburg", name: "Limburg", cities: ["Maastricht", "Heerlen", "Venlo", "Sittard-Geleen"] },
                { code: "groningen", name: "Groningen", cities: ["Groningen", "Delfzijl", "Veendam", "Winschoten"] },
                { code: "friesland", name: "Friesland", cities: ["Leeuwarden", "Drachten", "Heerenveen", "Sneek"] },
                { code: "drenthe", name: "Drenthe", cities: ["Assen", "Emmen", "Hoogeveen", "Meppel"] },
                { code: "flevoland", name: "Flevoland", cities: ["Almere", "Lelystad", "Dronten", "Zeewolde"] },
                { code: "zeeland", name: "Zeeland", cities: ["Middelburg", "Vlissingen", "Goes", "Terneuzen"] }
            ]
        },
        "MK": {
            label: "North Macedonia",
            apiName: "Macedonia",
            states: [
                { code: "skopje", name: "Skopje Region", cities: ["Skopje", "Aračinovo", "Studeničani", "Čučer-Sandevo"] },
                { code: "polog", name: "Polog Region", cities: ["Tetovo", "Gostivar", "Bogovinje", "Brvenica"] },
                { code: "southwestern", name: "Southwestern Region", cities: ["Ohrid", "Struga", "Kičevo", "Debar"] },
                { code: "southeastern", name: "Southeastern Region", cities: ["Strumica", "Gevgelija", "Radoviš", "Valandovo"] },
                { code: "pelagonia", name: "Pelagonia Region", cities: ["Bitola", "Prilep", "Resen", "Kruševo"] },
                { code: "vardar", name: "Vardar Region", cities: ["Veles", "Kavadarci", "Negotino", "Sveti Nikole"] },
                { code: "northeastern", name: "Northeastern Region", cities: ["Kumanovo", "Kriva Palanka", "Rankovce", "Kratovo"] },
                { code: "eastern", name: "Eastern Region", cities: ["Štip", "Kočani", "Vinica", "Berovo"] }
            ]
        },
        "NO": {
            label: "Norway",
            apiName: "Norway",
            states: [
                { code: "oslo", name: "Oslo County", cities: ["Oslo"] },
                { code: "viken", name: "Viken County", cities: ["Drammen", "Fredrikstad", "Sarpsborg", "Bærum"] },
                { code: "vestland", name: "Vestland County", cities: ["Bergen", "Førde", "Florø", "Voss"] },
                { code: "rogaland", name: "Rogaland County", cities: ["Stavanger", "Sandnes", "Haugesund", "Egersund"] },
                { code: "trondelag", name: "Trøndelag County", cities: ["Trondheim", "Steinkjer", "Stjørdal", "Levanger"] },
                { code: "troms-og-finnmark", name: "Troms og Finnmark County", cities: ["Tromsø", "Alta", "Hammerfest", "Vadsø"] },
                { code: "agder", name: "Agder County", cities: ["Kristiansand", "Arendal", "Grimstad", "Mandal"] },
                { code: "innlandet", name: "Innlandet County", cities: ["Lillehammer", "Hamar", "Gjøvik", "Elverum"] },
                { code: "more-og-romsdal", name: "Møre og Romsdal County", cities: ["Ålesund", "Molde", "Kristiansund", "Ulsteinvik"] },
                { code: "vestfold-og-telemark", name: "Vestfold og Telemark County", cities: ["Tønsberg", "Skien", "Porsgrunn", "Larvik"] }
            ]
        },
        "PL": {
            label: "Poland",
            apiName: "Poland",
            states: [
                { code: "masovian", name: "Masovian Voivodeship", cities: ["Warsaw", "Radom", "Płock", "Siedlce"] },
                { code: "lesser-poland", name: "Lesser Poland Voivodeship", cities: ["Kraków", "Tarnów", "Nowy Sącz", "Oświęcim"] },
                { code: "silesian", name: "Silesian Voivodeship", cities: ["Katowice", "Częstochowa", "Gliwice", "Sosnowiec"] },
                { code: "greater-poland", name: "Greater Poland Voivodeship", cities: ["Poznań", "Kalisz", "Konin", "Piła"] },
                { code: "lower-silesian", name: "Lower Silesian Voivodeship", cities: ["Wrocław", "Legnica", "Wałbrzych", "Jelenia Góra"] },
                { code: "pomeranian", name: "Pomeranian Voivodeship", cities: ["Gdańsk", "Gdynia", "Sopot", "Tczew"] },
                { code: "lodz", name: "Łódź Voivodeship", cities: ["Łódź", "Piotrków Trybunalski", "Pabianice", "Tomaszów Mazowiecki"] },
                { code: "west-pomeranian", name: "West Pomeranian Voivodeship", cities: ["Szczecin", "Koszalin", "Stargard", "Świnoujście"] },
                { code: "lublin", name: "Lublin Voivodeship", cities: ["Lublin", "Chełm", "Zamość", "Biała Podlaska"] },
                { code: "podkarpackie", name: "Podkarpackie Voivodeship", cities: ["Rzeszów", "Przemyśl", "Krosno", "Tarnobrzeg"] }
            ]
        },
        "PT": {
            label: "Portugal",
            apiName: "Portugal",
            states: [
                { code: "lisbon", name: "Lisbon Metropolitan Area", cities: ["Lisbon", "Cascais", "Sintra", "Setúbal"] },
                { code: "norte", name: "Norte Region", cities: ["Porto", "Braga", "Guimarães", "Vila Nova de Gaia"] },
                { code: "centro", name: "Centro Region", cities: ["Coimbra", "Aveiro", "Leiria", "Viseu"] },
                { code: "alentejo", name: "Alentejo Region", cities: ["Évora", "Beja", "Portalegre", "Elvas"] },
                { code: "algarve", name: "Algarve Region", cities: ["Faro", "Portimão", "Albufeira", "Lagos"] },
                { code: "madeira", name: "Madeira", cities: ["Funchal", "Câmara de Lobos", "Machico", "Santa Cruz"] },
                { code: "azores", name: "Azores", cities: ["Ponta Delgada", "Angra do Heroísmo", "Horta", "Ribeira Grande"] }
            ]
        },
        "RO": {
            label: "Romania",
            apiName: "Romania",
            states: [
                { code: "bucharest-ilfov", name: "Bucharest-Ilfov", cities: ["Bucharest", "Voluntari", "Otopeni", "Popești-Leordeni"] },
                { code: "cluj", name: "Cluj County", cities: ["Cluj-Napoca", "Turda", "Dej", "Gherla"] },
                { code: "timis", name: "Timiș County", cities: ["Timișoara", "Lugoj", "Sânnicolau Mare", "Jimbolia"] },
                { code: "iasi", name: "Iași County", cities: ["Iași", "Pașcani", "Hârlău", "Târgu Frumos"] },
                { code: "constanta", name: "Constanța County", cities: ["Constanța", "Mangalia", "Medgidia", "Năvodari"] },
                { code: "brasov", name: "Brașov County", cities: ["Brașov", "Făgăraș", "Codlea", "Săcele"] },
                { code: "prahova", name: "Prahova County", cities: ["Ploiești", "Câmpina", "Sinaia", "Azuga"] },
                { code: "sibiu", name: "Sibiu County", cities: ["Sibiu", "Mediaș", "Cisnădie", "Avrig"] },
                { code: "dolj", name: "Dolj County", cities: ["Craiova", "Calafat", "Filiași", "Băilești"] },
                { code: "galati", name: "Galați County", cities: ["Galați", "Tecuci", "Târgu Bujor", "Berești"] }
            ]
        },
        "RU": {
            label: "Russia",
            apiName: "Russia",
            states: [
                { code: "moscow", name: "Moscow", cities: ["Moscow", "Zelenograd", "Troitsk"] },
                { code: "moscow-oblast", name: "Moscow Oblast", cities: ["Khimki", "Podolsk", "Mytishchi", "Korolyov"] },
                { code: "saint-petersburg", name: "Saint Petersburg", cities: ["Saint Petersburg", "Pushkin", "Petergof", "Kronstadt"] },
                { code: "krasnodar", name: "Krasnodar Krai", cities: ["Krasnodar", "Sochi", "Novorossiysk", "Armavir"] },
                { code: "novosibirsk", name: "Novosibirsk Oblast", cities: ["Novosibirsk", "Berdsk", "Iskitim", "Kuybyshev"] },
                { code: "sverdlovsk", name: "Sverdlovsk Oblast", cities: ["Yekaterinburg", "Nizhny Tagil", "Kamensk-Uralsky", "Pervouralsk"] },
                { code: "tatarstan", name: "Republic of Tatarstan", cities: ["Kazan", "Naberezhnye Chelny", "Nizhnekamsk", "Almetyevsk"] },
                { code: "bashkortostan", name: "Republic of Bashkortostan", cities: ["Ufa", "Sterlitamak", "Salavat", "Neftekamsk"] },
                { code: "rostov", name: "Rostov Oblast", cities: ["Rostov-on-Don", "Taganrog", "Shakhty", "Volgodonsk"] },
                { code: "samara", name: "Samara Oblast", cities: ["Samara", "Tolyatti", "Syzran", "Novokuybyshevsk"] }
            ]
        },
        "SM": {
            label: "San Marino",
            apiName: "San Marino",
            states: [
                { code: "acquaviva", name: "Acquaviva", cities: ["Acquaviva"] },
                { code: "borgo-maggiore", name: "Borgo Maggiore", cities: ["Borgo Maggiore"] },
                { code: "chiesanuova", name: "Chiesanuova", cities: ["Chiesanuova"] },
                { code: "domagnano", name: "Domagnano", cities: ["Domagnano"] },
                { code: "faetano", name: "Faetano", cities: ["Faetano"] },
                { code: "fiorentino", name: "Fiorentino", cities: ["Fiorentino"] },
                { code: "montegiardino", name: "Montegiardino", cities: ["Montegiardino"] },
                { code: "san-marino", name: "San Marino", cities: ["City of San Marino"] },
                { code: "serravalle", name: "Serravalle", cities: ["Serravalle"] }
            ]
        },
        "RS": {
            label: "Serbia",
            apiName: "Serbia",
            states: [
                { code: "belgrade", name: "Belgrade City", cities: ["Belgrade", "Zemun", "Pančevo", "Obrenovac"] },
                { code: "vojvodina", name: "Vojvodina Province", cities: ["Novi Sad", "Subotica", "Zrenjanin", "Sombor"] },
                { code: "sumadija", name: "Šumadija District", cities: ["Kragujevac", "Aranđelovac", "Topola", "Batočina"] },
                { code: "nisava", name: "Nišava District", cities: ["Niš", "Leskovac", "Prokuplje", "Aleksinac"] },
                { code: "raska", name: "Raška District", cities: ["Novi Pazar", "Kraljevo", "Vrnjačka Banja", "Raška"] },
                { code: "zlatibor", name: "Zlatibor District", cities: ["Užice", "Priboj", "Prijepolje", "Nova Varoš"] }
            ]
        },
        "SK": {
            label: "Slovakia",
            apiName: "Slovakia",
            states: [
                { code: "bratislava", name: "Bratislava Region", cities: ["Bratislava", "Pezinok", "Malacky", "Senec"] },
                { code: "trnava", name: "Trnava Region", cities: ["Trnava", "Piešťany", "Hlohovec", "Dunajská Streda"] },
                { code: "trencin", name: "Trenčín Region", cities: ["Trenčín", "Prievidza", "Považská Bystrica", "Nové Mesto nad Váhom"] },
                { code: "nitra", name: "Nitra Region", cities: ["Nitra", "Nové Zámky", "Komárno", "Levice"] },
                { code: "zilina", name: "Žilina Region", cities: ["Žilina", "Martin", "Liptovský Mikuláš", "Čadca"] },
                { code: "banska-bystrica", name: "Banská Bystrica Region", cities: ["Banská Bystrica", "Zvolen", "Lučenec", "Rimavská Sobota"] },
                { code: "presov", name: "Prešov Region", cities: ["Prešov", "Poprad", "Humenné", "Snina"] },
                { code: "kosice", name: "Košice Region", cities: ["Košice", "Michalovce", "Spišská Nová Ves", "Rožňava"] }
            ]
        },
        "SI": {
            label: "Slovenia",
            apiName: "Slovenia",
            states: [
                { code: "central-slovenia", name: "Central Slovenia", cities: ["Ljubljana", "Domžale", "Kamnik", "Vrhnika"] },
                { code: "drava", name: "Drava", cities: ["Maribor", "Ptuj", "Slovenska Bistrica", "Ormož"] },
                { code: "savinja", name: "Savinja", cities: ["Celje", "Velenje", "Žalec", "Laško"] },
                { code: "upper-carniola", name: "Upper Carniola", cities: ["Kranj", "Jesenice", "Škofja Loka", "Tržič"] },
                { code: "littoral-inner-carniola", name: "Littoral–Inner Carniola", cities: ["Koper", "Postojna", "Piran", "Ilirska Bistrica"] },
                { code: "mura", name: "Mura", cities: ["Murska Sobota", "Lendava", "Gornja Radgona", "Ljutomer"] },
                { code: "southeast-slovenia", name: "Southeast Slovenia", cities: ["Novo Mesto", "Črnomelj", "Kočevje", "Metlika"] },
                { code: "lower-sava", name: "Lower Sava", cities: ["Krško", "Brežice", "Sevnica", "Radeče"] }
            ]
        },
        "ES": {
            label: "Spain",
            apiName: "Spain",
            states: [
                { code: "madrid", name: "Community of Madrid", cities: ["Madrid", "Móstoles", "Alcalá de Henares", "Getafe"] },
                { code: "catalonia", name: "Catalonia", cities: ["Barcelona", "L'Hospitalet de Llobregat", "Badalona", "Terrassa"] },
                { code: "andalusia", name: "Andalusia", cities: ["Seville", "Málaga", "Córdoba", "Granada"] },
                { code: "valencian-community", name: "Valencian Community", cities: ["Valencia", "Alicante", "Elche", "Castellón de la Plana"] },
                { code: "basque-country", name: "Basque Country", cities: ["Bilbao", "Vitoria-Gasteiz", "San Sebastián", "Barakaldo"] },
                { code: "galicia", name: "Galicia", cities: ["Vigo", "A Coruña", "Ourense", "Santiago de Compostela"] },
                { code: "castile-and-leon", name: "Castile and León", cities: ["Valladolid", "Burgos", "Salamanca", "León"] }
            ]
        },
        "SE": {
            label: "Sweden",
            apiName: "Sweden",
            states: [
                { code: "stockholm", name: "Stockholm County", cities: ["Stockholm", "Solna", "Södertälje", "Nacka"] },
                { code: "vastra-gotaland", name: "Västra Götaland County", cities: ["Gothenburg", "Borås", "Trollhättan", "Skövde"] },
                { code: "skane", name: "Skåne County", cities: ["Malmö", "Lund", "Helsingborg", "Kristianstad"] },
                { code: "uppsala", name: "Uppsala County", cities: ["Uppsala", "Enköping", "Tierp", "Östhammar"] },
                { code: "ostergotland", name: "Östergötland County", cities: ["Linköping", "Norrköping", "Motala", "Mjölby"] },
                { code: "vastmanland", name: "Västmanland County", cities: ["Västerås", "Köping", "Sala", "Fagersta"] },
                { code: "orebro", name: "Örebro County", cities: ["Örebro", "Kumla", "Karlskoga", "Lindesberg"] },
                { code: "jonkoping", name: "Jönköping County", cities: ["Jönköping", "Nässjö", "Värnamo", "Eksjö"] },
                { code: "norrbotten", name: "Norrbotten County", cities: ["Luleå", "Kiruna", "Piteå", "Boden"] },
                { code: "vasterbotten", name: "Västerbotten County", cities: ["Umeå", "Skellefteå", "Lycksele", "Vindeln"] }
            ]
        },
        "CH": {
            label: "Switzerland",
            apiName: "Switzerland",
            states: [
                { code: "zurich", name: "Canton of Zurich", cities: ["Zurich", "Winterthur", "Uster", "Dübendorf"] },
                { code: "bern", name: "Canton of Bern", cities: ["Bern", "Biel/Bienne", "Thun", "Interlaken"] },
                { code: "vaud", name: "Canton of Vaud", cities: ["Lausanne", "Yverdon-les-Bains", "Montreux", "Nyon"] },
                { code: "geneva", name: "Canton of Geneva", cities: ["Geneva", "Carouge", "Lancy", "Vernier"] },
                { code: "aargau", name: "Canton of Aargau", cities: ["Aarau", "Baden", "Wettingen", "Rheinfelden"] },
                { code: "basel-stadt", name: "Canton of Basel-Stadt", cities: ["Basel", "Riehen", "Bettingen"] },
                { code: "basel-landschaft", name: "Canton of Basel-Landschaft", cities: ["Liestal", "Allschwil", "Reinach", "Binningen"] },
                { code: "st-gallen", name: "Canton of St. Gallen", cities: ["St. Gallen", "Rapperswil-Jona", "Wil", "Gossau"] },
                { code: "ticino", name: "Canton of Ticino", cities: ["Lugano", "Bellinzona", "Locarno", "Mendrisio"] },
                { code: "valais", name: "Canton of Valais", cities: ["Sion", "Sierre", "Brig-Glis", "Martigny"] },
                { code: "lucerne", name: "Canton of Lucerne", cities: ["Lucerne", "Emmen", "Kriens", "Horw"] },
                { code: "zug", name: "Canton of Zug", cities: ["Zug", "Baar", "Cham", "Rotkreuz"] }
            ]
        },
        "UA": {
            label: "Ukraine",
            apiName: "Ukraine",
            states: [
                { code: "kyiv-city", name: "Kyiv City", cities: ["Kyiv"] },
                { code: "kyiv-oblast", name: "Kyiv Oblast", cities: ["Bila Tserkva", "Brovary", "Boryspil", "Irpin"] },
                { code: "lviv", name: "Lviv Oblast", cities: ["Lviv", "Drohobych", "Chervonohrad", "Stryi"] },
                { code: "kharkiv", name: "Kharkiv Oblast", cities: ["Kharkiv", "Izium", "Kupiansk", "Lozova"] },
                { code: "dnipropetrovsk", name: "Dnipropetrovsk Oblast", cities: ["Dnipro", "Kryvyi Rih", "Kamianske", "Nikopol"] },
                { code: "odessa", name: "Odessa Oblast", cities: ["Odesa", "Izmail", "Bilhorod-Dnistrovskyi", "Chornomorsk"] },
                { code: "donetsk", name: "Donetsk Oblast", cities: ["Donetsk", "Mariupol", "Kramatorsk", "Sloviansk"] },
                { code: "zaporizhzhia", name: "Zaporizhzhia Oblast", cities: ["Zaporizhzhia", "Melitopol", "Berdyansk", "Enerhodar"] },
                { code: "vinnytsia", name: "Vinnytsia Oblast", cities: ["Vinnytsia", "Khmilnyk", "Mohyliv-Podilskyi", "Zhmerynka"] },
                { code: "poltava", name: "Poltava Oblast", cities: ["Poltava", "Kremenchuk", "Lubny", "Horishni Plavni"] }
            ]
        },
        "GB": {
            label: "United Kingdom",
            apiName: "United Kingdom",
            states: [
                { code: "england", name: "England", cities: ["London", "Birmingham", "Manchester", "Leeds", "Bristol"] },
                { code: "scotland", name: "Scotland", cities: ["Edinburgh", "Glasgow", "Aberdeen", "Inverness"] },
                { code: "wales", name: "Wales", cities: ["Cardiff", "Swansea", "Newport", "Wrexham"] },
                { code: "northern-ireland", name: "Northern Ireland", cities: ["Belfast", "Derry", "Lisburn", "Newry"] }
            ]
        }
    };

    const LOCATION_API_ENDPOINTS = {
        states: "https://countriesnow.space/api/v0.1/countries/states",
        cities: "https://countriesnow.space/api/v0.1/countries/state/cities"
    };

    const allowedCountries = Object.keys(curatedDatasets).reduce((map, code) => {
        const entry = curatedDatasets[code];
        map[code] = { label: entry.label, apiName: entry.apiName };
        return map;
    }, {});

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
            const code = state.code ? state.code : sanitizeCode(state.name);
            const cities = cleanList(state.cities || []);
            fallbackCityMap[`${countryCode}::${code}`] = cities;
            return { code, name };
        }).filter(Boolean);

        if (preparedStates.length) {
            fallbackDatasets[countryCode] = preparedStates.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    Object.keys(curatedDatasets).forEach(countryCode => {
        registerFallbackDataset(countryCode, curatedDatasets[countryCode].states);
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

        const curatedStates = fallbackDatasets[countryCode] ? [...fallbackDatasets[countryCode]] : [];
        const seenCodes = new Set(curatedStates.map(state => state.code));
        let states = curatedStates;

        try {
            const apiStates = await fetchStatesFromApi(countryCode);
            if (apiStates.length) {
                apiStates.forEach(state => {
                    if (!seenCodes.has(state.code)) {
                        states.push(state);
                        seenCodes.add(state.code);
                    }
                });
                states.sort((a, b) => a.name.localeCompare(b.name));
            }
        } catch (error) {
            console.error("State loading failed for", countryCode, error);
        }

        if (!states.length) {
            const countryLabel = allowedCountries[countryCode] ? allowedCountries[countryCode].label : "General Region";
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

        const curatedCities = fallbackCityMap[cacheKey] ? [...fallbackCityMap[cacheKey]] : [];
        const seen = new Set(curatedCities.map(city => city.toLowerCase()));
        let cities = curatedCities;

        try {
            const apiCities = await fetchCitiesFromApi(countryCode, stateCode);
            if (apiCities.length) {
                apiCities.forEach(city => {
                    const normalized = city.toLowerCase();
                    if (!seen.has(normalized)) {
                        cities.push(city);
                        seen.add(normalized);
                    }
                });
            }
        } catch (error) {
            console.error("City loading failed for", countryCode, stateCode, error);
        }

        cities = cleanList(cities);
        cities.sort((a, b) => a.localeCompare(b));

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
