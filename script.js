// Function to load data from CSV files
function loadCsvData() {
    // Load Pokémon data
    fetch('data/mon-data.csv')
        .then(response => response.text())
        .then(data => {
            // Split CSV rows and create an array of objects
            const rows = data.split('\n');
            const pokemonData = rows.slice(1).map(row => {
                const [displayName, fileName] = row.split(';');
                return { display: displayName, value: fileName };
            });
            populateDatalist(pokemonData, 'mon-options');
        });

    // Load Poké Ball data
    fetch('data/ball-data.csv')
        .then(response => response.text())
        .then(data => {
            // Split CSV rows and create an array of objects
            const rows = data.split('\n');
            const pokeballData = rows.slice(1).map(row => {
                const [displayName, fileName] = row.split(';');
                return { display: displayName, value: fileName };
            });
            populateDatalist(pokeballData, 'ball-options');
        });
}

// Call the function to load data when the page loads
loadCsvData();

// Event listener for automatic refresh
document.getElementById('mon-input').addEventListener('input', displayImages);
document.getElementById('ball-input').addEventListener('input', displayImages);

// Function to display selected images
function displayImages() {
    const selectedPokemonDisplay = document.getElementById('mon-input').value;
    const selectedPokeballDisplay = document.getElementById('ball-input').value;

    // Convert selected values to lowercase
    const selectedPokemon = selectedPokemonDisplay.toLowerCase();
    const selectedPokeball = selectedPokeballDisplay.toLowerCase();

    const pokemonImage = document.getElementById('pokemon-image');
    const pokeballImage = document.getElementById('pokeball-image');

    if (selectedPokemon && pokemonImages[selectedPokemon]) {
        // Construct image path based on the selected value
        pokemonImage.src = `images/mon/${pokemonImages[selectedPokemon]}.png`;
        pokemonImage.style.display = 'block'; // Show the image
    } else {
        pokemonImage.style.display = 'none'; // Hide the image
    }

    if (selectedPokeball && pokeballImages[selectedPokeball]) {
        // Construct image path based on the selected value
        pokeballImage.src = `images/ball/${pokeballImages[selectedPokeball]}.png`;
        pokeballImage.style.display = 'block'; // Show the image
    } else {
        pokeballImage.style.display = 'none'; // Hide the image
    }
}
