package com.example.AqiSearchApp.config;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;

import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.github.benmanes.caffeine.cache.Caffeine;

@Configuration
public class AppConfig {

	 	@Bean
	    public RestTemplate restTemplate() {
	        return new RestTemplate();
	    }
	 	
	 	@Bean
	    public Caffeine<Object, Object> caffeineConfig() {
	        return Caffeine.newBuilder()
	                .expireAfterWrite(10, TimeUnit.MINUTES) // cache expiry
	                .maximumSize(100);                      // max entries
	    }

	    @Bean
	    public CacheManager cacheManager(Caffeine<Object, Object> caffeine) {
	        CaffeineCacheManager manager = new CaffeineCacheManager();
	        manager.setCaffeine(caffeine);
	        return manager;
	    }
	 	
	 	@Bean
	    public CorsConfigurationSource corsConfigurationSource() {
	        CorsConfiguration corsConfiguration = new CorsConfiguration();
	        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Allow frontend URL
	        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allowed HTTP methods
	        corsConfiguration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With")); // Allowed headers
	        corsConfiguration.setAllowCredentials(true); // Allow credentials
	        
	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", corsConfiguration);
	        return source;
	    }
}
