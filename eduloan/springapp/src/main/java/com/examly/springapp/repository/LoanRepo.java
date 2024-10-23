package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Loan;

@Repository
public interface LoanRepo extends JpaRepository <Loan,Long>{

    Optional<Loan> findByLoanType(String loanType);
    
}
