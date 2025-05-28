package com.pai_music.pai_music.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // <-- Allows CORS from React app
public class SpotifyController {

    @GetMapping("/browse-all")
    public ResponseEntity<String> getBrowseCategories() {
        return ResponseEntity.ok("Browse categories loaded!");
    }
}
