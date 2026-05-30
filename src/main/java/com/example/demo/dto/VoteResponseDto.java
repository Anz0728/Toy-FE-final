package com.example.demo.dto;

import com.example.demo.entity.Vote;
import lombok.Getter;

@Getter
public class VoteResponseDto {
    private Long id;
    private String title;
    private String optionA;
    private String optionB;
    private int countA;
    private int countB;

    public VoteResponseDto(Vote vote) {
        this.id = vote.getId();
        this.title = vote.getTitle();
        this.optionA = vote.getOptionA();
        this.optionB = vote.getOptionB();
        this.countA = vote.getCountA();
        this.countB = vote.getCountB();
    }
}
