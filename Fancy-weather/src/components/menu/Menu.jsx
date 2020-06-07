import React, {Component} from 'react';
import ImgButton from '../img_button/ImgButton';
import Search from '../search/Search';
import { withNamespaces } from 'react-i18next';

class Menu extends Component {
  constructor(props) {
      super(props);
      console.log(props.onSearch)
      this.state = {
          searchText: props.searchText,
          activeVoice: props.activeVoice
      };
  }

  render = () => {
    const { t, i18n } = this.props;
    return (
      <div className="controls">
      <div className="main-control">
          <ImgButton buttonClass="refresh" imgSource="./images/refresh.png" handleClick={this.props.refreshImage}/>
          <select className="language" onChange={this.props.changeLanguage} defaultValue={i18n.language.toUpperCase()}>
            <option>BE</option>
            <option>EN</option>
            <option>RU</option>
          </select>
          <div className="dimensions">
            <button className="farengate" type="button" onClick={this.props.changeMeasurement}>°F</button>
            <button className="degree active" type="button" onClick={this.props.changeMeasurement}>°C</button>
          </div>
        </div>
        <Search searchText={this.props.cityName} activeVoice={false} onSearch={this.props.onSearch} error={this.props.error}/>
    </div>
    );
  }
}

export default withNamespaces()(Menu)
