package com.example.alearning.courseservice.controllers;

import com.example.alearning.courseservice.dtos.CourseForm;
import com.example.alearning.courseservice.dtos.LessonForm;
import com.example.alearning.courseservice.entities.Course;
import com.example.alearning.courseservice.entities.Enrollment;
import com.example.alearning.courseservice.entities.Lesson;
import com.example.alearning.courseservice.repositories.CourseRepository;
import com.example.alearning.courseservice.services.EnrollmentService;
import com.example.alearning.courseservice.services.FileService;
import com.example.alearning.courseservice.services.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/courses")
public class CourseController {
    private final CourseRepository courseRepository;
    private final FileService fileService;
    private final LessonService lessonService;
    private final EnrollmentService enrollmentService;

    @PreAuthorize("hasRole('admin')")
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

    @GetMapping("/{courseId}")
    public ResponseEntity<Object> getCourseById(@PathVariable Integer courseId) {
        return ResponseEntity.status(HttpStatus.OK).body(courseRepository.findById(courseId));
    }


    @GetMapping("/{courseId}/lessons")
    public ResponseEntity<Object> getAllLessonsOfCourse(@PathVariable("courseId") Integer courseId) {
        return ResponseEntity.ok(lessonService.findAllLessonsByCourseId(courseId));
    }


    @PreAuthorize("isAuthenticated()")
    @PostMapping("/{courseId}/enrollments")
    public ResponseEntity<?> requestEnrollment(
            @PathVariable Integer courseId,
            @AuthenticationPrincipal Jwt jwt
    ){
        Long userId = jwt.getClaim("uid");
        Enrollment response = enrollmentService.createPendingEnrollment(userId, courseId);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PreAuthorize("hasRole('admin')")
    @PostMapping("/{courseId}/lessons")
    public ResponseEntity<Lesson> addLesson(
            @ModelAttribute LessonForm form,
            MultipartFile file,
            @PathVariable  Integer courseId
    ) {
        return  ResponseEntity.status(HttpStatus.CREATED).body(lessonService.uploadVideo(form, file, courseId));
    }


}
