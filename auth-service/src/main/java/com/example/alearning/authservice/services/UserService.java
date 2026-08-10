package com.example.alearning.authservice.services;

import com.example.alearning.authservice.dtos.AccessToken;
import com.example.alearning.authservice.dtos.JwtRequestUser;
import com.example.alearning.authservice.entities.AuthUserDetail;
import com.example.alearning.authservice.entities.User;
import com.example.alearning.authservice.models.TokenType;
import com.example.alearning.authservice.repositories.UserRepository;
import com.example.alearning.authservice.utils.JwtUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtUserDetailsService jwtUserDetailsService;
    @Autowired private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User findUserById(Long id) {
        return userRepo.findById(id).orElse(null);
    }

    private void checkDuplication(User user) {
        if (userRepo.existsByUsername(user.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "User name already exist !!!");
        }
    }

    public User createUser(User user) {
        checkDuplication(user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public Map<String,Object> authenticateUser(JwtRequestUser user, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken upat =
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
        Authentication authentication = authenticationManager.authenticate(upat);
        UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(user.getUsername());
        long refreshTokenAgeInMilli = 8*60*60*1000;
        Cookie refreshToken = new Cookie("refreshToken",
                jwtUtils.generateToken(userDetails, refreshTokenAgeInMilli, TokenType.REFRESH_TOKEN));
        refreshToken.setHttpOnly(true);
        refreshToken.setPath("/auth/refresh-token");
        response.addCookie(refreshToken);
        return Map.of(
                "access_token", jwtUtils.generateToken(userDetails),
                "userId", ((AuthUserDetail) userDetails).getId(),
                "username", ((AuthUserDetail) userDetails).getUsername(),
                "role", ((AuthUserDetail) userDetails).getAuthorities()
        );
    }

    public Map<String, Object> refreshToken(String refreshToken) {
        jwtUtils.verifyToken(refreshToken);
        Map<String, Object> claims = jwtUtils.getJWTClaimsSet(refreshToken);
        jwtUtils.isExpired(claims);
        if (! jwtUtils.isValidClaims(claims) || ! "REFRESH_TOKEN".equals(claims.get("typ"))) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED
                    , "Invalid refresh token");
        }
        UserDetails userDetails = jwtUserDetailsService.loadUserById((Long) claims.get("uid"));
        return Map.of("access_token"
                , jwtUtils.generateToken(userDetails));
    }

}
