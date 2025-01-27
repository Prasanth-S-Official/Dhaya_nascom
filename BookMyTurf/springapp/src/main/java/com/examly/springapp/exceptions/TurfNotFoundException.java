package com.examly.springapp.exceptions;

public class TurfNotFoundException extends RuntimeException {

    public TurfNotFoundException(String message) {
        super(message);
    }
}
