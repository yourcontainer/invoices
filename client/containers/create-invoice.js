import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchCustomers, fetchProducts, createInvoice} from '../redux/actions';
import Header from '../components/header';
import List from '../components/list';
import {browserHistory} from 'react-router';

class CreateInvoice extends React.Component {

  static propTypes = {
    customers: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      customer: null,
      products: null,
      discount: 0,
    }
  }

  componentWillMount() {
    this.props.fetchCustomers();
  }

  onSelectCustomer(customer) {
    this.props.fetchProducts();
    this.setState({customer});
  }

  onSelectProduct(products) {
    this.setState({products});
  }

  renderCustomersBlock() {
    const {customers} = this.props;

    return (
      <List onSelect={(customer) => this.onSelectCustomer(customer)}
            data={customers}
            content={(customer) => `${customer.name} (${customer.phone}`} />
    )
  }

  renderProductsBlock() {
    const {products} = this.props;

    return (
      <List onSelect={(products) => this.onSelectProduct(products)}
            data={products}
            multiSelect={true}
            content={(product) => `${product.name} (${product.price}`} />
    )
  }

  onChangeDiscount(e) {
    const {value: discount} = e.target;

    this.setState({discount});
  }

  calculateTotal() {
    const {products, discount} = this.state;

    let total = 0;

    products.map(product => {
      total += product.price * product.quantity;
    })

    return (total - (total * discount / 100)).toFixed(2);
  }

  onCreateButtonClick() {
    const {discount, products} = this.state;
    const total = this.calculateTotal();
    const {id: customer_id} = this.state.customer;

    this.props.createInvoice({customer_id, discount, total, products});
    browserHistory.push('/invoices');
  }

  renderSelectedItems() {
    const {customer, products, discount} = this.state;
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Selected</h3>
        </div>
        <div className="panel-body">
          <b>Products:</b>
          {products.map((product, index) =>
            <p key={index}>{product.name} ${product.price} x{product.quantity}</p>
          )}

          <b>Customer:</b>
          <p>{customer.name}</p>

          <b>Discount:</b>
          <input style={{width: '15%'}}
                 className="form-control"
                 type="number"
                 value={discount}
                 onChange={this.onChangeDiscount.bind(this)} />

          <b>Total:</b> ${this.calculateTotal()}

          <p><button onClick={() => this.onCreateButtonClick()} className="btn btn-success">Create</button></p>
        </div>
      </div>
    )
  }

  renderForm() {
    return (
      <div>
        {this.renderSelectedItems()}
      </div>
    )
  }

  renderContent() {
    const {customer, products} = this.state;

    if(!customer) {
      return this.renderCustomersBlock();
    }

    if(!products) {
      return this.renderProductsBlock();
    }

    return this.renderForm();

  }

  render() {
    return (
      <div>
        <Header text="Create New Invoice" />
        {this.renderContent()}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const {products} = state.products.toJS();
  const {customers} = state.customers.toJS();

  return {customers, products};
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCustomers: () => dispatch(fetchCustomers()),
    fetchProducts: () => dispatch(fetchProducts()),
    createInvoice: (params) => dispatch(createInvoice(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInvoice);
