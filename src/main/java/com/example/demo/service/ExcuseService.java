package com.example.demo.service;

import com.example.demo.dto.ExcuseRequestDto;
import com.example.demo.dto.ExcuseResponseDto;
import com.example.demo.entity.Excuse;
import com.example.demo.repository.ExcuseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExcuseService {

    private final ExcuseRepository excuseRepository;

    @Transactional
    public ExcuseResponseDto createExcuse(ExcuseRequestDto requestDto) {
        Excuse excuse = Excuse.builder()
                .nickname(requestDto.getNickname())
                .password(requestDto.getPassword())
                .content(requestDto.getContent())
                .category(requestDto.getCategory())
                .emotionTag(requestDto.getEmotionTag())
                .build();
        
        Excuse saved = excuseRepository.save(excuse);
        return new ExcuseResponseDto(saved);
    }

    @Transactional(readOnly = true)
    public List<ExcuseResponseDto> getAllExcuses() {
        return excuseRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(ExcuseResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ExcuseResponseDto> getHallOfFame() {
        return excuseRepository.findTop3ByOrderByLikesDescCreatedAtDesc().stream()
                .map(ExcuseResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void likeExcuse(Long id) {
        Excuse excuse = excuseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid excuse ID"));
        excuse.incrementLikes();
    }

    @Transactional
    public void deleteExcuse(Long id, String password) {
        Excuse excuse = excuseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid excuse ID"));
        
        if (!excuse.getPassword().equals(password)) {
            throw new IllegalArgumentException("Incorrect password");
        }
        
        excuseRepository.delete(excuse);
    }

    @Transactional
    public ExcuseResponseDto updateExcuse(Long id, ExcuseRequestDto requestDto) {
        Excuse excuse = excuseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid excuse ID"));

        if (!excuse.getPassword().equals(requestDto.getPassword())) {
            throw new IllegalArgumentException("Incorrect password");
        }

        excuse.setNickname(requestDto.getNickname());
        excuse.setContent(requestDto.getContent());
        excuse.setCategory(requestDto.getCategory());
        excuse.setEmotionTag(requestDto.getEmotionTag());

        return new ExcuseResponseDto(excuse);
    }
}
