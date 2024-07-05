function fetchData() {
    return new Promise((resolve, reject) => {
        fetch('./src/data/data.json').then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }
            return response.json();
        })
        .then(data => {
            resolve(data.results);
        })
        .catch(error => {
            reject(error);
        });
    });
}

async function printTable() {
    try {
        const results = await fetchData();
        const tableBody = document.getElementById('table-body');
        results.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.title}</td>
                <td>${item.priority}</td>
                <td>${item.isDone}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

printTable();