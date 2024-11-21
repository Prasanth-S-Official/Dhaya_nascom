package com.examly.springapp.repository;

import com.examly.springapp.model.WiFiSchemeRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WiFiSchemeRequestRepo extends JpaRepository<WiFiSchemeRequest, Long> {
    @Query("SELECT r FROM WiFiSchemeRequest r WHERE r.user.userId = :userId")
    List<WiFiSchemeRequest> findWiFiSchemeRequestsByUserId(Long userId);

    @Query("SELECT r FROM WiFiSchemeRequest r WHERE r.wifiScheme.wifiSchemeId = :wifiSchemeId")
    List<WiFiSchemeRequest> findWiFiSchemeRequestsBySchemeId(Long wifiSchemeId);

    Optional<WiFiSchemeRequest> findByUser_UserIdAndWifiScheme_WifiSchemeId(Long userId, Long wifiSchemeId);
}
