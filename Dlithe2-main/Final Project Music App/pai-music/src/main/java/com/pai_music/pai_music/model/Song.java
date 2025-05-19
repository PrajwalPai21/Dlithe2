package com.pai_music.pai_music.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "songs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;      // Song title
    private String artist;     // Song artist
    private String album;      // Album name
    private String url;        // Streaming or download URL (optional, depending on your use case)

    @Column(name = "file_name")
    private String fileName;   // Name of the file stored locally (e.g., "song1.mp3")
}
