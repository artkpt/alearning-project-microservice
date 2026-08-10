package com.example.alearning.authservice.dtos;

import lombok.Data;

//DTO
@Data
public class JwtRequestUser {
    private String username;
    private String password;
}
