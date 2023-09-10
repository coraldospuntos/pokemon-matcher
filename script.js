// Define Pokémon and Poké Ball image URLs
const imageBasePath = 'images/';
const pokemonImages = {
    normal: {
        bulbasaur: 'mon/bulbasaur.png',
        // Add more normal Pokémon images here
    },
    shiny: {
        bulbasaur: 'mon-shiny/bulbasaur.png',
        // Add more shiny Pokémon images here
    },
};

const pokeballImages = {
    poke: 'ball/poke.png',
    // Add more Poké Ball images here
};

// Function to load data from CSV files
async function loadCsvData(filename) {
    const response = await fetch(`data/${filename}`);
    const data = await response.text();
    return data.split('\n').map(line => {
        const [display, value] = line.split(',');
        return { display, value };
    });
}

// Function to populate the datalist options
async function populateDatalists() {
    const pokemonData = await loadCsvData('mon-data.csv');
    const pokeballData = await loadCsvData('ball-data.csv');
    
    const pokemonDatalist = document.getElementById('pokemon-options');
    const pokeballDatalist = document.getElementById('pokeball-options');

    pokemonData.forEach(item => {
        const option = document.createElement("option");
        option.value = item.display;
        pokemonDatalist.appendChild(option);
    });

    pokeballData.forEach(item => {
        const option = document.createElement("option");
        option.value = item.display;
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
