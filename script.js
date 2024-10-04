const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=59.5175&longitude=25.5631&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto&wind_speed_unit=ms';

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

// Function to get the icon path based on the WMO weather code
function getWeatherIconPath(weatherCode) {
    switch (weatherCode) {
        case 0:
            return 'icons/clear-sky.png';
        case 1:
        case 2:
        case 3:
            return 'icons/partly-cloudy.png';
        case 45:
        case 48:
            return 'icons/fog.png';
        case 51:
        case 53:
        case 55:
            return 'icons/drizzle.png';
        case 56:
        case 57:
            return 'icons/freezing-drizzle.png';
        case 61:
        case 63:
        case 65:
            return 'icons/rain.png';
        case 66:
        case 67:
            return 'icons/freezing-rain.png';
        case 71:
        case 73:
        case 75:
            return 'icons/snowfall.png';
        case 77:
            return 'icons/snow-grains.png';
        case 80:
        case 81:
        case 82:
            return 'icons/rain-showers.png';
        case 85:
        case 86:
            return 'icons/snow-showers.png';
        case 95:
            return 'icons/thunderstorm.png';
        case 96:
        case 99:
            return 'icons/thunderstorm-hail.png';
        default:
            return 'icons/unknown.png'; // Default icon if code is not recognized
    }
}

// Function to get the weather description based on the WMO weather code
function getWeatherDescription(weatherCode) {
    switch (weatherCode) {
        case 0:
            return 'Clear Sky';
        case 1:
        case 2:
        case 3:
            return 'Partly Cloudy / Overcast';
        case 45:
        case 48:
            return 'Fog';
        case 51:
        case 53:
        case 55:
            return 'Drizzle';
        case 56:
        case 57:
            return 'Freezing Drizzle';
        case 61:
        case 63:
        case 65:
            return 'Rain';
        case 66:
        case 67:
            return 'Freezing Rain';
        case 71:
        case 73:
        case 75:
            return 'Snowfall';
        case 77:
            return 'Snow Grains';
        case 80:
        case 81:
        case 82:
            return 'Rain Showers';
        case 85:
        case 86:
            return 'Snow Showers';
        case 95:
            return 'Thunderstorm';
        case 96:
        case 99:
            return 'Thunderstorm with Hail';
        default:
            return 'Unknown Weather Condition';
    }
}

// Function to display current weather information
function displayCurrentWeather(currentData) {
    const weatherContainer = document.getElementById('current-weather');

    // Update elements with current weather data
    document.getElementById('temperature').textContent = currentData.temperature || '--';
    document.getElementById('wind-speed').textContent = currentData.windspeed || '--';
    document.getElementById('precipitation').textContent = currentData.precipitation || '0';
    document.getElementById('cloud-cover').textContent = currentData.cloudcover || '0';
    document.getElementById('daytime').textContent = currentData.is_day ? 'Yes' : 'No';

    // Get the weather icon path and description based on the WMO weather code
    const weatherCode = currentData.weathercode;
    const iconPath = getWeatherIconPath(weatherCode);
    const description = getWeatherDescription(weatherCode);
    
    // Set the weather icon
    const iconElement = document.getElementById('weather-icon');
    iconElement.src = iconPath;
    iconElement.alt = description;

    // Set the weather condition text
    document.getElementById('weather-condition').textContent = description;

    // Set a description below the weather condition if needed
    document.getElementById('weather-description').textContent = `Current weather: ${description}`;
}