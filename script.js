// Function to fetch and display data
function fetchDataAndDisplay(url, targetElementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parsedData = Papa.parse(data, { header: true }).data;
            const table = createTable(parsedData);
            document.getElementById(targetElementId).appendChild(table);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

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

// Fetch and display Pokémon data
fetchDataAndDisplay('mon-data.csv', 'pokemon-data');

// Fetch and display Poké Ball data
fetchDataAndDisplay('ball-data.csv', 'pokeball-data');
