import { storage } from '../storage';

export const checkAccountExists = (accountID: string): void => {
  const accountIDExists = accountID in storage;
  if (!accountIDExists) throw new Error(`No account with ID: ${accountID}`);
};

export const getBalance = (accountID: string): number => {
  checkAccountExists(accountID);
  return storage[accountID];
};

export const updateBalance = (accountID: string, balance: number): void => {
  // eslint-disable-next-line no-param-reassign
  storage[accountID] = balance;
};

export default getBalance;
