package com.example.alearning.authservice.services;

import com.example.alearning.authservice.entities.AuthUserDetail;
import com.example.alearning.authservice.entities.User;
import com.example.alearning.authservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return new AuthUserDetail(user.getId(), user.getUsername(), user.getPassword()
                , getAuthorities(user.getRole()));
    }

    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User id " + id + " does not exist")
        );
        return new AuthUserDetail(user.getId(), user.getUsername(), user.getPassword()
                , getAuthorities(user.getRole())
        );
    }

    public static List<GrantedAuthority> getAuthorities(String rolesAsCommaSeparated) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        Arrays.asList(rolesAsCommaSeparated.split(",")).forEach(
                role -> authorities.add(getAuthority(role))
        );
        return authorities;
    }

    private static GrantedAuthority getAuthority(String role) {
        return new SimpleGrantedAuthority(role);
    }
}
