package com.example.springapp.service;

import org.springframework.stereotype.Service;

@Service
public class AWTService {

    public void processInput(String input) {
        // Here you can add logic like saving to a database, etc.
        System.out.println("Processed Input: " + input);
    }
}
