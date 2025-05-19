package com.pai_music.pai_music.controller;

import com.pai_music.pai_music.model.User;
import com.pai_music.pai_music.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Adjust if your frontend runs elsewhere
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Fetch all users (for testing purposes)
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ LOGIN endpoint
    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        Optional<User> match = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());

        if (match.isPresent()) {
            return "Login successful!";
        } else {
            return "Invalid email or password.";
        }
    }

    // ✅ Fetch user by email
    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        return userOpt.orElse(null);
    }

    // ✅ Register user
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "User already exists.";
        }
        userRepository.save(user);
        return "User registered successfully!";
    }
}
