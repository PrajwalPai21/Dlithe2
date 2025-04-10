package com.pai_music.pai_music.service;

import com.pai_music.pai_music.dto.RegisterRequest;
import com.pai_music.pai_music.model.User;
import com.pai_music.pai_music.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already in use";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // storing plain password
        user.setCreatedAt(java.time.LocalDateTime.now());

        userRepository.save(user);
        return "User registered successfully";
    }

    public String loginUser(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password))
                .map(user -> "Login successful")
                .orElse("Invalid email or password");
    }
}
