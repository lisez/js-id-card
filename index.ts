import { nanoid } from 'nanoid';

export type IDCard = {
  userID: string;
  error?: any;
};

const NoLocalStorageError = new Error('LocalStorage is not supported');

function checkStorageSupport(): boolean {
  return !!window.localStorage;
}

function getUserID(path: string): string {
  if (!checkStorageSupport()) {
    throw NoLocalStorageError;
  }

  return localStorage.getItem(path) || '';
}

function setUserID(path: string, userID: string): void {
  if (!checkStorageSupport()) {
    throw NoLocalStorageError;
  }

  localStorage.setItem(path, userID);
}

function generateUserID(): string {
  return nanoid();
}

export function idcard(path: string = 'js-id-card'): IDCard {
  const data: IDCard = {
    userID: '',
  };
  try {
    data.userID = getUserID(path) || generateUserID();
    setUserID(path, data.userID);
  } catch (error) {
    data.error = error;
  }
  return data;
}
