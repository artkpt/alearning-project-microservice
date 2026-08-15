package com.example.alearning.apigateway.dtos;

import java.util.Set;

public record NoteWithUser(
        Long id,
        String title,
        String createdAt,
        String updatedAt,
        String visibility,
        String description,
        User owner,
        Set<Topic> topics
) {

}
