import type { Book } from './Item';

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
  savedBooks: Book[];
}
