package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.ImageAnalysisDto;
import com.example.demo.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HomeController {

    private final HomeService homeService;

    @PostMapping(value = "/home", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ImageAnalysisDto>> uploadImage(
            @RequestPart("image") MultipartFile image,
            @RequestParam("imageUrl") String imageUrl,
            @RequestHeader("X-Guest-Id") String guestId) {

        if (image == null || image.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.fail("MISSING_IMAGE", "이미지를 첨부해주세요"));
        }
        
        ImageAnalysisDto result = homeService.analyzeImage(image, imageUrl);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }
}
