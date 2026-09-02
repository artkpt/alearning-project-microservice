package com.example.alearning.courseservice.repositories;

import com.example.alearning.courseservice.entities.Course;
import com.example.alearning.courseservice.entities.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
    Optional<Enrollment> findByUserIdAndCourseId(Long userId, Integer courseId);
}
