package com.example.alearning.courseservice.configs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.util.unit.DataSize;

import java.util.List;

@ConfigurationProperties(prefix = "file.upload")
@Getter
@Setter
public class FileStorageProperties {
 private MediaRule image;
 private MediaRule video;

 @Getter
 @Setter
 public static class MediaRule {
  private String uploadDir;
  private List<String> allowedTypes;
  private DataSize maxSize;
 }

}