package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.DuplicateOrderException;
import com.examly.springapp.exceptions.OrderNotFoundException;
import com.examly.springapp.model.Order;
import com.examly.springapp.model.OrderItem;
import com.examly.springapp.repository.OrderRepo;
import com.examly.springapp.repository.OrderItemRepo;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private OrderItemRepo orderItemRepo;

    @Override
    public Order addOrder(Order order) {
        // Example check for duplicate order, assuming "userId" and "orderStatus" can uniquely identify an order
        Optional<Order> existingOrder = orderRepo.findOrdersByUserId(order.getUser().getUserId()).stream()
                .filter(o -> o.getOrderStatus().equals(order.getOrderStatus()))
                .findFirst();

        if (existingOrder.isPresent()) {
            throw new DuplicateOrderException("Order for user ID " + order.getUser().getUserId() 
                                              + " with status " + order.getOrderStatus() + " already exists.");
        }

        // Save the order
        Order savedOrder = orderRepo.save(order);

        // Save each OrderItem and associate it with the Order
        for (OrderItem item : order.getOrderItems()) {
            item.setOrder(savedOrder);
            orderItemRepo.save(item);
        }

        return savedOrder;
    }

    @Override
    public Optional<Order> getOrderById(Long orderId) {
        return orderRepo.findById(orderId);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    @Override
    public Order updateOrder(Long orderId, Order updatedOrder) {
        if (orderRepo.existsById(orderId)) {
            updatedOrder.setOrderId(orderId);
            return orderRepo.save(updatedOrder);
        } else {
            throw new OrderNotFoundException("Order with ID " + orderId + " not found");
        }
    }

    @Override
    public boolean deleteOrder(Long orderId) {
        if (orderRepo.existsById(orderId)) {
            orderRepo.deleteById(orderId);
            return true;
        } else {
            throw new OrderNotFoundException("Order with ID " + orderId + " not found");
        }
    }
}
