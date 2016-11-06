import { FETCH_PRODUCTS } from '../actions';
import Immutable from 'immutable';

const initialState = Immutable.Record({
  products: Immutable.List([])
});

export default function (state = new initialState(), action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      const products = action.data.map(product => {
        product.quantity = 1;
        return product;
      })
      return state.set('products', products);
    default:
      return state
  }
}
