(function(global) {
    const LOCATION_DATA = {
        countries: {
            PY: {
                name: 'Paraguay',
                apiName: 'Paraguay',
                dialCodes: ['+595'],
                states: [
                    { code: 'asuncion', name: 'Asunción (Capital District)', cities: ['Asunción'] },
                    { code: 'alto-paraguay', name: 'Alto Paraguay', cities: ['Fuerte Olimpo', 'Bahía Negra', 'Carmelo Peralta', 'Puerto Casado'] },
                    { code: 'alto-parana', name: 'Alto Paraná', cities: ['Ciudad del Este', 'Presidente Franco', 'Hernandarias', 'Minga Guazú', 'Santa Rita'] },
                    { code: 'amambay', name: 'Amambay', cities: ['Pedro Juan Caballero', 'Capitán Bado', 'Bella Vista Norte', 'Zanja Pytã'] },
                    { code: 'boqueron', name: 'Boquerón', cities: ['Filadelfia', 'Loma Plata', 'Mariscal Estigarribia', 'Neuland'] },
                    { code: 'caaguazu', name: 'Caaguazú', cities: ['Coronel Oviedo', 'Caaguazú', 'Repatriación', 'Juan Manuel Frutos', 'José Domingo Ocampos'] },
                    { code: 'caazapa', name: 'Caazapá', cities: ['Caazapá', 'San Juan Nepomuceno', 'Abaí', 'Yuty', 'Tavaí'] },
                    { code: 'canindeyu', name: 'Canindeyú', cities: ['Salto del Guairá', 'Curuguaty', 'Katueté', 'Ybyrarobaná', 'Villa Ygatimí'] },
                    { code: 'central', name: 'Central', cities: ['San Lorenzo', 'Luque', 'Capiatá', 'Lambaré', 'Fernando de la Mora', 'Ñemby', 'Mariano Roque Alonso', 'Villa Elisa'] },
                    { code: 'concepcion', name: 'Concepción', cities: ['Concepción', 'Horqueta', 'Loreto', 'Belén', 'Vallemí'] },
                    { code: 'cordillera', name: 'Cordillera', cities: ['Caacupé', 'Eusebio Ayala', 'Itacurubí de la Cordillera', 'Tobatí', 'San Bernardino'] },
                    { code: 'guaira', name: 'Guairá', cities: ['Villarrica', 'Coronel Martínez', 'Borja', 'Iturbe', 'Mbocayaty'] },
                    { code: 'itapua', name: 'Itapúa', cities: ['Encarnación', 'Hohenau', 'Obligado', 'Bella Vista', 'Capitán Miranda', 'Fram'] },
                    { code: 'misiones', name: 'Misiones', cities: ['San Juan Bautista', 'Ayolas', 'San Ignacio', 'San Miguel', 'Villa Florida'] },
                    { code: 'neembucu', name: 'Ñeembucú', cities: ['Pilar', 'Humaitá', 'Paso de Patria', 'Isla Umbú', 'Desmochados'] },
                    { code: 'paraguari', name: 'Paraguarí', cities: ['Paraguarí', 'Carapeguá', 'Pirayú', 'Yaguarón', 'La Colmena'] },
                    { code: 'presidente-hayes', name: 'Presidente Hayes', cities: ['Villa Hayes', 'Nanawa', 'Pozo Colorado', 'Teniente Irala Fernández', 'Nueva Asunción'] },
                    { code: 'san-pedro', name: 'San Pedro', cities: ['San Pedro de Ycuamandiyú', 'Santa Rosa del Aguaray', 'Choré', 'Lima', 'Itacurubí del Rosario'] }
                ]
            },
            AL: {
                name: 'Albania',
                apiName: 'Albania',
                dialCodes: ['+355'],
                states: [
                    { code: 'tirana', name: 'Tirana County', cities: ['Tirana', 'Kamëz', 'Vorë', 'Kavajë'] },
                    { code: 'diber', name: 'Dibër County', cities: ['Peshkopi', 'Bulqizë', 'Burrel', 'Klos'] },
                    { code: 'shkoder', name: 'Shkodër County', cities: ['Shkodër', 'Lezhë', 'Koplik', 'Pukë'] },
                    { code: 'vlore', name: 'Vlorë County', cities: ['Vlorë', 'Sarandë', 'Himarë', 'Delvinë'] }
                ]
            },
            AD: {
                name: 'Andorra',
                apiName: 'Andorra',
                dialCodes: ['+376'],
                states: [
                    { code: 'andorra-la-vella', name: 'Andorra la Vella', cities: ['Andorra la Vella', 'Santa Coloma', 'La Margineda'] },
                    { code: 'canillo', name: 'Canillo', cities: ['Canillo', 'Soldeu', 'El Tarter'] },
                    { code: 'encamp', name: 'Encamp', cities: ['Encamp', 'Pas de la Casa', 'Vila'] },
                    { code: 'escaldes-engordany', name: 'Escaldes-Engordany', cities: ['Escaldes-Engordany', 'Engolasters', 'Els Vilars'] },
                    { code: 'la-massana', name: 'La Massana', cities: ['La Massana', 'Arinsal', 'Anyós'] },
                    { code: 'ordino', name: 'Ordino', cities: ['Ordino', 'La Cortinada', 'El Serrat'] },
                    { code: 'sant-julia-de-loria', name: 'Sant Julià de Lòria', cities: ['Sant Julià de Lòria', 'Fontaneda', 'Bixessarri'] }
                ]
            },
            AM: {
                name: 'Armenia',
                apiName: 'Armenia',
                dialCodes: ['+374'],
                states: [
                    { code: 'yerevan', name: 'Yerevan', cities: ['Yerevan', 'Kentron', 'Arabkir', 'Malatia-Sebastia'] },
                    { code: 'aragatsotn', name: 'Aragatsotn Province', cities: ['Ashtarak', 'Talin', 'Aparan', 'Oshakan'] },
                    { code: 'ararat', name: 'Ararat Province', cities: ['Artashat', 'Ararat', 'Masis', 'Vedi'] },
                    { code: 'armavir', name: 'Armavir Province', cities: ['Armavir', 'Echmiadzin', 'Metsamor', 'Baghramyan'] },
                    { code: 'gegharkunik', name: 'Gegharkunik Province', cities: ['Gavar', 'Sevan', 'Martuni', 'Vardenis'] },
                    { code: 'kotayk', name: 'Kotayk Province', cities: ['Hrazdan', 'Abovyan', 'Charentsavan', 'Tsaghkadzor'] },
                    { code: 'lori', name: 'Lori Province', cities: ['Vanadzor', 'Alaverdi', 'Stepanavan', 'Spitak'] },
                    { code: 'shirak', name: 'Shirak Province', cities: ['Gyumri', 'Artik', 'Maralik', 'Akhuryan'] },
                    { code: 'syunik', name: 'Syunik Province', cities: ['Kapan', 'Goris', 'Meghri', 'Sisian'] },
                    { code: 'tavush', name: 'Tavush Province', cities: ['Ijevan', 'Dilijan', 'Berd', 'Noyemberyan'] },
                    { code: 'vayots-dzor', name: 'Vayots Dzor Province', cities: ['Yeghegnadzor', 'Jermuk', 'Vayk', 'Areni'] }
                ]
            },
            AT: {
                name: 'Austria',
                apiName: 'Austria',
                dialCodes: ['+43'],
                states: [
                    { code: 'vienna', name: 'Vienna', cities: ['Innere Stadt', 'Donaustadt', 'Favoriten', 'Leopoldstadt'] },
                    { code: 'lower-austria', name: 'Lower Austria', cities: ['St. Pölten', 'Wiener Neustadt', 'Krems an der Donau', 'Baden'] },
                    { code: 'upper-austria', name: 'Upper Austria', cities: ['Linz', 'Wels', 'Steyr', 'Leonding'] },
                    { code: 'styria', name: 'Styria', cities: ['Graz', 'Leoben', 'Kapfenberg', 'Bruck an der Mur'] },
                    { code: 'tyrol', name: 'Tyrol', cities: ['Innsbruck', 'Kufstein', 'Lienz', 'Telfs'] },
                    { code: 'salzburg', name: 'Salzburg', cities: ['Salzburg', 'Hallein', 'Bischofshofen', 'Saalfelden'] }
                ]
            },
            AZ: {
                name: 'Azerbaijan',
                apiName: 'Azerbaijan',
                dialCodes: ['+994'],
                states: [
                    { code: 'baku', name: 'Baku', cities: ['Baku', 'Yasamal', 'Narimanov', 'Sabail'] },
                    { code: 'absheron-khizi', name: 'Absheron-Khizi Economic Region', cities: ['Khirdalan', 'Sumqayit', 'Masazir', 'Novkhani'] },
                    { code: 'ganja-dashkasan', name: 'Ganja-Dashkasan Economic Region', cities: ['Ganja', 'Naftalan', 'Dashkasan', 'Goygol'] },
                    { code: 'central-aran', name: 'Central Aran Economic Region', cities: ['Yevlakh', 'Agjabadi', 'Barda', 'Goychay'] },
                    { code: 'lankaran-astara', name: 'Lankaran-Astara Economic Region', cities: ['Lankaran', 'Astara', 'Masalli', 'Lerik'] },
                    { code: 'sheki-zagatala', name: 'Shaki-Zagatala Economic Region', cities: ['Shaki', 'Zagatala', 'Qakh', 'Balakan'] },
                    { code: 'guba-khachmaz', name: 'Guba-Khachmaz Economic Region', cities: ['Quba', 'Khachmaz', 'Qusar', 'Shabran'] },
                    { code: 'karabakh', name: 'Karabakh Economic Region', cities: ['Khankendi', 'Shusha', 'Fuzuli', 'Aghdam'] },
                    { code: 'nakhchivan', name: 'Nakhchivan Autonomous Republic', cities: ['Nakhchivan', 'Julfa', 'Ordubad', 'Sharur'] }
                ]
            },
            BY: {
                name: 'Belarus',
                apiName: 'Belarus',
                dialCodes: ['+375'],
                states: [
                    { code: 'minsk', name: 'Minsk Region', cities: ['Minsk', 'Zhodzina', 'Barysaw', 'Maladzyechna'] },
                    { code: 'brest', name: 'Brest Region', cities: ['Brest', 'Baranavichy', 'Pinsk', 'Kobryn'] },
                    { code: 'gomel', name: 'Gomel Region', cities: ['Gomel', 'Mozyr', 'Rechytsa', 'Svetlahorsk'] },
                    { code: 'grodno', name: 'Grodno Region', cities: ['Grodno', 'Lida', 'Slonim', 'Navahrudak'] },
                    { code: 'mogilev', name: 'Mogilev Region', cities: ['Mogilev', 'Babruysk', 'Horki', 'Asipovichy'] },
                    { code: 'vitebsk', name: 'Vitebsk Region', cities: ['Vitebsk', 'Orsha', 'Polotsk', 'Novopolotsk'] }
                ]
            },
            BE: {
                name: 'Belgium',
                apiName: 'Belgium',
                dialCodes: ['+32'],
                states: [
                    { code: 'brussels', name: 'Brussels-Capital Region', cities: ['Brussels', 'Anderlecht', 'Schaerbeek', 'Ixelles'] },
                    { code: 'flanders', name: 'Flanders', cities: ['Antwerp', 'Ghent', 'Bruges', 'Leuven'] },
                    { code: 'wallonia', name: 'Wallonia', cities: ['Liège', 'Namur', 'Charleroi', 'Mons'] }
                ]
            },
            BA: {
                name: 'Bosnia and Herzegovina',
                apiName: 'Bosnia and Herzegovina',
                dialCodes: ['+387'],
                states: [
                    { code: 'sarajevo', name: 'Sarajevo Canton', cities: ['Sarajevo', 'Ilidža', 'Vogošća', 'Hadžići'] },
                    { code: 'herzegovina-neretva', name: 'Herzegovina-Neretva Canton', cities: ['Mostar', 'Konjic', 'Čapljina', 'Jablanica'] },
                    { code: 'banja-luka', name: 'Banja Luka Region', cities: ['Banja Luka', 'Prijedor', 'Gradiška', 'Laktaši'] },
                    { code: 'tuzla', name: 'Tuzla Canton', cities: ['Tuzla', 'Živinice', 'Srebrenik', 'Gračanica'] }
                ]
            },
            BG: {
                name: 'Bulgaria',
                apiName: 'Bulgaria',
                dialCodes: ['+359'],
                states: [
                    { code: 'sofia', name: 'Sofia City Province', cities: ['Sofia', 'Bankya', 'Novi Iskar', 'Botevgrad'] },
                    { code: 'plovdiv', name: 'Plovdiv Province', cities: ['Plovdiv', 'Asenovgrad', 'Karlovo', 'Rakovski'] },
                    { code: 'varna', name: 'Varna Province', cities: ['Varna', 'Devnya', 'Provadia', 'Balchik'] },
                    { code: 'burgas', name: 'Burgas Province', cities: ['Burgas', 'Nesebar', 'Pomorie', 'Sozopol'] }
                ]
            },
            HR: {
                name: 'Croatia',
                apiName: 'Croatia',
                dialCodes: ['+385'],
                states: [
                    { code: 'zagreb', name: 'City of Zagreb', cities: ['Zagreb', 'Sesvete', 'Samobor', 'Velika Gorica'] },
                    { code: 'split-dalmatia', name: 'Split-Dalmatia County', cities: ['Split', 'Trogir', 'Makarska', 'Sinj'] },
                    { code: 'istria', name: 'Istria County', cities: ['Pula', 'Rovinj', 'Poreč', 'Umag'] },
                    { code: 'dubrovnik-neretva', name: 'Dubrovnik-Neretva County', cities: ['Dubrovnik', 'Metković', 'Korčula', 'Ploče'] }
                ]
            },
            CY: {
                name: 'Cyprus',
                apiName: 'Cyprus',
                dialCodes: ['+357'],
                states: [
                    { code: 'nicosia', name: 'Nicosia District', cities: ['Nicosia', 'Strovolos', 'Lakatamia', 'Latsia'] },
                    { code: 'limassol', name: 'Limassol District', cities: ['Limassol', 'Kato Polemidia', 'Germasogeia', 'Ypsonas'] },
                    { code: 'larnaca', name: 'Larnaca District', cities: ['Larnaca', 'Aradippou', 'Dromolaxia', 'Lefkara'] },
                    { code: 'paphos', name: 'Paphos District', cities: ['Paphos', 'Geroskipou', 'Peyia', 'Polis'] },
                    { code: 'famagusta', name: 'Famagusta District', cities: ['Paralimni', 'Ayia Napa', 'Deryneia', 'Sotira'] }
                ]
            },
            CZ: {
                name: 'Czech Republic',
                apiName: 'Czech Republic',
                dialCodes: ['+420'],
                states: [
                    { code: 'prague', name: 'Prague', cities: ['Prague 1', 'Prague 4', 'Prague 6', 'Prague 10'] },
                    { code: 'south-moravian', name: 'South Moravian Region', cities: ['Brno', 'Znojmo', 'Hodonín', 'Břeclav'] },
                    { code: 'central-bohemian', name: 'Central Bohemian Region', cities: ['Kladno', 'Mladá Boleslav', 'Kolín', 'Benešov'] },
                    { code: 'moravian-silesian', name: 'Moravian-Silesian Region', cities: ['Ostrava', 'Opava', 'Karviná', 'Frýdek-Místek'] }
                ]
            },
            DK: {
                name: 'Denmark',
                apiName: 'Denmark',
                dialCodes: ['+45'],
                states: [
                    { code: 'capital-region', name: 'Capital Region', cities: ['Copenhagen', 'Frederiksberg', 'Lyngby', 'Hillerød'] },
                    { code: 'central-denmark', name: 'Central Denmark Region', cities: ['Aarhus', 'Randers', 'Silkeborg', 'Horsens'] },
                    { code: 'southern-denmark', name: 'Southern Denmark Region', cities: ['Odense', 'Esbjerg', 'Kolding', 'Sønderborg'] },
                    { code: 'north-denmark', name: 'North Denmark Region', cities: ['Aalborg', 'Hjørring', 'Frederikshavn', 'Thisted'] }
                ]
            },
            EE: {
                name: 'Estonia',
                apiName: 'Estonia',
                dialCodes: ['+372'],
                states: [
                    { code: 'harju', name: 'Harju County', cities: ['Tallinn', 'Maardu', 'Keila', 'Saue'] },
                    { code: 'tartu', name: 'Tartu County', cities: ['Tartu', 'Elva', 'Nõo', 'Kambja'] },
                    { code: 'ida-viru', name: 'Ida-Viru County', cities: ['Narva', 'Kohtla-Järve', 'Jõhvi', 'Sillamäe'] },
                    { code: 'parnu', name: 'Pärnu County', cities: ['Pärnu', 'Sindi', 'Kilingi-Nõmme', 'Vändra'] }
                ]
            },
            FI: {
                name: 'Finland',
                apiName: 'Finland',
                dialCodes: ['+358'],
                states: [
                    { code: 'uusimaa', name: 'Uusimaa', cities: ['Helsinki', 'Espoo', 'Vantaa', 'Porvoo'] },
                    { code: 'pirkanmaa', name: 'Pirkanmaa', cities: ['Tampere', 'Nokia', 'Ylöjärvi', 'Kangasala'] },
                    { code: 'southwest-finland', name: 'Southwest Finland', cities: ['Turku', 'Salo', 'Kaarina', 'Naantali'] },
                    { code: 'northern-ostrobothnia', name: 'Northern Ostrobothnia', cities: ['Oulu', 'Raahe', 'Kuusamo', 'Kempele'] }
                ]
            },
            FR: {
                name: 'France',
                apiName: 'France',
                dialCodes: ['+33'],
                states: [
                    { code: 'ile-de-france', name: 'Île-de-France', cities: ['Paris', 'Boulogne-Billancourt', 'Saint-Denis', 'Versailles'] },
                    { code: 'provence-alpes-cote-d-azur', name: "Provence-Alpes-Côte d'Azur", cities: ['Marseille', 'Nice', 'Toulon', 'Avignon'] },
                    { code: 'auvergne-rhone-alpes', name: 'Auvergne-Rhône-Alpes', cities: ['Lyon', 'Grenoble', 'Clermont-Ferrand', 'Annecy'] },
                    { code: 'nouvelle-aquitaine', name: 'Nouvelle-Aquitaine', cities: ['Bordeaux', 'Limoges', 'Poitiers', 'La Rochelle'] },
                    { code: 'occitanie', name: 'Occitanie', cities: ['Toulouse', 'Montpellier', 'Nîmes', 'Perpignan'] }
                ]
            },
            DE: {
                name: 'Germany',
                apiName: 'Germany',
                dialCodes: ['+49'],
                states: [
                    { code: 'bavaria', name: 'Bavaria', cities: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg'] },
                    { code: 'north-rhine-westphalia', name: 'North Rhine-Westphalia', cities: ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen'] },
                    { code: 'baden-wuerttemberg', name: 'Baden-Württemberg', cities: ['Stuttgart', 'Mannheim', 'Karlsruhe', 'Freiburg'] },
                    { code: 'berlin', name: 'Berlin', cities: ['Mitte', 'Charlottenburg-Wilmersdorf', 'Pankow', 'Friedrichshain-Kreuzberg'] },
                    { code: 'hamburg', name: 'Hamburg', cities: ['Hamburg', 'Altona', 'Wandsbek', 'Harburg'] },
                    { code: 'hesse', name: 'Hesse', cities: ['Frankfurt', 'Wiesbaden', 'Kassel', 'Darmstadt'] }
                ]
            },
            GE: {
                name: 'Georgia',
                apiName: 'Georgia',
                dialCodes: ['+995'],
                states: [
                    { code: 'tbilisi', name: 'Tbilisi', cities: ['Tbilisi', 'Vake', 'Saburtalo', 'Gldani'] },
                    { code: 'adjara', name: 'Autonomous Republic of Adjara', cities: ['Batumi', 'Kobuleti', 'Khelvachauri', 'Keda'] },
                    { code: 'guria', name: 'Guria', cities: ['Ozurgeti', 'Lanchkhuti', 'Chokhatauri', 'Ureki'] },
                    { code: 'imereti', name: 'Imereti', cities: ['Kutaisi', 'Zestaponi', 'Sachkhere', 'Tqibuli'] },
                    { code: 'kakheti', name: 'Kakheti', cities: ['Telavi', 'Gurjaani', 'Sighnaghi', 'Lagodekhi'] },
                    { code: 'kvemo-kartli', name: 'Kvemo Kartli', cities: ['Rustavi', 'Marneuli', 'Bolnisi', 'Gardabani'] },
                    { code: 'samegrelo-zemo-svaneti', name: 'Samegrelo-Zemo Svaneti', cities: ['Zugdidi', 'Poti', 'Senaki', 'Mestia'] },
                    { code: 'samtskhe-javakheti', name: 'Samtskhe-Javakheti', cities: ['Akhaltsikhe', 'Borjomi', 'Akhalkalaki', 'Ninotsminda'] },
                    { code: 'shida-kartli', name: 'Shida Kartli', cities: ['Gori', 'Kaspi', 'Kareli', 'Khashuri'] },
                    { code: 'mtskheta-mtianeti', name: 'Mtskheta-Mtianeti', cities: ['Mtskheta', 'Stepantsminda', 'Dusheti', 'Tianeti'] },
                    { code: 'racha-lechkhumi', name: 'Racha-Lechkhumi and Kvemo Svaneti', cities: ['Ambrolauri', 'Tsageri', 'Oni', 'Lentekhi'] }
                ]
            },
            GR: {
                name: 'Greece',
                apiName: 'Greece',
                dialCodes: ['+30'],
                states: [
                    { code: 'attica', name: 'Attica', cities: ['Athens', 'Piraeus', 'Peristeri', 'Kallithea'] },
                    { code: 'central-macedonia', name: 'Central Macedonia', cities: ['Thessaloniki', 'Katerini', 'Serres', 'Veroia'] },
                    { code: 'crete', name: 'Crete', cities: ['Heraklion', 'Chania', 'Rethymno', 'Agios Nikolaos'] },
                    { code: 'thessaly', name: 'Thessaly', cities: ['Larissa', 'Volos', 'Trikala', 'Karditsa'] },
                    { code: 'western-greece', name: 'Western Greece', cities: ['Patras', 'Agrinio', 'Pyrgos', 'Mesolongi'] }
                ]
            },
            VA: {
                name: 'Holy See (Vatican City)',
                apiName: 'Holy See (Vatican City State)',
                dialCodes: ['+379', '+39'],
                states: [
                    { code: 'vatican-city', name: 'Vatican City', cities: ['Vatican City'] }
                ]
            },
            HU: {
                name: 'Hungary',
                apiName: 'Hungary',
                dialCodes: ['+36'],
                states: [
                    { code: 'central-hungary', name: 'Central Hungary', cities: ['Budapest', 'Érd', 'Vác', 'Szentendre'] },
                    { code: 'transdanubia', name: 'Transdanubia', cities: ['Győr', 'Székesfehérvár', 'Pécs', 'Veszprém'] },
                    { code: 'great-plain', name: 'Great Plain and North', cities: ['Debrecen', 'Szeged', 'Nyíregyháza', 'Miskolc'] },
                    { code: 'southern-transdanubia', name: 'Southern Transdanubia', cities: ['Kaposvár', 'Szekszárd', 'Siófok', 'Nagykanizsa'] }
                ]
            },
            IS: {
                name: 'Iceland',
                apiName: 'Iceland',
                dialCodes: ['+354'],
                states: [
                    { code: 'capital-region', name: 'Capital Region', cities: ['Reykjavík', 'Kópavogur', 'Hafnarfjörður', 'Garðabær'] },
                    { code: 'southern-peninsula', name: 'Southern Peninsula', cities: ['Keflavík', 'Sandgerði', 'Grindavík', 'Vogar'] },
                    { code: 'northwestern-region', name: 'Northwestern Region', cities: ['Ísafjörður', 'Sauðárkrókur', 'Borgarnes', 'Hólmavík'] },
                    { code: 'northeastern-region', name: 'Northeastern Region', cities: ['Akureyri', 'Húsavík', 'Egilsstaðir', 'Dalvík'] }
                ]
            },
            IE: {
                name: 'Ireland',
                apiName: 'Ireland',
                dialCodes: ['+353'],
                states: [
                    { code: 'leinster', name: 'Leinster', cities: ['Dublin', 'Drogheda', 'Tallaght', 'Kilkenny'] },
                    { code: 'munster', name: 'Munster', cities: ['Cork', 'Limerick', 'Waterford', 'Tralee'] },
                    { code: 'connacht', name: 'Connacht', cities: ['Galway', 'Sligo', 'Castlebar', 'Ballina'] },
                    { code: 'ulster', name: 'Ulster (ROI)', cities: ['Dundalk', 'Monaghan', 'Cavan', 'Letterkenny'] }
                ]
            },
            IT: {
                name: 'Italy',
                apiName: 'Italy',
                dialCodes: ['+39'],
                states: [
                    { code: 'lombardy', name: 'Lombardy', cities: ['Milan', 'Brescia', 'Monza', 'Bergamo'] },
                    { code: 'lazio', name: 'Lazio', cities: ['Rome', 'Fiumicino', 'Latina', 'Viterbo'] },
                    { code: 'campania', name: 'Campania', cities: ['Naples', 'Salerno', 'Caserta', 'Benevento'] },
                    { code: 'veneto', name: 'Veneto', cities: ['Venice', 'Verona', 'Padua', 'Treviso'] },
                    { code: 'emilia-romagna', name: 'Emilia-Romagna', cities: ['Bologna', 'Modena', 'Parma', 'Ravenna'] },
                    { code: 'piedmont', name: 'Piedmont', cities: ['Turin', 'Novara', 'Alessandria', 'Asti'] },
                    { code: 'sicily', name: 'Sicily', cities: ['Palermo', 'Catania', 'Messina', 'Syracuse'] }
                ]
            },
            LV: {
                name: 'Latvia',
                apiName: 'Latvia',
                dialCodes: ['+371'],
                states: [
                    { code: 'riga', name: 'Riga Planning Region', cities: ['Riga', 'Jūrmala', 'Sigulda', 'Ogre'] },
                    { code: 'latgale', name: 'Latgale', cities: ['Daugavpils', 'Rēzekne', 'Ludza', 'Krāslava'] },
                    { code: 'kurzeme', name: 'Kurzeme', cities: ['Liepāja', 'Ventspils', 'Tukums', 'Kuldīga'] },
                    { code: 'vidzeme', name: 'Vidzeme', cities: ['Valmiera', 'Cēsis', 'Madona', 'Smiltene'] }
                ]
            },
            LI: {
                name: 'Liechtenstein',
                apiName: 'Liechtenstein',
                dialCodes: ['+423'],
                states: [
                    { code: 'balzers', name: 'Balzers', cities: ['Balzers'] },
                    { code: 'eschen', name: 'Eschen', cities: ['Eschen'] },
                    { code: 'gamprin', name: 'Gamprin', cities: ['Gamprin', 'Bendern'] },
                    { code: 'mauren', name: 'Mauren', cities: ['Mauren', 'Schaanwald'] },
                    { code: 'planken', name: 'Planken', cities: ['Planken'] },
                    { code: 'ruggell', name: 'Ruggell', cities: ['Ruggell'] },
                    { code: 'schaan', name: 'Schaan', cities: ['Schaan'] },
                    { code: 'schellenberg', name: 'Schellenberg', cities: ['Schellenberg'] },
                    { code: 'triesen', name: 'Triesen', cities: ['Triesen'] },
                    { code: 'triesenberg', name: 'Triesenberg', cities: ['Triesenberg', 'Masescha', 'Malbun'] },
                    { code: 'vaduz', name: 'Vaduz', cities: ['Vaduz'] }
                ]
            },
            LT: {
                name: 'Lithuania',
                apiName: 'Lithuania',
                dialCodes: ['+370'],
                states: [
                    { code: 'vilnius', name: 'Vilnius County', cities: ['Vilnius', 'Trakai', 'Ukmergė', 'Šalčininkai'] },
                    { code: 'kaunas', name: 'Kaunas County', cities: ['Kaunas', 'Kėdainiai', 'Jonava', 'Prienai'] },
                    { code: 'klaipeda', name: 'Klaipėda County', cities: ['Klaipėda', 'Palanga', 'Kretinga', 'Šilutė'] },
                    { code: 'siauliai', name: 'Šiauliai County', cities: ['Šiauliai', 'Panevėžys', 'Joniškis', 'Radviliškis'] }
                ]
            },
            LU: {
                name: 'Luxembourg',
                apiName: 'Luxembourg',
                dialCodes: ['+352'],
                states: [
                    { code: 'diekirch', name: 'Diekirch District', cities: ['Diekirch', 'Ettelbruck', 'Wiltz'] },
                    { code: 'grevenmacher', name: 'Grevenmacher District', cities: ['Grevenmacher', 'Echternach', 'Remich'] },
                    { code: 'luxembourg', name: 'Luxembourg District', cities: ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange', 'Dudelange'] }
                ]
            },
            MT: {
                name: 'Malta',
                apiName: 'Malta',
                dialCodes: ['+356'],
                states: [
                    { code: 'northern-region', name: 'Northern Region', cities: ['Mellieħa', "St. Paul\'s Bay", 'Mġarr', 'Naxxar'] },
                    { code: 'southern-region', name: 'Southern Region', cities: ['Żejtun', 'Żurrieq', 'Birżebbuġa', 'Fgura'] },
                    { code: 'central-region', name: 'Central Region', cities: ['Birkirkara', 'Qormi', 'Mosta', 'Attard'] },
                    { code: 'south-eastern-region', name: 'South Eastern Region', cities: ['Marsaxlokk', 'Żabbar', 'Għaxaq', 'Kirkop'] },
                    { code: 'western-region', name: 'Western Region', cities: ['Rabat', 'Żebbuġ', 'Siġġiewi', 'Mtarfa'] },
                    { code: 'gozo-region', name: 'Gozo Region', cities: ['Victoria', 'Xewkija', 'Xagħra', 'Żebbuġ (Gozo)'] }
                ]
            },
            MD: {
                name: 'Moldova',
                apiName: 'Moldova',
                dialCodes: ['+373'],
                states: [
                    { code: 'chisinau', name: 'Chișinău Municipality', cities: ['Chișinău', 'Codru', 'Durlești', 'Cricova'] },
                    { code: 'balti', name: 'Bălți Municipality', cities: ['Bălți', 'Fălești', 'Rîșcani', 'Sîngerei'] },
                    { code: 'gagauzia', name: 'Gagauzia', cities: ['Comrat', 'Ceadîr-Lunga', 'Vulcănești', 'Congaz'] },
                    { code: 'cahul', name: 'Cahul District', cities: ['Cahul', 'Cantemir', 'Taraclia', 'Vulcănești'] }
                ]
            },
            MC: {
                name: 'Monaco',
                apiName: 'Monaco',
                dialCodes: ['+377'],
                states: [
                    { code: 'fontvieille', name: 'Fontvieille', cities: ['Fontvieille'] },
                    { code: 'la-condamine', name: 'La Condamine', cities: ['La Condamine'] },
                    { code: 'monaco-ville', name: 'Monaco-Ville', cities: ['Monaco-Ville'] },
                    { code: 'monte-carlo', name: 'Monte Carlo', cities: ['Monte Carlo'] }
                ]
            },
            ME: {
                name: 'Montenegro',
                apiName: 'Montenegro',
                dialCodes: ['+382'],
                states: [
                    { code: 'podgorica', name: 'Podgorica Capital City', cities: ['Podgorica', 'Tuzi', 'Golubovci', 'Danilovgrad'] },
                    { code: 'coastal-region', name: 'Coastal Region', cities: ['Budva', 'Kotor', 'Bar', 'Herceg Novi'] },
                    { code: 'northern-region', name: 'Northern Region', cities: ['Nikšić', 'Bijelo Polje', 'Pljevlja', 'Berane'] }
                ]
            },
            NL: {
                name: 'Netherlands',
                apiName: 'Netherlands',
                dialCodes: ['+31'],
                states: [
                    { code: 'north-holland', name: 'North Holland', cities: ['Amsterdam', 'Haarlem', 'Alkmaar', 'Hilversum'] },
                    { code: 'south-holland', name: 'South Holland', cities: ['Rotterdam', 'The Hague', 'Leiden', 'Dordrecht'] },
                    { code: 'utrecht', name: 'Utrecht', cities: ['Utrecht', 'Amersfoort', 'Nieuwegein', 'Zeist'] },
                    { code: 'north-brabant', name: 'North Brabant', cities: ['Eindhoven', 'Tilburg', 'Breda', '\'s-Hertogenbosch'] },
                    { code: 'gelderland', name: 'Gelderland', cities: ['Nijmegen', 'Apeldoorn', 'Arnhem', 'Ede'] }
                ]
            },
            MK: {
                name: 'North Macedonia',
                apiName: 'Macedonia',
                dialCodes: ['+389'],
                states: [
                    { code: 'skopje', name: 'Skopje Region', cities: ['Skopje', 'Tetovo', 'Kumanovo', 'Gostivar'] },
                    { code: 'eastern', name: 'Eastern Region', cities: ['Štip', 'Strumica', 'Kočani', 'Delčevo'] },
                    { code: 'pelagonia', name: 'Pelagonia', cities: ['Bitola', 'Prilep', 'Kruševo', 'Resen'] },
                    { code: 'southwestern', name: 'Southwestern Region', cities: ['Ohrid', 'Struga', 'Kičevo', 'Debar'] }
                ]
            },
            NO: {
                name: 'Norway',
                apiName: 'Norway',
                dialCodes: ['+47'],
                states: [
                    { code: 'oslo-viken', name: 'Oslo og Viken', cities: ['Oslo', 'Drammen', 'Bærum', 'Fredrikstad'] },
                    { code: 'vestland', name: 'Vestland', cities: ['Bergen', 'Stavanger', 'Haugesund', 'Florø'] },
                    { code: 'trondelag', name: 'Trøndelag', cities: ['Trondheim', 'Steinkjer', 'Stjørdal', 'Namsos'] },
                    { code: 'northern-norway', name: 'Northern Norway', cities: ['Tromsø', 'Bodø', 'Narvik', 'Alta'] }
                ]
            },
            PL: {
                name: 'Poland',
                apiName: 'Poland',
                dialCodes: ['+48'],
                states: [
                    { code: 'masovian', name: 'Masovian Voivodeship', cities: ['Warsaw', 'Radom', 'Płock', 'Siedlce'] },
                    { code: 'lesser-poland', name: 'Lesser Poland Voivodeship', cities: ['Kraków', 'Tarnów', 'Nowy Sącz', 'Oświęcim'] },
                    { code: 'silesian', name: 'Silesian Voivodeship', cities: ['Katowice', 'Gliwice', 'Częstochowa', 'Bielsko-Biała'] },
                    { code: 'greater-poland', name: 'Greater Poland Voivodeship', cities: ['Poznań', 'Kalisz', 'Piła', 'Gniezno'] },
                    { code: 'pomeranian', name: 'Pomeranian Voivodeship', cities: ['Gdańsk', 'Gdynia', 'Sopot', 'Tczew'] }
                ]
            },
            PT: {
                name: 'Portugal',
                apiName: 'Portugal',
                dialCodes: ['+351'],
                states: [
                    { code: 'lisbon', name: 'Lisbon District', cities: ['Lisbon', 'Amadora', 'Cascais', 'Sintra'] },
                    { code: 'porto', name: 'Porto District', cities: ['Porto', 'Vila Nova de Gaia', 'Matosinhos', 'Maia'] },
                    { code: 'faro', name: 'Faro District', cities: ['Faro', 'Albufeira', 'Lagos', 'Portimão'] },
                    { code: 'setubal', name: 'Setúbal District', cities: ['Setúbal', 'Barreiro', 'Almada', 'Montijo'] },
                    { code: 'madeira', name: 'Madeira Autonomous Region', cities: ['Funchal', 'Machico', 'Santa Cruz', 'Câmara de Lobos'] }
                ]
            },
            RO: {
                name: 'Romania',
                apiName: 'Romania',
                dialCodes: ['+40'],
                states: [
                    { code: 'bucharest-ilfov', name: 'Bucharest-Ilfov', cities: ['Bucharest', 'Voluntari', 'Otopeni', 'Chitila'] },
                    { code: 'transylvania', name: 'Transylvania', cities: ['Cluj-Napoca', 'Brașov', 'Sibiu', 'Târgu Mureș'] },
                    { code: 'moldavia', name: 'Moldavia Region', cities: ['Iași', 'Bacău', 'Suceava', 'Botoșani'] },
                    { code: 'wallachia', name: 'Wallachia', cities: ['Ploiești', 'Craiova', 'Târgoviște', 'Buzău'] }
                ]
            },
            RU: {
                name: 'Russia',
                apiName: 'Russia',
                dialCodes: ['+7'],
                states: [
                    { code: 'central', name: 'Central Federal District', cities: ['Moscow', 'Tula', 'Ryazan', 'Kaluga'] },
                    { code: 'northwestern', name: 'Northwestern Federal District', cities: ['Saint Petersburg', 'Kaliningrad', 'Pskov', 'Murmansk'] },
                    { code: 'southern', name: 'Southern Federal District', cities: ['Rostov-on-Don', 'Krasnodar', 'Volgograd', 'Sochi'] },
                    { code: 'siberian', name: 'Siberian Federal District', cities: ['Novosibirsk', 'Krasnoyarsk', 'Irkutsk', 'Omsk'] },
                    { code: 'ural', name: 'Ural Federal District', cities: ['Yekaterinburg', 'Chelyabinsk', 'Tyumen', 'Perm'] },
                    { code: 'far-eastern', name: 'Far Eastern Federal District', cities: ['Vladivostok', 'Khabarovsk', 'Yakutsk', 'Magadan'] }
                ]
            },
            SM: {
                name: 'San Marino',
                apiName: 'San Marino',
                dialCodes: ['+378'],
                states: [
                    { code: 'acquaviva', name: 'Acquaviva', cities: ['Acquaviva'] },
                    { code: 'borgo-maggiore', name: 'Borgo Maggiore', cities: ['Borgo Maggiore'] },
                    { code: 'chiesanuova', name: 'Chiesanuova', cities: ['Chiesanuova'] },
                    { code: 'domagnano', name: 'Domagnano', cities: ['Domagnano'] },
                    { code: 'faetano', name: 'Faetano', cities: ['Faetano'] },
                    { code: 'fiorentino', name: 'Fiorentino', cities: ['Fiorentino'] },
                    { code: 'montegiardino', name: 'Montegiardino', cities: ['Montegiardino'] },
                    { code: 'san-marino', name: 'San Marino', cities: ['City of San Marino'] },
                    { code: 'serravalle', name: 'Serravalle', cities: ['Serravalle'] }
                ]
            },
            RS: {
                name: 'Serbia',
                apiName: 'Serbia',
                dialCodes: ['+381'],
                states: [
                    { code: 'belgrade', name: 'Belgrade District', cities: ['Belgrade', 'Zemun', 'Novi Beograd', 'Zvezdara'] },
                    { code: 'vojvodina', name: 'Vojvodina', cities: ['Novi Sad', 'Subotica', 'Zrenjanin', 'Sombor'] },
                    { code: 'sumadija-west', name: 'Šumadija and Western Serbia', cities: ['Kragujevac', 'Čačak', 'Užice', 'Kraljevo'] },
                    { code: 'southern-serbia', name: 'Southern and Eastern Serbia', cities: ['Niš', 'Leskovac', 'Vranje', 'Zaječar'] }
                ]
            },
            XK: {
                name: 'Kosovo',
                apiName: 'Kosovo',
                dialCodes: ['+383'],
                states: [
                    { code: 'pristina', name: 'Pristina District', cities: ['Pristina', 'Podujevo', 'Obiliq', 'Fushë Kosovë'] },
                    { code: 'prizren', name: 'Prizren District', cities: ['Prizren', 'Dragash', 'Suhareka', 'Mamusha'] },
                    { code: 'peja', name: 'Peja District', cities: ['Peja', 'Istog', 'Klina', 'Deçan'] },
                    { code: 'gjakova', name: 'Gjakova District', cities: ['Gjakova', 'Rahovec', 'Malisheva', 'Junik'] },
                    { code: 'gjilan', name: 'Gjilan District', cities: ['Gjilan', 'Viti', 'Kamenica', 'Partesh'] },
                    { code: 'ferizaj', name: 'Ferizaj District', cities: ['Ferizaj', 'Shtime', 'Kaçanik', 'Hani i Elezit'] },
                    { code: 'mitrovica', name: 'Mitrovica District', cities: ['Mitrovica', 'Vushtrri', 'Skenderaj', 'Zubin Potok'] }
                ]
            },
            TR: {
                name: 'Türkiye',
                apiName: 'Turkey',
                dialCodes: ['+90'],
                states: [
                    { code: 'istanbul', name: 'Istanbul Province', cities: ['Istanbul', 'Kadıköy', 'Üsküdar', 'Bakırköy'] },
                    { code: 'ankara', name: 'Ankara Province', cities: ['Ankara', 'Çankaya', 'Keçiören', 'Etimesgut'] },
                    { code: 'izmir', name: 'Izmir Province', cities: ['Izmir', 'Karşıyaka', 'Bornova', 'Konak'] },
                    { code: 'antalya', name: 'Antalya Province', cities: ['Antalya', 'Alanya', 'Manavgat', 'Kemer'] },
                    { code: 'bursa', name: 'Bursa Province', cities: ['Bursa', 'Osmangazi', 'Nilüfer', 'İnegöl'] },
                    { code: 'adana', name: 'Adana Province', cities: ['Adana', 'Seyhan', 'Ceyhan', 'Yüreğir'] },
                    { code: 'gaziantep', name: 'Gaziantep Province', cities: ['Gaziantep', 'Şahinbey', 'Nizip', 'İslahiye'] },
                    { code: 'konya', name: 'Konya Province', cities: ['Konya', 'Selçuklu', 'Karatay', 'Ereğli'] },
                    { code: 'kayseri', name: 'Kayseri Province', cities: ['Kayseri', 'Melikgazi', 'Kocasinan', 'Develi'] },
                    { code: 'diyarbakir', name: 'Diyarbakır Province', cities: ['Diyarbakır', 'Bağlar', 'Kayapınar', 'Bismil'] },
                    { code: 'mersin', name: 'Mersin Province', cities: ['Mersin', 'Tarsus', 'Silifke', 'Erdemli'] },
                    { code: 'samsun', name: 'Samsun Province', cities: ['Samsun', 'Bafra', 'Çarşamba', 'Terme'] },
                    { code: 'trabzon', name: 'Trabzon Province', cities: ['Trabzon', 'Ortahisar', 'Akçaabat', 'Of'] },
                    { code: 'eskisehir', name: 'Eskişehir Province', cities: ['Eskişehir', 'Odunpazarı', 'Tepebaşı', 'Sivrihisar'] }
                ]
            },
            SK: {
                name: 'Slovakia',
                apiName: 'Slovakia',
                dialCodes: ['+421'],
                states: [
                    { code: 'bratislava', name: 'Bratislava Region', cities: ['Bratislava', 'Pezinok', 'Malacky', 'Senec'] },
                    { code: 'kosice', name: 'Košice Region', cities: ['Košice', 'Michalovce', 'Spišská Nová Ves', 'Rožňava'] },
                    { code: 'zilina', name: 'Žilina Region', cities: ['Žilina', 'Martin', 'Liptovský Mikuláš', 'Ružomberok'] },
                    { code: 'presov', name: 'Prešov Region', cities: ['Prešov', 'Poprad', 'Humenné', 'Bardejov'] },
                    { code: 'trnava', name: 'Trnava Region', cities: ['Trnava', 'Piešťany', 'Hlohovec', 'Galanta'] }
                ]
            },
            SI: {
                name: 'Slovenia',
                apiName: 'Slovenia',
                dialCodes: ['+386'],
                states: [
                    { code: 'central-slovenia', name: 'Central Slovenia', cities: ['Ljubljana', 'Domžale', 'Kamnik', 'Vrhnika'] },
                    { code: 'drava', name: 'Drava', cities: ['Maribor', 'Ptuj', 'Slovenska Bistrica', 'Ruše'] },
                    { code: 'coastal-karst', name: 'Coastal-Karst', cities: ['Koper', 'Piran', 'Izola', 'Sežana'] },
                    { code: 'upper-carniola', name: 'Upper Carniola', cities: ['Kranj', 'Škofja Loka', 'Jesenice', 'Radovljica'] }
                ]
            },
            ES: {
                name: 'Spain',
                apiName: 'Spain',
                dialCodes: ['+34'],
                states: [
                    { code: 'madrid', name: 'Community of Madrid', cities: ['Madrid', 'Alcalá de Henares', 'Getafe', 'Leganés'] },
                    { code: 'catalonia', name: 'Catalonia', cities: ['Barcelona', 'Girona', 'Lleida', 'Tarragona'] },
                    { code: 'andalusia', name: 'Andalusia', cities: ['Seville', 'Málaga', 'Córdoba', 'Granada'] },
                    { code: 'valencian-community', name: 'Valencian Community', cities: ['Valencia', 'Alicante', 'Castellón de la Plana', 'Elche'] },
                    { code: 'basque-country', name: 'Basque Country', cities: ['Bilbao', 'San Sebastián', 'Vitoria-Gasteiz', 'Barakaldo'] },
                    { code: 'galicia', name: 'Galicia', cities: ['A Coruña', 'Vigo', 'Santiago de Compostela', 'Ourense'] }
                ]
            },
            SE: {
                name: 'Sweden',
                apiName: 'Sweden',
                dialCodes: ['+46'],
                states: [
                    { code: 'stockholm', name: 'Stockholm County', cities: ['Stockholm', 'Solna', 'Södertälje', 'Nacka'] },
                    { code: 'vastra-gotaland', name: 'Västra Götaland County', cities: ['Gothenburg', 'Borås', 'Trollhättan', 'Skövde'] },
                    { code: 'skane', name: 'Skåne County', cities: ['Malmö', 'Helsingborg', 'Lund', 'Kristianstad'] },
                    { code: 'uppsala', name: 'Uppsala County', cities: ['Uppsala', 'Enköping', 'Östhammar', 'Tierp'] },
                    { code: 'vasterbotten', name: 'Västerbotten County', cities: ['Umeå', 'Skellefteå', 'Lycksele', 'Robertsfors'] }
                ]
            },
            CH: {
                name: 'Switzerland',
                apiName: 'Switzerland',
                dialCodes: ['+41'],
                states: [
                    { code: 'zurich', name: 'Zürich', cities: ['Zürich', 'Winterthur', 'Uster', 'Dübendorf'] },
                    { code: 'bern', name: 'Bern', cities: ['Bern', 'Biel/Bienne', 'Thun', 'Köniz'] },
                    { code: 'geneva', name: 'Geneva', cities: ['Geneva', 'Carouge', 'Lancy', 'Meyrin'] },
                    { code: 'basel-stadt', name: 'Basel-Stadt', cities: ['Basel', 'Riehen', 'Bettingen'] },
                    { code: 'vaud', name: 'Vaud', cities: ['Lausanne', 'Montreux', 'Vevey', 'Nyon'] }
                ]
            },
            UA: {
                name: 'Ukraine',
                apiName: 'Ukraine',
                dialCodes: ['+380'],
                states: [
                    { code: 'kyiv', name: 'Kyiv City', cities: ['Kyiv', 'Brovary', 'Irpin', 'Boryspil'] },
                    { code: 'lviv', name: 'Lviv Oblast', cities: ['Lviv', 'Drohobych', 'Chervonohrad', 'Stryi'] },
                    { code: 'odessa', name: 'Odessa Oblast', cities: ['Odessa', 'Chornomorsk', 'Izmail', 'Bilhorod-Dnistrovskyi'] },
                    { code: 'kharkiv', name: 'Kharkiv Oblast', cities: ['Kharkiv', 'Kupyansk', 'Izium', 'Lozova'] },
                    { code: 'dnipropetrovsk', name: 'Dnipro Oblast', cities: ['Dnipro', 'Kryvyi Rih', 'Kamianske', 'Nikopol'] }
                ]
            },
            GB: {
                name: 'United Kingdom',
                apiName: 'United Kingdom',
                dialCodes: ['+44'],
                states: [
                    { code: 'england', name: 'England', cities: ['London', 'Birmingham', 'Manchester', 'Bristol'] },
                    { code: 'scotland', name: 'Scotland', cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'] },
                    { code: 'wales', name: 'Wales', cities: ['Cardiff', 'Swansea', 'Newport', 'Wrexham'] },
                    { code: 'northern-ireland', name: 'Northern Ireland', cities: ['Belfast', 'Derry', 'Lisburn', 'Newry'] }
                ]
            }
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = LOCATION_DATA;
    }

    global.LOCATION_DATA = LOCATION_DATA;
})(typeof window !== 'undefined' ? window : globalThis);
