// import { Injectable } from '@angular/core';
// import { Users } from '../models/users.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private users: Users[] = [
//     { id: 1, name: 'John Doe', email: 'john@example.com' },
//     { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
//   ];

//   // Fetch all users
//   getUsers(): Users[] {
//     return this.users;
//   }

//   // Add a new user
//   addUser(user: Users): void {
//     this.users.push(user);
//   }

//   // Update an existing user
//   updateUser(updatedUser: Users): void {
//     const index = this.users.findIndex((user) => user.id === updatedUser.id);
//     if (index !== -1) {
//       this.users[index] = updatedUser;
//     }
//   }
// }

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Users } from '../models/users.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private users: Users[] = [
//     { id: 1, name: 'John Doe', email: 'john@example.com' },
//     { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
//   ];

//   // Using BehaviorSubject to allow subscriptions
//   private usersSubject: BehaviorSubject<Users[]> = new BehaviorSubject<Users[]>(this.users);

//   // Fetch all users as an observable
//   getUsers(): Observable<Users[]> {
//     return this.usersSubject.asObservable();
//   }

//   // Add a new user and emit the updated list
//   addUser(user: Users): void {
//     this.users.push(user);
//     this.usersSubject.next(this.users); // Emit updated user list
//   }

//   // Update an existing user and emit the updated list
//   updateUser(updatedUser: Users): void {
//     const index = this.users.findIndex((user) => user.id === updatedUser.id);
//     if (index !== -1) {
//       this.users[index] = updatedUser;
//       this.usersSubject.next(this.users); // Emit updated user list
//     }
//   }
// }

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Users } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: Required<Users>[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];


  getUsers(): Observable<Users[]> {
    return of(this.users);
  }


  addUser(user : Users) : void{
    this.users.push(user as Required<Users>);

  }

  updateUser(user: Users): void {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) this.users[index] = user as Required<Users>;
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
