package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageAnalysisDto {
    private String itemName;
    private String category;
    private Integer amount;
    private Integer aiConfidence;
    private String recommendedEmotion;
    private LocalDate purchaseDate;
    private String imageUrl;
}
