package com.example.alearning.authservice.repositories;

import com.example.alearning.authservice.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);

    @Query(value = "select u from User u where u.username=:username")
    Optional<User> findByUsername(String username);
}
