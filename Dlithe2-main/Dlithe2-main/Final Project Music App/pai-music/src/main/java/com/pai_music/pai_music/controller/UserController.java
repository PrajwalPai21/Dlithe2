package com.pai_music.pai_music.controller;

import com.pai_music.pai_music.model.User;
import com.pai_music.pai_music.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Fetch all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Login
    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        Optional<User> match = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
        return match.isPresent() ? "Login successful!" : "Invalid email or password.";
    }

    // Get user by email
    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // Register
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "User already exists.";
        }
        userRepository.save(user);
        return "User registered successfully!";
    }

    // DELETE user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }
}
