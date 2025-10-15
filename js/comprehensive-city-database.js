// Comprehensive City Database with Dynamic Search
const comprehensiveCityDatabase = {
    'brazil': {
        label: 'Brazil',
        states: {
            'acre': { 
                label: 'Acre', 
                cities: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó', 'Brasileia', 'Plácido de Castro', 'Xapuri', 'Epitaciolândia', 'Senador Guiomard', 'Capixaba', 'Acrelândia', 'Bujari', 'Porto Walter', 'Marechal Thaumaturgo']
            },
            'alagoas': { 
                label: 'Alagoas', 
                cities: ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo', 'Penedo', 'União dos Palmares', 'São Miguel dos Campos', 'Santana do Ipanema', 'Coruripe', 'Delmiro Gouveia', 'Marechal Deodoro', 'Pilar', 'Girau do Ponciano', 'Viçosa', 'Campo Alegre']
            },
            'amapa': { 
                label: 'Amapá', 
                cities: ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Mazagão', 'Porto Grande', 'Vitória do Jari', 'Calçoene', 'Amapá', 'Ferreira Gomes', 'Pracuúba', 'Tartarugalzinho', 'Serra do Navio', 'Pedra Branca do Amapari', 'Itaubal', 'Cutias']
            },
            'amazonas': { 
                label: 'Amazonas', 
                cities: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari', 'Tefé', 'Tabatinga', 'Maués', 'São Gabriel da Cachoeira', 'Humaitá', 'Lábrea', 'Barcelos', 'Eirunepé', 'Manicoré', 'Carauari', 'Autazes', 'Iranduba', 'Presidente Figueiredo', 'Rio Preto da Eva', 'Silves']
            },
            'bahia': { 
                label: 'Bahia', 
                cities: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Juazeiro', 'Itabuna', 'Lauro de Freitas', 'Ilhéus', 'Jequié', 'Teixeira de Freitas', 'Alagoinhas', 'Porto Seguro', 'Simões Filho', 'Paulo Afonso', 'Eunápolis', 'Santo Antônio de Jesus', 'Valença', 'Candeias', 'Guanambi', 'Jacobina', 'Serrinha', 'Senhor do Bonfim', 'Dias d\'Ávila', 'Luís Eduardo Magalhães', 'Itapetinga']
            },
            'ceara': { 
                label: 'Ceará', 
                cities: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral', 'Crato', 'Itapipoca', 'Maranguape', 'Iguatu', 'Quixadá', 'Pacatuba', 'Aquiraz', 'Quixeramobim', 'Canindé', 'Russas', 'Crateús', 'Tianguá', 'Aracati', 'Cascavel', 'Pacajus', 'Icó', 'Horizonte', 'Camocim', 'Morada Nova', 'Acaraú']
            },
            'distrito-federal': { 
                label: 'Distrito Federal', 
                cities: ['Brasília', 'Taguatinga', 'Ceilândia', 'Samambaia', 'Planaltina', 'Águas Claras', 'Guará', 'Sobradinho', 'Gama', 'Santa Maria', 'São Sebastião', 'Recanto das Emas', 'Riacho Fundo', 'Núcleo Bandeirante', 'Cruzeiro', 'Lago Sul', 'Lago Norte', 'Sudoeste', 'Octogonal', 'Candangolândia']
            },
            'espirito-santo': { 
                label: 'Espírito Santo', 
                cities: ['Vitória', 'Vila Velha', 'Cariacica', 'Serra', 'Cachoeiro de Itapemirim', 'Linhares', 'São Mateus', 'Colatina', 'Guarapari', 'Aracruz', 'Viana', 'Nova Venécia', 'Barra de São Francisco', 'Santa Teresa', 'Itapemirim', 'Anchieta', 'Alegre', 'Castelo', 'Marataízes', 'Piúma']
            },
            'goias': { 
                label: 'Goiás', 
                cities: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia', 'Águas Lindas de Goiás', 'Valparaíso de Goiás', 'Trindade', 'Formosa', 'Novo Gama', 'Itumbiara', 'Senador Canedo', 'Catalão', 'Jataí', 'Planaltina', 'Caldas Novas', 'Santo Antônio do Descoberto', 'Goianésia', 'Cidade Ocidental', 'Mineiros', 'Cristalina', 'Inhumas', 'Ipatinga', 'Alexânia', 'Ceres']
            },
            'maranhao': { 
                label: 'Maranhão', 
                cities: ['São Luís', 'Imperatriz', 'Timon', 'Caxias', 'Codó', 'Paço do Lumiar', 'Açailândia', 'Bacabal', 'Balsas', 'Barra do Corda', 'Santa Inês', 'Pinheiro', 'Pedreiras', 'São José de Ribamar', 'Chapadinha', 'Presidente Dutra', 'Viana', 'Grajaú', 'Itapecuru Mirim', 'Coroatá', 'Rosário', 'Tutóia', 'São Mateus do Maranhão', 'Lago da Pedra', 'Carolina']
            },
            'mato-grosso': { 
                label: 'Mato Grosso', 
                cities: ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra', 'Cáceres', 'Sorriso', 'Lucas do Rio Verde', 'Barra do Garças', 'Primavera do Leste', 'Alta Floresta', 'Pontes e Lacerda', 'Diamantino', 'Nova Mutum', 'Colíder', 'Guarantã do Norte', 'Peixoto de Azevedo', 'Sapezal', 'Campo Verde', 'Juína', 'Água Boa', 'Canarana', 'Mirassol d\'Oeste', 'Poconé', 'Araputanga']
            },
            'mato-grosso-do-sul': { 
                label: 'Mato Grosso do Sul', 
                cities: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã', 'Naviraí', 'Nova Andradina', 'Sidrolândia', 'Maracaju', 'São Gabriel do Oeste', 'Coxim', 'Aquidauana', 'Paranaíba', 'Amambai', 'Ribas do Rio Pardo', 'Jardim', 'Ivinhema', 'Bonito', 'Anastácio', 'Chapadão do Sul', 'Cassilândia', 'Aparecida do Taboado', 'Bataguassu', 'Miranda', 'Caarapó']
            },
            'minas-gerais': { 
                label: 'Minas Gerais', 
                cities: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga', 'Sete Lagoas', 'Divinópolis', 'Santa Luzia', 'Ibirité', 'Poços de Caldas', 'Patos de Minas', 'Pouso Alegre', 'Teófilo Otoni', 'Barbacena', 'Sabará', 'Varginha', 'Conselheiro Lafaiete', 'Vespasiano', 'Itabira', 'Araguari', 'Passos', 'Ubá', 'Coronel Fabriciano', 'Muriaé', 'Ituiutaba']
            },
            'para': { 
                label: 'Pará', 
                cities: ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Parauapebas', 'Castanhal', 'Abaetetuba', 'Cametá', 'Marituba', 'Bragança', 'Altamira', 'Itaituba', 'Tucuruí', 'Benevides', 'Paragominas', 'Redenção', 'Barcarena', 'Capanema', 'Tailândia', 'Oriximiná', 'Breves', 'Salinópolis', 'Tomé-Açu', 'Vigia', 'Xinguara']
            },
            'paraiba': { 
                label: 'Paraíba', 
                cities: ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux', 'Sousa', 'Cajazeiras', 'Cabedelo', 'Guarabira', 'Mamanguape', 'Sapé', 'Desterro', 'Conde', 'Monteiro', 'Picuí', 'Itabaiana', 'Esperança', 'Pombal', 'Princesa Isabel', 'Areia', 'Bananeiras', 'São Bento', 'Conceição', 'Solânea', 'Alagoa Grande']
            },
            'parana': { 
                label: 'Paraná', 
                cities: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais', 'Foz do Iguaçu', 'Colombo', 'Guarapuava', 'Paranaguá', 'Araucária', 'Toledo', 'Apucarana', 'Pinhais', 'Campo Largo', 'Arapongas', 'Almirante Tamandaré', 'Umuarama', 'Piraquara', 'Cambé', 'Campo Mourão', 'Fazenda Rio Grande', 'Sarandi', 'Fazenda Belém', 'Paranavaí']
            },
            'pernambuco': { 
                label: 'Pernambuco', 
                cities: ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina', 'Paulista', 'Cabo de Santo Agostinho', 'Camaragibe', 'Garanhuns', 'Vitória de Santo Antão', 'Igarassu', 'São Lourenço da Mata', 'Santa Cruz do Capibaribe', 'Abreu e Lima', 'Ipojuca', 'Serra Talhada', 'Araripina', 'Gravatá', 'Carpina', 'Goiana', 'Belo Jardim', 'Arcoverde', 'Ouricuri', 'Escada', 'Pesqueira']
            },
            'piaui': { 
                label: 'Piauí', 
                cities: ['Teresina', 'Parnaíba', 'Picos', 'Piripiri', 'Floriano', 'Campo Maior', 'Barras', 'União', 'Altos', 'Pedro II', 'Valença do Piauí', 'Esperantina', 'São Raimundo Nonato', 'Corrente', 'Oeiras', 'Bom Jesus', 'Simplício Mendes', 'Cocal', 'Luís Correia', 'Amarante', 'Regeneração', 'Luzilândia', 'Água Branca', 'Paulistana', 'José de Freitas']
            },
            'rio-de-janeiro': { 
                label: 'Rio de Janeiro', 
                cities: ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Belford Roxo', 'São João de Meriti', 'Campos dos Goytacazes', 'Petrópolis', 'Volta Redonda', 'Magé', 'Macaé', 'Itaboraí', 'Cabo Frio', 'Angra dos Reis', 'Nova Friburgo', 'Barra Mansa', 'Teresópolis', 'Mesquita', 'Nilópolis', 'Maricá', 'Queimados', 'Resende', 'Araruama', 'Tanguá']
            },
            'rio-grande-do-norte': { 
                label: 'Rio Grande do Norte', 
                cities: ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba', 'Ceará-Mirim', 'Caicó', 'Assu', 'Currais Novos', 'Santa Cruz', 'São José de Mipibu', 'Nova Cruz', 'João Câmara', 'Canguaretama', 'Touros', 'Extremoz', 'Apodi', 'Pau dos Ferros', 'São Paulo do Potengi', 'Areia Branca', 'Açu', 'Baraúna', 'Nísia Floresta', 'Monte Alegre', 'Goianinha']
            },
            'rio-grande-do-sul': { 
                label: 'Rio Grande do Sul', 
                cities: ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria', 'Gravataí', 'Viamão', 'Novo Hamburgo', 'São Leopoldo', 'Rio Grande', 'Alvorada', 'Passo Fundo', 'Sapucaia do Sul', 'Uruguaiana', 'Santa Cruz do Sul', 'Cachoeirinha', 'Bagé', 'Bento Gonçalves', 'Erechim', 'Guaíba', 'Cachoeira do Sul', 'Santana do Livramento', 'Ijuí', 'Sapiranga', 'Santo Ângelo']
            },
            'rondonia': { 
                label: 'Rondônia', 
                cities: ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal', 'Rolim de Moura', 'Jaru', 'Guajará-Mirim', 'Buritis', 'Ouro Preto do Oeste', 'Machadinho d\'Oeste', 'Presidente Médici', 'Espigão d\'Oeste', 'Colorado do Oeste', 'Cerejeiras', 'Pimenta Bueno', 'Alta Floresta d\'Oeste', 'Nova Brasilândia d\'Oeste', 'Chupinguaia', 'Alvorada d\'Oeste', 'São Miguel do Guaporé', 'Costa Marques', 'Theobroma', 'Mirante da Serra', 'Nova Mamoré']
            },
            'roraima': { 
                label: 'Roraima', 
                cities: ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Alto Alegre', 'Mucajaí', 'Cantá', 'Bonfim', 'Normandia', 'São Luiz', 'São João da Baliza', 'Caroebe', 'Iracema', 'Amajari', 'Pacaraima', 'Uiramutã']
            },
            'santa-catarina': { 
                label: 'Santa Catarina', 
                cities: ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma', 'Chapecó', 'Itajaí', 'Lages', 'Jaraguá do Sul', 'Palhoça', 'Balneário Camboriú', 'Brusque', 'Tubarão', 'São Bento do Sul', 'Caçador', 'Camboriú', 'Navegantes', 'Concórdia', 'Rio do Sul', 'Araranguá', 'Gaspar', 'Biguaçu', 'Indaial', 'Itapema', 'Mafra']
            },
            'sao-paulo': { 
                label: 'São Paulo', 
                cities: ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Ribeirão Preto', 'Sorocaba', 'Mauá', 'São José dos Campos', 'Mogi das Cruzes', 'Diadema', 'Jundiaí', 'Carapicuíba', 'Piracicaba', 'Bauru', 'São Vicente', 'Itaquaquecetuba', 'Franca', 'Guarujá', 'Taubaté', 'Praia Grande', 'Limeira', 'Suzano', 'Taboão da Serra', 'Sumaré', 'Barueri', 'Embu das Artes', 'São Carlos', 'Marília']
            },
            'sergipe': { 
                label: 'Sergipe', 
                cities: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'São Cristóvão', 'Estância', 'Tobias Barreto', 'Simão Dias', 'Propriá', 'Barra dos Coqueiros', 'Ribeirópolis', 'Glória', 'Umbaúba', 'Poço Redondo', 'Canindé de São Francisco', 'Aquidabã', 'Carmópolis', 'Maruim', 'Rosário do Catete', 'Capela', 'Arauá', 'Frei Paulo', 'Riachuelo', 'Divina Pastora', 'General Maynard']
            },
            'tocantins': { 
                label: 'Tocantins', 
                cities: ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins', 'Colinas do Tocantins', 'Guaraí', 'Formoso do Araguaia', 'Tocantinópolis', 'Miracema do Tocantins', 'Araguatins', 'Dianópolis', 'Taguatinga', 'Pedro Afonso', 'Xambioá', 'Augustinópolis', 'Arraias', 'Wanderlândia', 'Babaçulândia', 'Ananás', 'Alvorada', 'Filadélfia', 'Axixá do Tocantins', 'Goiatins', 'Natividade']
            }
        }
    },
    'united-states': {
        label: 'United States',
        states: {
            'california': { 
                label: 'California', 
                cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose', 'Fresno', 'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim', 'Santa Ana', 'Riverside', 'Stockton', 'Irvine', 'Chula Vista', 'Fremont', 'San Bernardino', 'Modesto', 'Fontana', 'Oxnard', 'Moreno Valley', 'Huntington Beach', 'Glendale', 'Santa Clarita', 'Garden Grove']
            },
            'new-york': { 
                label: 'New York', 
                cities: ['New York City', 'Buffalo', 'Rochester', 'Syracuse', 'Albany', 'New Rochelle', 'Mount Vernon', 'Schenectady', 'Utica', 'White Plains', 'Hempstead', 'Troy', 'Niagara Falls', 'Binghamton', 'Freeport', 'Valley Stream', 'Long Beach', 'Rome', 'Yonkers', 'Ithaca', 'Watertown', 'Plattsburgh', 'Jamestown', 'Elmira', 'Cortland']
            },
            'texas': { 
                label: 'Texas', 
                cities: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Laredo', 'Lubbock', 'Garland', 'Irving', 'Amarillo', 'Grand Prairie', 'Brownsville', 'McKinney', 'Frisco', 'Pasadena', 'Killeen', 'Mesquite', 'McAllen', 'Waco', 'Carrollton', 'Denton']
            },
            'florida': { 
                label: 'Florida', 
                cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'St. Petersburg', 'Hialeah', 'Tallahassee', 'Fort Lauderdale', 'Port St. Lucie', 'Cape Coral', 'Pembroke Pines', 'Hollywood', 'Miramar', 'Gainesville', 'Coral Springs', 'Miami Gardens', 'Clearwater', 'Palm Bay', 'West Palm Beach', 'Pompano Beach', 'Lakeland', 'Davie', 'Miami Beach', 'Sunrise', 'Plantation']
            },
            'illinois': { 
                label: 'Illinois', 
                cities: ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville', 'Springfield', 'Peoria', 'Elgin', 'Waukegan', 'Cicero', 'Champaign', 'Bloomington', 'Arlington Heights', 'Evanston', 'Decatur', 'Schaumburg', 'Bolingbrook', 'Palatine', 'Skokie', 'Des Plaines', 'Orland Park', 'Tinley Park', 'Oak Lawn', 'Berwyn', 'Mount Prospect']
            },
            'pennsylvania': { 
                label: 'Pennsylvania', 
                cities: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Scranton', 'Bethlehem', 'Lancaster', 'Harrisburg', 'Altoona', 'York', 'State College', 'Wilkes-Barre', 'Chester', 'Williamsport', 'Easton', 'Lebanon', 'Hazleton', 'New Castle', 'Johnstown', 'Washington', 'West Chester', 'Norristown', 'Pottstown', 'McKeesport']
            },
            'ohio': { 
                label: 'Ohio', 
                cities: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton', 'Parma', 'Canton', 'Youngstown', 'Lorain', 'Hamilton', 'Springfield', 'Kettering', 'Elyria', 'Lakewood', 'Cuyahoga Falls', 'Middletown', 'Newark', 'Euclid', 'Mansfield', 'Mentor', 'Beavercreek', 'Strongsville', 'Fairfield', 'Dublin']
            },
            'georgia': { 
                label: 'Georgia', 
                cities: ['Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah', 'Athens', 'Sandy Springs', 'Roswell', 'Johns Creek', 'Albany', 'Warner Robins', 'Alpharetta', 'Marietta', 'Valdosta', 'Smyrna', 'Dunwoody', 'Rome', 'East Point', 'Gainesville', 'Hinesville', 'Peachtree Corners', 'Kennesaw', 'Newnan', 'Douglasville', 'Stockbridge']
            },
            'north-carolina': { 
                label: 'North Carolina', 
                cities: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville', 'Cary', 'Wilmington', 'High Point', 'Greenville', 'Asheville', 'Concord', 'Gastonia', 'Jacksonville', 'Chapel Hill', 'Rocky Mount', 'Burlington', 'Wilson', 'Huntersville', 'Kannapolis', 'Apex', 'Hickory', 'Goldsboro', 'Monroe', 'Salisbury']
            },
            'michigan': { 
                label: 'Michigan', 
                cities: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Lansing', 'Ann Arbor', 'Flint', 'Dearborn', 'Livonia', 'Westland', 'Troy', 'Farmington Hills', 'Kalamazoo', 'Wyoming', 'Southfield', 'Rochester Hills', 'Taylor', 'Pontiac', 'St. Clair Shores', 'Royal Oak', 'Novi', 'Dearborn Heights', 'Battle Creek', 'Saginaw', 'Kentwood']
            }
        }
    },
    'canada': {
        label: 'Canada',
        states: {
            'ontario': { 
                label: 'Ontario', 
                cities: ['Toronto', 'Ottawa', 'Hamilton', 'London', 'Kitchener', 'Windsor', 'Oshawa', 'Barrie', 'Guelph', 'Kingston', 'Cambridge', 'Waterloo', 'Brantford', 'Sudbury', 'Peterborough', 'Sarnia', 'Thunder Bay', 'Belleville', 'Sault Ste. Marie', 'Welland', 'North Bay', 'Cornwall', 'Chatham', 'Georgetown', 'St. Catharines']
            },
            'quebec': { 
                label: 'Quebec', 
                cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil', 'Sherbrooke', 'Saguenay', 'Lévis', 'Trois-Rivières', 'Terrebonne', 'Saint-Jean-sur-Richelieu', 'Repentigny', 'Brossard', 'Drummondville', 'Saint-Jérôme', 'Granby', 'Blainville', 'Shawinigan', 'Dollard-des-Ormeaux', 'Rimouski', 'Victoriaville', 'Joliette', 'Sorel-Tracy', 'Vaudreuil-Dorion', 'Val-d\'Or']
            },
            'british-columbia': { 
                label: 'British Columbia', 
                cities: ['Vancouver', 'Victoria', 'Surrey', 'Burnaby', 'Richmond', 'Abbotsford', 'Coquitlam', 'Kelowna', 'Saanich', 'Delta', 'Kamloops', 'Langley', 'Nanaimo', 'North Vancouver', 'Prince George', 'New Westminster', 'West Vancouver', 'Port Coquitlam', 'Chilliwack', 'Maple Ridge', 'White Rock', 'Penticton', 'Vernon', 'Courtenay', 'Campbell River']
            },
            'alberta': { 
                label: 'Alberta', 
                cities: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'St. Albert', 'Medicine Hat', 'Grande Prairie', 'Airdrie', 'Spruce Grove', 'Leduc', 'Lloydminster', 'Camrose', 'Fort McMurray', 'Brooks', 'Cold Lake', 'Wetaskiwin', 'Lacombe', 'Stony Plain', 'Cochrane', 'Okotoks', 'High River', 'Hinton', 'Whitecourt', 'Sylvan Lake', 'Canmore']
            },
            'manitoba': { 
                label: 'Manitoba', 
                cities: ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson', 'Portage la Prairie', 'Winkler', 'Selkirk', 'Morden', 'Dauphin', 'The Pas', 'Flin Flon', 'Swan River', 'Neepawa', 'Gimli', 'Stonewall', 'Carman', 'Virden', 'Minnedosa', 'Killarney', 'Boissevain', 'Souris', 'Russell', 'Roblin', 'Melita', 'Deloraine']
            },
            'saskatchewan': { 
                label: 'Saskatchewan', 
                cities: ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Swift Current', 'Yorkton', 'North Battleford', 'Estevan', 'Weyburn', 'Lloydminster', 'Martensville', 'Warman', 'Meadow Lake', 'Melfort', 'Humboldt', 'Kindersley', 'Tisdale', 'Melville', 'Rosetown', 'Unity', 'Outlook', 'Watrous', 'Canora', 'Nipawin', 'Carlyle']
            }
        }
    },
    'argentina': {
        label: 'Argentina',
        states: {
            'buenos-aires': { 
                label: 'Buenos Aires', 
                cities: ['Buenos Aires', 'La Plata', 'Mar del Plata', 'Bahía Blanca', 'San Nicolás', 'Tandil', 'Zárate', 'Pergamino', 'Luján', 'Mercedes', 'Junín', 'Azul', 'Olavarría', 'Necochea', 'Campana', 'San Pedro', 'Chivilcoy', 'Tres Arroyos', 'Balcarce', 'Dolores', 'Chascomús', 'Lobos', 'Saladillo', 'Bragado', 'General Pico']
            },
            'cordoba': { 
                label: 'Córdoba', 
                cities: ['Córdoba', 'Villa María', 'Río Cuarto', 'San Francisco', 'Villa Carlos Paz', 'Alta Gracia', 'Jesús María', 'Marcos Juárez', 'Bell Ville', 'Cruz del Eje', 'La Falda', 'Cosquín', 'Villa Dolores', 'Laboulaye', 'Morteros', 'Río Tercero', 'Unquillo', 'Villa Allende', 'Deán Funes', 'Arroyito', 'Río Segundo', 'Capilla del Monte', 'Mina Clavero', 'Huinca Renancó', 'Leones']
            },
            'santa-fe': { 
                label: 'Santa Fe', 
                cities: ['Rosario', 'Santa Fe', 'Rafaela', 'Reconquista', 'Venado Tuerto', 'Esperanza', 'Santo Tomé', 'Casilda', 'Gálvez', 'Villa Gobernador Gálvez', 'Firmat', 'Cañada de Gómez', 'San Lorenzo', 'Villa Constitución', 'Funes', 'Capitán Bermúdez', 'Pérez', 'Roldán', 'Arroyo Seco', 'San Cristóbal', 'Sunchales', 'Las Parejas', 'Totoras', 'Coronda', 'Sauce Viejo']
            },
            'mendoza': { 
                label: 'Mendoza', 
                cities: ['Mendoza', 'San Rafael', 'Godoy Cruz', 'Guaymallén', 'Las Heras', 'Maipú', 'Luján de Cuyo', 'Rivadavia', 'San Martín', 'Tunuyán', 'Malargüe', 'General Alvear', 'Tupungato', 'La Paz', 'Santa Rosa', 'Lavalle', 'Junín', 'San Carlos', 'Uspallata', 'Villa Nueva', 'Palmira', 'Russell', 'Cacheuta', 'Potrerillos', 'Chacras de Coria']
            },
            'tucuman': { 
                label: 'Tucumán', 
                cities: ['San Miguel de Tucumán', 'Banda del Río Salí', 'Concepción', 'Tafí Viejo', 'Yerba Buena', 'Aguilares', 'Monteros', 'Famaillá', 'Alderetes', 'Bella Vista', 'Juan Bautista Alberdi', 'Trancas', 'Lules', 'Simoca', 'Burruyacú', 'Tafí del Valle', 'Graneros', 'La Banda', 'Ranchillos', 'Villa Mariano Moreno', 'El Manantial', 'Lastenia', 'Los Nogales', 'San Andrés', 'Villa Quinteros']
            },
            'salta': { 
                label: 'Salta', 
                cities: ['Salta', 'San Ramón de la Nueva Orán', 'Tartagal', 'General Güemes', 'Metán', 'Cafayate', 'Rosario de Lerma', 'Embarcación', 'Joaquín V. González', 'El Carmen', 'Cerrillos', 'La Caldera', 'Pichanal', 'Aguaray', 'Campo Quijano', 'Rosario de la Frontera', 'Hipólito Yrigoyen', 'Salvador Mazza', 'Vaqueros', 'Chicoana', 'General Ballivián', 'Colonia Santa Rosa', 'Profesor Salvador Mazza', 'Apolinario Saravia', 'General Mosconi']
            },
            'entre-rios': { 
                label: 'Entre Ríos', 
                cities: ['Paraná', 'Concordia', 'Gualeguaychú', 'Concepción del Uruguay', 'Chajarí', 'Victoria', 'Villaguay', 'Crespo', 'Colón', 'Federación', 'San José', 'Nogoyá', 'Gualeguay', 'Diamante', 'La Paz', 'Basavilbaso', 'Bovril', 'Hernandarias', 'Villa Elisa', 'Seguí', 'Oro Verde', 'San Salvador', 'Hasenkamp', 'Viale', 'General Ramírez']
            },
            'misiones': { 
                label: 'Misiones', 
                cities: ['Posadas', 'Oberá', 'Eldorado', 'Puerto Iguazú', 'Apóstoles', 'Leandro N. Alem', 'Montecarlo', 'Garupá', 'Jardín América', 'Puerto Rico', 'San Vicente', 'Aristóbulo del Valle', 'Candelaria', 'Wanda', 'Dos de Mayo', 'Campo Grande', 'Capioví', 'Puerto Esperanza', 'Cerro Azul', 'Bernardo de Irigoyen', 'San Pedro', 'Libertad', 'Santo Pipó', 'Corpus', 'Colonia Wanda']
            }
        }
    },
    'paraguay': {
        label: 'Paraguay',
        states: {
            'central': { 
                label: 'Central', 
                cities: ['Asunción', 'Luque', 'San Lorenzo', 'Capiatá', 'Lambaré', 'Fernando de la Mora', 'Nemby', 'Mariano Roque Alonso', 'Villa Elisa', 'San Antonio', 'Ñemby', 'Itauguá', 'Areguá', 'Ypacaraí', 'Guarambaré', 'Villeta', 'Nueva Italia', 'Itá', 'J. Augusto Saldívar', 'Limpio', 'Ypané', 'San Bernardino', 'Altos', 'Tobatí', 'Atyrá']
            },
            'alto-parana': { 
                label: 'Alto Paraná', 
                cities: ['Ciudad del Este', 'Hernandarias', 'Presidente Franco', 'Minga Guazú', 'Santa Rita', 'Juan León Mallorquín', 'Itakyry', 'Naranjal', 'Tavapy', 'Santa Rosa del Monday', 'Domingo Martínez de Irala', 'San Alberto', 'Yguazú', 'Los Cedrales', 'Mbaracayú', 'Ñacunday', 'Iruña', 'Santa Fe del Paraná', 'Dr. Raúl Peña', 'Minga Porá']
            },
            'itapua': { 
                label: 'Itapúa', 
                cities: ['Encarnación', 'Hohenau', 'Obligado', 'Bella Vista', 'María Auxiliadora', 'Jesús', 'Trinidad', 'Tomás Romero Pereira', 'General Delgado', 'Fram', 'Nueva Alborada', 'San Pedro del Paraná', 'La Paz', 'Yatytay', 'Coronel Bogado', 'Carlos Antonio López', 'Natalio', 'Carmen del Paraná', 'Cambyretá', 'Capitán Meza', 'Pirapó', 'San Cosme y Damián', 'Itapúa Poty', 'Mayor Otaño', 'General Artigas']
            },
            'caaguazu': { 
                label: 'Caaguazú', 
                cities: ['Coronel Oviedo', 'Caaguazú', 'Cnel. Eugenio A. Garay', 'Carayaó', 'Santa Rosa del Mbutuy', 'Yhú', 'San Joaquín', 'Mcal. Francisco Solano López', 'Repatriación', 'Nueva Londres', 'Tembiaporã', 'Vaquería', 'R.I. 3 Corrales', 'José Domingo Ocampos', 'Raúl Arsenio Oviedo', 'Simón Bolívar', 'La Pastora', 'Juan Manuel Frutos', 'Cecilio Báez', 'Nueva Toledo', 'Tembiapora', 'Dr. J. Eulogio Estigarribia', 'Campo 9', 'Mariscal López', 'Santa Rosa del Mbutuy']
            },
            'san-pedro': { 
                label: 'San Pedro', 
                cities: ['San Pedro de Ycuamandiyú', 'Santa Rosa del Aguaray', 'Choré', 'General Elizardo Aquino', 'Lima', 'Itacurubí del Rosario', 'Nueva Germanía', 'San Pablo', 'Tacuatí', 'Unión', 'Capiibary', 'San Vicente Pancholo', 'Antequera', 'Liberación', 'Yrybucuá', 'Guayaibí', 'Capiibary', 'Villa del Rosario', 'Yataity del Norte', 'San Isidro de Curuguaty', 'Corpus Christi', 'Arroyito', 'Yby Pytã', 'Yby Yaú', 'Jejuí']
            }
        }
    }
};

// Dynamic city search functionality
function createDynamicCitySearch() {
    return {
        searchCities: function(countryCode, stateCode, searchTerm = '') {
            if (!countryCode || !stateCode) return [];
            
            const country = comprehensiveCityDatabase[countryCode];
            if (!country || !country.states[stateCode]) return [];
            
            const cities = country.states[stateCode].cities;
            
            if (!searchTerm) return cities.slice(0, 10); // Return first 10 cities if no search term
            
            // Filter cities based on search term
            const filtered = cities.filter(city => 
                city.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            return filtered.slice(0, 20); // Return up to 20 matching cities
        },
        
        getAllCities: function(countryCode, stateCode) {
            if (!countryCode || !stateCode) return [];
            
            const country = comprehensiveCityDatabase[countryCode];
            if (!country || !country.states[stateCode]) return [];
            
            return country.states[stateCode].cities;
        }
    };
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.comprehensiveCityDatabase = comprehensiveCityDatabase;
    window.createDynamicCitySearch = createDynamicCitySearch;
}
