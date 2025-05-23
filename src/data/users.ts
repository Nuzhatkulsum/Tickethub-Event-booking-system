import { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    isAdmin: false
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    isAdmin: false
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    isAdmin: true
  }
];

// For demo purposes, we'll use a default user
export const currentUser: User = users[0];