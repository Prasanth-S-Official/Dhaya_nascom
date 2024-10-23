package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.DuplicateLoanException;
import com.examly.springapp.model.Loan;
import com.examly.springapp.repository.LoanRepo;


@Service
public class LoanServiceImpl implements LoanService {


    @Autowired
    private LoanRepo loanRepo;

    public Loan addLoan(Loan loan) {
        // Check for duplicate AgroChemical
        Optional<Loan> existingLoan = loanRepo.findByLoanType(loan.getLoanType());
        if (existingLoan.isPresent()) {
            throw new DuplicateLoanException("Loan Type " + loan.getLoanType()  + " already exists.");
        }
        return loanRepo.save(loan);
    }
    public Optional<Loan> getLoanById(Long loanId)
    {
        return loanRepo.findById(loanId);
    }


    public List<Loan> getAllLoans()
    {
        return loanRepo.findAll();
    }

    public Loan updateLoan(Long loanId, Loan updatedLoan) {
        Optional<Loan> optionalLoan = loanRepo.findById(loanId);
        if (optionalLoan.isPresent()) {
            //Loan existingLoan = optionalLoan.get();
            updatedLoan.setLoanId(loanId);
            
            
            // Save and return the updated loan
            return loanRepo.save(updatedLoan);
        } else {
            
            return null;
        }
    }

    public Loan deleteLoan(Long loanId)
    {

        Optional<Loan> loanOptional = loanRepo.findById(loanId);

        if(loanOptional.isPresent())
        {
            Loan deletedloan = loanOptional.get();

            loanRepo.deleteById(loanId);
            return deletedloan;
        }
        else
        {
            return null;
        }

    }

    



    
}
