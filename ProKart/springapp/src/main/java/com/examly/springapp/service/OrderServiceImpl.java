package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Order;
import com.examly.springapp.repository.OrderRepo;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    public Order addOrder(Order order) {
        return orderRepo.save(order);
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepo.findById(orderId);
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Order updateOrder(Long orderId, Order updatedOrder) {
        if (orderRepo.existsById(orderId)) {
            updatedOrder.setOrderId(orderId);
            return orderRepo.save(updatedOrder);
        }
        return null;
    }

    public boolean deleteOrder(Long orderId) {
        if (orderRepo.existsById(orderId)) {
            orderRepo.deleteById(orderId);
            return true;
        }
        return false;
    }
}
