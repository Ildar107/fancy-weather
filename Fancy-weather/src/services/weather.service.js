import apiKeys from '../constants/apiKeys';

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q={cityName}&lang={lang}&units=metric&appid={apiKey}';
const forecastWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&lang={lang}&exclude=hourly,minute&units=metric&appid={apiKey}';
const cordApiUrl = 'https://api.opencagedata.com/geocode/v1/json?q={cityName}&language={lang}&key={apiKey}&pretty=1&no_annotations=1';

async function getCurrentWeather(cityName) {
    let url = weatherApiUrl.replace('{cityName}', cityName).replace('{apiKey}', apiKeys.WEATHERAPIKEY);
    url = url.replace('{lang}', 'ru');
    return await getData(url);
}   

async function getForecast(latitude, longitude, lang) {
    let url = forecastWeatherApiUrl.replace('{apiKey}', apiKeys.WEATHERAPIKEY);
    url = url.replace('{lon}', longitude).replace('{lat}', latitude);
    url = url.replace('{lang}', lang);
    return await getData(url);
}

async function getCordForCity(cityName, lang) {
    let url = cordApiUrl.replace('{apiKey}', apiKeys.OPENCAGEDATAAPIKEY);
    url = url.replace('{cityName}', cityName).replace('{lang}', lang);
    const data = await getData(url);
    const results = data.results.filter(x => x.components._type === 'city');
    return results.length > 0 ? results[0].geometry : {};
}

async function getCityLocalization(latitude, longitude, lang) {
    let url = cordApiUrl.replace('{apiKey}', apiKeys.OPENCAGEDATAAPIKEY);
    url = url.replace('{cityName}', `${latitude},${longitude}`).replace('{lang}', lang);
    const data = await getData(url);
    return data.results.length > 0 ? data.results[0].components : {};
}


async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.log(e);
    }

    return null;
}

export { getCurrentWeather, getForecast, getCordForCity, getCityLocalization };