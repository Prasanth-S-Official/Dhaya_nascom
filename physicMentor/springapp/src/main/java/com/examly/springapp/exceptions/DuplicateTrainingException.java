package com.examly.springapp.exceptions;

public class DuplicateTrainingException extends RuntimeException {
    public DuplicateTrainingException(String message) {
        super(message);
    }
}
