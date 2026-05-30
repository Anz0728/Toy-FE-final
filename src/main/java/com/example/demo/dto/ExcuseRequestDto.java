package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExcuseRequestDto {
    private String nickname;
    private String password;
    private String content;
    private String category;
    private String emotionTag;
}
