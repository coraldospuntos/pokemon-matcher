// Define Pokémon and Poké Ball image URLs
const imageBasePath = 'images/'; // Base path for image folders
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

// Function to populate the datalist options
function populateDatalist(data, datalistId) {
    const datalist = document.getElementById(datalistId);
    datalist.innerHTML = ''; // Clear previous options
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.display;
        datalist.appendChild(option);
    });
}

// Function to load data from JSON files
function loadJsonData() {
    // Load Pokémon data
    fetch('data/mon-data.csv')
        .then(response => response.text())
        .then(data => {
            const pokemonData = data.split('\n').map(line => {
                const [display, value] = line.split(',');
                return { display, value };
            });
            populateDatalist(pokemonData, 'pokemon-options');
        });

    // Load Poké Ball data
    fetch('data/ball-data.csv')
        .then(response => response.text())
        .then(data => {
            const pokeballData = data.split('\n').map(line => {
                const [display, value] = line.split(',');
                return { display, value };
            });
            populateDatalist(pokeballData, 'pokeball-options');
        });
}

// Call the function to load data when the page loads
loadJsonData();

// Function to display selected images
function displayImages() {
    const selectedPokemonDisplay = document.getElementById('pokemon-input').value;
    const selectedPokeballDisplay = document.getElementById('pokeball-input').value;
    const shinyToggle = document.getElementById('shiny-toggle');
    const mode = shinyToggle.checked ? 'shiny' : 'normal';

    // Find the corresponding variable names
    const selectedPokemon = pokemonData.find(item => item.display === selectedPokemonDisplay)?.value;
    const selectedPokeball = pokeballData.find(item => item.display === selectedPokeballDisplay)?.value;

    const pokemonImage = document.getElementById('pokemon-image');
    const pokeballImage = document.getElementById('pokeball-image');

    if (selectedPokemon && pokemonImages[mode][selectedPokemon]) {
        pokemonImage.src = imageBasePath + pokemonImages[mode][selectedPokemon];
        pokemonImage.style.display = 'block'; // Show the image
    } else {
        pokemonImage.style.display = 'none'; // Hide the image
    }

    if (selectedPokeball && pokeballImages[selectedPokeball]) {
        pokeballImage.src = imageBasePath + pokeballImages[selectedPokeball];
        pokeballImage.style.display = 'block'; // Show the image
    } else {
        pokeballImage.style.display = 'none'; // Hide the image
    }
}

// Event listeners for automatic refresh
document.getElementById('pokemon-input').addEventListener('input', displayImages);
document.getElementById('pokeball-input').addEventListener('input', displayImages);
document.getElementById('shiny-toggle').addEventListener('change', displayImages);

// Initial image display
displayImages();
