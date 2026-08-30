package com.example.alearning.courseservice.services;

import com.example.alearning.courseservice.entities.Enrollment;
import com.example.alearning.courseservice.repositories.CourseRepository;
import com.example.alearning.courseservice.repositories.EnrollmentRepository;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentService {
    private EnrollmentRepository enrollmentRepository;
    private CourseRepository courseRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
    }

    public Enrollment createPendingEnrollment(Integer userId, Integer courseId) {
        Enrollment enrollment = new Enrollment();
        enrollment.setUserId(userId);
        enrollment.setCourse(courseRepository.getReferenceById(courseId));
        enrollment.setStatus("PENDING");
        return enrollmentRepository.save(enrollment);
    }
}
