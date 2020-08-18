import { getBalance, updateBalance, checkAccountExists } from '../../src/model';

describe('checkAccountExists', () => {
  it('should return undefined when an account exists', () => {
    const accountID = '100';
    const storage = { 100: 0, 200: 100 };
    expect(checkAccountExists(accountID, storage)).toBeUndefined();
  });

  it('should throw an error when an account does not exist', () => {
    const accountID = '100';
    const storage = { 200: 100 };
    expect(() => checkAccountExists(accountID, storage)).toThrowError(
      'No account with ID: 100',
    );
  });
});

describe('getBalance', () => {
  it('should return the balance of an existing account', () => {
    const accountID = '200';
    const storage = { 100: 0, 200: 100 };
    expect(getBalance(accountID, storage)).toEqual(100);
  });

  it('should throw an error for an non-existing account', () => {
    const accountID = '200';
    const storage = { 100: 100 };
    expect(() => getBalance(accountID, storage)).toThrowError(
      'No account with ID: 200',
    );
  });
});

describe('updateBalance', () => {
  it('should update the balance of an account', () => {
    const storage = { 100: 200 };
    updateBalance('100', 505, storage);
    expect(getBalance('100', storage)).toBe(505);
  });

  it('should create an account with the given balance if it does not exist', () => {
    const storage = {};
    updateBalance('100', 789, storage);
    expect(getBalance('100', storage)).toBe(789);
  });
});
