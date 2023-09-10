// Define references to HTML elements
const pokemonInput = document.getElementById('pokemon-input');
const pokeballInput = document.getElementById('pokeball-input');
const shinyToggle = document.getElementById('shiny-toggle');
const pokemonImage = document.getElementById('pokemon-image');
const pokeballImage = document.getElementById('pokeball-image');

// Load Pokémon and Poké Ball data from CSV files
fetch('data/mon-data.csv')
    .then(response => response.text())
    .then(data => {
        const options = data.split('\n');
        for (const option of options) {
            const [displayName, value] = option.split(',');
            if (displayName && value) {
                const pokemonOption = document.createElement('option');
                pokemonOption.textContent = displayName;
                pokemonInput.appendChild(pokemonOption);
            }
        }
    });

fetch('data/ball-data.csv')
    .then(response => response.text())
    .then(data => {
        const options = data.split('\n');
        for (const option of options) {
            const [displayName, value] = option.split(',');
            if (displayName && value) {
                const ballOption = document.createElement('option');
                ballOption.textContent = displayName;
                pokeballInput.appendChild(ballOption);
            }
        }
    });

// Define Pokémon and Poké Ball image paths
const imageBasePath = 'images';
const monImagePath = 'mon';
const monShinyImagePath = 'mon-shiny';
const ballImagePath = 'ball';

// Function to display selected images
function displayImages() {
    const selectedPokemon = pokemonInput.value.toLowerCase().replace(/\s+/g, '-');
    const selectedPokeball = pokeballInput.value.toLowerCase().replace(/\s+/g, '-');
    const isShiny = shinyToggle.checked;

    const pokemonImageUrl = `${imageBasePath}/${isShiny ? monShinyImagePath : monImagePath}/${selectedPokemon}.png`;
    const pokeballImageUrl = `${imageBasePath}/${ballImagePath}/${selectedPokeball}.png`;

    pokemonImage.src = pokemonImageUrl;
    pokeballImage.src = pokeballImageUrl;
}

// Event listeners for automatic refresh
pokemonInput.addEventListener('input', displayImages);
pokeballInput.addEventListener('input', displayImages);
shinyToggle.addEventListener('change', displayImages);

// Initial image display
displayImages();
