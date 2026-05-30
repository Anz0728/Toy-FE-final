package com.example.demo.controller;

import com.example.demo.dto.ExcuseRequestDto;
import com.example.demo.dto.ExcuseResponseDto;
import com.example.demo.service.ExcuseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/excuses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ExcuseController {

    private final ExcuseService excuseService;

    @PostMapping
    public ResponseEntity<ExcuseResponseDto> createExcuse(@RequestBody ExcuseRequestDto requestDto) {
        return ResponseEntity.ok(excuseService.createExcuse(requestDto));
    }

    @GetMapping
    public ResponseEntity<List<ExcuseResponseDto>> getAllExcuses() {
        return ResponseEntity.ok(excuseService.getAllExcuses());
    }

    @GetMapping("/hall-of-fame")
    public ResponseEntity<List<ExcuseResponseDto>> getHallOfFame() {
        return ResponseEntity.ok(excuseService.getHallOfFame());
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Void> likeExcuse(@PathVariable Long id) {
        excuseService.likeExcuse(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExcuseResponseDto> updateExcuse(@PathVariable Long id, @RequestBody ExcuseRequestDto requestDto) {
        return ResponseEntity.ok(excuseService.updateExcuse(id, requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExcuse(@PathVariable Long id, @RequestBody Map<String, String> passwordMap) {
        excuseService.deleteExcuse(id, passwordMap.get("password"));
        return ResponseEntity.ok().build();
    }
}
