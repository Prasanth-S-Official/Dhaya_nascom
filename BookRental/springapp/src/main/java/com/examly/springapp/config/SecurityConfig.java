package com.examly.springapp.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.examly.springapp.service.UserServiceImpl;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Autowired
    private JwtAuthenticationEntryPoint entryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf().disable()
                .cors().and()
                .authorizeHttpRequests()
                .requestMatchers("/api/login").permitAll()
                .requestMatchers("/api/register").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/books").hasRole("Admin")
                .requestMatchers(HttpMethod.PUT, "/api/books/{bookId}").hasRole("Admin")
                .requestMatchers(HttpMethod.DELETE, "/api/books/{bookId}").hasRole("Admin")
                .requestMatchers(HttpMethod.GET, "/api/books/{bookId}").hasRole("Admin")
                .requestMatchers(HttpMethod.GET, "/api/books").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/bookrentalrequest").hasRole("Admin")
                .requestMatchers(HttpMethod.PUT, "/api/bookrentalrequest/{id}").hasRole("Admin")
                .requestMatchers(HttpMethod.GET, "/api/feedback").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/bookrentalrequest").hasRole("User")
                .requestMatchers(HttpMethod.GET, "/api/bookrentalrequest/user/{userId}").hasRole("User")
                .requestMatchers(HttpMethod.DELETE, "/api/bookrentalrequest/{id}").hasRole("User")
                .requestMatchers(HttpMethod.PUT, "/api/feedback/{feedbackId}").hasAnyRole("Admin", "User")
                .requestMatchers(HttpMethod.DELETE, "/api/feedback/{feedbackId}").hasRole("User")
                .requestMatchers(HttpMethod.POST, "/api/feedback").hasRole("User")
                .requestMatchers(HttpMethod.GET, "/api/feedback/user/{userId}").hasRole("User")
                .anyRequest().authenticated().and()
                .exceptionHandling()
                .authenticationEntryPoint(entryPoint).and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new MyUserDetailsService();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://8081-abfdabeabcbaed319332313dbaefebdaefbfone.premiumproject.examly.io"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
