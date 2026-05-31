package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.UUID;

@Service
public class FileService {

    public String saveFile(MultipartFile file) {
        // 실제 파일 저장 로직 (S3, 로컬 스토리지 등)이 들어갈 자리입니다.
        // 여기서는 임시로 고유한 파일명을 생성하여 반환합니다.
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        return "/uploads/" + fileName; 
    }
}
