package com.example.alearning.apigateway.services;

import com.example.alearning.apigateway.dtos.Note;
import com.example.alearning.apigateway.dtos.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.joining;

@Component
public class UserServiceClient {
    private final WebClient webClient;

    public UserServiceClient(WebClient.Builder webClientBuilder,
                             @Value("${auth.service.url}") String authServiceUrl) {
        this.webClient = webClientBuilder.baseUrl(authServiceUrl).build();
    }

    public Mono<User> getUser(Long userId) {
        var user = webClient.get().uri("/users/{userId}", userId)
                .retrieve()
                .bodyToMono(User.class);
        return user;
    }

    public Mono<List<User>> getUsersByIds(List<Long> userIds){
        return webClient.get().uri("/users?userIds={userIds}", joinIds(userIds))
                .retrieve()
                .bodyToFlux(User.class)
                .collectList();

    }

    private String joinIds(List<Long> userIds){
        return userIds.stream().map(Object::toString).collect(joining(","));
    }

}