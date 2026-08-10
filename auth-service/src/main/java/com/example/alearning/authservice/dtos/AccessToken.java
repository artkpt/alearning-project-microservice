package com.example.alearning.authservice.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class AccessToken {
    @JsonIgnore
    private String token;

    public AccessToken(String token) {
        this.token = token;
    }

    public String getAccess_Token() {
        return token;
    }
}
