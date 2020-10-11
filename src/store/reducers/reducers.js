import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Tickets from './tickets.reducer';

const RootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    Tickets,
  });

export default RootReducer;
