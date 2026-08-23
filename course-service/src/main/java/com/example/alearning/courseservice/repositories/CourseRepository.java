package com.example.alearning.courseservice.repositories;

import com.example.alearning.courseservice.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Integer> {
}
