package com.examly.springapp.exception;

public class TaskLimitExceededException extends RuntimeException {

    public TaskLimitExceededException(String message) {
        super(message);
    }
}
