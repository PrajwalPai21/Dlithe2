// RegisterRequest.java
package com.pai_music.pai_music.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
}
