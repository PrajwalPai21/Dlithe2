package com.pai_music.pai_music.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "playlists")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private boolean isPublic;

    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference // Prevents infinite recursion in JSON serialization
    private User user;

    // Optional convenience constructor
    public Playlist(String name, boolean isPublic, User user) {
        this.name = name;
        this.isPublic = isPublic;
        this.user = user;
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }
}
