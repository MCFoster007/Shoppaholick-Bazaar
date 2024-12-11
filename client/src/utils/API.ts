import type { User } from '../models/User.js';
import type { Item } from '../models/Item.js';

// route to get logged in user's info (needs the token)
export const getMe = (token: string) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData: User) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData: User) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save item data for a logged in user
export const saveItem = (itemData: Item, token: string) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(itemData),
  });
};

// remove saved book data for a logged in user
export const deleteBook = (itemId: string, token: string) => {
  return fetch(`/api/users/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};


