package com.pai_music.pai_music.service;

import com.pai_music.pai_music.dto.AddSongToPlaylistRequest;
import com.pai_music.pai_music.dto.CreatePlaylistRequest;
import com.pai_music.pai_music.model.Playlist;
import com.pai_music.pai_music.model.PlaylistSong;
import com.pai_music.pai_music.model.Song;
import com.pai_music.pai_music.model.User;
import com.pai_music.pai_music.repository.PlaylistRepository;
import com.pai_music.pai_music.repository.PlaylistSongRepository;
import com.pai_music.pai_music.repository.SongRepository;
import com.pai_music.pai_music.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final UserRepository userRepository;
    private final SongRepository songRepository;
    private final PlaylistSongRepository playlistSongRepository;

    @Autowired
    public PlaylistService(PlaylistRepository playlistRepository, UserRepository userRepository,
                           SongRepository songRepository, PlaylistSongRepository playlistSongRepository) {
        this.playlistRepository = playlistRepository;
        this.userRepository = userRepository;
        this.songRepository = songRepository;
        this.playlistSongRepository = playlistSongRepository;
    }

    public List<Playlist> getTrendingPlaylists() {
        return playlistRepository.findAll();
    }

    public List<Playlist> getPlaylistsByUserEmail(String email) {
        return playlistRepository.findByUserEmail(email);
    }

    public boolean deletePlaylistById(Long id) {
        if (playlistRepository.existsById(id)) {
            playlistRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean updatePlaylistName(Long id, String newName) {
        return playlistRepository.findById(id).map(playlist -> {
            playlist.setName(newName);
            playlistRepository.save(playlist);
            return true;
        }).orElse(false);
    }

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

    // Updated addSongToPlaylist method using PlaylistSong
    public boolean addSongToPlaylist(AddSongToPlaylistRequest request) {
        Long playlistId = request.getPlaylistId();
        Long songId = request.getSongId();

        Playlist playlist = playlistRepository.findById(playlistId).orElse(null);
        Song song = songRepository.findById(songId).orElse(null);

        if (playlist == null || song == null) return false;

        // Create a new PlaylistSong object to establish the relationship
        PlaylistSong playlistSong = new PlaylistSong();
        playlistSong.setPlaylist(playlist);
        playlistSong.setSong(song);

        // Save the PlaylistSong object to the repository
        playlistSongRepository.save(playlistSong);
        return true;
    }
}
