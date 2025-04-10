// CreatePlaylistRequest.java
package com.pai_music.pai_music.dto;

public class CreatePlaylistRequest {
    private String name;
    private boolean isPublic;
    private String userEmail;

    public CreatePlaylistRequest() {}

    public String getName() {
        return name;
    }

    public boolean getIsPublic() {
        return isPublic;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setIsPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
