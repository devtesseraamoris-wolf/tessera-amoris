// Strategic Location Database for Tessera-Amoris Target Markets
const strategicLocationData = {
    // Primary Markets - Americas
    "brazil": {
        name: "Brazil",
        states: {
            "acre": { name: "Acre", cities: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Other"] },
            "alagoas": { name: "Alagoas", cities: ["Maceió", "Arapiraca", "Palmeira dos Índios", "Other"] },
            "amapa": { name: "Amapá", cities: ["Macapá", "Santana", "Laranjal do Jari", "Other"] },
            "amazonas": { name: "Amazonas", cities: ["Manaus", "Parintins", "Itacoatiara", "Other"] },
            "bahia": { name: "Bahia", cities: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Juazeiro", "Other"] },
            "ceara": { name: "Ceará", cities: ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Other"] },
            "distrito-federal": { name: "Distrito Federal", cities: ["Brasília", "Taguatinga", "Ceilândia", "Other"] },
            "espirito-santo": { name: "Espírito Santo", cities: ["Vitória", "Vila Velha", "Cariacica", "Serra", "Other"] },
            "goias": { name: "Goiás", cities: ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Other"] },
            "maranhao": { name: "Maranhão", cities: ["São Luís", "Imperatriz", "Timon", "Other"] },
            "mato-grosso": { name: "Mato Grosso", cities: ["Cuiabá", "Várzea Grande", "Rondonópolis", "Other"] },
            "mato-grosso-do-sul": { name: "Mato Grosso do Sul", cities: ["Campo Grande", "Dourados", "Três Lagoas", "Other"] },
            "minas-gerais": { name: "Minas Gerais", cities: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Other"] },
            "para": { name: "Pará", cities: ["Belém", "Ananindeua", "Santarém", "Marabá", "Other"] },
            "paraiba": { name: "Paraíba", cities: ["João Pessoa", "Campina Grande", "Santa Rita", "Other"] },
            "parana": { name: "Paraná", cities: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Other"] },
            "pernambuco": { name: "Pernambuco", cities: ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Other"] },
            "piaui": { name: "Piauí", cities: ["Teresina", "Parnaíba", "Picos", "Other"] },
            "rio-de-janeiro": { name: "Rio de Janeiro", cities: ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói", "Belford Roxo", "Other"] },
            "rio-grande-do-norte": { name: "Rio Grande do Norte", cities: ["Natal", "Mossoró", "Parnamirim", "Other"] },
            "rio-grande-do-sul": { name: "Rio Grande do Sul", cities: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Other"] },
            "rondonia": { name: "Rondônia", cities: ["Porto Velho", "Ji-Paraná", "Ariquemes", "Other"] },
            "roraima": { name: "Roraima", cities: ["Boa Vista", "Rorainópolis", "Caracaraí", "Other"] },
            "santa-catarina": { name: "Santa Catarina", cities: ["Florianópolis", "Joinville", "Blumenau", "São José", "Other"] },
            "sao-paulo": { name: "São Paulo", cities: ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André", "Osasco", "Other"] },
            "sergipe": { name: "Sergipe", cities: ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Other"] },
            "tocantins": { name: "Tocantins", cities: ["Palmas", "Araguaína", "Gurupi", "Other"] }
        }
    },
    
    "united-states": {
        name: "United States",
        states: {
            "california": { name: "California", cities: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose", "Other"] },
            "new-york": { name: "New York", cities: ["New York City", "Buffalo", "Rochester", "Syracuse", "Albany", "Other"] },
            "texas": { name: "Texas", cities: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "Other"] },
            "florida": { name: "Florida", cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale", "Other"] },
            "illinois": { name: "Illinois", cities: ["Chicago", "Aurora", "Rockford", "Joliet", "Other"] },
            "pennsylvania": { name: "Pennsylvania", cities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Other"] },
            "ohio": { name: "Ohio", cities: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Other"] },
            "georgia": { name: "Georgia", cities: ["Atlanta", "Augusta", "Columbus", "Savannah", "Other"] },
            "north-carolina": { name: "North Carolina", cities: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Other"] },
            "michigan": { name: "Michigan", cities: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Other"] }
        }
    },
    
    "argentina": {
        name: "Argentina",
        states: {
            "buenos-aires": { name: "Buenos Aires", cities: ["Buenos Aires", "La Plata", "Mar del Plata", "Bahía Blanca", "Other"] },
            "cordoba": { name: "Córdoba", cities: ["Córdoba", "Villa María", "Río Cuarto", "Other"] },
            "santa-fe": { name: "Santa Fe", cities: ["Rosario", "Santa Fe", "Rafaela", "Other"] },
            "mendoza": { name: "Mendoza", cities: ["Mendoza", "San Rafael", "Godoy Cruz", "Other"] },
            "tucuman": { name: "Tucumán", cities: ["San Miguel de Tucumán", "Yerba Buena", "Other"] },
            "entre-rios": { name: "Entre Ríos", cities: ["Paraná", "Concordia", "Gualeguaychú", "Other"] },
            "salta": { name: "Salta", cities: ["Salta", "San Ramón de la Nueva Orán", "Other"] },
            "misiones": { name: "Misiones", cities: ["Posadas", "Puerto Iguazú", "Oberá", "Other"] }
        }
    },
    
    "paraguay": {
        name: "Paraguay",
        states: {
            "central": { name: "Central", cities: ["Asunción", "Lambaré", "San Lorenzo", "Capiatá", "Other"] },
            "alto-parana": { name: "Alto Paraná", cities: ["Ciudad del Este", "Hernandarias", "Minga Guazú", "Other"] },
            "itapua": { name: "Itapúa", cities: ["Encarnación", "Capitán Miranda", "Other"] },
            "caaguazu": { name: "Caaguazú", cities: ["Coronel Oviedo", "Caaguazú", "Other"] },
            "caazapa": { name: "Caazapá", cities: ["Caazapá", "San Juan Nepomuceno", "Other"] }
        }
    },
    
    // European Markets
    "germany": {
        name: "Germany",
        states: {
            "bavaria": { name: "Bavaria", cities: ["Munich", "Nuremberg", "Augsburg", "Regensburg", "Other"] },
            "north-rhine-westphalia": { name: "North Rhine-Westphalia", cities: ["Cologne", "Düsseldorf", "Dortmund", "Essen", "Other"] },
            "baden-wurttemberg": { name: "Baden-Württemberg", cities: ["Stuttgart", "Mannheim", "Karlsruhe", "Other"] },
            "berlin": { name: "Berlin", cities: ["Berlin", "Other"] },
            "hamburg": { name: "Hamburg", cities: ["Hamburg", "Other"] }
        }
    },
    
    "france": {
        name: "France",
        states: {
            "ile-de-france": { name: "Île-de-France", cities: ["Paris", "Boulogne-Billancourt", "Saint-Denis", "Other"] },
            "provence-alpes-cote-dazur": { name: "Provence-Alpes-Côte d'Azur", cities: ["Marseille", "Nice", "Toulon", "Other"] },
            "auvergne-rhone-alpes": { name: "Auvergne-Rhône-Alpes", cities: ["Lyon", "Grenoble", "Saint-Étienne", "Other"] },
            "occitanie": { name: "Occitanie", cities: ["Toulouse", "Montpellier", "Nîmes", "Other"] },
            "nouvelle-aquitaine": { name: "Nouvelle-Aquitaine", cities: ["Bordeaux", "Limoges", "Poitiers", "Other"] }
        }
    },
    
    "italy": {
        name: "Italy",
        states: {
            "lazio": { name: "Lazio", cities: ["Rome", "Latina", "Other"] },
            "lombardy": { name: "Lombardy", cities: ["Milan", "Bergamo", "Brescia", "Other"] },
            "campania": { name: "Campania", cities: ["Naples", "Salerno", "Other"] },
            "sicily": { name: "Sicily", cities: ["Palermo", "Catania", "Messina", "Other"] },
            "veneto": { name: "Veneto", cities: ["Venice", "Verona", "Padua", "Other"] }
        }
    },
    
    "spain": {
        name: "Spain",
        states: {
            "madrid": { name: "Madrid", cities: ["Madrid", "Móstoles", "Alcalá de Henares", "Other"] },
            "catalonia": { name: "Catalonia", cities: ["Barcelona", "Hospitalet de Llobregat", "Badalona", "Other"] },
            "andalusia": { name: "Andalusia", cities: ["Seville", "Málaga", "Córdoba", "Granada", "Other"] },
            "valencia": { name: "Valencia", cities: ["Valencia", "Alicante", "Elche", "Other"] },
            "basque-country": { name: "Basque Country", cities: ["Bilbao", "Vitoria-Gasteiz", "San Sebastián", "Other"] }
        }
    },
    
    "united-kingdom": {
        name: "United Kingdom",
        states: {
            "england": { name: "England", cities: ["London", "Birmingham", "Manchester", "Liverpool", "Leeds", "Other"] },
            "scotland": { name: "Scotland", cities: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Other"] },
            "wales": { name: "Wales", cities: ["Cardiff", "Swansea", "Newport", "Other"] },
            "northern-ireland": { name: "Northern Ireland", cities: ["Belfast", "Derry", "Other"] }
        }
    },
    
    // Eastern Europe & Russia
    "russia": {
        name: "Russia",
        states: {
            "moscow": { name: "Moscow", cities: ["Moscow", "Other"] },
            "saint-petersburg": { name: "Saint Petersburg", cities: ["Saint Petersburg", "Other"] },
            "novosibirsk": { name: "Novosibirsk Oblast", cities: ["Novosibirsk", "Other"] },
            "yekaterinburg": { name: "Sverdlovsk Oblast", cities: ["Yekaterinburg", "Other"] },
            "nizhny-novgorod": { name: "Nizhny Novgorod Oblast", cities: ["Nizhny Novgorod", "Other"] }
        }
    },
    
    "poland": {
        name: "Poland",
        states: {
            "masovian": { name: "Masovian Voivodeship", cities: ["Warsaw", "Radom", "Other"] },
            "lesser-poland": { name: "Lesser Poland Voivodeship", cities: ["Kraków", "Tarnów", "Other"] },
            "silesian": { name: "Silesian Voivodeship", cities: ["Katowice", "Częstochowa", "Other"] },
            "greater-poland": { name: "Greater Poland Voivodeship", cities: ["Poznań", "Other"] }
        }
    },
    
    // Additional Strategic Markets
    "canada": {
        name: "Canada",
        states: {
            "ontario": { name: "Ontario", cities: ["Toronto", "Ottawa", "Hamilton", "London", "Other"] },
            "quebec": { name: "Quebec", cities: ["Montreal", "Quebec City", "Laval", "Other"] },
            "british-columbia": { name: "British Columbia", cities: ["Vancouver", "Victoria", "Surrey", "Other"] },
            "alberta": { name: "Alberta", cities: ["Calgary", "Edmonton", "Other"] }
        }
    },
    
    "mexico": {
        name: "Mexico",
        states: {
            "mexico-city": { name: "Mexico City", cities: ["Mexico City", "Other"] },
            "jalisco": { name: "Jalisco", cities: ["Guadalajara", "Zapopan", "Other"] },
            "nuevo-leon": { name: "Nuevo León", cities: ["Monterrey", "San Nicolás de los Garza", "Other"] },
            "puebla": { name: "Puebla", cities: ["Puebla", "Other"] }
        }
    },
    
    "chile": {
        name: "Chile",
        states: {
            "santiago": { name: "Santiago Metropolitan", cities: ["Santiago", "Puente Alto", "Maipú", "Other"] },
            "valparaiso": { name: "Valparaíso", cities: ["Valparaíso", "Viña del Mar", "Other"] },
            "biobio": { name: "Biobío", cities: ["Concepción", "Talcahuano", "Other"] }
        }
    },
    
    "colombia": {
        name: "Colombia",
        states: {
            "bogota": { name: "Bogotá", cities: ["Bogotá", "Other"] },
            "antioquia": { name: "Antioquia", cities: ["Medellín", "Bello", "Other"] },
            "valle-del-cauca": { name: "Valle del Cauca", cities: ["Cali", "Palmira", "Other"] },
            "atlantico": { name: "Atlántico", cities: ["Barranquilla", "Soledad", "Other"] }
        }
    },
    
    "uruguay": {
        name: "Uruguay",
        states: {
            "montevideo": { name: "Montevideo", cities: ["Montevideo", "Other"] },
            "canelones": { name: "Canelones", cities: ["Las Piedras", "Pando", "Other"] },
            "maldonado": { name: "Maldonado", cities: ["Maldonado", "Punta del Este", "Other"] }
        }
    }
};

// Initialize location selectors with strategic data
function initializeStrategicLocationSelectors() {
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    
    if (!countrySelect || !stateSelect || !citySelect) return;
    
    // Populate countries
    countrySelect.innerHTML = '<option value="">Select your country</option>';
    Object.keys(strategicLocationData).forEach(countryKey => {
        const country = strategicLocationData[countryKey];
        const option = document.createElement('option');
        option.value = countryKey;
        option.textContent = country.name;
        countrySelect.appendChild(option);
    });
    
    // Handle country selection
    countrySelect.addEventListener('change', function() {
        const selectedCountry = this.value;
        stateSelect.innerHTML = '<option value="">Select your state/province</option>';
        citySelect.innerHTML = '<option value="">Select your city</option>';
        
        if (selectedCountry && strategicLocationData[selectedCountry]) {
            stateSelect.disabled = false;
            const states = strategicLocationData[selectedCountry].states;
            
            Object.keys(states).forEach(stateKey => {
                const state = states[stateKey];
                const option = document.createElement('option');
                option.value = stateKey;
                option.textContent = state.name;
                stateSelect.appendChild(option);
            });
        } else {
            stateSelect.disabled = true;
            citySelect.disabled = true;
        }
    });
    
    // Handle state selection
    stateSelect.addEventListener('change', function() {
        const selectedCountry = countrySelect.value;
        const selectedState = this.value;
        citySelect.innerHTML = '<option value="">Select your city</option>';
        
        if (selectedCountry && selectedState && strategicLocationData[selectedCountry] && strategicLocationData[selectedCountry].states[selectedState]) {
            citySelect.disabled = false;
            const cities = strategicLocationData[selectedCountry].states[selectedState].cities;
            
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city.toLowerCase().replace(/\s+/g, '-');
                option.textContent = city;
                citySelect.appendChild(option);
            });
        } else {
            citySelect.disabled = true;
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeStrategicLocationSelectors);
