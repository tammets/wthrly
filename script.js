const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=59.5175&longitude=25.5631&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto';

// Fetch weather data from the API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const dailyData = data.daily;

        // Labels for the week (dates)
        const labels = dailyData.time.map(date => new Date(date).toLocaleDateString());

        // Data for charts
        const temperatureMaxData = dailyData.temperature_2m_max;
        const temperatureMinData = dailyData.temperature_2m_min;
        const precipitationData = dailyData.precipitation_sum;
        const windSpeedData = dailyData.wind_speed_10m_max;

        // Temperature Chart
        const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
        new Chart(temperatureCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Max Temperature (°C)',
                        data: temperatureMaxData,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'Min Temperature (°C)',
                        data: temperatureMinData,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Temperature (°C)'
                        }
                    }
                }
            }
        });

      
