package com.pai_music.pai_music.service;

import com.pai_music.pai_music.model.Song;
import com.pai_music.pai_music.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SongService {

    @Autowired
    private SongRepository songRepository;

    public Song getSongById(Long songId) {
        return songRepository.findById(songId).orElseThrow(() -> new RuntimeException("Song not found"));
    }
}
