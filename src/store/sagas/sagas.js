import { all } from 'redux-saga/effects';

import Tickets from './tickets.saga';

export default function* RootSaga() {
  yield all([Tickets()]);
}
