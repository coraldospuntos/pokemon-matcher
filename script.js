// Function to fetch and display Pokémon data
function fetchPokemonData() {
    fetch('data/mon-data.csv') // Adjust the path to your CSV file
        .then(response => response.text())
        .then(data => {
            const parsedData = Papa.parse(data, { header: true }).data;
            const pokemonDataContainer = document.getElementById('pokemon-data');
            pokemonDataContainer.textContent = JSON.stringify(parsedData, null, 2);
        })
        .catch(error => {
            console.error('Error fetching Pokémon data:', error);
        });
}

// Function to fetch and display Poké Ball data
function fetchPokeballData() {
    fetch('data/ball-data.csv') // Adjust the path to your CSV file
        .then(response => response.text())
        .then(data => {
            const parsedData = Papa.parse(data, { header: true }).data;
            const pokeballDataContainer = document.getElementById('pokeball-data');
            pokeballDataContainer.textContent = JSON.stringify(parsedData, null, 2);
        })
        .catch(error => {
            console.error('Error fetching Poké Ball data:', error);
        });
}

// Call the functions to fetch and display data
fetchPokemonData();
fetchPokeballData();
