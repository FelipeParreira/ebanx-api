import {
  deposit,
  withdraw,
  transfer,
  handleEvent,
} from '../../src/service/handleEvent';
import { setStorage, clearStorage } from '../../src/storage';

describe('deposit', () => {
  it('should deposit money to an existing account', () => {
    setStorage({ 100: 30 });
    const depositData = { type: 'deposit', destination: '100', amount: 250 };
    expect(deposit(depositData)).toEqual({
      destination: { id: '100', balance: 280 },
    });
  });

  it('should not mutate the storage object', () => {
    const storage = { 100: 30 };
    setStorage(storage);

    const depositData = { type: 'deposit', destination: '100', amount: 250 };
    deposit(depositData);

    expect(storage).toEqual({ 100: 30 });
  });

  it('should deposit money to a non-existing account (considering initial balance to be 0)', () => {
    clearStorage();
    const depositData = { type: 'deposit', destination: '100', amount: 250 };
    expect(deposit(depositData)).toEqual({
      destination: { id: '100', balance: 250 },
    });
  });
});

describe('withdraw', () => {
  it('should withdraw money from an existing account', () => {
    setStorage({ 100: 230 });
    const withdrawalData = { type: 'withdraw', origin: '100', amount: 200 };
    expect(withdraw(withdrawalData)).toEqual({
      origin: { id: '100', balance: 30 },
    });
  });

  it('should not mutate the storage object', () => {
    const storage = { 100: 230 };
    setStorage(storage);
    const withdrawalData = { type: 'withdraw', origin: '100', amount: 200 };
    withdraw(withdrawalData);
    expect(storage).toEqual({ 100: 230 });
  });

  it('should throw an error for a non-existing account', () => {
    setStorage({ 100: 230 });
    const withdrawalData = { type: 'withdraw', origin: '200', amount: 200 };
    expect(() => withdraw(withdrawalData)).toThrowError(
      'No account with ID: 200',
    );
  });

  it('should throw an error when there is no sufficient balance', () => {
    setStorage({ 100: 230 });
    const withdrawalData = { type: 'withdraw', origin: '100', amount: 300 };
    expect(() => withdraw(withdrawalData)).toThrowError('Insufficient balance');
  });
});

describe('transfer', () => {
  it('should transfer funds from an existing account to another one', () => {
    setStorage({ 100: 230, 200: 0 });
    const transferData = {
      type: 'transfer',
      origin: '100',
      destination: '200',
      amount: 200,
    };
    expect(transfer(transferData)).toEqual({
      origin: { id: '100', balance: 30 },
      destination: { id: '200', balance: 200 },
    });
  });

  it('should not mutate the storage object', () => {
    const storage = { 100: 230, 200: 0 };
    setStorage(storage);
    const transferData = {
      type: 'transfer',
      origin: '100',
      destination: '200',
      amount: 200,
    };
    transfer(transferData);
    expect(storage).toEqual({ 100: 230, 200: 0 });
  });

  it('should transfer funds from an existing account to a non-existing one', () => {
    setStorage({ 100: 230 });
    const transferData = {
      type: 'transfer',
      origin: '100',
      destination: '200',
      amount: 200,
    };
    expect(transfer(transferData)).toEqual({
      origin: { id: '100', balance: 30 },
      destination: { id: '200', balance: 200 },
    });
  });

  it('should throw an error if the origin account does not exist', () => {
    setStorage({ 500: 230 });
    const transferData = {
      type: 'transfer',
      origin: '100',
      destination: '200',
      amount: 200,
    };
    expect(() => transfer(transferData)).toThrowError(
      'No account with ID: 100',
    );
  });

  it('should throw an error if origin account balance is not enough', () => {
    setStorage({ 100: 230 });
    const transferData = {
      type: 'transfer',
      origin: '100',
      destination: '200',
      amount: 500,
    };
    expect(() => transfer(transferData)).toThrowError('Insufficient balance');
  });
});

describe('handleEvent', () => {
  it('should process an event', () => {
    {
      setStorage({ 100: 30 });
      const event = { type: 'deposit', destination: '100', amount: 250 };
      expect(handleEvent(event)).toEqual({
        destination: { id: '100', balance: 280 },
      });
    }

    {
      setStorage({ 100: 230 });
      const event = { type: 'withdraw', origin: '100', amount: 200 };
      expect(handleEvent(event)).toEqual({
        origin: { id: '100', balance: 30 },
      });
    }

    {
      setStorage({ 100: 230, 200: 0 });
      const event = {
        type: 'transfer',
        origin: '100',
        destination: '200',
        amount: 200,
      };
      expect(handleEvent(event)).toEqual({
        origin: { id: '100', balance: 30 },
        destination: { id: '200', balance: 200 },
      });
    }
  });

  it('should mutate the storage object', () => {
    {
      const storage = { 100: 30 };
      setStorage(storage);
      const event = { type: 'deposit', destination: '100', amount: 250 };
      handleEvent(event);
      expect(storage).not.toEqual({ 100: 30 });
      expect(storage).toEqual({ 100: 280 });
    }

    {
      const storage = { 100: 230 };
      setStorage(storage);
      const event = { type: 'withdraw', origin: '100', amount: 200 };
      handleEvent(event);
      expect(storage).not.toEqual({ 100: 230 });
      expect(storage).toEqual({ 100: 30 });
    }

    {
      const storage = { 100: 230, 200: 0 };
      setStorage(storage);
      const event = {
        type: 'transfer',
        origin: '100',
        destination: '200',
        amount: 200,
      };
      handleEvent(event);
      expect(storage).not.toEqual({ 100: 230, 200: 0 });
      expect(storage).toEqual({ 100: 30, 200: 200 });
    }
  });
});
