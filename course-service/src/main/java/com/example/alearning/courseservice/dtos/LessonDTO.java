package com.example.alearning.courseservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LessonDTO {
    Integer id;
    String title;
    OffsetDateTime createdAt;
    OffsetDateTime updatedAt;
}
