import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeVoice: props.activeVoice 
        };
    }

    render = () => {
        const { t } = this.props;
        return (
            <div className="search-control">
                <form onSubmit={this.props.onSearch} >
                    <input type="search" className="search-text" placeholder="Search city or ZIP" name="city" defaultValue={this.props.searchText}/>
                        <img src="./images/microfon.png" className="voice" />
                    <button type="submit" className="search-button">{t('menu.search')}</button>
                </form>
                <div className={this.props.error ? 'error' : 'error hide'}><span>{t('error')}</span></div>
            </div>
        );
    }
}


export default withNamespaces()(Search)
