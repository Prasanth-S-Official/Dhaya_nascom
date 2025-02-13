package com.examly.service;

import com.examly.entity.Book;
import com.examly.entity.Member;
import com.examly.entity.Transaction;
import com.examly.service.TransactionService;
import com.examly.util.DBConnectionUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TransactionServiceImpl implements TransactionService {

    private Connection connection;

    public TransactionServiceImpl() {
        connection = DBConnectionUtil.getConnection();
    }



    @Override
public void issueBook(Transaction transaction) {
    try {
        String query = "INSERT INTO transactions (bookId, memberId, issueDate) VALUES (?, ?, ?)";
        PreparedStatement statement = connection.prepareStatement(query);
        statement.setInt(1, transaction.getBook().getBookId()); // Get bookId from the Book object
        statement.setInt(2, transaction.getMember().getMemberId()); // Get memberId from the Member object
        statement.setDate(3, Date.valueOf(transaction.getIssueDate()));
        statement.executeUpdate();
    } catch (SQLException e) {
        e.printStackTrace();
    }
}

@Override
public Transaction getTransactionById(int transactionId) {
    try {
        String query = "SELECT * FROM transactions WHERE transactionId = ?";
        PreparedStatement statement = connection.prepareStatement(query);
        statement.setInt(1, transactionId);
        ResultSet resultSet = statement.executeQuery();
        if (resultSet.next()) {
            Transaction transaction = new Transaction();
            transaction.setTransactionId(resultSet.getInt("transactionId"));
            // Here you need to get the book and member objects somehow
            // For simplicity, I'm assuming you are fetching the IDs, not the whole objects
            int bookId = resultSet.getInt("bookId");
            int memberId = resultSet.getInt("memberId");
            transaction.setBook(new Book());  // You will need to populate the Book object
            transaction.setMember(new Member());  // You will need to populate the Member object
            transaction.setIssueDate(resultSet.getString("issueDate"));
            transaction.setReturnDate(resultSet.getString("returnDate") != null
                    ? resultSet.getString("returnDate")
                    : null);
            return transaction;
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return null;
}

    @Override
    public void returnBook(int transactionId) {
        try {
            String query = "UPDATE transactions SET returnDate = ? WHERE transactionId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setDate(1, Date.valueOf(java.time.LocalDate.now()));
            statement.setInt(2, transactionId);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    @Override
    public List<Transaction> getAllTransactions() {
        List<Transaction> transactions = new ArrayList<>();
        try {
            String query = "SELECT * FROM transactions";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                Transaction transaction = new Transaction();
                transaction.setTransactionId(resultSet.getInt("transactionId"));
                transaction.setIssueDate(resultSet.getString("issueDate"));
                transaction.setReturnDate(resultSet.getString("returnDate") != null
                        ? resultSet.getString("returnDate")
                        : null);
                transactions.add(transaction);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return transactions;
    }


    
}
