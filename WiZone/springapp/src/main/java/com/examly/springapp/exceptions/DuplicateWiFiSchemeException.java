package com.examly.springapp.exceptions;

public class DuplicateWiFiSchemeException extends RuntimeException {
    public DuplicateWiFiSchemeException(String message) {
        super(message);
    }
}
