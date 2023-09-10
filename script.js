// Function to fetch and display CSV data
async function displayCSVData() {
    const response = await fetch('data/mon-data.csv');
    const data = await response.text();

    const rows = data.split('\n');
    const headers = rows[0].split(',');

    const table = document.getElementById('pokemon-table');

    // Populate table headers
    const thead = table.querySelector('thead tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        thead.appendChild(th);
    });

    // Populate table data
    const tbody = table.querySelector('tbody');
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].split(',');
        const tr = document.createElement('tr');

        cells.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    }
}

// Call the function to display CSV data when the page loads
displayCSVData();
