package com.examly.springapp.repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.examly.springapp.model.WiFiScheme;
import org.springframework.data.jpa.repository.Query;


@Repository
public interface WiFiSchemeRepo extends JpaRepository<WiFiScheme, Long> {

    Optional<WiFiScheme> findBySchemeName(String schemeName);

    boolean existsBySchemeName(String schemeName);

    @Query("SELECT w FROM WiFiScheme w WHERE w.region = :region")
    List<WiFiScheme> findWiFiSchemesByRegion(String region);    
}
