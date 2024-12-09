import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { Users } from '../models/users.model';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
  });

  fit('should return the list of users', (done) => {
    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
      ]);
      done(); // Ensure the test completes
    });
  });

  fit('should add a new user', (done) => {
    const newUser: Users = { id: 3, name: 'Alice Smith', email: 'alice@example.com' };
    service.addUser(newUser);

    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(3);
      expect(users).toContain(newUser);
      done();
    });
  });

  fit('should update an existing user', (done) => {
    const updatedUser: Users = { id: 1, name: 'John Smith', email: 'johnsmith@example.com' };
    service.updateUser(updatedUser);

    service.getUsers().subscribe((users) => {
      const user = users.find((u) => u.id === updatedUser.id);
      expect(user?.name).toBe('John Smith');
      expect(user?.email).toBe('johnsmith@example.com');
      done();
    });
  });

  fit('should not update if user does not exist', (done) => {
    const nonExistentUser: Users = { id: 99, name: 'Non Existent', email: 'nonexistent@example.com' };
    service.updateUser(nonExistentUser);

    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(2); // No changes
      expect(users.find((u) => u.id === 99)).toBeUndefined();
      done();
    });
  });
});
