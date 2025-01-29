package com.examly.springapp.exception;

public class InvalidTaskStatusUpdateException extends RuntimeException {

    public InvalidTaskStatusUpdateException(String message) {
        super(message);
    }
}
