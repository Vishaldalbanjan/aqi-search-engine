package com.example.AqiSearchApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class AqiSearchAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AqiSearchAppApplication.class, args);
	}

}
