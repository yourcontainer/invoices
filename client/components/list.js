import React, {Component, PropTypes} from 'react';
import Quantity from './quantity';

export default class List extends Component {

  static propTypes = {
    content: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    multiSelect: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
      items: props.data
    }
  }

  onChange(item, index) {
    const {items, selectedItems} = this.state;

    items.splice(index, 1);
    selectedItems.push(item);
    this.setState({selectedItems, items});
  }

  componentWillReceiveProps(newProps) {
    const {data} = newProps;

    this.setState({
      items: data
    })
  }

  renderMultiSelection() {
    const {content} = this.props;
    const {items, selectedItems} = this.state;

    return items.map((item, index) =>
      <a onClick={() => this.onChange(item, index)}
         href="#"
         key={index}
         className="list-group-item">{content(item)})
      </a>
    );
  }

  onChangeQuantity(value, index) {
    const {selectedItems} = this.state;

    selectedItems[index].quantity = value;

    this.setState({selectedItems});
  }

  renderSelectedProducts() {
    const {content} = this.props;
    const {selectedItems} = this.state;

    return selectedItems.map((item, index) =>
      <div className="list-group" key={index}>
        <a href="#"
           className="list-group-item">{content(item)})
           <Quantity quantity={item.quantity}
                     onChange={(value) => this.onChangeQuantity(value, index)} />
        </a>
      </div>
    );
  }

  renderSingleSelection() {
    const {data, content} = this.props;

    return data.map((item, index) =>
      <a onClick={() => this.props.onSelect(item)}
         href="#"
         key={index}
         className="list-group-item">{content(item)})
      </a>
    );
  }

  render() {
    const {selectedItems} = this.state;

    return (
      <div>
        <div className="list-group">
          {this.props.multiSelect ? this.renderMultiSelection() : this.renderSingleSelection()}
        </div>

        {selectedItems.length ?
          <div>
            <h3>Selected Products</h3>
            {this.renderSelectedProducts()}
            <button className="btn btn-success" onClick={() => this.props.onSelect(selectedItems)}>Next</button>
          </div>
        : null}
      </div>

    );
  }

}
