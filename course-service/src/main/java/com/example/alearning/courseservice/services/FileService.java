package com.example.alearning.courseservice.services;

import com.example.alearning.courseservice.configs.FileStorageProperties;
import lombok.Getter;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@Getter
public class FileService {
 private final Path imageLocation;
 private final Path videoLocation;
 private final FileStorageProperties fileStorageProperties;

 public FileService(FileStorageProperties fileStorageProperties) {
  this.imageLocation = Paths.get(fileStorageProperties.getImage().getUploadDir()).toAbsolutePath().normalize();
  this.fileStorageProperties = fileStorageProperties;
  this.videoLocation = Paths.get(fileStorageProperties.getVideo().getUploadDir()).toAbsolutePath().normalize();

  try {
   if (!Files.exists(this.imageLocation)) {
    Files.createDirectories(this.imageLocation);
   }

   if (!Files.exists(videoLocation)) {
    Files.createDirectories(videoLocation);
   }

  } catch (IOException ex) {
   throw new RuntimeException("Can’t create the directory where the uploaded files will be stored.", ex);
  }
 }
 public String store(MultipartFile file) {
  // Normalize file name
  String fileName = StringUtils.cleanPath(file.getOriginalFilename());
  try {
   // Check if the file's name contains invalid characters
   if (fileName.contains("..")) {
    throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
   }

  String fileExtension = "";
  if (fileName.contains(".")) {
   fileExtension = fileName.substring(fileName.lastIndexOf("."));
  }

  String newFilename = UUID.randomUUID().toString() + fileExtension;

   // Copy file to the target location (Replacing existing file with the same name)
   Path targetLocation = this.imageLocation.resolve(newFilename);
   Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
   return fileName;
  } catch (IOException ex) {
   throw new RuntimeException("Could not store file " + ". Please try again!", ex);
  }
 }

 public Resource loadFileAsResource(String fileName) {
  try {
   Path filePath = this.imageLocation.resolve(fileName).normalize();
   Resource resource = new UrlResource(filePath.toUri());
   if (resource.exists()) {
    return resource;
   } else {
    throw new RuntimeException("File not found " + fileName);
   }
  } catch (MalformedURLException ex) {
   throw new RuntimeException("File operation error: "
           + fileName, ex);
  }
 }

 public String storeVideo(MultipartFile file) {
  FileStorageProperties.MediaRule rule = fileStorageProperties.getVideo();

  if (file.getSize() > rule.getMaxSize().toBytes()) {
   throw new RuntimeException("Video size too large!");
  }
  if (!rule.getAllowedTypes().contains(file.getContentType())) {
   throw new RuntimeException("Invalid video format!");
  }

  try {

   String originalName = StringUtils.cleanPath(file.getOriginalFilename());
   String extension = originalName.substring(originalName.lastIndexOf("."));
   String newFilename = UUID.randomUUID().toString() + extension;
   Path targetLocation = videoLocation.resolve(newFilename);
   Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

   return newFilename;

  } catch (IOException ex) {
   throw new RuntimeException("Failed to store video.", ex);
  }
 }

}