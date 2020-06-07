import apiKeys from '../constants/apiKeys';
import getSeason from '../helpers/getSeason';

const ipApiUrl = 'https://ipinfo.io?token={apiKey}';
const imgApiUrl = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query={query}&client_id={apiKey}';

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    return null;
  }
}

async function getCityFromIP() {
  const url = ipApiUrl.replace('{apiKey}', apiKeys.IPAPIKEY);
  const data = await getData(url);
  return data;
}

async function getImage(dt) {
  let query = 'nightsky';
  if (dt) {
    const newDate = new Date(dt * 1000);
    const hour = newDate.getHours();
    const season = getSeason(newDate);
    const dayPhase = hour >= 5 && hour <= 20 ? 'day' : 'night';
    query = season + dayPhase;
  }
  const url = imgApiUrl.replace('{apiKey}', apiKeys.IMAGEAPIKEY).replace('{query}', query);
  const data = await getData(url);
  return data;
}

export { getCityFromIP, getImage };
