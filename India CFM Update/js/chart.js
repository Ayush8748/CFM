document.addEventListener('DOMContentLoaded', () => {
    // Sample data - replace with your actual data
    const stateEmissions = {
        "Delhi": 2500,
        "Maharashtra": 5200,
        "Tamil Nadu": 3100,
        "Uttar Pradesh": 4800,
        "Karnataka": 3600,
        "Gujarat": 4300,
        "West Bengal": 3900,
        "Rajasthan": 3000,
        "Bihar": 2700,
        "Kerala": 2200,
        "Punjab": 2500,
        "Andhra Pradesh": 3300,
        "Odisha": 3800
    };

    const districtEmissions = {
        "Delhi": {
            "New Delhi": 800,
            "East Delhi": 600,
            "North Delhi": 700
        },
        "Maharashtra": {
            "Mumbai": 2200,
            "Pune": 1800,
            "Nagpur": 1200
        },
        "Tamil Nadu": {
            "Chennai": 1300,
            "Coimbatore": 1100,
            "Madurai": 700
        },
        "Uttar Pradesh": {
            "Lucknow": 1600,
            "Kanpur": 1500,
            "Varanasi": 1700
        },
        "Karnataka": {
            "Bengaluru": 2000,
            "Mysuru": 800,
            "Hubli": 800
        },
        "Gujarat": {
            "Ahmedabad": 1800,
            "Surat": 1500,
            "Vadodara": 1000
        },
        "West Bengal": {
            "Kolkata": 1700,
            "Howrah": 1200,
            "Durgapur": 1000
        },
        "Rajasthan": {
            "Jaipur": 1200,
            "Jodhpur": 1000,
            "Udaipur": 800
        },
        "Bihar": {
            "Patna": 1000,
            "Gaya": 900,
            "Muzaffarpur": 800
        },
        "Kerala": {
            "Thiruvananthapuram": 900,
            "Kochi": 800,
            "Kozhikode": 500
        },
        "Punjab": {
            "Ludhiana": 900,
            "Amritsar": 800,
            "Jalandhar": 800
        },
        "Andhra Pradesh": {
            "Visakhapatnam": 1300,
            "Vijayawada": 1100,
            "Tirupati": 900
        },
        "Odisha": {
        "Bhubaneswar": 1500,
        "Cuttack": 1200,
        "Puri": 900,
        "Rourkela": 1100,
        "Sambalpur": 800
        }
    };

    const vehicleEmissions = {
        "bike": 0.12,
        "car": 0.27,
        "truck": 0.8,
        "bus": 0.3,
        "cycle": 0,
        "walking": 0
    };

    // Initialize chart - creates a chart using Chart.js library
    const ctx = document.getElementById('emissionChart').getContext('2d');
    let emissionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'CO2 Emissions (tons/year)',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgb(231, 24, 24)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff' // White font for legend
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ffffff' // White font for x-axis
                    },
                    title: {
                        display: true,
                        text: 'Category',
                        color: '#ffffff'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff' // White font for y-axis
                    },
                    title: {
                        display: true,
                        text: 'CO2 Emissions (tons/year)',
                        color: '#ffffff'
                    }
                }
            }
        }
    });

    // Function to update the chart data based on selections
    function updateChart() {
        const state = document.getElementById('state').value;
        const district = document.getElementById('district').value;
        const emissionValue = document.getElementById('emission-value');
        const chartContainer = document.querySelector('.chart-container');

        let labels = [];
        let data = [];

        if (state) {
            chartContainer.classList.add('visible'); // Show chart when state is selected

            if (!district) {
                // Show all states for comparison
                labels = Object.keys(stateEmissions);
                data = labels.map(label => stateEmissions[label]);
                emissionValue.textContent = stateEmissions[state];
            } else {
                // Show districts within selected state
                labels = Object.keys(districtEmissions[state]);
                data = labels.map(label => districtEmissions[state][label]);
                emissionValue.textContent = districtEmissions[state][district];
            }
        } else {
            // No state selected - hide chart
            chartContainer.classList.remove('visible');
            emissionValue.textContent = '0';
            return; // Exit without updating chart data
        }

        emissionChart.data.labels = labels;
        emissionChart.data.datasets[0].data = data;
        emissionChart.update();
    }

    // Function to populate the district dropdown based on the selected state
    function populateDistricts() {
        const stateSelect = document.getElementById('state');
        const districtSelect = document.getElementById('district');
        districtSelect.innerHTML = '<option value="">--Select a District--</option>';

        if (stateSelect.value && districtEmissions[stateSelect.value]) {
            Object.keys(districtEmissions[stateSelect.value]).forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    }

    // Add event listeners
    document.getElementById('vehicle').addEventListener('change', function () {
        const vehicleEmissionValue = document.getElementById('vehicle-emission-value');
        if (this.value && vehicleEmissions[this.value] !== undefined) {
            vehicleEmissionValue.textContent = vehicleEmissions[this.value];
        } else {
            vehicleEmissionValue.textContent = '0';
        }
    });

    // Get the state select element
    const stateSelect = document.getElementById('state');

    // Update districts when state changes
    stateSelect.addEventListener('change', function () {
        populateDistricts();
        updateChart();
    });

    document.getElementById('district').addEventListener('change', updateChart);

    // Populate state dropdown - Initial population of state options
    Object.keys(stateEmissions).forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        document.getElementById('state').appendChild(option);
    });

    // Initialize with all states data
    updateChart();
});