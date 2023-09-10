// Fetch and display Pokémon data
fetch('mon-data.csv')
    .then(response => response.text())
    .then(data => {
        const pokemonData = Papa.parse(data, { header: true }).data;
        const pokemonTable = createTable(pokemonData);
        document.getElementById('pokemon-data').appendChild(pokemonTable);
    })
    .catch(error => {
        console.error('Error fetching Pokémon data:', error);
    });

// Fetch and display Poké Ball data
fetch('ball-data.csv')
    .then(response => response.text())
    .then(data => {
        const pokeballData = Papa.parse(data, { header: true }).data;
        const pokeballTable = createTable(pokeballData);
        document.getElementById('pokeball-data').appendChild(pokeballTable);
    })
    .catch(error => {
        console.error('Error fetching Poké Ball data:', error);
    });

// Helper function to create a table from CSV data
function createTable(data) {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    
    // Create table headers from the CSV column names
    for (const column of Object.keys(data[0])) {
        const th = document.createElement('th');
        th.textContent = column;
        headerRow.appendChild(th);
    }
    
    table.appendChild(headerRow);

    // Populate table rows with data
    for (const row of data) {
        const dataRow = document.createElement('tr');
        
        for (const column of Object.values(row)) {
            const td = document.createElement('td');
            td.textContent = column;
            dataRow.appendChild(td);
        }
        
        table.appendChild(dataRow);
    }

    return table;
}
