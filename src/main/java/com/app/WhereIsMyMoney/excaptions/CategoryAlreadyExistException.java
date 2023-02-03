package com.app.WhereIsMyMoney.excaptions;

public class CategoryAlreadyExistException extends Exception {
    public CategoryAlreadyExistException(String message) {
        super(message);
    }
}
