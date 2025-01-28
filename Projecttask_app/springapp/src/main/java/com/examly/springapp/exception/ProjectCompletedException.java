package com.examly.springapp.exception;

public class ProjectCompletedException extends RuntimeException {
    public ProjectCompletedException(String message) {
        super(message);
    }
}
