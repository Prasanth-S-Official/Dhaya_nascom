package com.examly.springapp.exceptions;

public class DuplicateBidException extends RuntimeException {
    public DuplicateBidException(String message) {
        super(message);
    }
}
