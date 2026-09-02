package com.example.alearning.courseservice.services;

import com.example.alearning.courseservice.dtos.EnrollmentStatusResponse;
import com.example.alearning.courseservice.entities.Enrollment;
import com.example.alearning.courseservice.repositories.CourseRepository;
import com.example.alearning.courseservice.repositories.EnrollmentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository,  CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
    }

    public Enrollment createPendingEnrollment(Long userId, Integer courseId) {
        Enrollment enrollment = new Enrollment();
        enrollment.setUserId(userId);
        enrollment.setCourse(courseRepository.getReferenceById(courseId));
        enrollment.setStatus("PENDING");
        return enrollmentRepository.save(enrollment);
    }

    @Transactional(readOnly = true)
    public EnrollmentStatusResponse getMyEnrollmentStatus(Long userId, Integer courseId) {
        return enrollmentRepository.findByUserIdAndCourseId(userId, courseId)
                .map(enrollment -> new EnrollmentStatusResponse(enrollment.getStatus()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "ไม่พบข้อมูลการลงทะเบียน"));
    }
}
