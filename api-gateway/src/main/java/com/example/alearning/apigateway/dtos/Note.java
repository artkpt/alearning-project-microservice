package com.example.alearning.apigateway.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class Note {
    private Long id;
    private String title;
    private String createdAt;
    private String updatedAt;
    private String visibility;
    private Long ownerId;
    private String description;
    private String content;
    private Set<Topic> topics;

}
