package com.example.alearning.courseservice.dtos;

import com.example.alearning.courseservice.entities.Course;

import java.time.OffsetDateTime;

public record CourseListResponse(
        Integer id,
        String code,
        String name,
        String description,
        String thumbnailUrl,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {

    public static CourseListResponse fromEntity(Course course) {
        return new CourseListResponse(
                course.getId(),
                course.getCode(),
                course.getName(),
                course.getDescription(),
                course.getThumbnailUrl(),
                course.getCreatedAt(),
                course.getUpdatedAt()
        );
    }
}
