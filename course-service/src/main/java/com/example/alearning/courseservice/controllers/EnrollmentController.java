package com.example.alearning.courseservice.controllers;

import com.example.alearning.courseservice.dtos.EnrollmentStatusResponse;
import com.example.alearning.courseservice.services.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @GetMapping("/{courseId}/enrollments/me")
    public ResponseEntity<EnrollmentStatusResponse> getMyEnrollment(
            @PathVariable Integer courseId,
            @AuthenticationPrincipal Jwt jwt) {

        Long userId = jwt.getClaim("uid");

        EnrollmentStatusResponse response = enrollmentService.getMyEnrollmentStatus(userId, courseId);

        return ResponseEntity.ok(response);
    }
}