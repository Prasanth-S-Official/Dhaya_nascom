package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.exceptions.DuplicateLoanException;
import com.examly.springapp.model.Loan;
import com.examly.springapp.service.LoanServiceImpl;


@RestController
public class LoanController {


    @Autowired
    private LoanServiceImpl loanServiceImpl;


    @PostMapping("/api/loan")
    public ResponseEntity<?> addLoan(@RequestBody Loan loan) {
        try {
            Loan newLoan = loanServiceImpl.addLoan(loan);
            return new ResponseEntity<>(newLoan, HttpStatus.CREATED);
        } catch (DuplicateLoanException e) {
            // Return the exception message and HTTP status CONFLICT
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }
    @GetMapping("/api/loan/{loanId}")
    public ResponseEntity<Loan> getLoanById(@PathVariable Long loanId)
    {
       Optional<Loan> loan = loanServiceImpl.getLoanById(loanId);
        if(loan.isPresent())
        {
            return ResponseEntity.status(HttpStatus.OK).body(loan.get());
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @GetMapping("/api/loan")
    public ResponseEntity<List<Loan>> getAllLoans()
    {
       List<Loan> allLoans= loanServiceImpl.getAllLoans();
       return ResponseEntity.status(HttpStatus.OK).body(allLoans);
    }
    

    @PutMapping("/api/loan/{loanId}")
    public ResponseEntity<Loan> updateLoan(@PathVariable Long loanId,@RequestBody Loan loan)
    {
        Loan loan1 =loanServiceImpl.updateLoan(loanId,loan);
        if(loan1!=null)
        {
            return ResponseEntity.status(HttpStatus.OK).body(loan);
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



    @DeleteMapping("/api/loan/{loanId}")
    public ResponseEntity<Loan> deleteLoan(@PathVariable Long loanId) {
        Loan loan = loanServiceImpl.deleteLoan(loanId);
        if (loan != null) {
            return ResponseEntity.status(HttpStatus.OK).body(loan);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    



    






    
}
