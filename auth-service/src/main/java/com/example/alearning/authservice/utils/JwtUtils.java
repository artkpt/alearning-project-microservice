package com.example.alearning.authservice.utils;

import com.example.alearning.authservice.dtos.AccessToken;
import com.example.alearning.authservice.entities.AuthUserDetail;
import com.example.alearning.authservice.models.TokenType;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.gen.RSAKeyGenerator;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class JwtUtils {
    @Value("#{${app.security.jwt.token-max-interval-in-minute}*1000*60}")
    private long MAX_TOKEN_INTERVAL;
    @Value("${app.security.jwt.key-id}")
    private String KEY_ID;
    private RSAKey rsaPrivateJWK;
    private RSAKey rsaPublicJWK;

    public RSAKey getRsaPublicJWK() {
        return this.rsaPublicJWK;
    }

    public JwtUtils(
            @Value("${app.security.jwt.private-key-location}") Resource privateKeyResource
    ){
        try {
            String privateKeyPem = privateKeyResource.getContentAsString(StandardCharsets.UTF_8);
            System.out.println(privateKeyPem);
            JWK jwk = JWK.parseFromPEMEncodedObjects(privateKeyPem);
            this.rsaPrivateJWK = jwk.toRSAKey();

            this.rsaPublicJWK = this.rsaPrivateJWK.toPublicJWK();

        } catch (Exception e) {
            throw new RuntimeException("Failed to load RSA Key for JWT", e);
        }
    }

    public String generateToken(UserDetails user) {
        return generateToken(user, MAX_TOKEN_INTERVAL, TokenType.ACCESS_TOKEN);
    }

    public String generateToken(UserDetails user, Long ageInMilli, TokenType tokenType) {
        try {

            List<String> roles = user.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            JWSSigner signer = new RSASSASigner(rsaPrivateJWK);
            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(user.getUsername())
                    .issuer("http://sit.kmutt.ac.th")
                    .expirationTime(new Date(new Date().getTime() + ageInMilli))
                    .issueTime(new Date(new Date().getTime()))
                    .claim("roles", roles)
                    .claim("uid", ((AuthUserDetail) user).getId())
                    .claim("typ", tokenType.toString())
                    .build();
            SignedJWT signedJWT = new SignedJWT(new JWSHeader.Builder(JWSAlgorithm.RS256)
                    .keyID(rsaPrivateJWK.getKeyID()).build(), claimsSet);
            signedJWT.sign(signer);
            return signedJWT.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    public void verifyToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSVerifier verifier = new RSASSAVerifier(rsaPublicJWK);
            boolean passed = signedJWT.verify(verifier);
            System.out.println("Token verification: " + passed);
            if(!passed) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Verified Error, Invalid JWT");
            }
        } catch (JOSEException | ParseException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Verified Error, Invalid JWT", ex);
        }
    }
    public Map<String, Object> getJWTClaimsSet(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            return signedJWT.getJWTClaimsSet().getClaims();
        } catch (ParseException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid JWT (Can't parsed)", ex);
        }
    }
    public boolean isExpired(Map<String, Object> jwtClaims) {
        Date expDate = (Date) jwtClaims.get("exp");
        return expDate.before(new Date());
    }
    public boolean isValidClaims(Map<String, Object> jwtClaims) {
        System.out.println(jwtClaims);
        return jwtClaims.containsKey("iat")
                && "http://sit.kmutt.ac.th"
                .equals(jwtClaims.get("iss"))
                && jwtClaims.containsKey("uid")
                && (Long) jwtClaims.get("uid") > 0;
    }

}
