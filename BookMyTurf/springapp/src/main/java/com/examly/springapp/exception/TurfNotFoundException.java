package com.examly.springapp.exception;

public class TurfNotFoundException extends RuntimeException {

    public TurfNotFoundException(String message) {
        super(message);
    }
}
