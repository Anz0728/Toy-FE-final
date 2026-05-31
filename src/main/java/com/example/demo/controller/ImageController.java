package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ImageController {

    private final FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadImage(@RequestParam("file") MultipartFile file) {
        String imageUrl = fileService.saveFile(file);
        return ResponseEntity.ok(ApiResponse.ok(Map.of("imageUrl", imageUrl)));
    }
}
