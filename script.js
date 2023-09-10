// Function to fetch and display data
function fetchDataAndDisplay(url, targetTableId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const table = document.getElementById(targetTableId);

            // Create table headers
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            const headers = rows[0].split(';'); // Split the first row by semicolon
            for (const header of headers) {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            }
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create table rows
            const tbody = document.createElement('tbody');
            for (let i = 1; i < rows.length; i++) {
                const row = document.createElement('tr');
                const cells = rows[i].split(';'); // Split each row by semicolon
                for (const cell of cells) {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    row.appendChild(td);
                }
                tbody.appendChild(row);
            }
            table.appendChild(tbody);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Fetch and display Pokémon data from the "data" subfolder
fetchDataAndDisplay('data/mon-data.csv', 'pokemon-data');

// Fetch and display Poké Ball data from the "data" subfolder
fetchDataAndDisplay('data/ball-data.csv', 'pokeball-data');
