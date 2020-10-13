import { put, all, takeEvery } from 'redux-saga/effects';

import { TicketsActionTypes } from 'store/actions/tickets.action';
import { changeTickets } from 'store/reducers/tickets.reducer';

function* listTickets() {
  try {
    const response = yield localStorage.getItem('@Trilogo:tickets');

    yield put(changeTickets(JSON.parse(response)));
  } catch (error) {
    yield console.log(error);
  }
}

function* addTicket({ payload }) {
  try {
    const response = yield localStorage.getItem('@Trilogo:tickets');
    const tickets = response ? JSON.parse(response) : [];
    const params = {
      ...payload,
      id: Math.floor(100 * Math.random()),
      status: 'open',
    };
    const newTickets = [...tickets, params];

    yield localStorage.setItem('@Trilogo:tickets', JSON.stringify(newTickets));

    yield listTickets();
  } catch (error) {
    yield console.log(error);
  }
}

function* deleteTicket({ payload }) {
  try {
    const response = yield localStorage.getItem('@Trilogo:tickets');
    const tickets = JSON.parse(response);
    const filter = tickets.filter(ticket => ticket.id !== payload);

    yield localStorage.setItem('@Trilogo:tickets', JSON.stringify(filter));

    yield listTickets();
  } catch (error) {
    console.log(error);
  }
}

function* moveTicket({ payload }) {
  try {
    const response = yield localStorage.getItem('@Trilogo:tickets');
    const tickets = JSON.parse(response);
    const filter = tickets.filter(ticket => ticket.id !== payload.id);
    const filterTicket = tickets.filter(ticket => ticket.id === payload.id);
    const newStatusTicket = { ...filterTicket[0], status: payload.status };
    const newTickets = [...filter, newStatusTicket];

    yield localStorage.setItem('@Trilogo:tickets', JSON.stringify(newTickets));

    yield listTickets();
  } catch (error) {
    console.log(error);
  }
}

function* editTicket({ payload }) {
  try {
    const response = yield localStorage.getItem('@Trilogo:tickets');
    const tickets = JSON.parse(response);
    const filter = tickets.filter(ticket => ticket.id !== payload.id);
    const newTickets = [...filter, payload];

    yield localStorage.setItem('@Trilogo:tickets', JSON.stringify(newTickets));

    yield listTickets();
  } catch (error) {
    console.log(error);
  }
}

export default function* MySaga() {
  yield all([
    yield takeEvery(TicketsActionTypes.ASYNC_TICKETS_LIST, listTickets),
    yield takeEvery(TicketsActionTypes.ASYNC_TICKET, addTicket),
    yield takeEvery(TicketsActionTypes.ASYNC_TICKET_DELETE, deleteTicket),
    yield takeEvery(TicketsActionTypes.ASYNC_TICKET_MOVE, moveTicket),
    yield takeEvery(TicketsActionTypes.ASYNC_TICKET_EDIT, editTicket),
  ]);
}
