import React, { Component } from 'react';

export default class ImgButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonClass: props.buttonClass,
            imgSource: props.imgSource
        };
    }

    // getTranslate = async(englishWord) => {
    //     const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200426T115419Z.97bb9a32a36038b3.031a34722fc5dd5a26a8dd0a1871ea5dcdf6db29&text=${englishWord}&lang=en-ru`;
    //     const res = await fetch(url);
    //     const json = await res.json();
    //     this.setState({translate: json.text[0]})
    //   }

    // componentDidMount () {
    //     this.getTranslate(this.props.word)
    // }

    render = () => {
        return (
            <button className={this.state.buttonClass}><img src={this.state.imgSource} onClick={this.props.handleClick}></img></button>
        );
    }
}
