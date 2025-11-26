package com.example.AqiSearchApp.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;

@Component
public class ApiClient {

    private final RestTemplate restTemplate;

    @Value("${aqicn.api.base-url}")
    private String baseUrl;

    @Value("${aqicn.api.token}")
    private String apiToken;

    public ApiClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Object searchCity(String city) {
        try {
            String url = baseUrl + "/search/?keyword=" + city + "&token=" + apiToken;
            return restTemplate.getForObject(url, Object.class);
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to fetch city list from AQI provider");
        }
    }

    public Object getCityDetails(String uid) {
        try {
            String url = baseUrl + "/feed/@" + uid + "/?token=" + apiToken;
            return restTemplate.getForObject(url, Object.class);
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to fetch AQI details for the selected city");
        }
    }
}
