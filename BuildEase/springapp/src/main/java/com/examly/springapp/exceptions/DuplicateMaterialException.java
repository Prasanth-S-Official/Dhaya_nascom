package com.examly.springapp.exceptions;

public class DuplicateMaterialException extends RuntimeException {
    public DuplicateMaterialException(String message) {
        super(message);
    }
}
