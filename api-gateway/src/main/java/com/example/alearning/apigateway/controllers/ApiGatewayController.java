package com.example.alearning.apigateway.controllers;

import com.example.alearning.apigateway.dtos.Note;
import com.example.alearning.apigateway.dtos.NoteWithUser;
import com.example.alearning.apigateway.dtos.User;
import com.example.alearning.apigateway.services.NoteServiceClient;
import com.example.alearning.apigateway.services.UserServiceClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/gateway")
public class ApiGatewayController {
    private final NoteServiceClient noteServiceClient;
    private final UserServiceClient userServiceClient;
    public ApiGatewayController(NoteServiceClient noteServiceClient, UserServiceClient userServiceClient) {
        this.noteServiceClient = noteServiceClient;
        this.userServiceClient = userServiceClient;
    }

    @GetMapping("/notes")
    public Mono<List<NoteWithUser>> getNotes() {
        return  noteServiceClient.getNotes()
                .flatMap( notes -> {
                    List<Long> userIds = notes.stream()
                            .map(Note::getOwnerId)
                            .toList();

                    return userServiceClient.getUsersByIds(userIds)
                            .map(users -> {
                                Map<Long, User> userMap = users.stream()
                                        .collect(Collectors.toMap(User::id, user -> user));
                                return notes.stream()
                                        .map(note -> new NoteWithUser(
                                                note.getId(),
                                                note.getTitle(),
                                                note.getCreatedAt(),
                                                note.getUpdatedAt(),
                                                note.getVisibility(),
                                                note.getDescription(),
                                                userMap.get(note.getOwnerId()),
                                                note.getTopics()
                                        ))
                                        .toList();
                            });
                });

    }

    @GetMapping("/users/{userId}")
    public Mono<User> getUser(@PathVariable Long userId) {
        return  userServiceClient.getUser(userId);
    }

    @GetMapping("/test")
    public ResponseEntity<Object> test() {
            return ResponseEntity.ok(Map.of("say", "hello"));
        }

}
