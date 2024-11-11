public class OrderService {
    
}
package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import com.examly.springapp.model.Order;

public interface OrderService {
    Order addOrder(Order order);
    Optional<Order> getOrderById(Long orderId);
    List<Order> getAllOrders();
    Order updateOrder(Long orderId, Order order);
    boolean deleteOrder(Long orderId);
}
package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import com.examly.springapp.model.Order;

public interface OrderService {
    Order addOrder(Order order);
    Optional<Order> getOrderById(Long orderId);
    List<Order> getAllOrders();
    Order updateOrder(Long orderId, Order order);
    boolean deleteOrder(Long orderId);
}
