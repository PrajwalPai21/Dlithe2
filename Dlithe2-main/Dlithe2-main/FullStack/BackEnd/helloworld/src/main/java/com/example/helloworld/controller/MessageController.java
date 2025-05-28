package com.example.helloworld.controller;

import com.example.helloworld.model.Message;
import com.example.helloworld.repository.MessageRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/messages")

public class MessageController {
    @Autowired
    private MessageRepository messageRepository;

    @GetMapping
    public List<Message> getAllMessages(){
        return messageRepository.findAll();
    }
}