import { FETCH_INVOICES } from '../actions';
import Immutable from 'immutable';

const initialState = Immutable.Record({
  invoices: Immutable.List([])
});

export default function (state = new initialState(), action) {
  switch (action.type) {
    case FETCH_INVOICES:
      return state.set('invoices', action.data);
    default:
      return state
  }
}
