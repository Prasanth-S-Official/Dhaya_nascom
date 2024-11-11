// package com.examly.springapp.controller;

// import java.util.List;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import com.examly.springapp.model.Order;
// import com.examly.springapp.model.OrderItem;
// import com.examly.springapp.service.OrderService;

// @RestController
// @RequestMapping("/api/orders")
// public class OrderController {

//     @Autowired
//     private OrderService orderService;

//     @PostMapping
//     public ResponseEntity<Order> addOrder(@RequestBody Order order) {
//         // Add order and order items (like from the cart)
//         Order newOrder = orderService.addOrder(order);
//         return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
//     }

//     @GetMapping("/{orderId}")
//     public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
//         Optional<Order> order = orderService.getOrderById(orderId);
//         return order.map(ResponseEntity::ok)
//                     .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
//     }

//     @GetMapping
//     public ResponseEntity<?> getAllOrders() {
//         try {
//             List<Order> orders = orderService.getAllOrders();
//             return ResponseEntity.ok(orders);
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                     .body("An error occurred while fetching orders: " + e.getMessage());
//         }
//     }
    
//     @PutMapping("/{orderId}")
//     public ResponseEntity<Order> updateOrder(@PathVariable Long orderId, @RequestBody Order order) {
//         Order updatedOrder = orderService.updateOrder(orderId, order);
//         return updatedOrder != null ? ResponseEntity.ok(updatedOrder)
//                                     : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//     }

//     @DeleteMapping("/{orderId}")
//     public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
//         boolean deleted = orderService.deleteOrder(orderId);
//         return deleted ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//     }
// }


package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.Order;
import com.examly.springapp.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> addOrder(@RequestBody Order order) {
        Order newOrder = orderService.addOrder(order);
        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        Optional<Order> order = orderService.getOrderById(orderId);
        return order.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long orderId, @RequestBody Order order) {
        Order updatedOrder = orderService.updateOrder(orderId, order);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.ok().build();
    }
}
