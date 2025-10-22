/**
 * Enhanced Location Selector for Tessera Amoris
 * Provides smart, cascading country > state > city selection with "Other" option
 * Includes comprehensive data for Paraguay and 45 European countries
 */

class EnhancedLocationSelector {
  constructor() {
    this.locationData = this.initializeLocationData();
    this.selectedCountry = null;
    this.selectedState = null;
    this.selectedCity = null;
    this.init();
  }

  /**
   * Initialize comprehensive location data
   */
  initializeLocationData() {
    return {
      "PY": {
        name: "Paraguay",
        flag: "🇵🇾",
        states: {
          "ASU": { name: "Asunción (Capital)", cities: ["Asunción", "San Lorenzo", "Capiatá", "Fernando de la Mora", "Lambaré", "Other"] },
          "01": { name: "Concepción", cities: ["Concepción", "Horqueta", "Salto del Guairá", "Other"] },
          "02": { name: "San Pedro", cities: ["San Pedro", "Caaguazú", "Salto del Guairá", "Other"] },
          "03": { name: "Cordillera", cities: ["Caacupé", "Villarrica", "Piribebuy", "Tobatí", "Other"] },
          "04": { name: "Guairá", cities: ["Villarrica", "Coronel Bogado", "Natalio", "Other"] },
          "05": { name: "Caaguazú", cities: ["Coronel Oviedo", "Caaguazú", "Salto del Guairá", "Other"] },
          "06": { name: "Caazapá", cities: ["Caazapá", "Yuty", "Salto del Guairá", "Other"] },
          "07": { name: "Itapúa", cities: ["Encarnación", "Oberá", "Ciudad del Este", "Other"] },
          "08": { name: "Misiones", cities: ["San Juan Bautista", "Ayolas", "Salto del Guairá", "Other"] },
          "09": { name: "Paraguarí", cities: ["Paraguarí", "Caaguazú", "Villarrica", "Other"] },
          "10": { name: "Alto Paraná", cities: ["Ciudad del Este", "Hernandarias", "Minga Guazú", "Other"] },
          "11": { name: "Central", cities: ["Areguá", "Caaguazú", "San Antonio de Areco", "Other"] },
          "12": { name: "Ñeembucú", cities: ["Pilar", "Caaguazú", "Salto del Guairá", "Other"] },
          "13": { name: "Amambay", cities: ["Pedro Juan Caballero", "Bella Vista", "Salto del Guairá", "Other"] },
          "14": { name: "Canindeyú", cities: ["Saltos del Guairá", "Caaguazú", "Salto del Guairá", "Other"] },
          "15": { name: "Presidente Hayes", cities: ["Villa Hayes", "Caaguazú", "Salto del Guairá", "Other"] },
          "16": { name: "Alto Paraguay", cities: ["Fuerte Olimpo", "Caaguazú", "Salto del Guairá", "Other"] },
          "17": { name: "Boquerón", cities: ["Filadelfia", "Mariano Roque Alonso", "Salto del Guairá", "Other"] }
        }
      },
      "ES": {
        name: "Spain",
        flag: "🇪🇸",
        states: {
          "AN": { name: "Andalusia", cities: ["Seville", "Málaga", "Granada", "Córdoba", "Jaén", "Almería", "Huelva", "Cádiz", "Other"] },
          "AR": { name: "Aragon", cities: ["Zaragoza", "Huesca", "Teruel", "Other"] },
          "AS": { name: "Asturias", cities: ["Oviedo", "Gijón", "Avilés", "Mieres", "Other"] },
          "IB": { name: "Balearic Islands", cities: ["Palma", "Ibiza", "Mahón", "Alcúdia", "Other"] },
          "PV": { name: "Basque Country", cities: ["Bilbao", "Vitoria", "San Sebastián", "Getxo", "Other"] },
          "CB": { name: "Cantabria", cities: ["Santander", "Torrelavega", "Castro Urdiales", "Other"] },
          "CM": { name: "Castilla-La Mancha", cities: ["Toledo", "Ciudad Real", "Cuenca", "Albacete", "Guadalajara", "Other"] },
          "CL": { name: "Castilla y León", cities: ["Valladolid", "Burgos", "León", "Salamanca", "Segovia", "Soria", "Ávila", "Palencia", "Zamora", "Other"] },
          "CT": { name: "Catalonia", cities: ["Barcelona", "Girona", "Tarragona", "Lleida", "Sabadell", "Terrassa", "Other"] },
          "EX": { name: "Extremadura", cities: ["Badajoz", "Cáceres", "Mérida", "Plasencia", "Other"] },
          "GA": { name: "Galicia", cities: ["Santiago de Compostela", "A Coruña", "Vigo", "Pontevedra", "Lugo", "Ourense", "Other"] },
          "MD": { name: "Madrid", cities: ["Madrid", "Alcalá de Henares", "Getafe", "Leganés", "Móstoles", "Alcorcón", "Fuenlabrada", "Other"] },
          "MC": { name: "Murcia", cities: ["Murcia", "Cartagena", "Lorca", "Molina de Segura", "Other"] },
          "NC": { name: "Navarre", cities: ["Pamplona", "Tudela", "Estella", "Tafalla", "Other"] },
          "RI": { name: "La Rioja", cities: ["Logroño", "Calahorra", "Arnedo", "Haro", "Other"] },
          "VC": { name: "Valencia", cities: ["Valencia", "Alicante", "Castellón", "Torrevieja", "Benidorm", "Gandia", "Other"] }
        }
      },
      "FR": {
        name: "France",
        flag: "🇫🇷",
        states: {
          "IDF": { name: "Île-de-France", cities: ["Paris", "Versailles", "Boulogne-Billancourt", "Saint-Denis", "Neuilly-sur-Seine", "Other"] },
          "ARA": { name: "Auvergne-Rhône-Alpes", cities: ["Lyon", "Grenoble", "Saint-Étienne", "Chambéry", "Annecy", "Other"] },
          "BFC": { name: "Bourgogne-Franche-Comté", cities: ["Dijon", "Besançon", "Auxerre", "Chalon-sur-Saône", "Other"] },
          "BRE": { name: "Brittany", cities: ["Rennes", "Brest", "Quimper", "Lorient", "Vannes", "Other"] },
          "CVL": { name: "Centre-Val de Loire", cities: ["Orléans", "Tours", "Blois", "Chartres", "Other"] },
          "COR": { name: "Corsica", cities: ["Ajaccio", "Bastia", "Corte", "Bonifacio", "Other"] },
          "GES": { name: "Grand Est", cities: ["Strasbourg", "Metz", "Reims", "Mulhouse", "Nancy", "Other"] },
          "HDF": { name: "Hauts-de-France", cities: ["Lille", "Amiens", "Lens", "Roubaix", "Tourcoing", "Other"] },
          "NAQ": { name: "Nouvelle-Aquitaine", cities: ["Bordeaux", "Poitiers", "Limoges", "Bayonne", "Angoulême", "Other"] },
          "NOR": { name: "Normandy", cities: ["Rouen", "Caen", "Le Havre", "Cherbourg", "Dieppe", "Other"] },
          "OCC": { name: "Occitanie", cities: ["Toulouse", "Montpellier", "Nîmes", "Perpignan", "Albi", "Other"] },
          "PAC": { name: "Provence-Alpes-Côte d'Azur", cities: ["Marseille", "Nice", "Cannes", "Toulon", "Aix-en-Provence", "Other"] },
          "PDL": { name: "Pays de la Loire", cities: ["Nantes", "Angers", "Le Mans", "Saint-Nazaire", "Saint-Herblain", "Other"] }
        }
      },
      "DE": {
        name: "Germany",
        flag: "🇩🇪",
        states: {
          "BW": { name: "Baden-Württemberg", cities: ["Stuttgart", "Mannheim", "Karlsruhe", "Heidelberg", "Freiburg", "Ulm", "Other"] },
          "BY": { name: "Bavaria", cities: ["Munich", "Nuremberg", "Augsburg", "Regensburg", "Ingolstadt", "Other"] },
          "BE": { name: "Berlin", cities: ["Berlin"] },
          "BB": { name: "Brandenburg", cities: ["Potsdam", "Cottbus", "Brandenburg an der Havel", "Other"] },
          "HB": { name: "Bremen", cities: ["Bremen", "Bremerhaven"] },
          "HH": { name: "Hamburg", cities: ["Hamburg"] },
          "HE": { name: "Hesse", cities: ["Frankfurt", "Wiesbaden", "Darmstadt", "Offenbach", "Other"] },
          "MV": { name: "Mecklenburg-Vorpommern", cities: ["Schwerin", "Rostock", "Greifswald", "Other"] },
          "NI": { name: "Lower Saxony", cities: ["Hannover", "Braunschweig", "Osnabrück", "Oldenburg", "Other"] },
          "NW": { name: "North Rhine-Westphalia", cities: ["Cologne", "Düsseldorf", "Dortmund", "Essen", "Duisburg", "Bonn", "Other"] },
          "RP": { name: "Rhineland-Palatinate", cities: ["Mainz", "Ludwigshafen", "Koblenz", "Trier", "Other"] },
          "SL": { name: "Saarland", cities: ["Saarbrücken", "Neunkirchen", "Saarlouis", "Other"] },
          "SN": { name: "Saxony", cities: ["Dresden", "Leipzig", "Chemnitz", "Zwickau", "Other"] },
          "ST": { name: "Saxony-Anhalt", cities: ["Magdeburg", "Halle", "Dessau", "Other"] },
          "SH": { name: "Schleswig-Holstein", cities: ["Kiel", "Lübeck", "Flensburg", "Norderstedt", "Other"] },
          "TH": { name: "Thuringia", cities: ["Erfurt", "Jena", "Gera", "Weimar", "Other"] }
        }
      },
      "IT": {
        name: "Italy",
        flag: "🇮🇹",
        states: {
          "AB": { name: "Abruzzo", cities: ["L'Aquila", "Pescara", "Teramo", "Chieti", "Other"] },
          "AL": { name: "Aosta Valley", cities: ["Aosta", "Ivrea"] },
          "BA": { name: "Apulia", cities: ["Bari", "Brindisi", "Taranto", "Lecce", "Foggia", "Other"] },
          "BL": { name: "Basilicata", cities: ["Potenza", "Matera", "Other"] },
          "CA": { name: "Calabria", cities: ["Reggio Calabria", "Catanzaro", "Cosenza", "Crotone", "Other"] },
          "CM": { name: "Campania", cities: ["Naples", "Salerno", "Caserta", "Avellino", "Benevento", "Other"] },
          "EM": { name: "Emilia-Romagna", cities: ["Bologna", "Parma", "Modena", "Reggio Emilia", "Ferrara", "Ravenna", "Other"] },
          "FV": { name: "Friuli-Venezia Giulia", cities: ["Trieste", "Udine", "Gorizia", "Pordenone", "Other"] },
          "LA": { name: "Lazio", cities: ["Rome", "Frascati", "Tivoli", "Viterbo", "Frosinone", "Other"] },
          "LI": { name: "Liguria", cities: ["Genoa", "La Spezia", "Savona", "Imperia", "Sanremo", "Other"] },
          "LO": { name: "Lombardy", cities: ["Milan", "Brescia", "Como", "Bergamo", "Monza", "Varese", "Other"] },
          "MA": { name: "Marche", cities: ["Ancona", "Pesaro", "Macerata", "Ascoli Piceno", "Other"] },
          "MO": { name: "Molise", cities: ["Campobasso", "Isernia"] },
          "PI": { name: "Piedmont", cities: ["Turin", "Alessandria", "Asti", "Cuneo", "Novara", "Vercelli", "Other"] },
          "PM": { name: "Pisa", cities: ["Pisa", "Livorno", "Lucca", "Massa", "Siena", "Other"] },
          "SA": { name: "Sardinia", cities: ["Cagliari", "Sassari", "Alghero", "Oristano", "Nuoro", "Other"] },
          "SI": { name: "Sicily", cities: ["Palermo", "Catania", "Messina", "Agrigento", "Trapani", "Other"] },
          "TO": { name: "Toscana", cities: ["Florence", "Siena", "Arezzo", "Prato", "Livorno", "Other"] },
          "UM": { name: "Umbria", cities: ["Perugia", "Terni", "Assisi", "Orvieto", "Other"] },
          "VE": { name: "Veneto", cities: ["Venice", "Padua", "Verona", "Vicenza", "Treviso", "Belluno", "Other"] }
        }
      },
      "GB": {
        name: "United Kingdom",
        flag: "🇬🇧",
        states: {
          "EN": { name: "England", cities: ["London", "Manchester", "Birmingham", "Leeds", "Liverpool", "Bristol", "Sheffield", "Other"] },
          "SC": { name: "Scotland", cities: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness", "Other"] },
          "WA": { name: "Wales", cities: ["Cardiff", "Swansea", "Newport", "Wrexham", "Other"] },
          "NI": { name: "Northern Ireland", cities: ["Belfast", "Derry", "Armagh", "Lisburn", "Other"] }
        }
      },
      "NL": {
        name: "Netherlands",
        flag: "🇳🇱",
        states: {
          "DR": { name: "Drenthe", cities: ["Assen", "Emmen", "Meppel", "Other"] },
          "FL": { name: "Flevoland", cities: ["Lelystad", "Almere", "Dronten", "Other"] },
          "FR": { name: "Friesland", cities: ["Leeuwarden", "Sneek", "Harlingen", "Other"] },
          "GE": { name: "Gelderland", cities: ["Arnhem", "Nijmegen", "Apeldoorn", "Zutphen", "Other"] },
          "GR": { name: "Groningen", cities: ["Groningen", "Delfzijl", "Appingedam", "Other"] },
          "LI": { name: "Limburg", cities: ["Maastricht", "Roggel", "Venlo", "Heerlen", "Other"] },
          "NB": { name: "North Brabant", cities: ["Breda", "'s-Hertogenbosch", "Tilburg", "Eindhoven", "Other"] },
          "NH": { name: "North Holland", cities: ["Amsterdam", "Haarlem", "Zaandam", "Alkmaar", "Other"] },
          "OV": { name: "Overijssel", cities: ["Zwolle", "Enschede", "Almelo", "Deventer", "Other"] },
          "UT": { name: "Utrecht", cities: ["Utrecht", "Amersfoort", "Zeist", "Nieuwegein", "Other"] },
          "ZH": { name: "South Holland", cities: ["The Hague", "Rotterdam", "Dordrecht", "Delft", "Leiden", "Other"] },
          "ZE": { name: "Zeeland", cities: ["Middelburg", "Vlissingen", "Terneuzen", "Other"] }
        }
      },
      "BE": {
        name: "Belgium",
        flag: "🇧🇪",
        states: {
          "VLG": { name: "Flanders", cities: ["Antwerp", "Ghent", "Bruges", "Leuven", "Hasselt", "Other"] },
          "WAL": { name: "Wallonia", cities: ["Liège", "Charleroi", "Mons", "Namur", "Tournai", "Other"] },
          "BRU": { name: "Brussels", cities: ["Brussels"] }
        }
      },
      "AT": {
        name: "Austria",
        flag: "🇦🇹",
        states: {
          "BGL": { name: "Burgenland", cities: ["Eisenstadt", "Oberwart", "Neusiedl am See", "Other"] },
          "KTN": { name: "Kärnten", cities: ["Klagenfurt", "Villach", "Wolfsberg", "Other"] },
          "NÖ": { name: "Niederösterreich", cities: ["Sankt Pölten", "Krems", "Waidhofen", "Other"] },
          "OÖ": { name: "Oberösterreich", cities: ["Linz", "Wels", "Steyr", "Salzburg", "Other"] },
          "SBG": { name: "Salzburg", cities: ["Salzburg", "Hallein", "Saalfelden", "Other"] },
          "STM": { name: "Steiermark", cities: ["Graz", "Leoben", "Kapfenberg", "Feldbach", "Other"] },
          "TRL": { name: "Tirol", cities: ["Innsbruck", "Lienz", "Kufstein", "Schwaz", "Other"] },
          "VBG": { name: "Vorarlberg", cities: ["Bregenz", "Dornbirn", "Feldkirch", "Other"] },
          "WIE": { name: "Wien", cities: ["Wien"] }
        }
      },
      "CH": {
        name: "Switzerland",
        flag: "🇨🇭",
        states: {
          "AG": { name: "Aargau", cities: ["Aarau", "Baden", "Wettingen", "Other"] },
          "AI": { name: "Appenzell Innerrhoden", cities: ["Appenzell", "Herisau"] },
          "AR": { name: "Appenzell Ausserrhoden", cities: ["Herisau", "Teufen", "Heiden", "Other"] },
          "BE": { name: "Bern", cities: ["Bern", "Thun", "Biel", "Burgdorf", "Other"] },
          "BL": { name: "Basel-Landschaft", cities: ["Liestal", "Laufen", "Waldenburg", "Other"] },
          "BS": { name: "Basel-Stadt", cities: ["Basel"] },
          "FR": { name: "Fribourg", cities: ["Fribourg", "Bulle", "Romont", "Other"] },
          "GE": { name: "Geneva", cities: ["Geneva", "Lausanne", "Vernier", "Other"] },
          "GL": { name: "Glarus", cities: ["Glarus", "Näfels", "Schwanden", "Other"] },
          "GR": { name: "Graubünden", cities: ["Chur", "Davos", "Arosa", "Klosters", "Other"] },
          "JU": { name: "Jura", cities: ["Delémont", "Porrentruy", "Saignelégier", "Other"] },
          "LU": { name: "Lucerne", cities: ["Lucerne", "Zug", "Emmen", "Other"] },
          "NE": { name: "Neuchâtel", cities: ["Neuchâtel", "La Chaux-de-Fonds", "Le Locle", "Other"] },
          "NW": { name: "Nidwalden", cities: ["Stans", "Ennetmoos", "Beckenried", "Other"] },
          "OW": { name: "Obwalden", cities: ["Sarnen", "Alpnach", "Kerns", "Other"] },
          "SG": { name: "Saint Gallen", cities: ["Saint Gallen", "Wil", "Gossau", "Buchs", "Other"] },
          "SH": { name: "Schaffhausen", cities: ["Schaffhausen", "Neuhausen", "Stein am Rhein", "Other"] },
          "SO": { name: "Solothurn", cities: ["Solothurn", "Olten", "Grenchen", "Other"] },
          "SZ": { name: "Schwyz", cities: ["Schwyz", "Einsiedeln", "Küssnacht", "Other"] },
          "TG": { name: "Thurgau", cities: ["Frauenfeld", "Kreuzlingen", "Weinfelden", "Other"] },
          "TI": { name: "Ticino", cities: ["Lugano", "Bellinzona", "Locarno", "Ascona", "Other"] },
          "UR": { name: "Uri", cities: ["Altdorf", "Göschenen", "Andermatt", "Other"] },
          "VD": { name: "Vaud", cities: ["Lausanne", "Montreux", "Vevey", "Yverdon-les-Bains", "Other"] },
          "VS": { name: "Valais", cities: ["Sion", "Martigny", "Verbier", "Zermatt", "Other"] },
          "ZG": { name: "Zug", cities: ["Zug", "Cham", "Baar", "Other"] },
          "ZH": { name: "Zurich", cities: ["Zurich", "Winterthur", "Uster", "Dübendorf", "Other"] }
        }
      },
      "SE": {
        name: "Sweden",
        flag: "🇸🇪",
        states: {
          "AB": { name: "Stockholm", cities: ["Stockholm", "Västerås", "Sundbyberg", "Other"] },
          "C": { name: "Uppsala", cities: ["Uppsala", "Enköping", "Västerås", "Other"] },
          "D": { name: "Gävleborg", cities: ["Gävle", "Sandviken", "Söderhamn", "Other"] },
          "E": { name: "Västernorrland", cities: ["Sundsvall", "Örnsköldsvik", "Härnösand", "Other"] },
          "F": { name: "Jämtland", cities: ["Östersund", "Åre", "Krokom", "Other"] },
          "G": { name: "Västerbotten", cities: ["Umeå", "Skellefteå", "Lycksele", "Other"] },
          "H": { name: "Norrbotten", cities: ["Luleå", "Kiruna", "Boden", "Other"] },
          "I": { name: "Dalarna", cities: ["Falun", "Borlänge", "Ludvika", "Other"] },
          "K": { name: "Örebro", cities: ["Örebro", "Kumla", "Hallsberg", "Other"] },
          "N": { name: "Värmland", cities: ["Karlstad", "Sunne", "Arvika", "Other"] },
          "S": { name: "Västra Götaland", cities: ["Gothenburg", "Borås", "Trollhättan", "Västerås", "Other"] },
          "T": { name: "Östergötland", cities: ["Linköping", "Norrköping", "Mjölby", "Other"] },
          "U": { name: "Småland", cities: ["Jönköping", "Växjö", "Värnamo", "Other"] },
          "W": { name: "Scania", cities: ["Malmö", "Lund", "Helsingborg", "Landskrona", "Other"] },
          "X": { name: "Halland", cities: ["Halmstad", "Kungsbacka", "Varberg", "Other"] },
          "Y": { name: "Gotland", cities: ["Visby", "Roma", "Hemse", "Other"] },
          "Z": { name: "Blekinge", cities: ["Karlskrona", "Ronneby", "Sölvesborg", "Other"] }
        }
      },
      "NO": {
        name: "Norway",
        flag: "🇳🇴",
        states: {
          "01": { name: "Østfold", cities: ["Fredrikstad", "Sarpsborg", "Moss", "Other"] },
          "02": { name: "Akershus", cities: ["Lillehammer", "Hamar", "Gjøvik", "Other"] },
          "03": { name: "Oslo", cities: ["Oslo"] },
          "04": { name: "Hedmark", cities: ["Hamar", "Lillehammer", "Brumunddal", "Other"] },
          "05": { name: "Oppland", cities: ["Lillehammer", "Gjøvik", "Lillehammer", "Other"] },
          "06": { name: "Buskerud", cities: ["Drammen", "Kongsberg", "Hokksund", "Other"] },
          "07": { name: "Vestfold", cities: ["Tønsberg", "Larvik", "Sandefjord", "Other"] },
          "08": { name: "Telemark", cities: ["Skien", "Porsgrunn", "Notodden", "Other"] },
          "09": { name: "Aust-Agder", cities: ["Arendal", "Grimstad", "Lillesand", "Other"] },
          "10": { name: "Vest-Agder", cities: ["Kristiansand", "Mandal", "Farsund", "Other"] },
          "11": { name: "Rogaland", cities: ["Stavanger", "Sandnes", "Haugesund", "Other"] },
          "12": { name: "Hordaland", cities: ["Bergen", "Haugesund", "Voss", "Other"] },
          "13": { name: "Sogn og Fjordane", cities: ["Leikanger", "Sognefjord", "Florø", "Other"] },
          "14": { name: "Møre og Romsdal", cities: ["Molde", "Kristiansund", "Ålesund", "Other"] },
          "15": { name: "Sør-Trøndelag", cities: ["Trondheim", "Orkanger", "Melhus", "Other"] },
          "16": { name: "Nord-Trøndelag", cities: ["Steinkjer", "Namsos", "Verdalsøra", "Other"] },
          "17": { name: "Nordland", cities: ["Bodø", "Tromsø", "Narvik", "Other"] },
          "18": { name: "Troms", cities: ["Tromsø", "Alta", "Hammerfest", "Other"] },
          "19": { name: "Finnmark", cities: ["Vadsø", "Hammerfest", "Kirkenes", "Other"] }
        }
      },
      "DK": {
        name: "Denmark",
        flag: "🇩🇰",
        states: {
          "84": { name: "Capital Region", cities: ["Copenhagen", "Frederiksberg", "Rødovre", "Glostrup", "Other"] },
          "82": { name: "Central Denmark", cities: ["Aarhus", "Randers", "Horsens", "Silkeborg", "Other"] },
          "85": { name: "North Denmark", cities: ["Aalborg", "Hjørring", "Frederikshavn", "Sæby", "Other"] },
          "81": { name: "Region Zealand", cities: ["Roskilde", "Lolland-Falster", "Køge", "Slagelse", "Other"] },
          "83": { name: "Southern Denmark", cities: ["Odense", "Svendborg", "Esbjerg", "Aabenraa", "Other"] }
        }
      },
      "FI": {
        name: "Finland",
        flag: "🇫🇮",
        states: {
          "01": { name: "Uusimaa", cities: ["Helsinki", "Espoo", "Vantaa", "Kauniainen", "Other"] },
          "02": { name: "Varsinais-Suomi", cities: ["Turku", "Salo", "Uusikaupunki", "Other"] },
          "03": { name: "Satakunta", cities: ["Pori", "Rauma", "Huittinen", "Other"] },
          "04": { name: "Kanta-Häme", cities: ["Hämeenlinna", "Riihimäki", "Janakkala", "Other"] },
          "05": { name: "Pirkanmaa", cities: ["Tampere", "Nokia", "Ylöjärvi", "Other"] },
          "06": { name: "Päijät-Häme", cities: ["Lahti", "Heinola", "Hollola", "Other"] },
          "07": { name: "Kymenlaakso", cities: ["Kouvola", "Kotka", "Hamina", "Other"] },
          "08": { name: "South Karelia", cities: ["Lappeenranta", "Imatra", "Parikkala", "Other"] },
          "09": { name: "Etela-Savo", cities: ["Mikkeli", "Savonlinna", "Pieksämäki", "Other"] },
          "10": { name: "Pohjois-Savo", cities: ["Kuopio", "Iisalmi", "Varkaus", "Other"] },
          "11": { name: "Pohjois-Karjala", cities: ["Joensuu", "Lieksa", "Nurmes", "Other"] },
          "12": { name: "Kainuu", cities: ["Kajaani", "Kuhmo", "Sotkamo", "Other"] },
          "13": { name: "Lapland", cities: ["Rovaniemi", "Kemi", "Tornio", "Other"] },
          "14": { name: "Ostrobothnia", cities: ["Vaasa", "Seinäjoki", "Kurikka", "Other"] },
          "15": { name: "Central Ostrobothnia", cities: ["Jyväskylä", "Jämsä", "Keuruu", "Other"] },
          "16": { name: "North Ostrobothnia", cities: ["Oulu", "Raahe", "Ylivieska", "Other"] }
        }
      },
      "PL": {
        name: "Poland",
        flag: "🇵🇱",
        states: {
          "02": { name: "Masovian", cities: ["Warsaw", "Radom", "Ostrołęka", "Other"] },
          "04": { name: "Łódź", cities: ["Łódź", "Piotrków Trybunalski", "Sieradz", "Other"] },
          "06": { name: "Silesian", cities: ["Katowice", "Kraków", "Wrocław", "Other"] },
          "08": { name: "Lublin", cities: ["Lublin", "Chełm", "Biała Podlaska", "Other"] },
          "10": { name: "Podlaskie", cities: ["Białystok", "Suwałki", "Łomża", "Other"] },
          "12": { name: "Warmian-Masurian", cities: ["Olsztyn", "Elbląg", "Grudziądz", "Other"] },
          "14": { name: "West Pomeranian", cities: ["Szczecin", "Zielona Góra", "Gorzów Wielkopolski", "Other"] },
          "16": { name: "Pomeranian", cities: ["Gdańsk", "Gdynia", "Sopot", "Other"] },
          "18": { name: "Kuyavian-Pomeranian", cities: ["Bydgoszcz", "Toruń", "Włocławek", "Other"] },
          "20": { name: "Greater Poland", cities: ["Poznań", "Konin", "Kalisz", "Other"] },
          "22": { name: "Lesser Poland", cities: ["Kraków", "Tarnów", "Nowy Sącz", "Other"] },
          "24": { name: "Subcarpathian", cities: ["Rzeszów", "Krosno", "Przemyśl", "Other"] },
          "26": { name: "Opole", cities: ["Opole", "Nysa", "Kluczbork", "Other"] },
          "28": { name: "Lower Silesian", cities: ["Wrocław", "Wałbrzych", "Legnica", "Other"] }
        }
      },
      "CZ": {
        name: "Czech Republic",
        flag: "🇨🇿",
        states: {
          "10": { name: "Prague", cities: ["Prague"] },
          "20": { name: "Central Bohemia", cities: ["Benešov", "Kladno", "Mělník", "Other"] },
          "31": { name: "South Bohemia", cities: ["České Budějovice", "Český Krumlov", "Prachatice", "Other"] },
          "42": { name: "Pilsen", cities: ["Plzeň", "Tachov", "Domažlice", "Other"] },
          "51": { name: "Karlovy Vary", cities: ["Karlovy Vary", "Cheb", "Sokolov", "Other"] },
          "64": { name: "Ústí nad Labem", cities: ["Ústí nad Labem", "Teplice", "Litvínov", "Other"] },
          "71": { name: "Liberec", cities: ["Liberec", "Jablonec nad Nisou", "Česká Lípa", "Other"] },
          "80": { name: "Hradec Králové", cities: ["Hradec Králové", "Pardubice", "Chrudim", "Other"] },
          "52": { name: "Olomouc", cities: ["Olomouc", "Přerov", "Šumperk", "Other"] },
          "72": { name: "Moravian-Silesian", cities: ["Ostrava", "Frýdek-Místek", "Karviná", "Other"] },
          "63": { name: "South Moravia", cities: ["Brno", "Jihlava", "Znojmo", "Other"] },
          "53": { name: "Zlín", cities: ["Zlín", "Otrokovice", "Uherské Hradiště", "Other"] }
        }
      },
      "SK": {
        name: "Slovakia",
        flag: "🇸🇰",
        states: {
          "BL": { name: "Banská Bystrica", cities: ["Banská Bystrica", "Zvolen", "Detva", "Other"] },
          "KI": { name: "Košice", cities: ["Košice", "Michalovce", "Trebišov", "Other"] },
          "NI": { name: "Nitra", cities: ["Nitra", "Levice", "Komárno", "Other"] },
          "PO": { name: "Prešov", cities: ["Prešov", "Bardejov", "Svidník", "Other"] },
          "TN": { name: "Trenčín", cities: ["Trenčín", "Púchov", "Nové Mesto nad Váhom", "Other"] },
          "TT": { name: "Trnava", cities: ["Trnava", "Dunajská Streda", "Hlohovec", "Other"] },
          "ZA": { name: "Žilina", cities: ["Žilina", "Čunovo", "Tvrdošín", "Other"] },
          "BA": { name: "Bratislava", cities: ["Bratislava", "Senec", "Malacky", "Other"] }
        }
      },
      "HU": {
        name: "Hungary",
        flag: "🇭🇺",
        states: {
          "01": { name: "Budapest", cities: ["Budapest"] },
          "02": { name: "Baranya", cities: ["Pécs", "Mohács", "Siklós", "Other"] },
          "03": { name: "Bács-Kiskun", cities: ["Kecskemét", "Baja", "Kiskunfélegyháza", "Other"] },
          "04": { name: "Békés", cities: ["Békéscsaba", "Gyula", "Szeghalom", "Other"] },
          "05": { name: "Borsod-Abaúj-Zemplén", cities: ["Miskolc", "Eger", "Sátoraljaújhely", "Other"] },
          "06": { name: "Csongrád", cities: ["Szeged", "Makó", "Hódmezővásárhely", "Other"] },
          "07": { name: "Fejér", cities: ["Székesfehérvár", "Dunaújváros", "Mór", "Other"] },
          "08": { name: "Győr-Moson-Sopron", cities: ["Győr", "Sopron", "Mosonmagyaróvár", "Other"] },
          "09": { name: "Hajdú-Bihar", cities: ["Debrecen", "Hajdúszoboszló", "Balmazújváros", "Other"] },
          "10": { name: "Heves", cities: ["Eger", "Gyöngyös", "Hatvan", "Other"] },
          "11": { name: "Jász-Nagykun-Szolnok", cities: ["Szolnok", "Jászberény", "Karcag", "Other"] },
          "12": { name: "Komárom-Esztergom", cities: ["Esztergom", "Tatabánya", "Komárom", "Other"] },
          "13": { name: "Nógrád", cities: ["Salgótarján", "Balassagyarmat", "Pásztó", "Other"] },
          "14": { name: "Pest", cities: ["Gödöllő", "Ráckeve", "Érd", "Other"] },
          "15": { name: "Somogy", cities: ["Kaposvár", "Siófok", "Marcali", "Other"] },
          "16": { name: "Szabolcs-Szatmár-Bereg", cities: ["Nyíregyháza", "Kisvárda", "Mátészalka", "Other"] },
          "17": { name: "Tolna", cities: ["Szekszárd", "Bonyhád", "Dombóvár", "Other"] },
          "18": { name: "Vas", cities: ["Szombathely", "Körmend", "Sárvár", "Other"] },
          "19": { name: "Veszprém", cities: ["Veszprém", "Tapolca", "Ajka", "Other"] },
          "20": { name: "Zala", cities: ["Zalaegerszeg", "Keszthely", "Nagykanizsa", "Other"] }
        }
      },
      "RO": {
        name: "Romania",
        flag: "🇷🇴",
        states: {
          "AB": { name: "Alba", cities: ["Alba Iulia", "Aiud", "Sebeș", "Other"] },
          "AR": { name: "Arad", cities: ["Arad", "Lipova", "Ineu", "Other"] },
          "AG": { name: "Argeș", cities: ["Pitești", "Câmpulung", "Mioveni", "Other"] },
          "BC": { name: "Bacău", cities: ["Bacău", "Onești", "Moinești", "Other"] },
          "BH": { name: "Bihor", cities: ["Oradea", "Salonta", "Marghita", "Other"] },
          "BN": { name: "Bistrița-Năsăud", cities: ["Bistrița", "Năsăud", "Beclean", "Other"] },
          "BT": { name: "Botoșani", cities: ["Botoșani", "Dorohoi", "Săveni", "Other"] },
          "BV": { name: "Brașov", cities: ["Brașov", "Făgăraș", "Săcele", "Other"] },
          "BR": { name: "Brăila", cities: ["Brăila", "Galați", "Reni", "Other"] },
          "B": { name: "Bucharest", cities: ["Bucharest"] },
          "BZ": { name: "Buzău", cities: ["Buzău", "Râmnicu Sărat", "Pogoanele", "Other"] },
          "CL": { name: "Călărași", cities: ["Călărași", "Oltenița", "Lehliu", "Other"] },
          "CS": { name: "Caraș-Severin", cities: ["Reșița", "Oravița", "Anina", "Other"] },
          "CJ": { name: "Cluj", cities: ["Cluj-Napoca", "Turda", "Dej", "Other"] },
          "CT": { name: "Constanța", cities: ["Constanța", "Mangalia", "Medgidia", "Other"] },
          "CV": { name: "Covasna", cities: ["Sfântu Gheorghe", "Odorheiu Secuiesc", "Baraolt", "Other"] },
          "DB": { name: "Dâmbovița", cities: ["Târgoviște", "Moreni", "Găești", "Other"] },
          "DJ": { name: "Dolj", cities: ["Craiova", "Băilești", "Calafat", "Other"] },
          "GL": { name: "Galați", cities: ["Galați", "Tecuci", "Niculești", "Other"] },
          "GJ": { name: "Gorj", cities: ["Târgu Jiu", "Motru", "Bumbești", "Other"] },
          "GR": { name: "Grevă", cities: ["Târgoviște", "Ploiești", "Băicești", "Other"] },
          "HS": { name: "Harghita", cities: ["Miercurea Ciuc", "Odorheiu Secuiesc", "Bălan", "Other"] },
          "HD": { name: "Hunedoara", cities: ["Deva", "Hunedoara", "Lupeni", "Other"] },
          "IL": { name: "Ialomița", cities: ["Slobozia", "Fetești", "Urziceni", "Other"] },
          "IS": { name: "Iași", cities: ["Iași", "Piatra Neamț", "Târgu Neamț", "Other"] },
          "IF": { name: "Ilfov", cities: ["Buftea", "Voluntari", "Otopeni", "Other"] },
          "MM": { name: "Maramureș", cities: ["Baia Mare", "Satu Mare", "Negrești-Oaș", "Other"] },
          "MH": { name: "Mehedinți", cities: ["Drobeta-Turnu Severin", "Orsova", "Orșova", "Other"] },
          "MS": { name: "Mureș", cities: ["Târgu Mureș", "Sighișoara", "Luduș", "Other"] },
          "NT": { name: "Neamț", cities: ["Piatra Neamț", "Târgu Neamț", "Roman", "Other"] },
          "OT": { name: "Olt", cities: ["Slatina", "Caracal", "Băilești", "Other"] },
          "PH": { name: "Prahova", cities: ["Ploiești", "Băicești", "Sinaia", "Other"] },
          "SB": { name: "Sibiu", cities: ["Sibiu", "Mediaș", "Cisnădie", "Other"] },
          "SJ": { name: "Sălaj", cities: ["Zalau", "Jibou", "Cehu Silvaniei", "Other"] },
          "SM": { name: "Satu Mare", cities: ["Satu Mare", "Negrești-Oaș", "Carei", "Other"] },
          "SV": { name: "Suceava", cities: ["Suceava", "Rădăuți", "Fălticeni", "Other"] },
          "TL": { name: "Tulcea", cities: ["Tulcea", "Babadag", "Măcin", "Other"] },
          "TM": { name: "Timiș", cities: ["Timișoara", "Lugoj", "Deta", "Other"] },
          "TR": { name: "Teleorman", cities: ["Alexandria", "Turnu Măgurele", "Videle", "Other"] },
          "VL": { name: "Vâlcea", cities: ["Râmnicu Vâlcea", "Călimănești", "Băile Olănești", "Other"] },
          "VN": { name: "Vrancea", cities: ["Focșani", "Adjud", "Nărăești", "Other"] }
        }
      },
      "BG": {
        name: "Bulgaria",
        flag: "🇧🇬",
        states: {
          "01": { name: "Sofia", cities: ["Sofia", "Pernik", "Botevgrad", "Other"] },
          "02": { name: "Blagoevgrad", cities: ["Blagoevgrad", "Petrich", "Sandanski", "Other"] },
          "03": { name: "Burgas", cities: ["Burgas", "Pomorie", "Nesebar", "Other"] },
          "04": { name: "Varna", cities: ["Varna", "Dobrich", "Balchik", "Other"] },
          "05": { name: "Veliko Tarnovo", cities: ["Veliko Tarnovo", "Gabrovo", "Tryavna", "Other"] },
          "06": { name: "Vidin", cities: ["Vidin", "Belogradchik", "Calafat", "Other"] },
          "07": { name: "Vratsa", cities: ["Vratsa", "Mezdra", "Kozloduy", "Other"] },
          "08": { name: "Gabrovo", cities: ["Gabrovo", "Tryavna", "Sevlievo", "Other"] },
          "09": { name: "Haskovo", cities: ["Haskovo", "Ivaylovgrad", "Dimitrovgrad", "Other"] },
          "10": { name: "Kardzhali", cities: ["Kardzhali", "Arda", "Ardino", "Other"] },
          "11": { name: "Kyustendil", cities: ["Kyustendil", "Dupnitsa", "Sapareva Banya", "Other"] },
          "12": { name: "Lovech", cities: ["Lovech", "Troyan", "Ugarchin", "Other"] },
          "13": { name: "Montana", cities: ["Montana", "Lom", "Georgievo", "Other"] },
          "14": { name: "Pazardzhik", cities: ["Pazardzhik", "Velingrad", "Peshtera", "Other"] },
          "15": { name: "Pernik", cities: ["Pernik", "Radomir", "Tran", "Other"] },
          "16": { name: "Pleven", cities: ["Pleven", "Levski", "Cherven Bryag", "Other"] },
          "17": { name: "Plovdiv", cities: ["Plovdiv", "Asenovgrad", "Peshtera", "Other"] },
          "18": { name: "Razgrad", cities: ["Razgrad", "Isperih", "Loznitsa", "Other"] },
          "19": { name: "Ruse", cities: ["Ruse", "Silistra", "Tutrakan", "Other"] },
          "20": { name: "Silistra", cities: ["Silistra", "Tutrakan", "Alfatar", "Other"] },
          "21": { name: "Sliven", cities: ["Sliven", "Kotel", "Nova Zagora", "Other"] },
          "22": { name: "Smolyan", cities: ["Smolyan", "Devin", "Chepelare", "Other"] },
          "23": { name: "Sofia (Province)", cities: ["Sofia", "Bankya", "Dragalevtsi", "Other"] },
          "24": { name: "Stara Zagora", cities: ["Stara Zagora", "Nova Zagora", "Kazanlak", "Other"] },
          "25": { name: "Targovishte", cities: ["Targovishte", "Omurtag", "Popovo", "Other"] },
          "26": { name: "Yambol", cities: ["Yambol", "Bolyarovo", "Tundzha", "Other"] }
        }
      },
      "HR": {
        name: "Croatia",
        flag: "🇭🇷",
        states: {
          "01": { name: "Zagreb", cities: ["Zagreb", "Zaprešić", "Samobor", "Other"] },
          "02": { name: "Krapina-Zagorje", cities: ["Krapina", "Zabok", "Oroslávlja", "Other"] },
          "03": { name: "Sisak-Moslavina", cities: ["Sisak", "Petrinja", "Kostolac", "Other"] },
          "04": { name: "Karlovac", cities: ["Karlovac", "Ogulin", "Duga Resa", "Other"] },
          "05": { name: "Varaždin", cities: ["Varaždin", "Ivanec", "Ludbreg", "Other"] },
          "06": { name: "Koprivnica-Križevci", cities: ["Koprivnica", "Križevci", "Virovitica", "Other"] },
          "07": { name: "Bjelovar-Bilogora", cities: ["Bjelovar", "Garešnica", "Daruvar", "Other"] },
          "08": { name: "Primorje-Gorski Kotar", cities: ["Rijeka", "Opatija", "Krk", "Other"] },
          "09": { name: "Lika-Senj", cities: ["Gospino Polje", "Senj", "Otočac", "Other"] },
          "10": { name: "Virovitica", cities: ["Virovitica", "Suhopolje", "Orahovica", "Other"] },
          "11": { name: "Požega-Slavonia", cities: ["Požega", "Slavonski Kobaš", "Kutjevo", "Other"] },
          "12": { name: "Brodska-Posavina", cities: ["Slavonski Brod", "Nova Gradiška", "Daruvar", "Other"] },
          "13": { name: "Osijek-Baranja", cities: ["Osijek", "Baranja", "Vukovar", "Other"] },
          "14": { name: "Šibenik-Knin", cities: ["Šibenik", "Knin", "Drniš", "Other"] },
          "15": { name: "Zadar", cities: ["Zadar", "Benkovac", "Obala", "Other"] },
          "16": { name: "Istria", cities: ["Pazin", "Poreč", "Rovinj", "Other"] },
          "17": { name: "Dubrovnik-Neretva", cities: ["Dubrovnik", "Metković", "Ploče", "Other"] },
          "18": { name: "Split-Dalmatia", cities: ["Split", "Trogir", "Kaštela", "Other"] }
        }
      },
      "SI": {
        name: "Slovenia",
        flag: "🇸🇮",
        states: {
          "01": { name: "Gorenjska", cities: ["Kranj", "Jesenice", "Radovljica", "Other"] },
          "02": { name: "Goriška", cities: ["Nova Gorica", "Tolmin", "Bovec", "Other"] },
          "03": { name: "Primorska", cities: ["Koper", "Izola", "Piran", "Other"] },
          "04": { name: "Notranjska", cities: ["Postojna", "Ilirska Bistrica", "Loški Potok", "Other"] },
          "05": { name: "Dolenjska", cities: ["Novo Mesto", "Trebnje", "Mirna Peč", "Other"] },
          "06": { name: "Savinjska", cities: ["Celje", "Laško", "Mozirje", "Other"] },
          "07": { name: "Styria", cities: ["Maribor", "Ptuj", "Ormož", "Other"] },
          "08": { name: "Mura", cities: ["Murska Sobota", "Lendava", "Prosenjakovci", "Other"] },
          "09": { name: "Carinthia", cities: ["Kranjska Gora", "Bled", "Bohinj", "Other"] },
          "10": { name: "Ljubljana", cities: ["Ljubljana"] }
        }
      },
      "GR": {
        name: "Greece",
        flag: "🇬🇷",
        states: {
          "01": { name: "Attica", cities: ["Athens", "Piraeus", "Acharnes", "Other"] },
          "02": { name: "Central Greece", cities: ["Lamia", "Volos", "Larissa", "Other"] },
          "03": { name: "Central Macedonia", cities: ["Thessaloniki", "Serres", "Kavala", "Other"] },
          "04": { name: "Crete", cities: ["Heraklion", "Chania", "Rethymno", "Other"] },
          "05": { name: "Eastern Macedonia and Thrace", cities: ["Komotini", "Xanthi", "Alexandroupoli", "Other"] },
          "06": { name: "Ionian Islands", cities: ["Corfu", "Zakynthos", "Cephalonia", "Other"] },
          "07": { name: "North Aegean", cities: ["Mytilene", "Chios", "Samos", "Other"] },
          "08": { name: "Peloponnese", cities: ["Patras", "Kalamata", "Corinth", "Other"] },
          "09": { name: "South Aegean", cities: ["Rhodes", "Syros", "Mykonos", "Other"] },
          "10": { name: "Thessaly", cities: ["Larissa", "Volos", "Trikala", "Other"] },
          "11": { name: "Western Greece", cities: ["Patras", "Agrinio", "Messolonghi", "Other"] },
          "12": { name: "Western Macedonia", cities: ["Kozani", "Kastoria", "Florina", "Other"] }
        }
      },
      "LV": {
        name: "Latvia",
        flag: "🇱🇻",
        states: {
          "01": { name: "Riga", cities: ["Riga", "Daugavpils", "Liepāja", "Other"] },
          "02": { name: "Pierīga", cities: ["Sigulda", "Jūrmala", "Ogre", "Other"] },
          "03": { name: "Vidzeme", cities: ["Valmiera", "Cēsis", "Alūksne", "Other"] },
          "04": { name: "Latgale", cities: ["Daugavpils", "Rēzekne", "Ludza", "Other"] },
          "05": { name: "Zemgale", cities: ["Jelgava", "Bauska", "Dobele", "Other"] },
          "06": { name: "Kurzeme", cities: ["Liepāja", "Ventspils", "Kuldīga", "Other"] }
        }
      },
      "LT": {
        name: "Lithuania",
        flag: "🇱🇹",
        states: {
          "01": { name: "Vilnius", cities: ["Vilnius", "Trakai", "Medvėgalis", "Other"] },
          "02": { name: "Kaunas", cities: ["Kaunas", "Kėdainiai", "Raseiniai", "Other"] },
          "03": { name: "Klaipėda", cities: ["Klaipėda", "Šilutė", "Pagėgiai", "Other"] },
          "04": { name: "Panevėžys", cities: ["Panevėžys", "Kupiškis", "Pasvalys", "Other"] },
          "05": { name: "Šiauliai", cities: ["Šiauliai", "Tauragė", "Jurbarkas", "Other"] },
          "06": { name: "Telšiai", cities: ["Telšiai", "Plungė", "Mažeikiai", "Other"] },
          "07": { name: "Utena", cities: ["Utena", "Anykščiai", "Visaginas", "Other"] }
        }
      },
      "EE": {
        name: "Estonia",
        flag: "🇪🇪",
        states: {
          "01": { name: "Harju", cities: ["Tallinn", "Maardu", "Keila", "Other"] },
          "02": { name: "Hiiumaa", cities: ["Kärdla", "Emmaste", "Kõrgessaare", "Other"] },
          "03": { name: "Ida-Viru", cities: ["Narva", "Sillamäe", "Kohtla-Järve", "Other"] },
          "04": { name: "Järva", cities: ["Paide", "Mustvee", "Türi", "Other"] },
          "05": { name: "Jõgeva", cities: ["Jõgeva", "Mustvee", "Kasepää", "Other"] },
          "06": { name: "Lääne", cities: ["Haapsalu", "Läänelinnas", "Ridala", "Other"] },
          "07": { name: "Lääne-Viru", cities: ["Rakvere", "Tapa", "Vinni", "Other"] },
          "08": { name: "Põlva", cities: ["Põlva", "Võru", "Otepää", "Other"] },
          "09": { name: "Rapla", cities: ["Rapla", "Läänelinnas", "Juuru", "Other"] },
          "10": { name: "Saare", cities: ["Kuressaare", "Kärla", "Leisi", "Other"] },
          "11": { name: "Tartu", cities: ["Tartu", "Otepää", "Elva", "Other"] },
          "12": { name: "Valga", cities: ["Valga", "Otepää", "Helme", "Other"] },
          "13": { name: "Võru", cities: ["Võru", "Antsla", "Rõuge", "Other"] }
        }
      },
      "IS": {
        name: "Iceland",
        flag: "🇮🇸",
        states: {
          "01": { name: "Capital Region", cities: ["Reykjavik", "Kópavogur", "Hafnarfjörður", "Other"] },
          "02": { name: "South", cities: ["Hveragerði", "Selfoss", "Hvolsvöllur", "Other"] },
          "03": { name: "East", cities: ["Egilsstaðir", "Neskaupstaður", "Reyðarfjörður", "Other"] },
          "04": { name: "North", cities: ["Akureyri", "Húsavík", "Westfjords", "Other"] },
          "05": { name: "West", cities: ["Borgarnes", "Akranes", "Stykkishólmur", "Other"] }
        }
      },
      "IE": {
        name: "Ireland",
        flag: "🇮🇪",
        states: {
          "01": { name: "Dublin", cities: ["Dublin", "Dún Laoghaire", "Swords", "Other"] },
          "02": { name: "Cork", cities: ["Cork", "Cobh", "Fermoy", "Other"] },
          "03": { name: "Galway", cities: ["Galway", "Ballinasloe", "Athenry", "Other"] },
          "04": { name: "Limerick", cities: ["Limerick", "Newcastle West", "Rathkeale", "Other"] },
          "05": { name: "Waterford", cities: ["Waterford", "Dunmore East", "Lismore", "Other"] },
          "06": { name: "Wexford", cities: ["Wexford", "New Ross", "Enniscorthy", "Other"] },
          "07": { name: "Carlow", cities: ["Carlow", "Bagenalstown", "Tullow", "Other"] },
          "08": { name: "Kilkenny", cities: ["Kilkenny", "Thomastown", "Castlecomer", "Other"] },
          "09": { name: "Tipperary", cities: ["Tipperary", "Clonmel", "Nenagh", "Other"] },
          "10": { name: "Laois", cities: ["Portlaoise", "Mountmellick", "Abbeyleix", "Other"] },
          "11": { name: "Offaly", cities: ["Tullamore", "Birr", "Edenderry", "Other"] },
          "12": { name: "Westmeath", cities: ["Athlone", "Mullingar", "Kilbeggan", "Other"] },
          "13": { name: "Longford", cities: ["Longford", "Ballymahon", "Granard", "Other"] },
          "14": { name: "Leitrim", cities: ["Carrick-on-Shannon", "Drumshanbo", "Manorhamilton", "Other"] },
          "15": { name: "Sligo", cities: ["Sligo", "Ballymote", "Tubbercurry", "Other"] },
          "16": { name: "Donegal", cities: ["Donegal", "Letterkenny", "Buncrana", "Other"] },
          "17": { name: "Cavan", cities: ["Cavan", "Cootehill", "Ballyjamesduff", "Other"] },
          "18": { name: "Monaghan", cities: ["Monaghan", "Castleblayney", "Clones", "Other"] },
          "19": { name: "Louth", cities: ["Dundalk", "Drogheda", "Ardee", "Other"] },
          "20": { name: "Meath", cities: ["Navan", "Drogheda", "Trim", "Other"] },
          "21": { name: "Kildare", cities: ["Naas", "Maynooth", "Leixlip", "Other"] },
          "22": { name: "Wicklow", cities: ["Wicklow", "Bray", "Arklow", "Other"] },
          "23": { name: "Mayo", cities: ["Castlebar", "Ballina", "Westport", "Other"] }
        }
      },
      "MT": {
        name: "Malta",
        flag: "🇲🇹",
        states: {
          "01": { name: "Valletta", cities: ["Valletta"] },
          "02": { name: "Sliema", cities: ["Sliema", "Gżira", "St. Julians", "Other"] },
          "03": { name: "Birkirkara", cities: ["Birkirkara", "Lija", "Naxxar", "Other"] },
          "04": { name: "Mosta", cities: ["Mosta", "Naxxar", "Attard", "Other"] },
          "05": { name: "Mdina", cities: ["Mdina", "Rabat", "Dingli", "Other"] },
          "06": { name: "Mellieħa", cities: ["Mellieħa", "Mosta", "Mtaħleb", "Other"] },
          "07": { name: "Gozo", cities: ["Victoria", "Xagħra", "Għarb", "Other"] }
        }
      },
      "MC": {
        name: "Monaco",
        flag: "🇲🇨",
        states: {
          "01": { name: "Monaco", cities: ["Monaco"] }
        }
      },
      "SM": {
        name: "San Marino",
        flag: "🇸🇲",
        states: {
          "01": { name: "San Marino", cities: ["San Marino"] }
        }
      },
      "VA": {
        name: "Holy See (Vatican City)",
        flag: "🇻🇦",
        states: {
          "01": { name: "Vatican City", cities: ["Vatican City"] }
        }
      },
      "AD": {
        name: "Andorra",
        flag: "🇦🇩",
        states: {
          "01": { name: "Andorra la Vella", cities: ["Andorra la Vella"] },
          "02": { name: "Canillo", cities: ["Canillo", "Ordino"] },
          "03": { name: "Encamp", cities: ["Encamp", "Escaldes-Engordany"] },
          "04": { name: "La Massana", cities: ["La Massana", "Arinsal"] },
          "05": { name: "Ordino", cities: ["Ordino", "Canillo"] },
          "06": { name: "Sant Julià de Lòria", cities: ["Sant Julià de Lòria"] },
          "07": { name: "Escaldes-Engordany", cities: ["Escaldes-Engordany", "Encamp"] }
        }
      },
      "LI": {
        name: "Liechtenstein",
        flag: "🇱🇮",
        states: {
          "01": { name: "Schaan", cities: ["Schaan", "Vaduz", "Planken"] },
          "02": { name: "Vaduz", cities: ["Vaduz", "Schaan", "Triesen"] },
          "03": { name: "Triesen", cities: ["Triesen", "Balzers", "Triesenberg"] },
          "04": { name: "Balzers", cities: ["Balzers", "Triesen", "Malbun"] },
          "05": { name: "Triesenberg", cities: ["Triesenberg", "Triesen", "Steg"] },
          "06": { name: "Schellenberg", cities: ["Schellenberg", "Mauren", "Gamprin"] },
          "07": { name: "Mauren", cities: ["Mauren", "Schellenberg", "Gamprin"] },
          "08": { name: "Gamprin", cities: ["Gamprin", "Mauren", "Ruggell"] },
          "09": { name: "Ruggell", cities: ["Ruggell", "Gamprin", "Schaan"] },
          "10": { name: "Eschen", cities: ["Eschen", "Nendeln", "Schaan"] },
          "11": { name: "Nendeln", cities: ["Nendeln", "Eschen", "Schaan"] }
        }
      },
      "CY": {
        name: "Cyprus",
        flag: "🇨🇾",
        states: {
          "01": { name: "Nicosia", cities: ["Nicosia", "Kyrenia", "Famagusta", "Other"] },
          "02": { name: "Larnaca", cities: ["Larnaca", "Limassol", "Paphos", "Other"] },
          "03": { name: "Limassol", cities: ["Limassol", "Paphos", "Larnaca", "Other"] },
          "04": { name: "Paphos", cities: ["Paphos", "Limassol", "Larnaca", "Other"] }
        }
      },
      "RU": {
        name: "Russia",
        flag: "🇷🇺",
        states: {
          "01": { name: "Moscow", cities: ["Moscow", "Smolensk", "Tver", "Other"] },
          "02": { name: "Saint Petersburg", cities: ["Saint Petersburg", "Kronshtadt", "Pushkin", "Other"] },
          "03": { name: "Kaliningrad", cities: ["Kaliningrad", "Sovetsk", "Chernyakhovsk", "Other"] },
          "04": { name: "Novgorod", cities: ["Novgorod", "Veliky Novgorod", "Staraya Russa", "Other"] },
          "05": { name: "Pskov", cities: ["Pskov", "Ostrov", "Velikiye Luki", "Other"] },
          "06": { name: "Tver", cities: ["Tver", "Torzhok", "Kimry", "Other"] },
          "07": { name: "Yaroslavl", cities: ["Yaroslavl", "Rybinsk", "Tutayev", "Other"] },
          "08": { name: "Vologda", cities: ["Vologda", "Cherepovets", "Sokol", "Other"] },
          "09": { name: "Arkhangelsk", cities: ["Arkhangelsk", "Severodvinsk", "Mirny", "Other"] },
          "10": { name: "Murmansk", cities: ["Murmansk", "Apatity", "Kirovsk", "Other"] }
        }
      },
      "UA": {
        name: "Ukraine",
        flag: "🇺🇦",
        states: {
          "01": { name: "Kyiv", cities: ["Kyiv", "Irpin", "Bucha", "Other"] },
          "02": { name: "Kharkiv", cities: ["Kharkiv", "Luhansk", "Donetsk", "Other"] },
          "03": { name: "Odesa", cities: ["Odesa", "Mykolaiv", "Kherson", "Other"] },
          "04": { name: "Lviv", cities: ["Lviv", "Ivano-Frankivsk", "Ternopil", "Other"] },
          "05": { name: "Dnipro", cities: ["Dnipro", "Zaporizhzhia", "Kryvyi Rih", "Other"] },
          "06": { name: "Poltava", cities: ["Poltava", "Sumy", "Chernihiv", "Other"] },
          "07": { name: "Cherkasy", cities: ["Cherkasy", "Kirovograd", "Vinnytsia", "Other"] },
          "08": { name: "Zhytomyr", cities: ["Zhytomyr", "Kovel", "Rivne", "Other"] },
          "09": { name: "Volyn", cities: ["Lutsk", "Kovel", "Novovolynsk", "Other"] },
          "10": { name: "Transcarpathia", cities: ["Uzhhorod", "Mukachevo", "Berehove", "Other"] }
        }
      },
      "BY": {
        name: "Belarus",
        flag: "🇧🇾",
        states: {
          "01": { name: "Minsk", cities: ["Minsk", "Borisov", "Zhodino", "Other"] },
          "02": { name: "Brest", cities: ["Brest", "Baranovichi", "Kobrin", "Other"] },
          "03": { name: "Vitebsk", cities: ["Vitebsk", "Orsha", "Novopolotsk", "Other"] },
          "04": { name: "Gomel", cities: ["Gomel", "Mozyr", "Rechitsa", "Other"] },
          "05": { name: "Grodno", cities: ["Grodno", "Lida", "Slonim", "Other"] },
          "06": { name: "Mogilev", cities: ["Mogilev", "Bobruysk", "Osipovichi", "Other"] }
        }
      },
      "MD": {
        name: "Moldova",
        flag: "🇲🇩",
        states: {
          "01": { name: "Chișinău", cities: ["Chișinău", "Bălți", "Tiraspol", "Other"] },
          "02": { name: "Bălți", cities: ["Bălți", "Soroca", "Orhei", "Other"] },
          "03": { name: "Gagauzia", cities: ["Comrat", "Ceadîr-Lunga", "Vulcănești", "Other"] },
          "04": { name: "Transnistria", cities: ["Tiraspol", "Bender", "Rybnitsa", "Other"] }
        }
      },
      "AL": {
        name: "Albania",
        flag: "🇦🇱",
        states: {
          "01": { name: "Tirana", cities: ["Tirana", "Durrës", "Elbasan", "Other"] },
          "02": { name: "Durrës", cities: ["Durrës", "Vlorë", "Sarandë", "Other"] },
          "03": { name: "Vlorë", cities: ["Vlorë", "Sarandë", "Himarë", "Other"] },
          "04": { name: "Berat", cities: ["Berat", "Përmet", "Tepelenë", "Other"] },
          "05": { name: "Elbasan", cities: ["Elbasan", "Librazhd", "Gramsh", "Other"] },
          "06": { name: "Shkodër", cities: ["Shkodër", "Koplik", "Malësi e Madhe", "Other"] },
          "07": { name: "Kukës", cities: ["Kukës", "Bajram Curri", "Tropojë", "Other"] },
          "08": { name: "Dibër", cities: ["Peshkopi", "Bulqizë", "Klos", "Other"] },
          "09": { name: "Gjirokastër", cities: ["Gjirokastër", "Përmet", "Tepelenë", "Other"] }
        }
      },
      "BA": {
        name: "Bosnia and Herzegovina",
        flag: "🇧🇦",
        states: {
          "01": { name: "Sarajevo", cities: ["Sarajevo", "Pale", "Ilidža", "Other"] },
          "02": { name: "Banja Luka", cities: ["Banja Luka", "Prijedor", "Jajce", "Other"] },
          "03": { name: "Mostar", cities: ["Mostar", "Čapljina", "Stolac", "Other"] },
          "04": { name: "Tuzla", cities: ["Tuzla", "Srebrenica", "Zvornik", "Other"] },
          "05": { name: "Zenica", cities: ["Zenica", "Zavidovići", "Vitez", "Other"] },
          "06": { name: "Travnik", cities: ["Travnik", "Busovača", "Kiseljak", "Other"] }
        }
      },
      "ME": {
        name: "Montenegro",
        flag: "🇲🇪",
        states: {
          "01": { name: "Podgorica", cities: ["Podgorica", "Nikšić", "Cetinje", "Other"] },
          "02": { name: "Bar", cities: ["Bar", "Ulcinj", "Petrovac", "Other"] },
          "03": { name: "Kotor", cities: ["Kotor", "Tivat", "Perast", "Other"] },
          "04": { name: "Budva", cities: ["Budva", "Lastva Gorna", "Morinj", "Other"] },
          "05": { name: "Cetinje", cities: ["Cetinje", "Rijeka Crnojevića", "Lovćen", "Other"] }
        }
      },
      "MK": {
        name: "North Macedonia",
        flag: "🇲🇰",
        states: {
          "01": { name: "Skopje", cities: ["Skopje", "Kumanovo", "Veles", "Other"] },
          "02": { name: "Bitola", cities: ["Bitola", "Prilep", "Kičevo", "Other"] },
          "03": { name: "Ohrid", cities: ["Ohrid", "Struga", "Resen", "Other"] },
          "04": { name: "Tetovo", cities: ["Tetovo", "Gostivar", "Kičevo", "Other"] },
          "05": { name: "Štip", cities: ["Štip", "Kočani", "Vinica", "Other"] }
        }
      },
      "XK": {
        name: "Kosovo",
        flag: "🇽🇰",
        states: {
          "01": { name: "Pristina", cities: ["Pristina", "Prizren", "Peja", "Other"] },
          "02": { name: "Prizren", cities: ["Prizren", "Gjakova", "Suva Reka", "Other"] },
          "03": { name: "Peja", cities: ["Peja", "Deçan", "Istok", "Other"] },
          "04": { name: "Gjilan", cities: ["Gjilan", "Ferizaj", "Kaçanik", "Other"] },
          "05": { name: "Mitrovica", cities: ["Mitrovica", "Vushtrri", "Leposavić", "Other"] }
        }
      },
      "LU": {
        name: "Luxembourg",
        flag: "🇱🇺",
        states: {
          "01": { name: "Luxembourg", cities: ["Luxembourg City", "Esch-sur-Alzette", "Differdange", "Other"] },
          "02": { name: "Grevenmacher", cities: ["Grevenmacher", "Echternach", "Remich", "Other"] },
          "03": { name: "Diekirch", cities: ["Diekirch", "Vianden", "Clervaux", "Other"] }
        }
      }
    };
  }

  /**
   * Initialize the location selector
   */
  init() {
    this.populateCountries();
    this.attachEventListeners();
  }

  /**
   * Populate the country dropdown with all available countries
   */
  populateCountries() {
    const countrySelect = document.getElementById('country');
    if (!countrySelect) {
      console.error('Country select element not found');
      return;
    }

    if (countrySelect.dataset.smartCountrySelector === 'true') {
      console.log('Smart Country Selector managing country options; skipping manual population.');
      return;
    }

    // Clear existing options (keep the placeholder)
    countrySelect.innerHTML = '<option value="">Select a Country</option>';

    // Add countries to the dropdown
    Object.entries(this.locationData).forEach(([code, country]) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = `${country.flag} ${country.name}`;
      countrySelect.appendChild(option);
    });

    // Add "My country is not listed yet" option
    const otherOption = document.createElement("option");
    otherOption.value = "Other";
    otherOption.textContent = "My country is not listed yet";
    countrySelect.appendChild(otherOption);

    console.log('Countries populated successfully');
  }

  /**
   * Populate the state dropdown based on selected country
   */
  populateStates(countryCode) {
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    
    if (!stateSelect || !citySelect) {
      console.error('State or city select element not found');
      return;
    }

    // Reset city dropdown
    citySelect.innerHTML = '<option value="">Select a City</option>';
    citySelect.disabled = true;

    if (!countryCode) {
      stateSelect.innerHTML = '<option value="">Select a State/Province</option>';
      stateSelect.disabled = true;
      return;
    }

    const country = this.locationData[countryCode];
    if (!country) {
      console.error('Country not found:', countryCode);
      return;
    }

    // Clear and populate state dropdown
    stateSelect.innerHTML = '<option value="">Select a State/Province</option>';
    Object.entries(country.states).forEach(([code, state]) => {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = state.name;
      stateSelect.appendChild(option);
    });

    stateSelect.disabled = false;
    this.selectedCountry = countryCode;
  }

  /**
   * Populate the city dropdown based on selected state
   */
  populateCities(countryCode, stateCode) {
    const citySelect = document.getElementById('city');
    const customCityGroup = document.getElementById('city-custom-group');
    const customCityInput = document.getElementById('city-custom');

    if (!citySelect) {
      console.error('City select element not found');
      return;
    }

    if (!countryCode || !stateCode) {
      citySelect.innerHTML = '<option value="">Select a City</option>';
      citySelect.disabled = true;
      if (customCityGroup) customCityGroup.style.display = 'none';
      return;
    }

    const country = this.locationData[countryCode];
    const state = country?.states[stateCode];

    if (!state) {
      console.error('State not found:', stateCode);
      return;
    }

    // Clear and populate city dropdown
    citySelect.innerHTML = '<option value="">Select a City</option>';
    state.cities.forEach((city) => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });

    citySelect.disabled = false;
    this.selectedState = stateCode;

    // Handle "Other" option
    const otherOption = citySelect.querySelector('option[value="Other"]');
    if (otherOption) {
      citySelect.addEventListener('change', () => {
        if (citySelect.value === 'Other') {
          if (customCityGroup) customCityGroup.style.display = 'block';
          if (customCityInput) customCityInput.required = true;
        } else {
          if (customCityGroup) customCityGroup.style.display = 'none';
          if (customCityInput) {
            customCityInput.required = false;
            customCityInput.value = '';
          }
        }
      });
    }
  }

  /**
   * Attach event listeners to dropdowns
   */
  attachEventListeners() {
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');

    if (countrySelect) {
      countrySelect.addEventListener("change", (e) => {
        const selectedCountryValue = e.target.value;
        const isOtherSelection = selectedCountryValue === "Other" || selectedCountryValue === "OTHER";
        const customCountryGroup = document.getElementById("country-custom-group");
        const customCountryInput = document.getElementById("country-custom");

        if (isOtherSelection) {
          if (customCountryGroup) customCountryGroup.style.display = "block";
          if (customCountryInput) customCountryInput.required = true;
          this.populateStates(null); // Clear states and cities
        } else {
          if (customCountryGroup) customCountryGroup.style.display = "none";
          if (customCountryInput) {
            customCountryInput.required = false;
            customCountryInput.value = "";
          }
          this.populateStates(selectedCountryValue);
        }
      });
    }

    if (stateSelect) {
      stateSelect.addEventListener('change', (e) => {
        this.populateCities(this.selectedCountry, e.target.value);
      });
    }

    if (citySelect) {
      citySelect.addEventListener('change', (e) => {
        this.selectedCity = e.target.value;
      });
    }
  }

  /**
   * Get the selected location values
   */
  getSelected() {
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    const customCityInput = document.getElementById('city-custom');

    return {
      country: countrySelect?.value || '',
      state: stateSelect?.value || '',
      city: citySelect?.value === 'Other' ? customCityInput?.value : citySelect?.value || '',
      countryName: this.locationData[countrySelect?.value]?.name || '',
      stateName: this.locationData[countrySelect?.value]?.states[stateSelect?.value]?.name || ''
    };
  }
}

