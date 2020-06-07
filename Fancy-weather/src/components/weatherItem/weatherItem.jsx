import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';

class WeatherItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: props.day,
            degree: props.degree,
            imgSrc: props.imgSrc,
        };
    }

    render = () => {
        const { t } = this.props;
        return (
            <div className="day">
                <span className="day-name">{ t('dayOfWeek', { returnObjects: true })[(new Date(this.props.day)).getDay()]}</span>
                <div className="degree-container">
                    <span className="degree">{this.props.degree}°</span>
                        <img className="weather-icon" src="./images/cloudy.svg" /> 
                </div>
            </div>
        );
    }
}

export default withNamespaces()(WeatherItem)