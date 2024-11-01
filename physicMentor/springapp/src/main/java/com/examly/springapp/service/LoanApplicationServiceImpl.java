package com.examly.springapp.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Loan;
import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.LoanApplicationRepo;
import com.examly.springapp.repository.LoanRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class LoanApplicationServiceImpl implements LoanApplicationService {

    @Autowired
    private LoanApplicationRepo loanApplicationRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private LoanRepo loanRepo;

    public LoanApplication addLoanApplication(LoanApplication loanApplication) {
        try {
            Optional<User> userOptional = userRepo.findById(loanApplication.getUser().getUserId());
            Optional<Loan> loanOptional = loanRepo.findById(loanApplication.getLoan().getLoanId());

            if (userOptional.isPresent() && loanOptional.isPresent()) {
                loanApplication.setUser(userOptional.get());
                loanApplication.setLoan(loanOptional.get());
                loanApplication.setSubmissionDate(LocalDate.now());

                // Set other fields as needed for the new model
                loanApplication.setFarmLocation(loanApplication.getFarmLocation());
                loanApplication.setFarmerAddress(loanApplication.getFarmerAddress());
                loanApplication.setFarmSizeInAcres(loanApplication.getFarmSizeInAcres());
                loanApplication.setFarmPurpose(loanApplication.getFarmPurpose());
                loanApplication.setLoanStatus(loanApplication.getLoanStatus());
                loanApplication.setFile(loanApplication.getFile());

                return loanApplicationRepo.save(loanApplication);
            } else {
                throw new IllegalArgumentException("User or Loan not found");
            }
        } catch (Exception e) {
            System.err.println("Error adding loan application: " + e.getMessage());
            return null;
        }
    }

    public List<LoanApplication> getLoanApplicationByUserId(Long userId) {
        return loanApplicationRepo.findLoanApplicationByUserId(userId);
    }

    public Optional<LoanApplication> getLoanApplicationById(Long loanApplicationId) {
        return loanApplicationRepo.findById(loanApplicationId);
    }

    public List<LoanApplication> getAllLoanApplications() {
        return loanApplicationRepo.findAll();
    }

    public LoanApplication updateLoanApplication(Long loanApplicationId, LoanApplication updatedLoanApplication) {
        Optional<LoanApplication> optionalLoan = loanApplicationRepo.findById(loanApplicationId);
        if (optionalLoan.isPresent()) {
            LoanApplication existingLoanApplication = optionalLoan.get();
    
            // Update fields for the new model
            existingLoanApplication.setFarmLocation(updatedLoanApplication.getFarmLocation());
            existingLoanApplication.setFarmerAddress(updatedLoanApplication.getFarmerAddress());
            existingLoanApplication.setFarmSizeInAcres(updatedLoanApplication.getFarmSizeInAcres());
            existingLoanApplication.setFarmPurpose(updatedLoanApplication.getFarmPurpose());
            existingLoanApplication.setLoanStatus(updatedLoanApplication.getLoanStatus());
            existingLoanApplication.setFile(updatedLoanApplication.getFile());
            existingLoanApplication.setSubmissionDate(updatedLoanApplication.getSubmissionDate());
    
            return loanApplicationRepo.save(existingLoanApplication);
        } else {
            return null; // Handle case where loan application with loanApplicationId is not found
        }
    }
    

    public LoanApplication deleteLoanApplication(Long loanApplicationId) {
        Optional<LoanApplication> optionalApplication = loanApplicationRepo.findById(loanApplicationId);

        if (optionalApplication.isPresent()) {
            LoanApplication deletedLoanApplication = optionalApplication.get();
            loanApplicationRepo.deleteById(loanApplicationId);
            return deletedLoanApplication;
        } else {
            return null; // Return null if loan application with loanApplicationId is not found
        }
    }
}
