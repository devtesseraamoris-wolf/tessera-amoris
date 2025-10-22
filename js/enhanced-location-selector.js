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
          "01": { name: "Åland Islands", cities: ["Mariehamn", "Jomala", "Lemland"] },
          "02": { name: "Southern Finland", cities: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Turku", "Other"] },
          "04": { name: "Eastern Finland", cities: ["Kuopio", "Joensuu", "Savonlinna", "Other"] },
          "05": { name: "Lapland", cities: ["Rovaniemi", "Ivalo", "Kemi", "Other"] },
          "06": { name: "Western Finland", cities: ["Turku", "Pori", "Rauma", "Uusikaupunki", "Other"] },
          "07": { name: "Central Finland", cities: ["Jyväskylä", "Oulu", "Mikkeli", "Other"] }
        }
      },
      "PL": {
        name: "Poland",
        flag: "🇵🇱",
        states: {
          "02": { name: "Masovian", cities: ["Warsaw", "Radom", "Ostrołęka", "Other"] },
          "04": { name: "Łódź", cities: ["Łódź", "Piotrków Trybunalski", "Sieradz", "Other"] },
          "06": { name: "Lesser Poland", cities: ["Kraków", "Tarnów", "Nowy Sącz", "Wieliczka", "Other"] },
          "08": { name: "Silesian", cities: ["Katowice", "Gliwice", "Zabrze", "Bytom", "Ruda Śląska", "Other"] },
          "10": { name: "Opole", cities: ["Opole", "Nysa", "Kędzierzyn-Koźle", "Other"] },
          "12": { name: "Lower Silesian", cities: ["Wrocław", "Legnica", "Wałbrzych", "Jelenia Góra", "Other"] },
          "14": { name: "Greater Poland", cities: ["Poznań", "Konin", "Kalisz", "Leszno", "Other"] },
          "16": { name: "West Pomeranian", cities: ["Szczecin", "Zielona Góra", "Gorzów Wielkopolski", "Other"] },
          "18": { name: "Pomeranian", cities: ["Gdańsk", "Gdynia", "Sopot", "Tczew", "Other"] },
          "20": { name: "Warmian-Masurian", cities: ["Olsztyn", "Elbląg", "Grudziądz", "Other"] },
          "22": { name: "Podlaskie", cities: ["Białystok", "Suwałki", "Łomża", "Other"] },
          "24": { name: "Lublin", cities: ["Lublin", "Chełm", "Biała Podlaska", "Other"] },
          "26": { name: "Subcarpathian", cities: ["Rzeszów", "Krosno", "Przemyśl", "Sanok", "Other"] }
        }
      },
      "CZ": {
        name: "Czech Republic",
        flag: "🇨🇿",
        states: {
          "JC": { name: "Central Bohemia", cities: ["Prague", "Mladá Boleslav", "Kladno", "Other"] },
          "JM": { name: "South Moravia", cities: ["Brno", "Blansko", "Vyškov", "Jihlava", "Other"] },
          "KA": { name: "Carlsbad", cities: ["Cheb", "Sokolov", "Karlovy Vary", "Other"] },
          "KR": { name: "Kralovehradecky", cities: ["Hradec Králové", "Trutnov", "Pardubice", "Other"] },
          "LI": { name: "Liberec", cities: ["Liberec", "Jablonec nad Nisou", "Česká Lípa", "Other"] },
          "MO": { name: "Moravian-Silesian", cities: ["Ostrava", "Frýdek-Místek", "Havířov", "Other"] },
          "OL": { name: "Olomouc", cities: ["Olomouc", "Šumperk", "Přerov", "Other"] },
          "PA": { name: "Pardubice", cities: ["Pardubice", "Chrudim", "Svitavy", "Other"] },
          "PL": { name: "Plzen", cities: ["Plzeň", "Tachov", "Domažlice", "Other"] },
          "PR": { name: "Prague", cities: ["Prague"] },
          "ST": { name: "South Bohemia", cities: ["České Budějovice", "Český Krumlov", "Tábor", "Other"] },
          "US": { name: "Usti", cities: ["Ústí nad Labem", "Litoměřice", "Chomutov", "Other"] },
          "VY": { name: "Vysocina", cities: ["Jihlava", "Třebíč", "Žďár nad Sázavou", "Other"] },
          "ZL": { name: "Zlin", cities: ["Zlín", "Otrokovice", "Valašské Meziříčí", "Other"] }
        }
      },
      "HU": {
        name: "Hungary",
        flag: "🇭🇺",
        states: {
          "BA": { name: "Baranya", cities: ["Pécs", "Mohács", "Siklós", "Other"] },
          "BE": { name: "Békés", cities: ["Békéscsaba", "Gyula", "Szeghalom", "Other"] },
          "BK": { name: "Bács-Kiskun", cities: ["Kecskemét", "Baja", "Kiskunhalas", "Other"] },
          "BZ": { name: "Borsod-Abaúj-Zemplén", cities: ["Miskolc", "Eger", "Kazincbarcika", "Other"] },
          "BU": { name: "Budapest", cities: ["Budapest"] },
          "CS": { name: "Csongrád", cities: ["Szeged", "Makó", "Hódmezővásárhely", "Other"] },
          "FE": { name: "Fejér", cities: ["Székesfehérvár", "Dunaújváros", "Mór", "Other"] },
          "GS": { name: "Győr-Moson-Sopron", cities: ["Győr", "Sopron", "Mosonmagyaróvár", "Other"] },
          "HB": { name: "Hajdú-Bihar", cities: ["Debrecen", "Hajdúszoboszló", "Balmazújváros", "Other"] },
          "HE": { name: "Heves", cities: ["Eger", "Hatvan", "Gyöngyös", "Other"] },
          "JN": { name: "Jász-Nagykun-Szolnok", cities: ["Szolnok", "Jászberény", "Karcag", "Other"] },
          "KE": { name: "Komárom-Esztergom", cities: ["Tatabánya", "Esztergom", "Dorog", "Other"] },
          "NO": { name: "Nógrád", cities: ["Salgótarján", "Balassagyarmat", "Rétság", "Other"] },
          "PE": { name: "Pest", cities: ["Gödöllő", "Ráckeve", "Nagykőzeg", "Other"] },
          "SO": { name: "Somogy", cities: ["Kaposvár", "Siófok", "Nagyatád", "Other"] },
          "SZ": { name: "Szabolcs-Szatmár-Bereg", cities: ["Nyíregyháza", "Kisvárda", "Mátészalka", "Other"] },
          "TO": { name: "Tolna", cities: ["Szekszárd", "Bonyhád", "Dombóvár", "Other"] },
          "VA": { name: "Vas", cities: ["Szombathely", "Sárvár", "Körmend", "Other"] },
          "VE": { name: "Veszprém", cities: ["Veszprém", "Balatonfüred", "Tapolca", "Other"] },
          "ZA": { name: "Zala", cities: ["Zalaegerszeg", "Keszthely", "Nagykanizsa", "Other"] }
        }
      },
      "RO": {
        name: "Romania",
        flag: "🇷🇴",
        states: {
          "AB": { name: "Alba", cities: ["Alba Iulia", "Sebeș", "Aiud", "Other"] },
          "AG": { name: "Arad", cities: ["Arad", "Lipova", "Ineu", "Other"] },
          "AR": { name: "Argeș", cities: ["Pitești", "Câmpulung", "Mioveni", "Other"] },
          "BC": { name: "Bacău", cities: ["Bacău", "Onești", "Moinești", "Other"] },
          "BH": { name: "Bihor", cities: ["Oradea", "Salonta", "Marghita", "Other"] },
          "BN": { name: "Bistrița-Năsăud", cities: ["Bistrița", "Năsăud", "Beclean", "Other"] },
          "BR": { name: "Brăila", cities: ["Brăila", "Galați", "Măcin", "Other"] },
          "BS": { name: "Botoșani", cities: ["Botoșani", "Dorohoi", "Săveni", "Other"] },
          "BT": { name: "Brașov", cities: ["Brașov", "Săcele", "Codlea", "Other"] },
          "BZ": { name: "Buzău", cities: ["Buzău", "Râmnicu Sărat", "Pogoanele", "Other"] },
          "CJ": { name: "Cluj", cities: ["Cluj-Napoca", "Turda", "Dej", "Other"] },
          "CL": { name: "Călărași", cities: ["Călărași", "Oltenița", "Lehliu", "Other"] },
          "CM": { name: "Caraș-Severin", cities: ["Reșitza", "Oravița", "Anina", "Other"] },
          "CS": { name: "Constanța", cities: ["Constanța", "Mangalia", "Medgidia", "Other"] },
          "CT": { name: "Covasna", cities: ["Sfântu Gheorghe", "Odorheiu Secuiesc", "Baraolt", "Other"] },
          "DB": { name: "Dâmbovița", cities: ["Târgoviște", "Moreni", "Pucioasa", "Other"] },
          "DJ": { name: "Dolj", cities: ["Craiova", "Băilești", "Calafat", "Other"] },
          "GL": { name: "Galați", cities: ["Galați", "Brăila", "Tecuci", "Other"] },
          "GJ": { name: "Gorj", cities: ["Târgu Jiu", "Motru", "Bumbești-Jiu", "Other"] },
          "GR": { name: "Giurgiu", cities: ["Giurgiu", "Bolintin Vale", "Bolintin-Vale", "Other"] },
          "HD": { name: "Hunedoara", cities: ["Hunedoara", "Deva", "Petroșani", "Other"] },
          "HR": { name: "Harghita", cities: ["Miercurea Ciuc", "Odorheiu Secuiesc", "Bălan", "Other"] },
          "IS": { name: "Iași", cities: ["Iași", "Pașcani", "Târgu Frumos", "Other"] },
          "IF": { name: "Ilfov", cities: ["Buftea", "Snagov", "Voluntari", "Other"] },
          "IL": { name: "Ialomița", cities: ["Slobozia", "Fetești", "Urziceni", "Other"] },
          "ME": { name: "Mehedinți", cities: ["Drobeta-Turnu Severin", "Orsova", "Orșova", "Other"] },
          "MS": { name: "Moinești", cities: ["Moinești", "Piatra Neamț", "Roznov", "Other"] },
          "NT": { name: "Neamț", cities: ["Piatra Neamț", "Roznov", "Bârlad", "Other"] },
          "OL": { name: "Olt", cities: ["Slatina", "Caracal", "Băilești", "Other"] },
          "PH": { name: "Prahova", cities: ["Ploiești", "Băicești", "Câmpina", "Other"] },
          "SB": { name: "Sibiu", cities: ["Sibiu", "Mediaș", "Cisnădie", "Other"] },
          "SC": { name: "Satu Mare", cities: ["Satu Mare", "Negrești-Oaș", "Carei", "Other"] },
          "SJ": { name: "Sălaj", cities: ["Zalau", "Jibou", "Șimleu Silvaniei", "Other"] },
          "SM": { name: "Suceava", cities: ["Suceava", "Fălticeni", "Rădăuți", "Other"] },
          "SV": { name: "Sibiu", cities: ["Sibiu", "Mediaș", "Cisnădie", "Other"] },
          "TL": { name: "Tulcea", cities: ["Tulcea", "Sulina", "Mangalia", "Other"] },
          "TM": { name: "Timișoara", cities: ["Timișoara", "Lugoj", "Reșița", "Other"] },
          "TR": { name: "Turnu Măgurele", cities: ["Turnu Măgurele", "Giurgiu", "Călărași", "Other"] },
          "VL": { name: "Vaslui", cities: ["Vaslui", "Huși", "Bârlad", "Other"] },
          "VN": { name: "Vatra Moldoviței", cities: ["Vatra Moldoviței", "Suceava", "Rădăuți", "Other"] },
          "VR": { name: "Vrancioaia", cities: ["Focșani", "Adjud", "Mărășești", "Other"] },
          "VS": { name: "Vâlcea", cities: ["Râmnicu Vâlcea", "Călimănești", "Băile Olănești", "Other"] }
        }
      },
      "PT": {
        name: "Portugal",
        flag: "🇵🇹",
        states: {
          "01": { name: "Aveiro", cities: ["Aveiro", "Ovar", "Estarreja", "Other"] },
          "02": { name: "Beja", cities: ["Beja", "Moura", "Serpa", "Other"] },
          "03": { name: "Braga", cities: ["Braga", "Guarda", "Guarda", "Other"] },
          "04": { name: "Bragança", cities: ["Bragança", "Mirandela", "Macedo de Cavaleiros", "Other"] },
          "05": { name: "Castelo Branco", cities: ["Castelo Branco", "Covilhã", "Fundão", "Other"] },
          "08": { name: "Évora", cities: ["Évora", "Estremoz", "Portalegre", "Other"] },
          "09": { name: "Faro", cities: ["Faro", "Loulé", "Albufeira", "Other"] },
          "10": { name: "Guarda", cities: ["Guarda", "Pinhel", "Sabugal", "Other"] },
          "12": { name: "Leiria", cities: ["Leiria", "Pombal", "Batalha", "Other"] },
          "13": { name: "Lisboa", cities: ["Lisbon", "Cascais", "Sintra", "Oeiras", "Other"] },
          "14": { name: "Portalegre", cities: ["Portalegre", "Marvão", "Castelo de Vide", "Other"] },
          "15": { name: "Porto", cities: ["Porto", "Vila do Conde", "Matosinhos", "Gaia", "Other"] },
          "16": { name: "Santarém", cities: ["Santarém", "Tomar", "Abrantes", "Other"] },
          "17": { name: "Setúbal", cities: ["Setúbal", "Sines", "Alcácer do Sal", "Other"] },
          "18": { name: "Viana do Castelo", cities: ["Viana do Castelo", "Ponte de Lima", "Barcelos", "Other"] },
          "19": { name: "Vila Real", cities: ["Vila Real", "Chaves", "Lamego", "Other"] },
          "20": { name: "Viseu", cities: ["Viseu", "Lamego", "Guarda", "Other"] },
          "21": { name: "Madeira", cities: ["Funchal", "Câmara de Lobos", "Machico", "Other"] },
          "22": { name: "Azores", cities: ["Ponta Delgada", "Angra do Heroísmo", "Horta", "Other"] }
        }
      },
      "GR": {
        name: "Greece",
        flag: "🇬🇷",
        states: {
          "A": { name: "Attica", cities: ["Athens", "Piraeus", "Glyfada", "Kallithea", "Other"] },
          "B": { name: "Central Greece", cities: ["Lamia", "Volos", "Larissa", "Other"] },
          "C": { name: "Central Macedonia", cities: ["Thessaloniki", "Serres", "Kilkis", "Other"] },
          "D": { name: "Crete", cities: ["Heraklion", "Chania", "Rethymno", "Other"] },
          "E": { name: "Eastern Macedonia and Thrace", cities: ["Komotini", "Xanthi", "Alexandroupoli", "Other"] },
          "F": { name: "Ionian Islands", cities: ["Corfu", "Zakynthos", "Cephalonia", "Other"] },
          "G": { name: "North Aegean", cities: ["Mytilene", "Chios", "Samos", "Other"] },
          "H": { name: "Peloponnese", cities: ["Patras", "Corinth", "Argos", "Other"] },
          "I": { name: "South Aegean", cities: ["Rhodes", "Mykonos", "Santorini", "Other"] },
          "J": { name: "Thessaly", cities: ["Larissa", "Volos", "Trikala", "Other"] },
          "K": { name: "West Greece", cities: ["Patras", "Agrinio", "Messolonghi", "Other"] },
          "L": { name: "Western Macedonia", cities: ["Kozani", "Kastoria", "Florina", "Other"] }
        }
      },
      "HR": {
        name: "Croatia",
        flag: "🇭🇷",
        states: {
          "01": { name: "Zagreb", cities: ["Zagreb"] },
          "02": { name: "Krapina-Zagorje", cities: ["Krapina", "Zabok", "Pregrada", "Other"] },
          "03": { name: "Sisak-Moslavina", cities: ["Sisak", "Moslavina", "Kostolac", "Other"] },
          "04": { name: "Karlovac", cities: ["Karlovac", "Ogulin", "Duga Resa", "Other"] },
          "05": { name: "Varaždin", cities: ["Varaždin", "Ivanec", "Ludbreg", "Other"] },
          "06": { name: "Koprivnica-Križ", cities: ["Koprivnica", "Križ", "Virovitica", "Other"] },
          "07": { name: "Bjelovar-Bilogora", cities: ["Bjelovar", "Garešnica", "Daruvar", "Other"] },
          "08": { name: "Primorje-Gorski Kotar", cities: ["Rijeka", "Opatija", "Krk", "Cres", "Other"] },
          "09": { name: "Lika-Senj", cities: ["Gospino Polje", "Senj", "Gospino Polje", "Other"] },
          "10": { name: "Virovitica", cities: ["Virovitica", "Suhopolje", "Daruvar", "Other"] },
          "11": { name: "Požega-Slavonia", cities: ["Požega", "Slavonski Kobaš", "Kutjevo", "Other"] },
          "12": { name: "Brodina-Posavina", cities: ["Slavonski Brod", "Nova Gradiška", "Daruvar", "Other"] },
          "13": { name: "Osijek-Baranja", cities: ["Osijek", "Baranja", "Vinkovci", "Other"] },
          "14": { name: "Šibenik-Knin", cities: ["Šibenik", "Knin", "Drniš", "Other"] },
          "15": { name: "Zadar", cities: ["Zadar", "Benkovac", "Starigrad", "Other"] },
          "16": { name: "Istria", cities: ["Pazin", "Poreč", "Rovinj", "Motovun", "Other"] },
          "17": { name: "Dalmatia", cities: ["Split", "Trogir", "Makarska", "Bol", "Other"] },
          "18": { name: "Dubrovnik-Neretva", cities: ["Dubrovnik", "Metković", "Ston", "Other"] }
        }
      },
      "BG": {
        name: "Bulgaria",
        flag: "🇧🇬",
        states: {
          "01": { name: "Blagoevgrad", cities: ["Blagoevgrad", "Petrich", "Sandanski", "Other"] },
          "02": { name: "Burgas", cities: ["Burgas", "Pomorie", "Nesebar", "Other"] },
          "03": { name: "Dobrich", cities: ["Dobrich", "Balchik", "Albena", "Other"] },
          "04": { name: "Gabrovo", cities: ["Gabrovo", "Sevlievo", "Tryavna", "Other"] },
          "05": { name: "Haskovo", cities: ["Haskovo", "Dimitrovgrad", "Svilengrad", "Other"] },
          "06": { name: "Kardzhali", cities: ["Kardzhali", "Momchilgrad", "Ardino", "Other"] },
          "07": { name: "Kyustendil", cities: ["Kyustendil", "Dupnitsa", "Bobov Dol", "Other"] },
          "08": { name: "Lovech", cities: ["Lovech", "Troyan", "Letnitsa", "Other"] },
          "09": { name: "Montana", cities: ["Montana", "Lom", "Georgievo", "Other"] },
          "10": { name: "Pazardzhik", cities: ["Pazardzhik", "Peshtera", "Velingrad", "Other"] },
          "11": { name: "Pernik", cities: ["Pernik", "Radomir", "Dragoman", "Other"] },
          "12": { name: "Pleven", cities: ["Pleven", "Lovech", "Gorna Oryahovitsa", "Other"] },
          "13": { name: "Plovdiv", cities: ["Plovdiv", "Pazardzhik", "Asenovgrad", "Other"] },
          "14": { name: "Razgrad", cities: ["Razgrad", "Isperih", "Lozovo", "Other"] },
          "15": { name: "Ruse", cities: ["Ruse", "Silistra", "Giurgiu", "Other"] },
          "16": { name: "Shumen", cities: ["Shumen", "Karnobat", "Kaspichan", "Other"] },
          "17": { name: "Silistra", cities: ["Silistra", "Tutrakan", "Sitovo", "Other"] },
          "18": { name: "Sliven", cities: ["Sliven", "Kotel", "Nova Zagora", "Other"] },
          "19": { name: "Smolyan", cities: ["Smolyan", "Chepelare", "Bansko", "Other"] },
          "20": { name: "Sofia", cities: ["Sofia", "Botevgrad", "Samokov", "Other"] },
          "21": { name: "Sofia City", cities: ["Sofia"] },
          "22": { name: "Stara Zagora", cities: ["Stara Zagora", "Kazanlak", "Chirpan", "Other"] },
          "23": { name: "Targovishte", cities: ["Targovishte", "Omurtag", "Popovo", "Other"] },
          "24": { name: "Varna", cities: ["Varna", "Nesebar", "Obzor", "Other"] },
          "25": { name: "Veliko Tarnovo", cities: ["Veliko Tarnovo", "Gorna Oryahovitsa", "Svishtov", "Other"] },
          "26": { name: "Vidin", cities: ["Vidin", "Belogradchik", "Calafat", "Other"] },
          "27": { name: "Yambol", cities: ["Yambol", "Tundzha", "Bolyarovo", "Other"] }
        }
      },
      "SK": {
        name: "Slovakia",
        flag: "🇸🇰",
        states: {
          "BC": { name: "Banská Bystrica", cities: ["Banská Bystrica", "Zvolen", "Banská Štiavnica", "Other"] },
          "BL": { name: "Bratislava", cities: ["Bratislava"] },
          "KE": { name: "Košice", cities: ["Košice", "Prešov", "Michalovce", "Other"] },
          "NI": { name: "Nitra", cities: ["Nitra", "Komárno", "Levice", "Other"] },
          "PO": { name: "Prešov", cities: ["Prešov", "Košice", "Bardejov", "Other"] },
          "TA": { name: "Trnava", cities: ["Trnava", "Dunajská Streda", "Hlohovec", "Other"] },
          "TN": { name: "Trenčín", cities: ["Trenčín", "Púchov", "Nové Mesto nad Váhom", "Other"] },
          "ZI": { name: "Žilina", cities: ["Žilina", "Čunovo", "Liptovský Mikuláš", "Other"] }
        }
      },
      "SI": {
        name: "Slovenia",
        flag: "🇸🇮",
        states: {
          "01": { name: "Upper Carniola", cities: ["Kranj", "Jesenice", "Radovljica", "Other"] },
          "02": { name: "Gorizia", cities: ["Nova Gorica", "Tolmin", "Kobarid", "Other"] },
          "03": { name: "Carniola", cities: ["Ljubljana"] },
          "04": { name: "Lower Carniola", cities: ["Novo Mesto", "Metlika", "Trebnje", "Other"] },
          "05": { name: "White Carniola", cities: ["Čatež ob Savi", "Trebnje", "Sevnica", "Other"] },
          "06": { name: "Styria", cities: ["Maribor", "Ptuj", "Ormož", "Other"] },
          "07": { name: "Prekmurje", cities: ["Murska Sobota", "Lendava", "Ljutomer", "Other"] },
          "08": { name: "Littoral", cities: ["Koper", "Izola", "Piran", "Other"] }
        }
      },
      "BA": {
        name: "Bosnia and Herzegovina",
        flag: "🇧🇦",
        states: {
          "FBH": { name: "Federation of Bosnia and Herzegovina", cities: ["Sarajevo", "Zenica", "Tuzla", "Mostar", "Other"] },
          "RS": { name: "Republika Srpska", cities: ["Banja Luka", "Prijedor", "Doboj", "Other"] },
          "BD": { name: "Brčko District", cities: ["Brčko"] }
        }
      },
      "ME": {
        name: "Montenegro",
        flag: "🇲🇪",
        states: {
          "01": { name: "Andrijevica", cities: ["Andrijevica", "Berane", "Rožaje", "Other"] },
          "02": { name: "Bar", cities: ["Bar", "Ulcinj", "Ada Bojana", "Other"] },
          "03": { name: "Berane", cities: ["Berane", "Rožaje", "Plav", "Other"] },
          "04": { name: "Bijelo Polje", cities: ["Bijelo Polje", "Rožaje", "Pljevlja", "Other"] },
          "05": { name: "Budva", cities: ["Budva", "Kotor", "Perast", "Other"] },
          "06": { name: "Cetinje", cities: ["Cetinje", "Nikšić", "Rijeka Crnojevića", "Other"] },
          "07": { name: "Danilovgrad", cities: ["Danilovgrad", "Podgorica", "Cetinje", "Other"] },
          "08": { name: "Gusinje", cities: ["Gusinje", "Rožaje", "Plav", "Other"] },
          "09": { name: "Herceg Novi", cities: ["Herceg Novi", "Kotor", "Perast", "Other"] },
          "10": { name: "Kolašin", cities: ["Kolašin", "Podgorica", "Mojkovac", "Other"] },
          "11": { name: "Kotor", cities: ["Kotor", "Perast", "Dobrota", "Other"] },
          "12": { name: "Mojkovac", cities: ["Mojkovac", "Kolašin", "Bijelo Polje", "Other"] },
          "13": { name: "Nikšić", cities: ["Nikšić", "Podgorica", "Šavnik", "Other"] },
          "14": { name: "Plav", cities: ["Plav", "Rožaje", "Gusinje", "Other"] },
          "15": { name: "Plužine", cities: ["Plužine", "Nikšić", "Šavnik", "Other"] },
          "16": { name: "Podgorica", cities: ["Podgorica"] },
          "17": { name: "Rožaje", cities: ["Rožaje", "Berane", "Plav", "Other"] },
          "18": { name: "Šavnik", cities: ["Šavnik", "Kolašin", "Plužine", "Other"] },
          "19": { name: "Tivat", cities: ["Tivat", "Kotor", "Perast", "Other"] },
          "20": { name: "Ulcinj", cities: ["Ulcinj", "Bar", "Ada Bojana", "Other"] },
          "21": { name: "Žabljak", cities: ["Žabljak", "Kolašin", "Mojkovac", "Other"] }
        }
      },
      "MK": {
        name: "North Macedonia",
        flag: "🇲🇰",
        states: {
          "01": { name: "Skopje", cities: ["Skopje"] },
          "02": { name: "Pelagonia", cities: ["Bitola", "Prilep", "Kruševo", "Other"] },
          "03": { name: "Polog", cities: ["Tetovo", "Gostivar", "Kičevo", "Other"] },
          "04": { name: "Vardar", cities: ["Veles", "Kavadarci", "Negotino", "Other"] },
          "05": { name: "Aegean", cities: ["Strumica", "Radoviš", "Valandovo", "Other"] },
          "06": { name: "Eastern", cities: ["Kočani", "Berovo", "Vinica", "Other"] },
          "07": { name: "Northeastern", cities: ["Kumanovo", "Kriva Palanka", "Kratovo", "Other"] },
          "08": { name: "Southwestern", cities: ["Ohrid", "Struga", "Debar", "Other"] }
        }
      },
      "RS": {
        name: "Serbia",
        flag: "🇷🇸",
        states: {
          "00": { name: "Belgrade", cities: ["Belgrade", "Zemun", "Voždovac", "Other"] },
          "01": { name: "Bor", cities: ["Bor", "Majdanpek", "Kladovo", "Other"] },
          "02": { name: "Braničevo", cities: ["Požarevac", "Petrovac na Mlavi", "Žagubica", "Other"] },
          "03": { name: "Bujanovac", cities: ["Bujanovac", "Vranje", "Leskovac", "Other"] },
          "04": { name: "Čačak", cities: ["Čačak", "Gornji Milanovac", "Čajetina", "Other"] },
          "05": { name: "Despotovac", cities: ["Despotovac", "Jagnjilo", "Svilajnac", "Other"] },
          "06": { name: "Dimitrovgrad", cities: ["Dimitrovgrad", "Pirot", "Babušnica", "Other"] },
          "07": { name: "Doljevac", cities: ["Doljevac", "Niš", "Aleksinac", "Other"] },
          "08": { name: "Gornji Milanovac", cities: ["Gornji Milanovac", "Čačak", "Čajetina", "Other"] },
          "09": { name: "Grocka", cities: ["Grocka", "Belgrade", "Voždovac", "Other"] },
          "10": { name: "Jagodina", cities: ["Jagodina", "Svetozarevo", "Ćuprija", "Other"] },
          "11": { name: "Knjaževac", cities: ["Knjaževac", "Bor", "Majdanpek", "Other"] },
          "12": { name: "Kolubara", cities: ["Lazarevac", "Valjevo", "Ub", "Other"] },
          "13": { name: "Kosovska Mitrovica", cities: ["Kosovska Mitrovica", "Mitrovica", "Zvečan", "Other"] },
          "14": { name: "Kuršumlija", cities: ["Kuršumlija", "Prokuplje", "Blace", "Other"] },
          "15": { name: "Lazarevac", cities: ["Lazarevac", "Valjevo", "Ub", "Other"] },
          "16": { name: "Lebane", cities: ["Lebane", "Vranje", "Bujanovac", "Other"] },
          "17": { name: "Leskovac", cities: ["Leskovac", "Vranje", "Lebane", "Other"] },
          "18": { name: "Loznica", cities: ["Loznica", "Šabac", "Ljubovija", "Other"] },
          "19": { name: "Lučani", cities: ["Lučani", "Čačak", "Gornji Milanovac", "Other"] },
          "20": { name: "Majdanpek", cities: ["Majdanpek", "Bor", "Kladovo", "Other"] },
          "21": { name: "Negotin", cities: ["Negotin", "Bor", "Kladovo", "Other"] },
          "22": { name: "Niš", cities: ["Niš", "Aleksinac", "Doljevac", "Other"] },
          "23": { name: "Novo Brdo", cities: ["Novo Brdo", "Prishtina", "Ferizaj", "Other"] },
          "24": { name: "Obrenovac", cities: ["Obrenovac", "Belgrade", "Grocka", "Other"] },
          "25": { name: "Odžaci", cities: ["Odžaci", "Sombor", "Apatin", "Other"] },
          "26": { name: "Opovo", cities: ["Opovo", "Pančevo", "Kovin", "Other"] },
          "27": { name: "Osečina", cities: ["Osečina", "Čačak", "Gornji Milanovac", "Other"] },
          "28": { name: "Pančevo", cities: ["Pančevo", "Belgrade", "Kovin", "Other"] },
          "29": { name: "Petrovac na Mlavi", cities: ["Petrovac na Mlavi", "Braničevo", "Žagubica", "Other"] },
          "30": { name: "Pirot", cities: ["Pirot", "Dimitrovgrad", "Babušnica", "Other"] },
          "31": { name: "Požarevac", cities: ["Požarevac", "Braničevo", "Petrovac na Mlavi", "Other"] },
          "32": { name: "Požega", cities: ["Požega", "Čačak", "Gornji Milanovac", "Other"] },
          "33": { name: "Prijepolje", cities: ["Prijepolje", "Čačak", "Čajetina", "Other"] },
          "34": { name: "Prizren", cities: ["Prizren", "Dakovica", "Dragaš", "Other"] },
          "35": { name: "Prokuplje", cities: ["Prokuplje", "Kuršumlija", "Blace", "Other"] },
          "36": { name: "Ražanj", cities: ["Ražanj", "Čačak", "Gornji Milanovac", "Other"] },
          "37": { name: "Ruma", cities: ["Ruma", "Sremski Karlovci", "Inđija", "Other"] },
          "38": { name: "Šabac", cities: ["Šabac", "Loznica", "Ljubovija", "Other"] },
          "39": { name: "Šid", cities: ["Šid", "Sremski Karlovci", "Inđija", "Other"] },
          "40": { name: "Smederevo", cities: ["Smederevo", "Belgrade", "Pančevo", "Other"] },
          "41": { name: "Sombor", cities: ["Sombor", "Odžaci", "Apatin", "Other"] },
          "42": { name: "Sremski Karlovci", cities: ["Sremski Karlovci", "Ruma", "Inđija", "Other"] },
          "43": { name: "Stara Pazova", cities: ["Stara Pazova", "Belgrade", "Grocka", "Other"] },
          "44": { name: "Svetozarevo", cities: ["Svetozarevo", "Jagodina", "Ćuprija", "Other"] },
          "45": { name: "Trstenik", cities: ["Trstenik", "Čačak", "Gornji Milanovac", "Other"] },
          "46": { name: "Ub", cities: ["Ub", "Čačak", "Gornji Milanovac", "Other"] },
          "47": { name: "Užice", cities: ["Užice", "Čačak", "Čajetina", "Other"] },
          "48": { name: "Valjevo", cities: ["Valjevo", "Lazarevac", "Ub", "Other"] },
          "49": { name: "Vranje", cities: ["Vranje", "Lebane", "Bujanovac", "Other"] },
          "50": { name: "Vrnjačka Banja", cities: ["Vrnjačka Banja", "Trstenik", "Čačak", "Other"] },
          "51": { name: "Zaječar", cities: ["Zaječar", "Knjaževac", "Bor", "Other"] },
          "52": { name: "Zemun", cities: ["Zemun", "Belgrade", "Voždovac", "Other"] },
          "53": { name: "Žagubica", cities: ["Žagubica", "Knjaževac", "Bor", "Other"] },
          "54": { name: "Žabalj", cities: ["Žabalj", "Sombor", "Apatin", "Other"] }
        }
      },
      "AL": {
        name: "Albania",
        flag: "🇦🇱",
        states: {
          "BER": { name: "Berat", cities: ["Berat", "Kuçovë", "Poliçan", "Other"] },
          "DIB": { name: "Dibër", cities: ["Peshkopi", "Bulqizë", "Klos", "Other"] },
          "DUR": { name: "Durrës", cities: ["Durrës", "Kavajë", "Rrogozhina", "Other"] },
          "ELB": { name: "Elbasan", cities: ["Elbasan", "Librazhd", "Gramsh", "Other"] },
          "GJI": { name: "Gjirokastër", cities: ["Gjirokastër", "Përmet", "Saranda", "Other"] },
          "KOR": { name: "Korçë", cities: ["Korçë", "Pogradec", "Leskovik", "Other"] },
          "KUK": { name: "Kukës", cities: ["Kukës", "Tropojë", "Bajram Curri", "Other"] },
          "LEZ": { name: "Lezhë", cities: ["Lezhë", "Shkodër", "Durrës", "Other"] },
          "TIR": { name: "Tiranë", cities: ["Tiranë", "Durrës", "Kavajë", "Other"] },
          "VLO": { name: "Vlorë", cities: ["Vlorë", "Sarandë", "Himara", "Other"] }
        }
      },
      "IE": {
        name: "Ireland",
        flag: "🇮🇪",
        states: {
          "C": { name: "Carlow", cities: ["Carlow", "Tullow", "Bagenalstown", "Other"] },
          "CE": { name: "Clare", cities: ["Ennis", "Kilrush", "Ennistymon", "Other"] },
          "CO": { name: "Cork", cities: ["Cork", "Cobh", "Youghal", "Other"] },
          "D": { name: "Dublin", cities: ["Dublin", "Dún Laoghaire", "Swords", "Other"] },
          "DL": { name: "Donegal", cities: ["Donegal", "Letterkenny", "Bundoran", "Other"] },
          "G": { name: "Galway", cities: ["Galway", "Tuam", "Ballinasloe", "Other"] },
          "KE": { name: "Kerry", cities: ["Tralee", "Killarney", "Dingle", "Other"] },
          "KK": { name: "Kilkenny", cities: ["Kilkenny", "Thomastown", "Castlecomer", "Other"] },
          "LD": { name: "Laois", cities: ["Portlaoise", "Mountmellick", "Abbeyleix", "Other"] },
          "LH": { name: "Louth", cities: ["Dundalk", "Drogheda", "Ardee", "Other"] },
          "LK": { name: "Limerick", cities: ["Limerick", "Newcastle West", "Rathkeale", "Other"] },
          "LM": { name: "Longford", cities: ["Longford", "Edgeworthstown", "Granard", "Other"] },
          "LS": { name: "Leitrim", cities: ["Carrick-on-Shannon", "Manorhamilton", "Ballinamore", "Other"] },
          "MH": { name: "Meath", cities: ["Navan", "Drogheda", "Trim", "Other"] },
          "MN": { name: "Monaghan", cities: ["Monaghan", "Castleblayney", "Clones", "Other"] },
          "MO": { name: "Offaly", cities: ["Tullamore", "Birr", "Edenderry", "Other"] },
          "RCM": { name: "Roscommon", cities: ["Roscommon", "Athlone", "Boyle", "Other"] },
          "SO": { name: "Sligo", cities: ["Sligo", "Ballymote", "Tubbercurry", "Other"] },
          "TY": { name: "Tipperary", cities: ["Clonmel", "Nenagh", "Roscrea", "Other"] },
          "WD": { name: "Waterford", cities: ["Waterford", "Dungarvan", "Lismore", "Other"] },
          "WH": { name: "Westmeath", cities: ["Athlone", "Mullingar", "Kinnegad", "Other"] },
          "WX": { name: "Wexford", cities: ["Wexford", "Enniscorthy", "New Ross", "Other"] },
          "WW": { name: "Wicklow", cities: ["Wicklow", "Bray", "Arklow", "Other"] }
        }
      },
      "IS": {
        name: "Iceland",
        flag: "🇮🇸",
        states: {
          "1": { name: "Capital Region", cities: ["Reykjavik", "Kópavogur", "Hafnarfjörður", "Other"] },
          "2": { name: "South", cities: ["Hveragerði", "Selfoss", "Vík", "Other"] },
          "3": { name: "West", cities: ["Borgarnes", "Akranes", "Stykkishólmur", "Other"] },
          "4": { name: "Northwest", cities: ["Ísafjörður", "Akureyri", "Húsavík", "Other"] },
          "5": { name: "Northeast", cities: ["Akureyri", "Húsavík", "Egilsstaðir", "Other"] },
          "6": { name: "East", cities: ["Egilsstaðir", "Reyðarfjörður", "Seyðisfjörður", "Other"] },
          "7": { name: "Southeast", cities: ["Höfn", "Vik", "Skaftafell", "Other"] }
        }
      },
      "EE": {
        name: "Estonia",
        flag: "🇪🇪",
        states: {
          "37": { name: "Harju", cities: ["Tallinn", "Maardu", "Keila", "Other"] },
          "39": { name: "Hiiumaa", cities: ["Kärdla", "Emmaste", "Lehtma", "Other"] },
          "45": { name: "Ida-Viru", cities: ["Narva", "Kohtla-Järve", "Sillamäe", "Other"] },
          "51": { name: "Jõgeva", cities: ["Jõgeva", "Mustvee", "Kasepää", "Other"] },
          "49": { name: "Järva", cities: ["Türi", "Paide", "Mustvee", "Other"] },
          "57": { name: "Lääne", cities: ["Haapsalu", "Läänemaa", "Ridala", "Other"] },
          "59": { name: "Lääne-Viru", cities: ["Rakvere", "Tapa", "Käru", "Other"] },
          "67": { name: "Põlva", cities: ["Põlva", "Võru", "Otepää", "Other"] },
          "65": { name: "Rapla", cities: ["Rapla", "Keila", "Läänemaa", "Other"] },
          "63": { name: "Saare", cities: ["Kuressaare", "Läänemaa", "Petseri", "Other"] },
          "71": { name: "Tartu", cities: ["Tartu", "Elva", "Otepää", "Other"] },
          "74": { name: "Valga", cities: ["Valga", "Otepää", "Helme", "Other"] },
          "78": { name: "Viljandi", cities: ["Viljandi", "Karksi", "Abja-Paluoja", "Other"] },
          "79": { name: "Võru", cities: ["Võru", "Antsla", "Rõuge", "Other"] }
        }
      },
      "LV": {
        name: "Latvia",
        flag: "🇱🇻",
        states: {
          "AI": { name: "Aizkraukle", cities: ["Aizkraukle", "Koknese", "Pļaviņas", "Other"] },
          "AL": { name: "Alūksne", cities: ["Alūksne", "Mazsalaca", "Apes", "Other"] },
          "BA": { name: "Balvi", cities: ["Balvi", "Viļaka", "Baltinava", "Other"] },
          "BU": { name: "Bauska", cities: ["Bauska", "Iecava", "Codes", "Other"] },
          "CE": { name: "Cēsis", cities: ["Cēsis", "Saulkrasti", "Pārgauja", "Other"] },
          "DA": { name: "Daugavpils", cities: ["Daugavpils", "Krāslava", "Preiļi", "Other"] },
          "DO": { name: "Dobele", cities: ["Dobele", "Bauskas", "Auce", "Other"] },
          "GU": { name: "Gulbene", cities: ["Gulbene", "Alūksne", "Balvi", "Other"] },
          "JE": { name: "Jēkabpils", cities: ["Jēkabpils", "Koknese", "Sēlpils", "Other"] },
          "JU": { name: "Jūrmala", cities: ["Jūrmala", "Ķemeri", "Sloka", "Other"] },
          "KR": { name: "Krāslava", cities: ["Krāslava", "Daugavpils", "Preiļi", "Other"] },
          "KU": { name: "Kuldīga", cities: ["Kuldīga", "Ventspils", "Saldus", "Other"] },
          "LI": { name: "Limbaži", cities: ["Limbaži", "Saulkrasti", "Alojas", "Other"] },
          "LU": { name: "Ludza", cities: ["Ludza", "Balvi", "Viļaka", "Other"] },
          "MA": { name: "Madona", cities: ["Madona", "Gulbene", "Cesvaine", "Other"] },
          "OG": { name: "Ogre", cities: ["Ogre", "Ķekava", "Ikšķile", "Other"] },
          "PR": { name: "Preiļi", cities: ["Preiļi", "Jēkabpils", "Krāslava", "Other"] },
          "RE": { name: "Rēzekne", cities: ["Rēzekne", "Ludza", "Balvi", "Other"] },
          "RI": { name: "Riga", cities: ["Riga"] },
          "SA": { name: "Saulkrasti", cities: ["Saulkrasti", "Limbaži", "Alojas", "Other"] },
          "SI": { name: "Sigulda", cities: ["Sigulda", "Riga", "Pārgauja", "Other"] },
          "TA": { name: "Talsi", cities: ["Talsi", "Kuldīga", "Saldus", "Other"] },
          "TU": { name: "Tukums", cities: ["Tukums", "Engure", "Jūrmala", "Other"] },
          "VA": { name: "Valka", cities: ["Valka", "Alūksne", "Smiltene", "Other"] },
          "VE": { name: "Ventspils", cities: ["Ventspils", "Kuldīga", "Saldus", "Other"] }
        }
      },
      "LT": {
        name: "Lithuania",
        flag: "🇱🇹",
        states: {
          "AL": { name: "Alytaus", cities: ["Alytus", "Kaunas", "Gargždai", "Other"] },
          "KA": { name: "Kauno", cities: ["Kaunas", "Kėdainiai", "Raseiniai", "Other"] },
          "KL": { name: "Klaipėdos", cities: ["Klaipėda", "Šilutė", "Gargždai", "Other"] },
          "MA": { name: "Marijampolės", cities: ["Marijampolė", "Vilkaviškis", "Šalčininkai", "Other"] },
          "PA": { name: "Panevėžio", cities: ["Panevėžys", "Kupiškis", "Sėdžius", "Other"] },
          "SA": { name: "Šiaulių", cities: ["Šiauliai", "Kelmė", "Radviliškis", "Other"] },
          "TA": { name: "Tauragės", cities: ["Tauragė", "Šilalė", "Jurbarkas", "Other"] },
          "TE": { name: "Telšių", cities: ["Telšiai", "Jurbarkas", "Kelmė", "Other"] },
          "UT": { name: "Utenos", cities: ["Utena", "Anykščiai", "Visaginas", "Other"] },
          "VI": { name: "Vilniaus", cities: ["Vilnius", "Trakai", "Kernius", "Other"] }
        }
      },
      "MD": {
        name: "Moldova",
        flag: "🇲🇩",
        states: {
          "CH": { name: "Chișinău", cities: ["Chișinău"] },
          "BA": { name: "Bălți", cities: ["Bălți", "Soroca", "Orhei", "Other"] },
          "BD": { name: "Bender", cities: ["Bender", "Tighina", "Tiraspol", "Other"] },
          "OR": { name: "Orhei", cities: ["Orhei", "Chișinău", "Căușeni", "Other"] },
          "GA": { name: "Găgăuzia", cities: ["Comrat", "Ceadîr-Lunga", "Vulcănești", "Other"] },
          "TR": { name: "Transnistria", cities: ["Tiraspol", "Bender", "Rîbnița", "Other"] }
        }
      },
      "UA": {
        name: "Ukraine",
        flag: "🇺🇦",
        states: {
          "01": { name: "Cherkasy", cities: ["Cherkasy", "Smela", "Kaniv", "Other"] },
          "02": { name: "Chernihiv", cities: ["Chernihiv", "Nizhyn", "Korop", "Other"] },
          "03": { name: "Chernivtsi", cities: ["Chernivtsi", "Khotyn", "Storozhynets", "Other"] },
          "04": { name: "Crimea", cities: ["Simferopol", "Sevastopol", "Yalta", "Other"] },
          "05": { name: "Dnipropetrovsk", cities: ["Dnipro", "Kryvyi Rih", "Pavlohrad", "Other"] },
          "06": { name: "Donetsk", cities: ["Donetsk", "Luhansk", "Mariupol", "Other"] },
          "07": { name: "Ivano-Frankivsk", cities: ["Ivano-Frankivsk", "Kolomyia", "Kalush", "Other"] },
          "08": { name: "Kharkiv", cities: ["Kharkiv", "Izyum", "Kupiansk", "Other"] },
          "09": { name: "Kherson", cities: ["Kherson", "Nova Kakhovka", "Henichesk", "Other"] },
          "10": { name: "Khmelnytsky", cities: ["Khmelnytsky", "Shepetivka", "Kamianets-Podilskyi", "Other"] },
          "11": { name: "Kyiv", cities: ["Kyiv"] },
          "12": { name: "Kyiv Oblast", cities: ["Kyiv", "Chornobyl", "Cherkasy", "Other"] },
          "13": { name: "Kirovohrad", cities: ["Kirovohrad", "Oleksandriia", "Novoukrainka", "Other"] },
          "14": { name: "Luhansk", cities: ["Luhansk", "Sievierodonetsk", "Lysychansk", "Other"] },
          "15": { name: "Lviv", cities: ["Lviv", "Drohobych", "Sambir", "Other"] },
          "16": { name: "Mykolaiv", cities: ["Mykolaiv", "Ochakiv", "Bashtanka", "Other"] },
          "17": { name: "Odesa", cities: ["Odesa", "Bilhorod-Dnistrovsky", "Izmail", "Other"] },
          "18": { name: "Poltava", cities: ["Poltava", "Kremenchuk", "Komsomolskyi", "Other"] },
          "19": { name: "Rivne", cities: ["Rivne", "Sarny", "Dubno", "Other"] },
          "20": { name: "Sumy", cities: ["Sumy", "Konotop", "Okhtyrka", "Other"] },
          "21": { name: "Ternopil", cities: ["Ternopil", "Chortkiv", "Buchach", "Other"] },
          "22": { name: "Vinnytsia", cities: ["Vinnytsia", "Khmelnytsky", "Koziatyn", "Other"] },
          "23": { name: "Volyn", cities: ["Lutsk", "Kovel", "Novovolynsk", "Other"] },
          "24": { name: "Zaporizhzhia", cities: ["Zaporizhzhia", "Melitopol", "Berdyansk", "Other"] },
          "25": { name: "Zhytomyr", cities: ["Zhytomyr", "Korosten", "Novohrad-Volynskyi", "Other"] }
        }
      },
      "BY": {
        name: "Belarus",
        flag: "🇧🇾",
        states: {
          "BR": { name: "Brest", cities: ["Brest", "Baranovichi", "Kobrin", "Other"] },
          "HM": { name: "Homel", cities: ["Homel", "Mozyr", "Zhlobin", "Other"] },
          "HO": { name: "Hrodna", cities: ["Hrodna", "Lida", "Slonim", "Other"] },
          "MG": { name: "Minsk", cities: ["Minsk"] },
          "MO": { name: "Mogilev", cities: ["Mogilev", "Orsha", "Bobruisk", "Other"] },
          "VI": { name: "Vitebsk", cities: ["Vitebsk", "Polotsk", "Novopolotsk", "Other"] }
        }
      },
      "RU": {
        name: "Russia",
        flag: "🇷🇺",
        region: "europe",
        states: {
          "MOS": { name: "Moscow", cities: ["Moscow"] },
          "SPE": { name: "Saint Petersburg", cities: ["Saint Petersburg"] },
          "LEN": { name: "Leningrad Oblast", cities: ["Gatchina", "Kronshtadt", "Pushkin", "Other"] },
          "PSK": { name: "Pskov", cities: ["Pskov", "Velikiye Luki", "Ostrov", "Other"] },
          "SMO": { name: "Smolensk", cities: ["Smolensk", "Vyazma", "Safonovo", "Other"] },
          "TVE": { name: "Tver", cities: ["Tver", "Kimry", "Torzhok", "Other"] },
          "YAR": { name: "Yaroslavl", cities: ["Yaroslavl", "Rybinsk", "Tutayev", "Other"] },
          "KOS": { name: "Kostroma", cities: ["Kostroma", "Buya", "Nerekhta", "Other"] },
          "IVA": { name: "Ivanovo", cities: ["Ivanovo", "Shuya", "Kineshma", "Other"] },
          "VL": { name: "Vladimir", cities: ["Vladimir", "Kovrov", "Murom", "Other"] },
          "RYA": { name: "Ryazan", cities: ["Ryazan", "Kasimov", "Skopin", "Other"] },
          "TUL": { name: "Tula", cities: ["Tula", "Aleksin", "Uzlovaya", "Other"] },
          "ORL": { name: "Oryol", cities: ["Oryol", "Livny", "Mtsensk", "Other"] },
          "LI": { name: "Lipetsk", cities: ["Lipetsk", "Yelets", "Gryazi", "Other"] },
          "VOR": { name: "Voronezh", cities: ["Voronezh", "Borisoglebsk", "Rossosh", "Other"] },
          "TAM": { name: "Tambov", cities: ["Tambov", "Michurinsk", "Kirsanov", "Other"] },
          "PE": { name: "Penza", cities: ["Penza", "Saransk", "Kuznetsk", "Other"] },
          "SAR": { name: "Saratov", cities: ["Saratov", "Balakovo", "Penza", "Other"] },
          "VLG": { name: "Volgograd", cities: ["Volgograd", "Volzhsky", "Kamyshin", "Other"] },
          "AST": { name: "Astrakhan", cities: ["Astrakhan", "Kharabali", "Akhtubinsk", "Other"] },
          "BEL": { name: "Belgorod", cities: ["Belgorod", "Stary Oskol", "Shebekino", "Other"] },
          "BRY": { name: "Bryansk", cities: ["Bryansk", "Klintsy", "Novozybkov", "Other"] },
          "KUR": { name: "Kursk", cities: ["Kursk", "Kurchatov", "Lgov", "Other"] },
          "LIP": { name: "Lipetsk", cities: ["Lipetsk", "Yelets", "Gryazi", "Other"] }
        }
      },
      "LU": {
        name: "Luxembourg",
        flag: "🇱🇺",
        states: {
          "CA": { name: "Capellen", cities: ["Capellen", "Leudelange", "Bertrange", "Other"] },
          "CL": { name: "Clervaux", cities: ["Clervaux", "Parc Hosingen", "Troisvierges", "Other"] },
          "DI": { name: "Diekirch", cities: ["Diekirch", "Ettelbruck", "Colmar-Berg", "Other"] },
          "EC": { name: "Echternach", cities: ["Echternach", "Rosport", "Beaufort", "Other"] },
          "ES": { name: "Esch-sur-Alzette", cities: ["Esch-sur-Alzette", "Rumelange", "Differdange", "Other"] },
          "GR": { name: "Grevenmacher", cities: ["Grevenmacher", "Remich", "Wormeldange", "Other"] },
          "LU": { name: "Luxembourg", cities: ["Luxembourg", "Esch-sur-Alzette", "Dudelange", "Other"] },
          "ME": { name: "Mersch", cities: ["Mersch", "Bissen", "Feulen", "Other"] },
          "RE": { name: "Redange", cities: ["Redange", "Wilwerwiltz", "Ell", "Other"] },
          "VI": { name: "Vianden", cities: ["Vianden", "Diekirch", "Hosingen", "Other"] },
          "WI": { name: "Wiltz", cities: ["Wiltz", "Clervaux", "Weiswampach", "Other"] }
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
          "02": { name: "Vaduz", cities: ["Vaduz"] },
          "03": { name: "Triesen", cities: ["Triesen", "Vaduz", "Schaan"] },
          "04": { name: "Balzers", cities: ["Balzers", "Triesen", "Mauren"] }
        }
      },
      "CY": {
        name: "Cyprus",
        flag: "🇨🇾",
        states: {
          "01": { name: "Nicosia", cities: ["Nicosia", "Kyrenia", "Famagusta"] },
          "02": { name: "Larnaca", cities: ["Larnaca", "Limassol", "Paphos"] },
          "03": { name: "Paphos", cities: ["Paphos", "Limassol", "Polis"] },
          "04": { name: "Limassol", cities: ["Limassol", "Larnaca", "Paphos"] }
        }
      }
    }
  },
  "nationalities": [
    "Paraguayan",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Polish",
    "Romanian",
    "Dutch",
    "Belgian",
    "Austrian",
    "Swiss",
    "Swedish",
    "Norwegian",
    "Danish",
    "Finnish",
    "Czech",
    "Slovak",
    "Hungarian",
    "Croatian",
    "Serbian",
    "Bulgarian",
    "Greek",
    "Slovenian",
    "Lithuanian",
    "Latvian",
    "Estonian",
    "Icelandic",
    "Irish",
    "British",
    "Russian",
    "Ukrainian",
    "Belarusian",
    "Moldovan",
    "Albanian",
    "Bosnian",
    "Montenegrin",
    "Macedonian",
    "Luxembourgish",
    "Maltese",
    "Cypriot",
    "Monégasque",
    "San Marinese",
    "Andorran",
    "Liechtensteiner"
  ]
}

