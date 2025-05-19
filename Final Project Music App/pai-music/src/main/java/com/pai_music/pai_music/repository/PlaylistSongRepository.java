package com.pai_music.pai_music.repository;

import com.pai_music.pai_music.model.PlaylistSong;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistSongRepository extends JpaRepository<PlaylistSong, Long> {
}
