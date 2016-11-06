import 'whatwg-fetch';
import { checkStatus, parseJSON } from '../../utils';

export const FETCH_INVOICES = 'invoices/fetch_invoices';
export const CREATE_INVOICE = 'invoices/create_invoice';

export const FETCH_CUSTOMERS = 'customers/fetch_customers';
export const FETCH_PRODUCTS = 'products/fetch_products';

export const fetchInvoices = (params) => (dispatch, getState) => {
  return apiRequest('/api/invoices')
    .then(data => dispatch({type: FETCH_INVOICES, data}));
};

export const fetchCustomers = (params) => (dispatch, getState) => {
  return apiRequest('/api/customers')
    .then(data => dispatch({type: FETCH_CUSTOMERS, data}));
};

export const fetchProducts = (params) => (dispatch, getState) => {
  return apiRequest('/api/products')
    .then(data => dispatch({type: FETCH_PRODUCTS, data}));
};

export const createInvoice = (params) => (dispatch, getState) => {
  return apiRequest('/api/invoices', postParams(params))
    .then(response => {
      const {id} = response;
      const products = params.products.map(product => {
        return apiRequest(`/api/invoices/${id}/items`, postParams({
          product_id: product.id,
          quantity: product.quantity
        }));
      });
    });
};


function apiRequest(url, params = {}) {
  return fetch(url, params)
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      console.log('request failed', error);
    });
}

function postParams(body) {
  return {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}
