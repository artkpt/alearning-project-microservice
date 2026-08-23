package com.example.alearning.courseservice.controllers;

import com.example.alearning.courseservice.dtos.LessonForm;
import com.example.alearning.courseservice.entities.Lesson;
import com.example.alearning.courseservice.services.LessonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/lessons")
public class LessonController {
    private final LessonService lessonService;
    public  LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @PostMapping("")
    public ResponseEntity<Lesson> addLesson(@ModelAttribute LessonForm form, MultipartFile file) {
        return  ResponseEntity.status(HttpStatus.CREATED).body(lessonService.uploadVideo(form, file));
    }

//    @GetMapping("")

}
