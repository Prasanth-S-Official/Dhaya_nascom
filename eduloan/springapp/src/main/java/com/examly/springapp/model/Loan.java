package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Loan {


@Id
@GeneratedValue(strategy = GenerationType.AUTO)    
private Long loanId;
private String loanType;
private String description;
private double interestRate;
private double maximumAmount;
private int repaymentTenure;
private String eligibility;
private String documentsRequired;


public Loan() {
}

public Long getLoanId() {
    return loanId;

}
public void setLoanId(Long loanId) {
    this.loanId = loanId;
}
public String getLoanType() {
    return loanType;
}
public void setLoanType(String loanType) {
    this.loanType = loanType;
}
public String getDescription() {
    return description;
}
public void setDescription(String description) {
    this.description = description;
}
public double getInterestRate() {
    return interestRate;
}
public void setInterestRate(double interestRate) {
    this.interestRate = interestRate;
}
public double getMaximumAmount() {
    return maximumAmount;
}
public void setMaximumAmount(double maximumAmount) {
    this.maximumAmount = maximumAmount;
}
public int getRepaymentTenure() {
    return repaymentTenure;
}
public void setRepaymentTenure(int repaymentTenure) {
    this.repaymentTenure = repaymentTenure;
}
public String getEligibility() {
    return eligibility;
}
public void setEligibility(String eligibility) {
    this.eligibility = eligibility;
}
public String getDocumentsRequired() {
    return documentsRequired;
}
public void setDocumentsRequired(String documentsRequired) {
    this.documentsRequired = documentsRequired;
}







    
}
