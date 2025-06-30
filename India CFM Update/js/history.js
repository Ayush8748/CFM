// Function to load login history from localStorage
function loadLoginHistory() {
    const historyJSON = localStorage.getItem('login_history');
    return historyJSON ? JSON.parse(historyJSON) : [];
}

// Function to display login history in the table
document.addEventListener('DOMContentLoaded', () => {
    const historyTableBody = document.querySelector('.history-table tbody');
    if (historyTableBody) {
        const loginHistory = loadLoginHistory();
        historyTableBody.innerHTML = ''; // Clear existing rows

        if (loginHistory.length === 0) {
            // Changed colspan from 3 to 2 because we now have 2 columns
            const noHistoryRow = document.createElement('tr');
            noHistoryRow.innerHTML = `<td colspan="2" style="text-align: center; color: #aaa;">No login history available.</td>`;
            historyTableBody.appendChild(noHistoryRow);
        } else {
            loginHistory.forEach(entry => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${entry.timestamp}</td>
                    <td>${entry.username}</td>
                    `;
                historyTableBody.appendChild(row);
            });
        }
    }
});