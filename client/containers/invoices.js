import React, {PropTypes}from 'react';
import {connect} from 'react-redux';
import {fetchInvoices} from '../redux/actions';
import Header from '../components/header';
import {browserHistory} from 'react-router';
import Table from '../components/table';

class Invoices extends React.Component {

  static propTypes = {
    invoices: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchInvoices();
  }

  render() {
    const {invoices} = this.props;
    const columns = [
      {title: '#', key: 'id'},
      {title: 'Customer', key: 'customer_id'},
      {title: 'Discount', key: 'discount'},
      {title: 'Total', key: 'total'}
    ];

    return (
      <div>
        <Header text="Invoices List" />

        <Table columns={columns} data={invoices} />

        <button className="btn btn-success"
                onClick={() => browserHistory.push('/create-new-invoice')}>
            Create new Invoice
        </button>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return state.invoices.toJS();
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInvoices: () => dispatch(fetchInvoices())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoices);
