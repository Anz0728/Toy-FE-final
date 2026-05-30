package com.example.demo.config;

import com.example.demo.entity.Excuse;
import com.example.demo.repository.ExcuseRepository;
import com.example.demo.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final ExcuseRepository excuseRepository;
    private final VoteService voteService;

    @Override
    public void run(String... args) throws Exception {
        // Initial Excuses
        excuseRepository.save(Excuse.builder()
                .nickname("지각대장")
                .password("1234")
                .content("지하철에 외계인이 나타나서 늦었어요!")
                .category("지각")
                .emotionTag("👽")
                .likes(15)
                .build());

        excuseRepository.save(Excuse.builder()
                .nickname("프로다이어터")
                .password("1234")
                .content("맛있게 먹으면 0칼로리라고 해서 먹었습니다.")
                .category("다이어트")
                .emotionTag("🍔")
                .likes(8)
                .build());

        excuseRepository.save(Excuse.builder()
                .nickname("운동빌런")
                .password("1234")
                .content("근육이 쉬어야 한다고 해서 오늘은 집에서 쉬었습니다.")
                .category("운동")
                .emotionTag("😴")
                .likes(20)
                .build());

        // Initial Vote
        voteService.createVote("오늘의 최고의 핑계는?", "배탈 났다", "지하철 거꾸로 탔다");
    }
}
