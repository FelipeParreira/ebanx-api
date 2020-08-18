/* eslint-disable no-param-reassign */
import { checkAccountExists, getBalance, updateBalance } from '../model';
import { eventDTO, processedEventDTO, balanceUpdateDTO } from '../DTOs';

export const deposit = ({
  destination = '',
  amount,
}: eventDTO): processedEventDTO => {
  try {
    checkAccountExists(destination);
  } catch (err) {
    if (err.message.includes('No account with ID')) {
      updateBalance(destination, 0);
    } else throw err;
  }

  const updatedBalance = getBalance(destination) + amount;
  return { destination: { id: destination, balance: updatedBalance } };
};

export const withdraw = ({
  origin = '',
  amount,
}: eventDTO): processedEventDTO => {
  const balance = getBalance(origin);
  if (balance < amount) {
    throw new Error('Insufficient balance');
  }

  const updatedBalance = getBalance(origin) - amount;
  return { origin: { id: origin, balance: updatedBalance } };
};

export const transfer = (event: eventDTO): processedEventDTO => {
  const withdrawalResult = withdraw(event);
  const depositResult = deposit(event);

  return {
    ...withdrawalResult,
    ...depositResult,
  };
};

const eventHandlers: {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [eventHandler: string]: Function;
} = {
  deposit,
  withdraw,
  transfer,
};

export const handleEvent = (event: eventDTO): processedEventDTO => {
  const processedEvent = eventHandlers[event.type](event);

  const balanceUpdates: balanceUpdateDTO[] = Object.values(processedEvent);
  // eslint-disable-next-line prettier/prettier
  balanceUpdates.forEach(({ id, balance }) => updateBalance(id, balance));

  return processedEvent;
};

export default handleEvent;
