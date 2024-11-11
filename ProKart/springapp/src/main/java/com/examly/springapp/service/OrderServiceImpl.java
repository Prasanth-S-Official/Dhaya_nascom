package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

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

    @Autowired
    private ProductRepo productRepo; // Needed to retrieve product details

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

        // Calculate total amount for the order
        double totalAmount = 0.0;
        for (OrderItem item : order.getOrderItems()) {
            // Retrieve the product details based on productId
            Optional<Product> productOpt = productRepo.findById(item.getProduct().getProductId());
            if (productOpt.isPresent()) {
                Product product = productOpt.get();
                item.setPrice(product.getPrice()); // Set price from product
                item.setOrder(order); // Set the order reference
                totalAmount += item.getPrice() * item.getQuantity(); // Calculate total
            } else {
                throw new IllegalArgumentException("Product with ID " + item.getProduct().getProductId() + " not found");
            }
        }
        order.setTotalAmount(totalAmount);

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
