package com.examly.springapp.exceptions;

public class MaterialDeletionException extends RuntimeException {
    public MaterialDeletionException(String message) {
        super(message);
    }
}
