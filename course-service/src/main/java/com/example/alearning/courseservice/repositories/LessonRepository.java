package com.example.alearning.courseservice.repositories;

import com.example.alearning.courseservice.entities.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Integer> {
    @Query("SELECT COALESCE(MAX(l.sequenceOrder), 0) FROM Lesson l WHERE l.course.id = :courseId")
    Integer findMaxSequenceOrderByCourseId(@Param("courseId") Integer courseId);


    List<Lesson> findByCourseIdOrderBySequenceOrderAsc(Integer courseId);
}
