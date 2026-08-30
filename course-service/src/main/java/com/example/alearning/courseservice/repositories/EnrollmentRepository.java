package com.example.alearning.courseservice.repositories;

import com.example.alearning.courseservice.entities.Course;
import com.example.alearning.courseservice.entities.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
}
