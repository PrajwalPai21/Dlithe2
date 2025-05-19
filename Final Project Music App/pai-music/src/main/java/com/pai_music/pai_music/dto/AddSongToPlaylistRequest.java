package com.pai_music.pai_music.dto;

public class AddSongToPlaylistRequest {
    private Long playlistId;
    private Long songId;

    // Getters and setters
    public Long getPlaylistId() {
        return playlistId;
    }

    public void setPlaylistId(Long playlistId) {
        this.playlistId = playlistId;
    }

    public Long getSongId() {
        return songId;
    }

    public void setSongId(Long songId) {
        this.songId = songId;
    }
}
