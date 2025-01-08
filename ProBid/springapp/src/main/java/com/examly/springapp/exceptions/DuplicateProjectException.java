package com.examly.springapp.exceptions;

public class DuplicateProjectException extends RuntimeException {
    public DuplicateProjectException(String message) {
        super(message);
    }
}
