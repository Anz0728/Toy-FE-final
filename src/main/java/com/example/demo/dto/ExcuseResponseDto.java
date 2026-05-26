package com.example.demo.dto;

import com.example.demo.entity.Excuse;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ExcuseResponseDto {
    private Long id;
    private String nickname;
    private String content;
    private String category;
    private String emotionTag;
    private int likes;
    private LocalDateTime createdAt;

    public ExcuseResponseDto(Excuse excuse) {
        this.id = excuse.getId();
        this.nickname = excuse.getNickname();
        this.content = excuse.getContent();
        this.category = excuse.getCategory();
        this.emotionTag = excuse.getEmotionTag();
        this.likes = excuse.getLikes();
        this.createdAt = excuse.getCreatedAt();
    }
}
