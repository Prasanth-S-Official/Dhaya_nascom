package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Order;
import com.examly.springapp.model.OrderItem;
import com.examly.springapp.repository.OrderRepo;
import com.examly.springapp.repository.OrderItemRepo;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private OrderItemRepo orderItemRepo; // To handle saving order items

    @Override
    public Order addOrder(Order order) {
        // Save the order first
        Order savedOrder = orderRepo.save(order);

        // For each item in the order, set the order reference and save it as an OrderItem
        for (OrderItem item : order.getOrderItems()) {
            item.setOrder(savedOrder); // Associate the item with the order
            orderItemRepo.save(item);  // Save each order item
        }

        return savedOrder; // Return the saved order with items
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
        }
        return null;
    }

    @Override
    public boolean deleteOrder(Long orderId) {
        if (orderRepo.existsById(orderId)) {
            orderRepo.deleteById(orderId);
            return true;
        }
        return false;
    }
}
