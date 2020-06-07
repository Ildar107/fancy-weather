import React, { Component, Fragment } from 'react';
import Menu from './components/menu/Menu';
import WeatherInfo from './components/weatherInfo/WeatherInfo';
import WeatherPlace from './components/weatherPlace/WeatherPlace';
import mapSettings from './constants/mapSettings';
import { getForecast, getCordForCity, getCityLocalization } from './services/weather.service';
import { getCityFromIP, getImage } from './services/common.service';
import weatherIconSearch from './helpers/weatherIconSearch';
import { withNamespaces } from 'react-i18next';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            placeTitle: {},
            placeCord: {},
            weather: {},
            date: new Date(),
            useFarengate: false,
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
            }
        };

        this.init();
        
    }

    init = async () => {
        const { i18n } = this.props;
        const data = await getCityFromIP();
        this.setState({city: data.city});
        this.update(data.city, i18n.language);
        this.changeBackgoundImage();
    }

    changeBackgoundImage = async () => {
        getImage(this.state.weather?.current?.dt).then(x => {
            setTimeout(() => {
                document.body.style.backgroundImage = `url(${img.src})`
            }, 700);
        });
    }

    changeLanguage = (e) => {
        const { i18n } = this.props;
        i18n.changeLanguage(e.currentTarget.value.toLowerCase());
        this.update(this.state.city, i18n.language);
      }

    onSearch = async (e) => {
        e.preventDefault();
        const { i18n } = this.props;
        this.update(e.target.city.value, i18n.language);
    }

    update = async (city, lang) => {
        const cord = await getCordForCity(city, lang);
        console.log(cord)
        if(cord.lat) {
            await this.updateWeather(cord, lang);
        } else {
            this.setState({error: true})
        }
    }

    updateWeather = async (cord, lang) => {
        const weatherData = await getForecast(...Object.values(cord), lang);
        const localData = await getCityLocalization(...Object.values(cord), lang);
        const newMapSettings = this.state.mapSettings;
        newMapSettings.latitude = cord.lat;
        newMapSettings.longitude = cord.lng;
        if(weatherData && weatherData.current && weatherData.daily) {
            const img1 = new Image();
            img1.src = weatherIconSearch(weatherData.current.weather[0].id, new Date(weatherData.current.dt * 1000));
            weatherData.current.temp = this.state.useFarengate ? weatherData.current.temp + 30 : weatherData.current.temp;
            weatherData.imgSrc = img1.src;
            weatherData.daily = weatherData.daily.slice(1,4).map( x => {
                const img1 = new Image();
                img1.src = weatherIconSearch(x.weather[0].id, new Date(x.dt * 1000));
                x.imgSrc = img1.src;
                x.temp.day = this.state.useFarengate ? x.temp.day + 30 : x.temp.day;
                return x;
            })
            console.log(weatherData)
            console.log(localData)
            this.setState({
                city: localData.city,
                mapSettings: newMapSettings,
                placeTitle: localData,
                weather: weatherData,
                markCord: {latitude: cord.lat, longitude: cord.lng},
                date: new Date(weatherData.current.dt * 1000),
                error: false
            });
        } else {
            this.setState({error: true})
        }
       
    }

    onChangeMapCord = (viewport) => this.setState({mapSettings: viewport});

    changeMeasurement = (e) => {
        if(!e.currentTarget.classList.contains('active')) {
            document.querySelectorAll('.dimensions button').forEach(element => {
                element.classList.remove('active');
            })
            e.currentTarget.classList.add('active');
            const newWeather = this.state.weather;
            if(e.currentTarget.classList.contains('farengate')) {
                newWeather.current.temp = newWeather.current.temp + 30;
                newWeather.daily.map(x => {
                    x.temp.day = (x.temp.day*5)/9 + 32;
                    return x;
                })
                this.setState({weather:newWeather, useFarengate: true });
            } else {
                newWeather.current.temp = newWeather.current.temp - 30;
                newWeather.daily.map(x => {
                    x.temp.day = ((x.temp.day - 32)*9)/5;
                    return x;
                })
                this.setState({weather:newWeather, useFarengate: false });
            }
        }
    }


    // componentDidMount () {
    //     this.init();
    // }

    render = () => {
        return (
            <div className="container">
                <Menu onSearch={this.onSearch} cityName={this.state.city} refreshImage={this.changeBackgoundImage} changeMeasurement={this.changeMeasurement}
                    changeLanguage={this.changeLanguage} error={this.state.error}/>
                <div className="main">
                    <WeatherInfo placeTitle={this.state.placeTitle} weather={this.state.weather} date={this.state.date} useFarengate={this.state.useFarengate}/>
                    <WeatherPlace mapSettings={this.state.mapSettings} updateMap={this.onChangeMapCord} markCord={this.state.markCord}/>
                </div>
            </div>
        );
    }
}

export default withNamespaces()(App)