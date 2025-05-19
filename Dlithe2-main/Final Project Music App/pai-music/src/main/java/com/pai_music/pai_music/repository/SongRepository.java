package com.pai_music.pai_music.repository;

import com.pai_music.pai_music.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Long> {
}
