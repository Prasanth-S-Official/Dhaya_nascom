package com.example.springapp.controller;

import com.example.springapp.service.AWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

@Controller
public class AWTController {

    @Autowired
    private AWTService awtService;

    public AWTController() {
        EventQueue.invokeLater(() -> {
            Frame frame = new Frame("Spring Boot AWT Example");
            frame.setLayout(new FlowLayout());

            Label label = new Label("Enter Name: ");
            TextField textField = new TextField(20);
            Button button = new Button("Submit");

            frame.add(label);
            frame.add(textField);
            frame.add(button);

            button.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    String input = textField.getText();
                    awtService.processInput(input); // Delegate to service layer
                }
            });

            frame.setSize(400, 200);
            frame.setVisible(true);

            frame.addWindowListener(new java.awt.event.WindowAdapter() {
                public void windowClosing(java.awt.event.WindowEvent e) {
                    frame.dispose();
                }
            });
        });
    }
}
