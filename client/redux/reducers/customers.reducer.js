import { FETCH_CUSTOMERS } from '../actions';
import Immutable from 'immutable';

const initialState = Immutable.Record({
  customers: Immutable.List([])
});

export default function (state = new initialState(), action) {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return state.set('customers', action.data);
    default:
      return state
  }
}
