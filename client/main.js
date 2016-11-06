import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import invoicesReducer from './redux/reducers/invoices.reducer';
import customersReducer from './redux/reducers/customers.reducer';
import productsReducer from './redux/reducers/products.reducer';

import App from './containers/app';
import Invoices from './containers/invoices';
import CreateInvoice from './containers/create-invoice';

const reducers = combineReducers({
  invoices: invoicesReducer,
  customers: customersReducer,
  products: productsReducer,
  routing: routerReducer
});

const middleware = [thunk];

const createStoreFn = applyMiddleware(...middleware)(createStore);
const store = createStoreFn(reducers);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/invoices" component={Invoices} />
        <Route path="/create-new-invoice" component={CreateInvoice} />
        <IndexRedirect to="/invoices"/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
