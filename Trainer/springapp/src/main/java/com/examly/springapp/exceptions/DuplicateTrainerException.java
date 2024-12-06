package com.examly.springapp.exceptions;

public class DuplicateTrainerException extends RuntimeException {
    public DuplicateTrainerException(String message) {
        super(message);
    }
}
