package com.examly.springapp.exceptions;

public class MaterialRequestException extends RuntimeException {
    public MaterialRequestException(String message) {
        super(message);
    }
}
