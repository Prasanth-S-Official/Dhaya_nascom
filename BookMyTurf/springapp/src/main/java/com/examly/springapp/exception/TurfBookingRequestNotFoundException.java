package com.examly.springapp.exception;

public class TurfBookingRequestNotFoundException extends RuntimeException {

    public TurfBookingRequestNotFoundException(String message) {
        super(message);
    }
}
