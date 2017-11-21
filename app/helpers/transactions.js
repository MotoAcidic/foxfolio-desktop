// @flow
import type { Transaction } from '../actions/transaction.d';
import type { TransactionsState } from '../reducers/transactions';

export function flattenTransactions(transactions: TransactionsState): Transaction[] {
  return Object
    .keys(transactions)
    .reduce((acc, sourceName) => acc.concat(transactions[sourceName].trades).concat(transactions[sourceName].transfers),
      []);
}