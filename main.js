// open weather api
const api_key = "your_api_key";


const searchButton = document.querySelector(".search button");

searchButton.addEventListener("click", () => {
    const city = document.querySelector(".search input").value.trim();

    const image = document.getElementById('image');

    const weatherInfo = document.getElementById('weather-info');
    const city_country = document.getElementById('city-country');
    const temp = document.getElementById('temp');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windspeed = document.getElementById('windspeed');

    const notFound = document.getElementById('not-found');

    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            city_country.innerHTML= `${data.name}, ${data.sys.country}`
            temp.innerHTML = `${data.main.temp} <sup>°C</sup>`;
            description.textContent = `${data.weather[0].description}`;
            humidity.textContent = `${data.main.humidity} %`;
            windspeed.textContent = `${data.wind.speed} km/h`;

            // console.log(data);
            
            // image set
            switch (data.weather[0].icon) {
                
                case '01n' :
                    image.src = './static/images/clear_moon.png';
                    break;

                case '01d' :
                    image.src = './static/images/clear_sun.png';
                    break;

                case  '02n' :
                    image.src = './static/images/few_clouds_moon.png';
                    break;

                case '02d' :
                    image.src = './static/images/few_clouds_sun.png';
                    break;

                case '03d':
                case '03n':
                    image.src='./static/images/scattered_clouds.png';
                    break;

                case '04d':
                case '04n':
                    image.src='./static/images/broken_clouds.png';
                    break;

                case '09d' :
                case '09n' :
                case '10d' :
                case '10n' :
                    image.src='./static/images/rain.png';
                    break;

                case '11d' :
                case '11n' :
                    image.src='./static/images/thunderstorm.png';
                    break;

                case '13d':
                case '13n':
                    image.src = './static/images/snow.png'
                    break;

                case '50d':
                case '50n':
                    image.src = './static/images/mist.png'
                    break;

                default:
                    break;
            }

            weatherInfo.classList.remove('hidden');
            weatherInfo.classList.add('fade-in');
            notFound.classList.add('hidden');
        })
        .catch(error => {
            weatherInfo.classList.add('hidden');
            notFound.classList.remove('hidden');
            notFound.classList.add('fade-in');
        }
        );
});