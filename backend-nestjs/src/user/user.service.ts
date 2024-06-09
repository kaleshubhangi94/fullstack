import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

@Injectable()
export class UserService {
  private users: User[] = [];
  private idCounter = 1;

  addUser(user: Omit<User, 'id'>) {
    const newUser = { ...user, id: this.idCounter++ };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updatedUser: Omit<User, 'id'>) {
    const index = this.users.findIndex(user => user.id === id);
    if (index > -1) {
      this.users[index] = { id, ...updatedUser };
      return this.users[index];
    }
    return null;
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  getUsers() {
    return this.users;
  }
}
