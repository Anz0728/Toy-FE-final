package com.example.demo.service;

import com.example.demo.dto.VoteResponseDto;
import com.example.demo.entity.Vote;
import com.example.demo.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VoteService {

    private final VoteRepository voteRepository;

    @Transactional(readOnly = true)
    public VoteResponseDto getCurrentVote() {
        Vote vote = voteRepository.findFirstByActiveOrderByCreatedAtDesc(true)
                .orElse(null);
        return vote != null ? new VoteResponseDto(vote) : null;
    }

    @Transactional
    public void castVote(Long id, String option) {
        Vote vote = voteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid vote ID"));
        
        if ("A".equalsIgnoreCase(option)) {
            vote.voteA();
        } else if ("B".equalsIgnoreCase(option)) {
            vote.voteB();
        } else {
            throw new IllegalArgumentException("Invalid option");
        }
    }
    
    @Transactional
    public Vote createVote(String title, String optionA, String optionB) {
        Vote vote = Vote.builder()
                .title(title)
                .optionA(optionA)
                .optionB(optionB)
                .active(true)
                .build();
        return voteRepository.save(vote);
    }
}
