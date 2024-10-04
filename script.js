const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=59.5175&longitude=25.5631&current_weather=true&current=temperature_2m,is_day,precipitation,rain,cloud_cover,wind_speed_10m,wind_gusts_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto&wind_speed_unit=ms';

// Fetch weather data from the API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const dailyData = data.daily;
        const currentData = data.current_weather;

        // Display current weather information
        displayCurrentWeather(currentData);

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

        // Precipitation Chart
        const precipitationCtx = document.getElementById('precipitationChart').getContext('2d');
        new Chart(precipitationCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Precipitation (mm)',
                    data: precipitationData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true
                }]
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
                            text: 'Precipitation (mm)'
                        }
                    }
                }
            }
        });

        // Wind Speed Chart
        const windSpeedCtx = document.getElementById('windSpeedChart').getContext('2d');
        new Chart(windSpeedCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Max Wind Speed (m/s)',
                    data: windSpeedData,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: true,
                    tension: 0.3
                }]
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
                            text: 'Wind Speed (m/s)'
                        }
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        document.body.innerHTML += '<p>Error fetching weather data. Please try again later.</p>';
    });

// Function to display current weather information
function displayCurrentWeather(currentData) {
    const weatherContainer = document.createElement('div');
    weatherContainer.className = 'current-weather';
    weatherContainer.innerHTML = `
        <h2>Current Weather</h2>
        <p>Temperature: ${currentData.temperature_2m} °C</p>
        <p>Precipitation: ${currentData.precipitation} mm</p>
        <p>Cloud Cover: ${currentData.cloud_cover} %</p>
        <p>Wind Speed: ${currentData.wind_speed_10m} m/s</p>
        <p>Wind Gusts: ${currentData.wind_gusts_10m} m/s</p>
        <p>Daytime: ${currentData.is_day ? 'Yes' : 'No'}</p>
    `;
    document.body.prepend(weatherContainer);
}
