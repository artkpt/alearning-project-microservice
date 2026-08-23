package com.example.alearning.courseservice.dtos;
import lombok.Data;

@Data
public class LessonForm {
    private Integer courseId;
    private String title;
    private Integer sequenceOrder;
}
