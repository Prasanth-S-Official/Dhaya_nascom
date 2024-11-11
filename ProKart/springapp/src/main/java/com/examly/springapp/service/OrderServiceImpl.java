package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.DuplicateOrderException;
import com.examly.springapp.exceptions.OrderNotFoundException;
import com.examly.springapp.model.Order;
import com.examly.springapp.model.OrderItem;
import com.examly.springapp.model.Product;
import com.examly.springapp.repository.OrderRepo;
import com.examly.springapp.repository.OrderItemRepo;
import com.examly.springapp.repository.ProductRepo;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private OrderItemRepo orderItemRepo;

    // private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    private ProductRepo productRepo; // Needed to retrieve product details
 

    @Override
    public Order addOrder(Order order) {
        // Calculate total amount for the order
        double totalAmount = 0.0;
        for (OrderItem item : order.getOrderItems()) {
            Optional<Product> productOpt = productRepo.findById(item.getProduct().getProductId());
            if (productOpt.isPresent()) {
                Product product = productOpt.get();
                item.setPrice(product.getPrice());
                item.setOrder(order);
                totalAmount += item.getPrice() * item.getQuantity();
            } else {
                throw new IllegalArgumentException("Product with ID " + item.getProduct().getProductId() + " not found");
            }
        }
        order.setTotalAmount(totalAmount);
    
        Order savedOrder = orderRepo.save(order);
    
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
        List<Order> orders = orderRepo.findAll();
        System.out.println("Orders fetched from database: " + orders.size()); // Debugging line
        return orders;
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
