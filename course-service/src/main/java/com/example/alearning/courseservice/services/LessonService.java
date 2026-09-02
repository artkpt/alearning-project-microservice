package com.example.alearning.courseservice.services;

import com.example.alearning.courseservice.dtos.LessonForm;
import com.example.alearning.courseservice.entities.Course;
import com.example.alearning.courseservice.entities.Lesson;
import com.example.alearning.courseservice.repositories.CourseRepository;
import com.example.alearning.courseservice.repositories.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;
    private final FileService fileService;
    private final CourseRepository courseRepository;

    @Transactional
    public Lesson uploadVideo(LessonForm form, MultipartFile file, Integer courseId) {

        Lesson newLesson = new Lesson();
        newLesson.setTitle(form.getTitle());

        Integer nextSequence = lessonRepository.findMaxSequenceOrderByCourseId(courseId) + 1;
        newLesson.setSequenceOrder(nextSequence);

        Course courseProxy = courseRepository.getReferenceById(courseId);
        newLesson.setCourse(courseProxy);

        newLesson.setVideoUrl(fileService.storeVideo(file));

        return lessonRepository.save(newLesson);
    }

    public List<Lesson> findAllLessonsByCourseId(Integer lessonId) {
        return lessonRepository.findByCourseIdOrderBySequenceOrderAsc(lessonId);
    }

}
