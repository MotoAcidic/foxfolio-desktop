// @flow
import { ADD_SOURCE } from '../actions/sources';

export type sourceType = {
  name: string,
  apiKey: string,
  apiSecret: string,
  customerId?: string
};
type actionType = {
  +type: string,
  source: any
};

const initialState: sourceType[] = [
  {
    name: 'bittrex',
    apiKey: '',
    apiSecret: '',
  },
  {
    name: 'bitstamp',
    customerId: '',
    apiKey: '',
    apiSecret: '',
  },
];

export default function sources(state: Array<sourceType> = initialState, action: actionType) {
  switch (action.type) {
    case ADD_SOURCE:
      return [...state, action.source];
    default:
      return state;
  }
}