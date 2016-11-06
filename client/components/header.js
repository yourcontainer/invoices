import React, {Component, PropTypes} from 'react';

export default class Header extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render() {
    return (<h1>{this.props.text}</h1>)
  }

}
