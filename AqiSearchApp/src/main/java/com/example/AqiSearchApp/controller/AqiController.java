package com.example.AqiSearchApp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.AqiSearchApp.service.Aqiservice;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/aqi")
public class AqiController {

	 private final Aqiservice aqiService;

	    public AqiController(Aqiservice aqiService) {
	        this.aqiService = aqiService;
	    }

	    @GetMapping("/search")
	    public ResponseEntity<Object> searchCity(@RequestParam String city) {
	        return ResponseEntity.ok(aqiService.searchCity(city));
	    }

	    @GetMapping("/city/{uid}")
	    public ResponseEntity<Object> getCity(@PathVariable String uid) {
	        return ResponseEntity.ok(aqiService.getCityDetails(uid));
	    }
}
