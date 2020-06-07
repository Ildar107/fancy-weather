import React, { Component } from 'react';

export default class ImgButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClass: props.buttonClass,
      imgSource: props.imgSource,
    };
  }

    render = () => (
      <button type="button" className={this.state.buttonClass} aria-label="Change image" onClick={this.props.handleClick}>
        <img src={this.state.imgSource} alt="reload" />
      </button>
    )
}
