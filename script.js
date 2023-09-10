// Define Pokémon and Poké Ball image URLs
const imageBasePath = 'images/';
const pokemonImages = {
    normal: {
        // Update image paths for normal Pokémon
    },
    shiny: {
        // Update image paths for shiny Pokémon
    },
};

const pokeballImages = {
    // Update image paths for Poké Balls
};

// Function to load data from CSV files
async function loadCsvData(filename) {
    const response = await fetch(`data/${filename}`);
    const text = await response.text();
    const data = text.split('\n').map(row => row.split(','));
    const headers = data[0];

    const jsonData = data.slice(1).map(row => {
        const item = {};
        headers.forEach((header, index) => {
            item[header] = row[index].trim();
        });
        return item;
    });

    return jsonData;
}

// Function to populate the datalist options
async function populateDatalists() {
    const pokemonData = await loadCsvData('mon-data.csv');
    const pokeballData = await loadCsvData('ball-data.csv');

    const pokemonDatalist = document.getElementById('pokemon-options');
    const pokeballDatalist = document.getElementById('pokeball-options');

    pokemonData.forEach(item => {
        const option = document.createElement("option");
        option.value = item['Pokémon'];
        pokemonDatalist.appendChild(option);
    });

    pokeballData.forEach(item => {
        const option = document.createElement("option");
        option.value = item['Poké Balls'];
        pokeballDatalist.appendChild(option);
    });
}

// Call the function to populate datalists when the page loads
populateDatalists();

// Function to display selected images
function displayImages() {
    const selectedPokemonDisplay = document.getElementById('pokemon-input').value;
    const selectedPokeballDisplay = document.getElementById('pokeball-input').value;
    const shinyToggle = document.getElementById('shiny-toggle');
    const mode = shinyToggle.checked ? 'shiny' : 'normal';

    const selectedPokemon = selectedPokemonDisplay.toLowerCase().replace(' ', '-');
    const selectedPokeball = selectedPokeballDisplay.toLowerCase().replace(' ', '-');

    const pokemonImage = document.getElementById('pokemon-image');
    const pokeballImage = document.getElementById('pokeball-image');

    if (pokemonImages[mode][selectedPokemon]) {
        pokemonImage.src = imageBasePath + pokemonImages[mode][selectedPokemon];
        pokemonImage.style.display = 'block';
    } else {
        pokemonImage.style.display = 'none';
    }

    if (pokeballImages[selectedPokeball]) {
        pokeballImage.src = imageBasePath + pokeballImages[selectedPokeball];
        pokeballImage.style.display = 'block';
    } else {
        pokeballImage.style.display = 'none';
    }
}

// Event listeners for automatic refresh
document.getElementById('pokemon-input').addEventListener('input', displayImages);
document.getElementById('pokeball-input').addEventListener('input', displayImages);
document.getElementById('shiny-toggle').addEventListener('change', displayImages);

// Initial image display
displayImages();
