package com.example.alearning.courseservice.controllers;

import com.example.alearning.courseservice.dtos.CourseForm;
import com.example.alearning.courseservice.entities.Course;
import com.example.alearning.courseservice.repositories.CourseRepository;
import com.example.alearning.courseservice.services.FileService;
import com.example.alearning.courseservice.services.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/courses")
public class CourseController {
    private final CourseRepository courseRepository;
    private final FileService fileService;
    private final LessonService lessonService;

    @PostMapping("")
    public ResponseEntity<Object> createCourse(
            @ModelAttribute CourseForm form, @RequestPart("file") MultipartFile file) {
        Course newCourse = new Course();
        newCourse.setCode(form.getCode());
        newCourse.setName(form.getName());
        newCourse.setDescription(form.getDescription());
        newCourse.setThumbnailUrl(fileService.store(file));
        return ResponseEntity.status(HttpStatus.CREATED).body(courseRepository.save(newCourse));

    }

    @GetMapping("")
    public ResponseEntity<Object> getAllCourses() {
        return ResponseEntity.status(HttpStatus.OK).body(courseRepository.findAll());
    }

    @GetMapping("/{courseId}/lessons")
    public ResponseEntity<Object> getAllLessonsOfCourse(@PathVariable("courseId") Integer courseId) {
        return ResponseEntity.ok(lessonService.findAllLessonsByCourseId(courseId));
    }



}
