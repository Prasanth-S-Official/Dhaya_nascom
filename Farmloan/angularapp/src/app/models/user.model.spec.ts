import { User } from "./user.model";

describe('User Model', () => {

  fit('Frontend_User_model_should_create_an_instance', () => {
       const user: User = {
      userId: 1,
      email: 'user@example.com',
      password: 'password123',
      username: 'john_doe',
      mobileNumber: '1234567890',
      userRole: 'admin'
    };

    expect(user).toBeTruthy();
    expect(user.userId).toBe(1);
    expect(user.email).toBe('user@example.com');
   
  });

});
