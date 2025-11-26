package com.example.AqiSearchApp.service;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.example.AqiSearchApp.client.ApiClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class Aqiservice {

    private final ApiClient client;
    private final ObjectMapper mapper = new ObjectMapper();

    public Aqiservice(ApiClient client) {
        this.client = client;
    }

    @Cacheable(value = "citySearchCache", key = "#city")
    public Object searchCity(String city) {
        Object response = client.searchCity(city);

        JsonNode json = mapper.valueToTree(response);

        // When no results — throw error
        if (!json.has("data") || json.get("data").isEmpty()) {
            throw new RuntimeException("City not found");
        }

        return json.get("data");
    }

    @Cacheable(value = "cityDetailsCache", key = "#uid")
    public Object getCityDetails(String uid) {
        Object response = client.getCityDetails(uid);

        JsonNode json = mapper.valueToTree(response);

        if (!json.has("data")) {
            throw new RuntimeException("No AQI details available for this city");
        }

        return json.get("data");
    }
}
