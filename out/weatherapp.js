window.addEventListener('load', () => {
    let long = '-123.120700'; //vancouver long and lat
    let lat = '49.282700';
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');
    let PROXY = 'https://gentle-spire-59020.herokuapp.com/';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let long = position.coords.longitude.toFixed(6);
            let lat = position.coords.latitude.toFixed(6);

            let API = PROXY + 'https://api.darksky.net/forecast/12095b4e7991f40abc26668c0fff9a82/' + lat + ',' + long;
            setTemperature(API);
        }, () => {
            let API = PROXY + 'https://api.darksky.net/forecast/12095b4e7991f40abc26668c0fff9a82/' + lat + ',' + long;
            setTemperature(API); 
        });
    } else {
        let API = PROXY + 'https://api.darksky.net/forecast/12095b4e7991f40abc26668c0fff9a82/' + lat + ',' + long;
        setTemperature(API); 
    };

    function setTemperature(api) {
        fetch(api).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            const {temperature, summary, icon} = data.currently;
            //set dom elements from the api
            let fahrenheit = Math.floor(temperature);
            //formula for celsius
            let celsius = Math.floor((temperature - 32)*(5/9));
            temperatureDegree.textContent = celsius;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone.replace(/.*\//,"").replace(/_/," ");
            //set icon
            setIcons(icon, document.querySelector(".icon"));
            //change temperature celsius fahrenheit
            temperatureSection.addEventListener('click', () => {
                if (temperatureSpan.textContent === "F") {
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = celsius;
                } else {
                    temperatureSpan.textContent = "F"
                    temperatureDegree.textContent = fahrenheit;
                }
            })
        });
    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});