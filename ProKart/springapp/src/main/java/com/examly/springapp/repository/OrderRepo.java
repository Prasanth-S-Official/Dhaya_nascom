package com.examly.springapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.examly.springapp.model.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.user.userId = :userId")
    List<Order> findOrdersByUserId(int userId);
    
    @Query("SELECT o FROM Order o WHERE o.orderStatus = :status")
    List<Order> findOrdersByStatus(String status);
}
