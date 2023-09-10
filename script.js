// Function to load CSV data
function loadCsvData() {
    d3.csv('data/mon-data.csv').then(function(pokemonData) {
        populateDatalist(pokemonData, 'mon-options');
    });

    d3.csv('data/ball-data.csv').then(function(ballData) {
        populateDatalist(ballData, 'ball-options');
    });
}

// Call the function to load data when the page loads
loadCsvData();

// Function to display selected images
function displayImages() {
    const selectedPokemonDisplay = document.getElementById('mon-input').value;
    const selectedPokeballDisplay = document.getElementById('ball-input').value;

    const selectedPokemon = selectedPokemonDisplay.toLowerCase().replace(/[^a-z0-9]/g, '');
    const selectedPokeball = selectedPokeballDisplay.toLowerCase().replace(/[^a-z0-9]/g, '');

    const pokemonImage = document.getElementById('pokemon-image');
    const pokeballImage = document.getElementById('pokeball-image');

    pokemonImage.src = `images/mon/${selectedPokemon}.png`;
    pokeballImage.src = `images/ball/${selectedPokeball}.png`;
}

// Event listener for automatic refresh
document.getElementById('mon-input').addEventListener('input', displayImages);
document.getElementById('ball-input').addEventListener('input', displayImages);

// Initial image display
displayImages();
