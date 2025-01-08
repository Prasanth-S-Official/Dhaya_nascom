package com.examly.springapp.exceptions;

public class BidNotFoundException extends RuntimeException {
    public BidNotFoundException(String message) {
        super(message);
    }
}
