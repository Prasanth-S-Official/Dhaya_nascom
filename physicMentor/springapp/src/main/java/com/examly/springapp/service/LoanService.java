package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Loan;

public interface LoanService {
Loan addLoan(Loan loan);
    Optional<Loan> getLoanById(Long loanId);
    List<Loan> getAllLoans();
    Loan updateLoan(Long loanId, Loan updatedLoan);
    Loan deleteLoan(Long loanId);
    
    
}
