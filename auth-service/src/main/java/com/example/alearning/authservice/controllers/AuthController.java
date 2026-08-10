package com.example.alearning.authservice.controllers;

import com.example.alearning.authservice.dtos.AccessToken;
import com.example.alearning.authservice.dtos.JwtRequestUser;
import com.example.alearning.authservice.services.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody JwtRequestUser user, HttpServletResponse response) {
        return ResponseEntity.ok(userService.authenticateUser(user,response));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<Object> refreshToken(
            @CookieValue(name = "refreshToken") String refreshToken) {
        return ResponseEntity.ok(userService.refreshToken(refreshToken));
    }
}
