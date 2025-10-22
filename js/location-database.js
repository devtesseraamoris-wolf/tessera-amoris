// Comprehensive Location Database with Country-State-City Hierarchy

const LocationDatabase = {
    countries: {
        'brazil': {
            name: 'Brazil',
            states: {
                'acre': {
                    name: 'Acre',
                    cities: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó']
                },
                'alagoas': {
                    name: 'Alagoas',
                    cities: ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo', 'Penedo']
                },
                'amapa': {
                    name: 'Amapá',
                    cities: ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Mazagão']
                },
                'amazonas': {
                    name: 'Amazonas',
                    cities: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari']
                },
                'bahia': {
                    name: 'Bahia',
                    cities: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna', 'Juazeiro', 'Lauro de Freitas', 'Ilhéus', 'Jequié', 'Teixeira de Freitas']
                },
                'ceara': {
                    name: 'Ceará',
                    cities: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral', 'Crato', 'Itapipoca', 'Maranguape', 'Iguatu', 'Quixadá']
                },
                'distrito_federal': {
                    name: 'Distrito Federal',
                    cities: ['Brasília', 'Taguatinga', 'Ceilândia', 'Samambaia', 'Santa Maria', 'São Sebastião', 'Recanto das Emas', 'Planaltina', 'Paranoá', 'Núcleo Bandeirante']
                },
                'espirito_santo': {
                    name: 'Espírito Santo',
                    cities: ['Vitória', 'Vila Velha', 'Cariacica', 'Serra', 'Cachoeiro de Itapemirim', 'Linhares', 'São Mateus', 'Colatina', 'Guarapari', 'Aracruz']
                },
                'goias': {
                    name: 'Goiás',
                    cities: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia', 'Águas Lindas de Goiás', 'Valparaíso de Goiás', 'Trindade', 'Formosa', 'Novo Gama']
                },
                'maranhao': {
                    name: 'Maranhão',
                    cities: ['São Luís', 'Imperatriz', 'São José de Ribamar', 'Timon', 'Caxias', 'Codó', 'Paço do Lumiar', 'Açailândia', 'Bacabal', 'Balsas']
                },
                'mato_grosso': {
                    name: 'Mato Grosso',
                    cities: ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra', 'Cáceres', 'Sorriso', 'Lucas do Rio Verde', 'Barra do Garças', 'Primavera do Leste']
                },
                'mato_grosso_do_sul': {
                    name: 'Mato Grosso do Sul',
                    cities: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã', 'Naviraí', 'Nova Andradina', 'Sidrolândia', 'Maracaju', 'São Gabriel do Oeste']
                },
                'minas_gerais': {
                    name: 'Minas Gerais',
                    cities: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga', 'Sete Lagoas', 'Divinópolis', 'Santa Luzia', 'Ibirité', 'Poços de Caldas', 'Patos de Minas', 'Pouso Alegre', 'Teófilo Otoni', 'Barbacena', 'Sabará']
                },
                'para': {
                    name: 'Pará',
                    cities: ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Parauapebas', 'Castanhal', 'Abaetetuba', 'Cametá', 'Bragança', 'Marituba']
                },
                'paraiba': {
                    name: 'Paraíba',
                    cities: ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux', 'Sousa', 'Cajazeiras', 'Cabedelo', 'Guarabira', 'Mamanguape']
                },
                'parana': {
                    name: 'Paraná',
                    cities: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais', 'Foz do Iguaçu', 'Colombo', 'Guarapuava', 'Paranaguá', 'Araucária', 'Toledo', 'Apucarana', 'Pinhais', 'Campo Largo', 'Arapongas', 'Almirante Tamandaré', 'Umuarama', 'Piraquara', 'Cambé']
                },
                'pernambuco': {
                    name: 'Pernambuco',
                    cities: ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina', 'Paulista', 'Cabo de Santo Agostinho', 'Camaragibe', 'Garanhuns', 'Vitória de Santo Antão']
                },
                'piaui': {
                    name: 'Piauí',
                    cities: ['Teresina', 'Parnaíba', 'Picos', 'Piripiri', 'Floriano', 'Campo Maior', 'Barras', 'União', 'Altos', 'Pedro II']
                },
                'rio_de_janeiro': {
                    name: 'Rio de Janeiro',
                    cities: ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Belford Roxo', 'São João de Meriti', 'Campos dos Goytacazes', 'Petrópolis', 'Volta Redonda', 'Magé', 'Macaé', 'Itaboraí', 'Cabo Frio', 'Angra dos Reis', 'Nova Friburgo', 'Barra Mansa', 'Teresópolis', 'Mesquita', 'Nilópolis']
                },
                'rio_grande_do_norte': {
                    name: 'Rio Grande do Norte',
                    cities: ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba', 'Ceará-Mirim', 'Caicó', 'Assu', 'Currais Novos', 'Santa Cruz']
                },
                'rio_grande_do_sul': {
                    name: 'Rio Grande do Sul',
                    cities: ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria', 'Gravataí', 'Viamão', 'Novo Hamburgo', 'São Leopoldo', 'Rio Grande', 'Alvorada', 'Passo Fundo', 'Sapucaia do Sul', 'Uruguaiana', 'Santa Cruz do Sul', 'Cachoeirinha', 'Bagé', 'Bento Gonçalves', 'Erechim', 'Guaíba']
                },
                'rondonia': {
                    name: 'Rondônia',
                    cities: ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal', 'Rolim de Moura', 'Guajará-Mirim', 'Jaru', 'Ouro Preto do Oeste', 'Buritis']
                },
                'roraima': {
                    name: 'Roraima',
                    cities: ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Alto Alegre', 'Mucajaí', 'São João da Baliza', 'São Luiz', 'Bonfim', 'Cantá', 'Normandia']
                },
                'santa_catarina': {
                    name: 'Santa Catarina',
                    cities: ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma', 'Chapecó', 'Itajaí', 'Lages', 'Jaraguá do Sul', 'Palhoça', 'Balneário Camboriú', 'Brusque', 'Tubarão', 'São Bento do Sul', 'Caçador', 'Camboriú', 'Navegantes', 'Concórdia', 'Rio do Sul', 'Araranguá']
                },
                'sao_paulo': {
                    name: 'São Paulo',
                    cities: ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Ribeirão Preto', 'Sorocaba', 'Mauá', 'São José dos Campos', 'Mogi das Cruzes', 'Diadema', 'Jundiaí', 'Carapicuíba', 'Piracicaba', 'Bauru', 'Itaquaquecetuba', 'Franca', 'São Vicente', 'Praia Grande', 'Peruíbe', 'Itapevi', 'Suzano', 'Taboão da Serra', 'Sumaré', 'Barueri', 'Embu das Artes', 'São Carlos', 'Marília', 'Indaiatuba']
                },
                'sergipe': {
                    name: 'Sergipe',
                    cities: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'São Cristóvão', 'Estância', 'Tobias Barreto', 'Simão Dias', 'Propriá', 'Canindé de São Francisco']
                },
                'tocantins': {
                    name: 'Tocantins',
                    cities: ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins', 'Colinas do Tocantins', 'Guaraí', 'Formoso do Araguaia', 'Dianópolis', 'Taguatinga']
                }
            }
        },
        'united_states': {
            name: 'United States',
            states: {
                'alabama': {
                    name: 'Alabama',
                    cities: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa', 'Hoover', 'Dothan', 'Auburn', 'Decatur', 'Madison']
                },
                'alaska': {
                    name: 'Alaska',
                    cities: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Ketchikan', 'Wasilla', 'Kenai', 'Kodiak', 'Bethel', 'Palmer']
                },
                'arizona': {
                    name: 'Arizona',
                    cities: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Glendale', 'Gilbert', 'Tempe', 'Peoria', 'Surprise']
                },
                'arkansas': {
                    name: 'Arkansas',
                    cities: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro', 'North Little Rock', 'Conway', 'Rogers', 'Pine Bluff', 'Bentonville']
                },
                'california': {
                    name: 'California',
                    cities: ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim', 'Santa Ana', 'Riverside', 'Stockton', 'Irvine', 'Chula Vista', 'Fremont', 'San Bernardino', 'Modesto', 'Fontana', 'Oxnard']
                },
                'colorado': {
                    name: 'Colorado',
                    cities: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood', 'Thornton', 'Arvada', 'Westminster', 'Pueblo', 'Centennial']
                },
                'connecticut': {
                    name: 'Connecticut',
                    cities: ['Bridgeport', 'New Haven', 'Hartford', 'Stamford', 'Waterbury', 'Norwalk', 'Danbury', 'New Britain', 'West Hartford', 'Greenwich']
                },
                'delaware': {
                    name: 'Delaware',
                    cities: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna', 'Milford', 'Seaford', 'Georgetown', 'Elsmere', 'New Castle']
                },
                'florida': {
                    name: 'Florida',
                    cities: ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg', 'Hialeah', 'Tallahassee', 'Fort Lauderdale', 'Port St. Lucie', 'Cape Coral', 'Pembroke Pines', 'Hollywood', 'Miramar', 'Gainesville', 'Coral Springs', 'Miami Gardens', 'Clearwater', 'Palm Bay', 'West Palm Beach', 'Pompano Beach']
                },
                'georgia': {
                    name: 'Georgia',
                    cities: ['Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah', 'Athens', 'Sandy Springs', 'Roswell', 'Johns Creek', 'Albany']
                },
                'new_york': {
                    name: 'New York',
                    cities: ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany', 'New Rochelle', 'Mount Vernon', 'Schenectady', 'Utica', 'White Plains', 'Hempstead', 'Troy', 'Niagara Falls', 'Binghamton']
                },
                'texas': {
                    name: 'Texas',
                    cities: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Laredo', 'Lubbock', 'Garland', 'Irving', 'Amarillo', 'Grand Prairie', 'Brownsville', 'McKinney', 'Frisco', 'Pasadena', 'Mesquite']
                }
            }
        },
        'canada': {
            name: 'Canada',
            states: {
                'alberta': {
                    name: 'Alberta',
                    cities: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'St. Albert', 'Medicine Hat', 'Grande Prairie', 'Airdrie', 'Spruce Grove', 'Leduc']
                },
                'british_columbia': {
                    name: 'British Columbia',
                    cities: ['Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Abbotsford', 'Coquitlam', 'Victoria', 'Saanich', 'Delta', 'Kelowna']
                },
                'manitoba': {
                    name: 'Manitoba',
                    cities: ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson', 'Portage la Prairie', 'Winkler', 'Selkirk', 'Morden', 'Dauphin', 'The Pas']
                },
                'ontario': {
                    name: 'Ontario',
                    cities: ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton', 'London', 'Markham', 'Vaughan', 'Kitchener', 'Windsor', 'Richmond Hill', 'Oakville', 'Burlington', 'Oshawa', 'Barrie', 'St. Catharines', 'Cambridge', 'Kingston', 'Whitby', 'Guelph']
                },
                'quebec': {
                    name: 'Quebec',
                    cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil', 'Sherbrooke', 'Saguenay', 'Lévis', 'Trois-Rivières', 'Terrebonne']
                }
            }
        },
        'argentina': {
            name: 'Argentina',
            states: {
                'buenos_aires': {
                    name: 'Buenos Aires',
                    cities: ['Buenos Aires', 'La Plata', 'Mar del Plata', 'Bahía Blanca', 'Tandil', 'Olavarría', 'Pergamino', 'Azul', 'Necochea', 'San Nicolás']
                },
                'cordoba': {
                    name: 'Córdoba',
                    cities: ['Córdoba', 'Río Cuarto', 'Villa María', 'San Francisco', 'Villa Carlos Paz', 'Alta Gracia', 'Marcos Juárez', 'Cruz del Eje', 'Jesús María', 'Bell Ville']
                },
                'santa_fe': {
                    name: 'Santa Fe',
                    cities: ['Rosario', 'Santa Fe', 'Rafaela', 'Reconquista', 'Venado Tuerto', 'Esperanza', 'Santo Tomé', 'Casilda', 'Gálvez', 'Cañada de Gómez']
                },
                'mendoza': {
                    name: 'Mendoza',
                    cities: ['Mendoza', 'San Rafael', 'Godoy Cruz', 'Guaymallén', 'Maipú', 'Las Heras', 'Luján de Cuyo', 'Rivadavia', 'San Martín', 'Tunuyán']
                }
            }
        },
        'paraguay': {
            name: 'Paraguay',
            states: {
                'central': {
                    name: 'Central',
                    cities: ['Asunción', 'San Lorenzo', 'Luque', 'Capiatá', 'Lambaré', 'Fernando de la Mora', 'Nemby', 'Mariano Roque Alonso', 'Villa Elisa', 'San Antonio']
                },
                'alto_parana': {
                    name: 'Alto Paraná',
                    cities: ['Ciudad del Este', 'Hernandarias', 'Presidente Franco', 'Minga Guazú', 'Santa Rita', 'Juan León Mallorquín', 'Itakyry', 'Naranjal', 'Santa Rosa del Monday', 'Domingo Martínez de Irala']
                },
                'itapua': {
                    name: 'Itapúa',
                    cities: ['Encarnación', 'Hohenau', 'Obligado', 'Bella Vista', 'María Auxiliadora', 'San Pedro del Paraná', 'Jesús', 'Trinidad', 'Tomás Romero Pereira', 'General Delgado']
                }
            }
        },
        'germany': {
            name: 'Germany',
            states: {
                'bavaria': {
                    name: 'Bavaria',
                    cities: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg', 'Ingolstadt', 'Würzburg', 'Fürth', 'Erlangen', 'Bayreuth', 'Bamberg']
                },
                'north_rhine_westphalia': {
                    name: 'North Rhine-Westphalia',
                    cities: ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen', 'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster']
                },
                'baden_wurttemberg': {
                    name: 'Baden-Württemberg',
                    cities: ['Stuttgart', 'Mannheim', 'Karlsruhe', 'Freiburg', 'Heidelberg', 'Ulm', 'Heilbronn', 'Pforzheim', 'Reutlingen', 'Esslingen']
                }
            }
        },
        'france': {
            name: 'France',
            states: {
                'ile_de_france': {
                    name: 'Île-de-France',
                    cities: ['Paris', 'Boulogne-Billancourt', 'Saint-Denis', 'Argenteuil', 'Montreuil', 'Créteil', 'Nanterre', 'Colombes', 'Aulnay-sous-Bois', 'Rueil-Malmaison']
                },
                'provence_alpes_cote_dazur': {
                    name: 'Provence-Alpes-Côte d\'Azur',
                    cities: ['Marseille', 'Nice', 'Toulon', 'Aix-en-Provence', 'Avignon', 'Antibes', 'Cannes', 'La Seyne-sur-Mer', 'Hyères', 'Arles']
                },
                'auvergne_rhone_alpes': {
                    name: 'Auvergne-Rhône-Alpes',
                    cities: ['Lyon', 'Saint-Étienne', 'Grenoble', 'Villeurbanne', 'Clermont-Ferrand', 'Valence', 'Chambéry', 'Annecy', 'Bourg-en-Bresse', 'Roanne']
                }
            }
        },
        'italy': {
            name: 'Italy',
            states: {
                'lombardy': {
                    name: 'Lombardy',
                    cities: ['Milan', 'Brescia', 'Monza', 'Bergamo', 'Como', 'Varese', 'Cremona', 'Mantua', 'Pavia', 'Lecco']
                },
                'lazio': {
                    name: 'Lazio',
                    cities: ['Rome', 'Latina', 'Guidonia Montecelio', 'Fiumicino', 'Aprilia', 'Tivoli', 'Anzio', 'Pomezia', 'Nettuno', 'Albano Laziale']
                },
                'campania': {
                    name: 'Campania',
                    cities: ['Naples', 'Salerno', 'Giugliano in Campania', 'Torre del Greco', 'Pozzuoli', 'Casoria', 'Castellammare di Stabia', 'Afragola', 'Cava de\' Tirreni', 'Battipaglia']
                }
            }
        },
        'spain': {
            name: 'Spain',
            states: {
                'madrid': {
                    name: 'Madrid',
                    cities: ['Madrid', 'Móstoles', 'Alcalá de Henares', 'Fuenlabrada', 'Leganés', 'Getafe', 'Alcorcón', 'Torrejón de Ardoz', 'Parla', 'Alcobendas']
                },
                'catalonia': {
                    name: 'Catalonia',
                    cities: ['Barcelona', 'Hospitalet de Llobregat', 'Badalona', 'Terrassa', 'Sabadell', 'Lleida', 'Tarragona', 'Mataró', 'Santa Coloma de Gramenet', 'Reus']
                },
                'andalusia': {
                    name: 'Andalusia',
                    cities: ['Seville', 'Málaga', 'Córdoba', 'Granada', 'Jerez de la Frontera', 'Almería', 'Huelva', 'Marbella', 'Dos Hermanas', 'Algeciras']
                }
            }
        },
        'united_kingdom': {
            name: 'United Kingdom',
            states: {
                'england': {
                    name: 'England',
                    cities: ['London', 'Birmingham', 'Manchester', 'Leeds', 'Liverpool', 'Sheffield', 'Bristol', 'Newcastle', 'Nottingham', 'Leicester', 'Coventry', 'Bradford', 'Stoke-on-Trent', 'Wolverhampton', 'Plymouth']
                },
                'scotland': {
                    name: 'Scotland',
                    cities: ['Glasgow', 'Edinburgh', 'Aberdeen', 'Dundee', 'Paisley', 'East Kilbride', 'Livingston', 'Hamilton', 'Cumbernauld', 'Kirkcaldy']
                },
                'wales': {
                    name: 'Wales',
                    cities: ['Cardiff', 'Swansea', 'Newport', 'Wrexham', 'Barry', 'Caerphilly', 'Bridgend', 'Neath', 'Port Talbot', 'Cwmbran']
                },
                'northern_ireland': {
                    name: 'Northern Ireland',
                    cities: ['Belfast', 'Derry', 'Lisburn', 'Newtownabbey', 'Bangor', 'Craigavon', 'Castlereagh', 'Ballymena', 'Newtownards', 'Carrickfergus']
                }
            }
        }
    },

    // Helper methods
    getCountries() {
        return Object.keys(this.countries).map(key => ({
            value: key,
            label: this.countries[key].name
        }));
    },

    getStates(countryKey) {
        if (!this.countries[countryKey]) return [];
        return Object.keys(this.countries[countryKey].states).map(key => ({
            value: key,
            label: this.countries[countryKey].states[key].name
        }));
    },

    getCities(countryKey, stateKey) {
        if (!this.countries[countryKey] || !this.countries[countryKey].states[stateKey]) return [];
        return this.countries[countryKey].states[stateKey].cities.map(city => ({
            value: city.toLowerCase().replace(/\s+/g, '_'),
            label: city
        }));
    },

    getCountryName(countryKey) {
        return this.countries[countryKey] ? this.countries[countryKey].name : '';
    },

    getStateName(countryKey, stateKey) {
        if (!this.countries[countryKey] || !this.countries[countryKey].states[stateKey]) return '';
        return this.countries[countryKey].states[stateKey].name;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocationDatabase;
}
