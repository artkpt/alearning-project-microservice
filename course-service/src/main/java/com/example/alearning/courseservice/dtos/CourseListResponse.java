package com.example.alearning.courseservice.dtos;

import com.example.alearning.courseservice.entities.Course;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseListResponse{
    private Integer id;
    private String code;
    private String name;
    private String description;
    private String thumbnailUrl;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private List<LessonDTO> lessons;
//
//    public static CourseListResponse fromEntity(Course course) {
//        return new CourseListResponse(
//                course.getId(),
//                course.getCode(),
//                course.getName(),
//                course.getDescription(),
//                course.getThumbnailUrl(),
//                course.getCreatedAt(),
//                course.getUpdatedAt()
//        );
//    }
}
