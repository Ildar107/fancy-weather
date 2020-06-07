import React, { Component } from 'react';
import WeatherItem from "../weatherItem/weatherItem";
import { withNamespaces } from 'react-i18next';

class WeatherInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.date
        };
    }

    incrementTimer = () => {
        let newDate = new Date();
        if(this.props.weather && this.props.weather.timexone != false) {
            newDate = new Date(new Date ((new Date).toUTCString()).toLocaleString("en-US", {timeZone: this.props.weather.timezone}));
        }
        this.setState({time: newDate.toLocaleTimeString('ru')});
    }

    componentDidMount () {
        this.timerId = setInterval(this.incrementTimer, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
      }

    render = () => {
        const { t } = this.props;
        return (
            <div className="weather-info">
            <div className="title">
            <p className="place">{`${ this.props.placeTitle?.city || this.props.placeTitle?.state }, ${ this.props.placeTitle?.country }`} </p>
                <p className="date">{`${ t('shortDayOfWeek', { returnObjects: true })[this.props.date.getDay()] } 
                ${ this.props.date.getDate() } 
                ${ t('month', { returnObjects: true })[this.props.date.getMonth()] } 
                ${ this.state.time } `}</p>
            </div>
            <div className="today">
                <div className="degree">{Math.round(this.props.weather?.current?.temp)}°</div>
                <div className="additional">
                    <img src={ this.props.weather.imgSrc } /> 
                    <span className="weather-condition">{ this.props.weather?.current?.weather[0].description }</span>
                    <span>{ t('weatherProps.feelsLike') + this.props.weather?.current?.feels_like }°</span>
                    <span>{ t('weatherProps.wind')+this.props.weather?.current?.wind_speed + " " +  t('weatherProps.windMeasurment')}</span>
                    <span>{ t('weatherProps.humidity') + this.props.weather?.current?.humidity }%</span>
                </div>
            </div>
            <div className="days">
                {
                    this.props.weather?.daily?.map((x, i) => {
                    return (
                    <WeatherItem day={x.dt * 1000} degree={Math.round(x.temp.day)} imgSrc={x.imgSrc} key={i}/>
                    )
                })
                }
            </div>
        </div>
        );
    }
}

export default withNamespaces()(WeatherInfo)