// eslint-disable-next-line import/no-mutable-exports
let storage: {
  [accountID: string]: number;
} = {};

const setStorage = (newStorage = storage): void => {
  storage = newStorage;
};

const clearStorage = (): void => setStorage({});

export { storage, clearStorage, setStorage };
