package com.example.alearning.authservice.controllers;

import com.example.alearning.authservice.entities.User;
import com.example.alearning.authservice.repositories.UserRepository;
import com.example.alearning.authservice.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        if(user.getRole().equals("admin")){
            return  ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(user));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.findUserById(userId));
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers(
            @RequestParam(required = false) List<Long> userIds
    ) {
        if (userIds != null) {
            List<User> users = userService.findUsersByIds(userIds);
            return ResponseEntity.ok(users);
        }
        return ResponseEntity.ok(userRepository.findAll());
    }
}
