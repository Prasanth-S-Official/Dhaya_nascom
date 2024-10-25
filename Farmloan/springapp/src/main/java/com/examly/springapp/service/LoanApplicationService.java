package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.LoanApplication;

public interface LoanApplicationService {
    
     LoanApplication addLoanApplication(LoanApplication loanApplication);
    List<LoanApplication> getLoanApplicationByUserId(Long userId);
    Optional<LoanApplication> getLoanApplicationById(Long loanApplicationId);
    List<LoanApplication> getAllLoanApplications();
    LoanApplication updateLoanApplication(Long loanApplicationId, LoanApplication updatedLoanApplication);
    LoanApplication deleteLoanApplication(Long loanApplicationId);
}
