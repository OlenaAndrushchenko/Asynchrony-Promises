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

        const ctx = document.getElementById('taskCompletionChart').getContext('2d');
        const doneCount = results.filter(item => item.isDone).length;
        const notDoneCount = results.length - doneCount;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Done', 'Not Done'],
                datasets: [{
                    label: 'Task Completion Status',
                    data: [doneCount, notDoneCount],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
            });
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

printTable();