package com.atharva.spring_boot_liabrary.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

// Marks this class as a Spring configuration class
@Configuration
public class SecurityConfiguration {

    // Defines the security filter chain for the application
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Disable CSRF protection (commonly done for stateless REST APIs)
        http.csrf().disable();

        /*
         * Secure all endpoints under /api/**/secure/**
         * Only authenticated users with valid JWT tokens can access these routes
         */
        http.authorizeRequests(configurer ->
                configurer.antMatchers(
                        "/api/books/secure/**",
                        "/api/reviews/secure/**",
                        "/api/messages/secure/**",
                        "/api/admin/secure/**"
                ).authenticated()
        )
        // Configure the application as an OAuth2 Resource Server using JWT
        .oauth2ResourceServer()
        .jwt();

        // Enable CORS support for cross-origin requests
        http.cors();

        /*
         * Configure content negotiation strategy
         * Uses request headers (Accept) to determine response format
         */
        http.setSharedObject(
                ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy()
        );

        // Customize the 401 Unauthorized response body for Okta
        Okta.configureResourceServer401ResponseBody(http);

        // Build and return the configured security filter chain
        return http.build();
    }
}
