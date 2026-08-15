package com.example.alearning.authservice.controllers;

import com.example.alearning.authservice.utils.JwtUtils;
import com.nimbusds.jose.jwk.JWKSet;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class JwkController {

    private final JwtUtils jwtUtils;

    public JwkController(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/.well-known/jwks.json")
    public Map<String, Object> getJwks() {
        JWKSet jwkSet = new JWKSet(jwtUtils.getRsaPublicJWK());
        return jwkSet.toJSONObject();
    }
}