import { getBalance, updateBalance, checkAccountExists } from '../../src/model';
import { setStorage, clearStorage } from '../../src/storage';

describe('checkAccountExists', () => {
  it('should return undefined when an account exists', () => {
    const accountID = '100';
    setStorage({ 100: 0, 200: 100 });
    expect(checkAccountExists(accountID)).toBeUndefined();
  });

  it('should throw an error when an account does not exist', () => {
    const accountID = '100';
    setStorage({ 200: 100 });
    expect(() => checkAccountExists(accountID)).toThrowError(
      'No account with ID: 100',
    );
  });
});

describe('getBalance', () => {
  it('should return the balance of an existing account', () => {
    const accountID = '200';
    setStorage({ 100: 0, 200: 100 });
    expect(getBalance(accountID)).toEqual(100);
  });

  it('should throw an error for an non-existing account', () => {
    const accountID = '200';
    setStorage({ 100: 100 });
    expect(() => getBalance(accountID)).toThrowError('No account with ID: 200');
  });
});

describe('updateBalance', () => {
  it('should update the balance of an account', () => {
    setStorage({ 100: 200 });
    updateBalance('100', 505);
    expect(getBalance('100')).toBe(505);
  });

  it('should create an account with the given balance if it does not exist', () => {
    clearStorage();
    updateBalance('100', 789);
    expect(getBalance('100')).toBe(789);
  });
});
