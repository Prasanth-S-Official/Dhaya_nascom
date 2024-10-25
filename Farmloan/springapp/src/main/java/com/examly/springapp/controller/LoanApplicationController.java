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

import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.service.LoanApplicationServiceImpl;

@RestController
public class LoanApplicationController {

    @Autowired
    private LoanApplicationServiceImpl loanApplicationServiceImpl;

    // @PostMapping("/api/loanapplication")
    // public ResponseEntity<LoanApplication> addLoanApplication(@RequestBody LoanApplication loanApplication)
    // {
    //     LoanApplication newLoanApplication = loanApplicationServiceImpl.addLoanApplication(loanApplication);
    //     if(newLoanApplication!=null)
    //     {

    //         return ResponseEntity.status(HttpStatus.CREATED).body(newLoanApplication);
    //     }
    //     else
    //     {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    //     }
    // }

    @PostMapping("/api/loanapplication")
    public ResponseEntity<LoanApplication> addLoanApplication(@RequestBody LoanApplication loanApplication) {
        LoanApplication newLoanApplication = loanApplicationServiceImpl.addLoanApplication(loanApplication);
        if (newLoanApplication != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(newLoanApplication);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    
    @GetMapping("/api/loanapplication/{loanApplicationId}")
    public ResponseEntity<Optional<LoanApplication>> getLoanApplicationById(@PathVariable Long loanApplicationId)
    {
       Optional<LoanApplication> loanApplication = loanApplicationServiceImpl.getLoanApplicationById(loanApplicationId);
        if(loanApplication.isPresent())
        {
            return ResponseEntity.status(HttpStatus.OK).body(loanApplication);
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



    @GetMapping("/api/loanapplication/user/{userId}")
    public  ResponseEntity<List<LoanApplication>> getMyLoanApplicationByUserId(@PathVariable Long userId)
    {
        List<LoanApplication> myloanaolications  = loanApplicationServiceImpl.getLoanApplicationByUserId(userId);
    
        
         return ResponseEntity.status(HttpStatus.OK).body(myloanaolications);
       
    }


    @GetMapping("/api/loanapplication")
    public ResponseEntity<List<LoanApplication>> getAllLoanApplications()
    {
       List<LoanApplication> allLoanApplications= loanApplicationServiceImpl.getAllLoanApplications();
       return ResponseEntity.status(HttpStatus.OK).body(allLoanApplications);
    }
    

    // @PutMapping("/api/loanapplication/{loanapplicationId}")
    // public ResponseEntity<LoanApplication> updateLoanApplication(@PathVariable Long loanapplicationId,@RequestBody LoanApplication loanApplication)
    // {
    //     LoanApplication loanApplication1 =loanApplicationServiceImpl.updateLoanApplication(loanapplicationId,loanApplication);
    //     if(loanApplication1!=null)
    //     {
    //         return ResponseEntity.status(HttpStatus.OK).body(loanApplication);
    //     }
    //     else
    //     {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    //     }
    // }



    @PutMapping("/api/loanapplication/{loanapplicationId}")
public ResponseEntity<LoanApplication> updateLoanApplication(
        @PathVariable Long loanapplicationId, 
        @RequestBody LoanApplication loanApplication) {
    
    LoanApplication updatedLoanApplication = loanApplicationServiceImpl.updateLoanApplication(loanapplicationId, loanApplication);
    
    if (updatedLoanApplication != null) {
        return ResponseEntity.status(HttpStatus.OK).body(updatedLoanApplication);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}



    @DeleteMapping("/api/loanapplication/{loanapplicationId}")
    public ResponseEntity<LoanApplication> deleteLoanApplication(@PathVariable Long loanapplicationId)
    {
        LoanApplication loanApplication =loanApplicationServiceImpl.deleteLoanApplication(loanapplicationId);
        if(loanApplication!=null)
        {
            return ResponseEntity.status(HttpStatus.OK).body(loanApplication);
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }
}
