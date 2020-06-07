import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import mapSettings from '../../constants/mapSettings';
import { withNamespaces } from 'react-i18next';
import 'mapbox-gl/dist/mapbox-gl.css';

class WeatherPlace extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const { t } = this.props;
        return (
            <div className="weather-place">
            <div className="map-container">
                <ReactMapGL
                    className="map"
                    {...this.props.mapSettings}
                    onViewportChange={this.props.updateMap}
                    mapboxApiAccessToken={mapSettings.TOKEN}
                    mapStyle={mapSettings.MAPSTYLEEN}
                >
                    <Marker latitude={this.props.markCord.latitude} longitude={this.props.markCord.longitude}>
                        <div className="mark__container">
                            <img src='./images/pin.svg' className="marker__image" alt="marker" />
                        </div>
                    </Marker>
                </ReactMapGL>
            </div>
            <div className="place-description">
        <p className="latitude">{t('geo.lat')} {this.props.markCord.latitude.toString().replace('.', '°')}'</p>
                <p className="longitude">{t('geo.lng')} {this.props.markCord.longitude.toString().replace('.', '°')}'</p>
            </div>
        </div>
        );
    }
}

export default withNamespaces()(WeatherPlace);

