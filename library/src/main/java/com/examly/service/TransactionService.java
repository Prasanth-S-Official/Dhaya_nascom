package com.examly.service;

import com.examly.entity.Transaction;
import java.util.List;

public interface TransactionService {
    void issueBook(Transaction transaction);
    void returnBook(int transactionId);
    Transaction getTransactionById(int transactionId);
    List<Transaction> getAllTransactions();
}
