package com.examly.springapp.model;

public class LoginDTO {

    private String token;
    private String username;
    private String userRole;
    private Long userId; // Changed from int to Long

    public Long getUserId() { // Updated getter
        return userId;
    }

    public void setUserId(Long userId) { // Updated setter
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}
