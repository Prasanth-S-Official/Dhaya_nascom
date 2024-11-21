package com.examly.springapp.repository;

import com.examly.springapp.model.WiFiSchemeRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WiFiSchemeRequestRepo extends JpaRepository<WiFiSchemeRequest, Long> {

    @Query("SELECT w FROM WiFiSchemeRequest w WHERE w.user.userId = :userId")
    List<WiFiSchemeRequest> findWiFiSchemeRequestsByUserId(long userId);

    @Query("SELECT w FROM WiFiSchemeRequest w WHERE w.wifiScheme.wifiSchemeId = :wifiSchemeId")
    List<WiFiSchemeRequest> findWiFiSchemeRequestsBySchemeId(Long wifiSchemeId);

    Optional<WiFiSchemeRequest> findByUser_UserIdAndWiFiScheme_WifiSchemeId(long userId, Long wifiSchemeId);

    boolean existsByWiFiScheme_WifiSchemeId(Long wifiSchemeId);
}
