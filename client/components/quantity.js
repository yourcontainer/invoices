import React, {Component, PropTypes} from 'react';

export default class Quantity extends Component {

  static propTypes = {
    quantity: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const {quantity} = this.props;

    return (
      <input type="number"
             className="form-control"
             style={{width: '10%'}}
             onChange={this.onChange.bind(this)}
             value={quantity} />
    )
  }

}
