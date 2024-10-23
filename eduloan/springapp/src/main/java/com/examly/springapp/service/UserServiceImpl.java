package com.examly.springapp.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {



    @Autowired
    private UserRepo userRepo;

    public User createUser(User user) {
         BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String passwordEncoded = passwordEncoder.encode(user.getPassword());
        user.setPassword(passwordEncoded);
        userRepo.save(user);
        return userRepo.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User users = userRepo.findByEmail(email).get();
        if (users==null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        
        return org.springframework.security.core.userdetails.User.builder()
                .username(users.getUsername())
                .password(users.getPassword())
                .roles(users.getUserRole())
                .build();
    }


    public List<User> findAllUsers(){
        return (List<User>)this.userRepo.findAll();
    }

	@Override
	public User loginUser(User user) {
		// TODO Auto-generated method stub
		return null;
	}

}