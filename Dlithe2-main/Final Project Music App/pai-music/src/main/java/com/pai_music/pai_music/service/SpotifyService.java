package com.pai_music.pai_music.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Service
public class SpotifyService {

    private final String URL = "https://spotify23.p.rapidapi.com/browse_all/";
    private final String API_KEY = "8de4bd6c30msh5d95f4d6af2bd43p1567d7jsn761e11ef30bd";
    private final String API_HOST = "spotify23.p.rapidapi.com";

    public String getBrowseAllCategories() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", API_KEY);
        headers.set("X-RapidAPI-Host", API_HOST);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                URL, HttpMethod.GET, entity, String.class
        );

        return response.getBody();
    }
}
