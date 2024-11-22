package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import org.springframework.data.repository.query.Param;


import com.examly.springapp.model.User;

@Repository
public interface UserRepo  extends JpaRepository<User, Long>{
    @Query("SELECT u FROM User u WHERE u.email = :email  or u.username = :email")
	    Optional<User> findByEmail(@Param("email") String email);
	 
	 User findByUsername(String username);
	 boolean existsByEmail(String string);


}
