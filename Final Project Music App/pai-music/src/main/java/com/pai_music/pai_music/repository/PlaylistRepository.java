package com.pai_music.pai_music.repository;

import com.pai_music.pai_music.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    // Get all playlists (already included by default)
    List<Playlist> findAll();

    // Get playlists by user email (via the User relationship)
    List<Playlist> findByUserEmail(String email);

    // Optionally, you can also add:
    // List<Playlist> findByUserId(Long userId);

    // Get trending playlists logic could be custom depending on your needs
    // Add custom queries if needed later (e.g., @Query)

}
