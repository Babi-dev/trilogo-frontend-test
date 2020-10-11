import { TicketsActionTypes } from 'store/actions/tickets.action';

const INITIAL_STATE = {
  tickets: null,
};

export const ticketsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TicketsActionTypes.CHANGE_TICKETS:
      return { ...state, tickets: payload };
    default:
      return state;
  }
};

export const getTickets = () => ({
  type: TicketsActionTypes.ASYNC_TICKETS_LIST,
});

export const postTicket = params => ({
  type: TicketsActionTypes.ASYNC_TICKET,
  payload: params,
});

export const deleteTicket = ticket_id => ({
  type: TicketsActionTypes.ASYNC_TICKET_DELETE,
  payload: ticket_id,
});

export const putTicket = params => ({
  type: TicketsActionTypes.ASYNC_TICKET_EDIT,
  payload: params,
});

export const putTicketMove = params => ({
  type: TicketsActionTypes.ASYNC_TICKET_MOVE,
  payload: params,
});

export const changeTickets = tickets => ({
  type: TicketsActionTypes.CHANGE_TICKETS,
  payload: tickets,
});

export default ticketsReducer;
