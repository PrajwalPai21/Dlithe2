package com.pai_music.pai_music.service;

import com.pai_music.pai_music.dto.CreatePlaylistRequest;
import com.pai_music.pai_music.model.Playlist;
import com.pai_music.pai_music.model.User;
import com.pai_music.pai_music.repository.PlaylistRepository;
import com.pai_music.pai_music.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final UserRepository userRepository;

    @Autowired
    public PlaylistService(PlaylistRepository playlistRepository, UserRepository userRepository) {
        this.playlistRepository = playlistRepository;
        this.userRepository = userRepository;
    }

    // 📈 Get all playlists (e.g., for trending section)
    public List<Playlist> getTrendingPlaylists() {
        return playlistRepository.findAll();
    }

    // 🎧 Get playlists by user email
    public List<Playlist> getPlaylistsByUserEmail(String email) {
        return playlistRepository.findByUserEmail(email);
    }

    // 🗑️ Delete playlist by ID
    public boolean deletePlaylistById(Long id) {
        if (playlistRepository.existsById(id)) {
            playlistRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // ✏️ Update playlist name
    public boolean updatePlaylistName(Long id, String newName) {
        return playlistRepository.findById(id).map(playlist -> {
            playlist.setName(newName);
            playlistRepository.save(playlist);
            return true;
        }).orElse(false);
    }

    // ➕ Create a new playlist
    public boolean createPlaylist(CreatePlaylistRequest request) {
        String name = request.getName();
        boolean isPublic = request.getIsPublic();
        String email = request.getUserEmail();

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return false;

        Playlist newPlaylist = new Playlist(name, isPublic, user);
        playlistRepository.save(newPlaylist);
        return true;
    }
}
