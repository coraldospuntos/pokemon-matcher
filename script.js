// Function to fetch and display Pokémon data
function fetchPokemonData() {
    fetch('data/mon-data.csv') // Adjust the path to your CSV file
        .then(response => response.text())
        .then(data => {
            const parsedData = Papa.parse(data, { header: true }).data;
            const pokemonDataContainer = document.getElementById('pokemon-data');
            createTable(pokemonDataContainer, parsedData);
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
            createTable(pokeballDataContainer, parsedData);
        })
        .catch(error => {
            console.error('Error fetching Poké Ball data:', error);
        });
}

// Function to create a table from parsed CSV data
function createTable(container, data) {
    const table = document.createElement('table');
    const headers = Object.keys(data[0]);

    // Create table headers
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table rows
    const tbody = document.createElement('tbody');
    data.forEach(rowData => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const cell = document.createElement('td');
            cell.textContent = rowData[header];
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    container.appendChild(table);
}

// Call the functions to fetch and display data
fetchPokemonData();
fetchPokeballData();
