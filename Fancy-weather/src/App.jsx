import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import Menu from './components/menu/Menu';
import WeatherInfo from './components/weatherInfo/WeatherInfo';
import WeatherPlace from './components/weatherPlace/WeatherPlace';
import mapSettings from './constants/mapSettings';
import { getForecast, getCordForCity, getCityLocalization } from './services/weather.service';
import { getCityFromIP, getImage } from './services/common.service';
import searchWeatherIcon from './helpers/searchWeatherIcon';
import getConvertTemp from './helpers/getConvertTemp';
import getLocalDate from './helpers/getLocalDate';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      placeTitle: {},
      weather: {},
      date: new Date(),
      useFahrenheit: false,
      error: true,
      mapSettings: {
        width: mapSettings.MAPSIZE,
        height: mapSettings.MAPSIZE,
        latitude: mapSettings.MINSKLAT,
        longitude: mapSettings.MINSKLNG,
        zoom: mapSettings.ZOOM,
      },
      markCord: {
        latitude: mapSettings.MINSKLAT,
        longitude: mapSettings.MINSKLNG,
      },
    };
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const { i18n } = this.props;
    const data = await getCityFromIP();
    this.setState({ city: data.city });
    this.update(data.city, i18n.language);
    this.changeBackgoundImage();
  }

  changeBackgoundImage = async () => {
    getImage(this.state.weather?.current?.dt).then((x) => {
      const img = new Image();
      img.src = x.urls.regular;
      img.onload = () => {
        document.body.style.backgroundImage = `url(${img.src})`;
      };
    });
  }

  changeLanguage = (e) => {
    const { i18n } = this.props;
    i18n.changeLanguage(e.currentTarget.value.toLowerCase()).then(() => {
      this.update(this.state.city, i18n.language);
    });
  }

  onSearch = async (e) => {
    e.preventDefault();
    const { i18n } = this.props;
    this.update(e.target.city.value, i18n.language);
  }

  update = async (city, lang) => {
    const cord = await getCordForCity(city, lang);
    if (cord.lat) {
      await this.updateWeather(cord, lang);
    } else {
      this.setState({ error: true });
    }
  }

  updateWeather = async (cord, lang) => {
    const weatherData = await getForecast(...Object.values(cord), lang);
    const localData = await getCityLocalization(...Object.values(cord), lang);
    const newMapSettings = this.state.mapSettings;
    newMapSettings.latitude = cord.lat;
    newMapSettings.longitude = cord.lng;
    if (weatherData && weatherData.current && weatherData.daily) {
      const img = new Image();
      img.src = searchWeatherIcon(
        weatherData.current.weather[0].id,
        getLocalDate(new Date(weatherData.current.dt * 1000), weatherData.timezone),
      );
      weatherData.current.temp = this.state.useFahrenheit
        ? getConvertTemp(this.state.useFahrenheit, weatherData.current.temp)
        : weatherData.current.temp;
      weatherData.imgSrc = img.src;
      weatherData.daily = weatherData.daily.slice(1, 4).map((x) => {
        const dayItem = x;
        const img1 = new Image();
        img1.src = searchWeatherIcon(
          dayItem.weather[0].id,
          getLocalDate(new Date(dayItem.dt * 1000), weatherData.timezone),
        );
        dayItem.imgSrc = img1.src;
        dayItem.temp.day = this.state.useFahrenheit
          ? getConvertTemp(this.state.useFahrenheit, dayItem.temp.day)
          : dayItem.temp.day;
        return dayItem;
      });
      this.setState({
        city: localData.city,
        mapSettings: newMapSettings,
        placeTitle: localData,
        weather: weatherData,
        markCord: { latitude: cord.lat, longitude: cord.lng },
        date: getLocalDate(new Date(weatherData.current.dt * 1000), weatherData.timezone),
        error: false,
      });
    } else {
      this.setState({ error: true });
    }
  }

  onChangeMapCord = (viewport) => this.setState({ mapSettings: viewport });

  changeMeasurement = (e) => {
    if (!e.currentTarget.classList.contains('active')) {
      document.querySelectorAll('.dimensions button').forEach((element) => {
        element.classList.remove('active');
      });
      e.currentTarget.classList.add('active');
      const newWeather = this.state.weather;
      if (e.currentTarget.classList.contains('fahrenheit')) {
        newWeather.current.temp = getConvertTemp(true, newWeather.current.temp);
        newWeather.daily.map((x) => {
          const dayItem = x;
          dayItem.temp.day = getConvertTemp(true, dayItem.temp.day);
          return dayItem;
        });
        this.setState({ weather: newWeather, useFahrenheit: true });
      } else {
        newWeather.current.temp = getConvertTemp(false, newWeather.current.temp);
        newWeather.daily.map((x) => {
          const dayItem = x;
          dayItem.temp.day = getConvertTemp(false, dayItem.temp.day);
          return dayItem;
        });
        this.setState({ weather: newWeather, useFahrenheit: false });
      }
    }
  }

  render = () => (
    <div className="container">
      <Menu
        onSearch={this.onSearch}
        cityName={this.state.city}
        refreshImage={this.changeBackgoundImage}
        changeMeasurement={this.changeMeasurement}
        changeLanguage={this.changeLanguage}
        error={this.state.error}
      />
      <div className="main">
        <WeatherInfo
          placeTitle={this.state.placeTitle}
          weather={this.state.weather}
          date={this.state.date}
          useFahrenheit={this.state.useFahrenheit}
        />
        <WeatherPlace
          mapSettings={this.state.mapSettings}
          updateMap={this.onChangeMapCord}
          markCord={this.state.markCord}
        />
      </div>
    </div>
  )
}

export default withNamespaces()(App);
