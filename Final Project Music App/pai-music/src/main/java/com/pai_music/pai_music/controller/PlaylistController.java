package com.pai_music.pai_music.controller;

import com.pai_music.pai_music.dto.AddSongToPlaylistRequest;
import com.pai_music.pai_music.dto.CreatePlaylistRequest;
import com.pai_music.pai_music.model.Playlist;
import com.pai_music.pai_music.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/playlists")
@CrossOrigin(origins = "http://localhost:3000")
public class PlaylistController {

    private final PlaylistService playlistService;

    @Autowired
    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @GetMapping("/trending")
    public List<Playlist> getTrendingPlaylists() {
        return playlistService.getTrendingPlaylists();
    }

    @GetMapping
    public List<Playlist> getAllPlaylists() {
        return playlistService.getTrendingPlaylists(); // Reuse for now
    }

    @GetMapping("/user/{email}")
    public List<Playlist> getPlaylistsByUserEmail(@PathVariable String email) {
        return playlistService.getPlaylistsByUserEmail(email);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createPlaylist(@RequestBody CreatePlaylistRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty() || request.getUserEmail() == null) {
            return ResponseEntity.badRequest().body("Invalid playlist data");
        }

        boolean success = playlistService.createPlaylist(request);
        if (success) {
            return ResponseEntity.ok("Playlist created successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create playlist");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updatePlaylistName(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String newName = body.get("name");
        if (newName == null || newName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Name cannot be empty");
        }

        boolean updated = playlistService.updatePlaylistName(id, newName);
        if (updated) {
            return ResponseEntity.ok("Playlist name updated");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Playlist not found");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePlaylist(@PathVariable Long id) {
        boolean deleted = playlistService.deletePlaylistById(id);
        if (deleted) {
            return ResponseEntity.ok("Playlist deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Playlist not found");
        }
    }

    // ✅ Add Song to Playlist (updated to use AddSongToPlaylistRequest)
    @PostMapping("/add-song")
    public ResponseEntity<String> addSongToPlaylist(@RequestBody AddSongToPlaylistRequest request) {
        boolean success = playlistService.addSongToPlaylist(request);  // Pass the entire request object
        if (success) {
            return ResponseEntity.ok("Song added to playlist successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Playlist or Song not found");
        }
    }
}
