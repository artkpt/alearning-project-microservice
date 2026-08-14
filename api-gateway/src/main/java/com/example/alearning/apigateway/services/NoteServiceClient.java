package com.example.alearning.apigateway.services;

import com.example.alearning.apigateway.dtos.Note;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class NoteServiceClient {
    private final WebClient webClient;
    public NoteServiceClient(WebClient.Builder webClientBuilder,
                            @Value("${note.service.url}")  String noteServiceUrl){
        this.webClient = webClientBuilder.baseUrl(noteServiceUrl).build();
    }

    public Mono<List<Note>> getNotes() {
        var notes = webClient.get().uri("/notes")
                .retrieve()
                .bodyToFlux(Note.class)
                .collectList();

        return notes;
    }
}
