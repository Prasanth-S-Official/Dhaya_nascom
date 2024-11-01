package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.LoanApplication;

@Repository
public interface LoanApplicationRepo  extends JpaRepository<LoanApplication,Long>{

    @Query("SELECT l FROM LoanApplication l WHERE l.user.userId = :userId")
    List<LoanApplication> findLoanApplicationByUserId(Long userId);
}
