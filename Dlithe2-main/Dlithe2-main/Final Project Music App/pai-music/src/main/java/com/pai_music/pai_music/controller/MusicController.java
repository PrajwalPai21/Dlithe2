package com.pai_music.pai_music.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/music")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend to access this endpoint
public class MusicController {

    private final Path musicDir = Paths.get("C:/Users/prajw/Documents/Dlithe Internship/Final Project Music App/LocalMusic"); // Directory containing songs

    // Endpoint to list all available songs
    @GetMapping("/songs")
    public ResponseEntity<List<String>> getMusicFiles() {
        try {
            List<String> songList = new ArrayList<>();

            // Get all mp3 files in the music directory
            Files.walk(musicDir)
                    .filter(path -> path.toString().endsWith(".mp3"))
                    .forEach(path -> songList.add(path.getFileName().toString())); // Add file names to the list

            return ResponseEntity.ok(songList); // Return the list of songs
        } catch (IOException e) {
            return ResponseEntity.status(500).build(); // Internal server error if reading fails
        }
    }

    // Endpoint to serve music file
    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getMusicFile(@PathVariable String filename) {
        try {
            Path filePath = musicDir.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType("audio/mpeg"))
                    .body(resource);

        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
