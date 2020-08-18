import { storage as storageInstance } from '../storage';

export const checkAccountExists = (
  accountID: string,
  storage = storageInstance,
): void => {
  const accountIDExists = accountID in storage;
  if (!accountIDExists) throw new Error(`No account with ID: ${accountID}`);
};

export const getBalance = (
  accountID: string,
  storage = storageInstance,
): number => {
  checkAccountExists(accountID, storage);
  return storage[accountID];
};

export const updateBalance = (
  accountID: string,
  balance: number,
  storage = storageInstance,
): void => {
  // eslint-disable-next-line no-param-reassign
  storage[accountID] = balance;
};

export default getBalance;
