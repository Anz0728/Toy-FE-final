package com.example.demo.service;

import com.example.demo.dto.CommentRequestDto;
import com.example.demo.dto.CommentResponseDto;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Excuse;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.ExcuseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class CommentServiceTest {

    @Autowired
    private CommentService commentService;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ExcuseRepository excuseRepository;

    private Excuse savedExcuse;

    @BeforeEach
    void setUp() {
        Excuse excuse = Excuse.builder()
                .nickname("test user")
                .password("1234")
                .content("test excuse")
                .category("work")
                .build();
        savedExcuse = excuseRepository.save(excuse);
    }

    @Test
    @DisplayName("댓글 수정 기능 테스트")
    void updateCommentTest() {
        // given
        CommentRequestDto addDto = new CommentRequestDto();
        addDto.setNickname("commenter");
        addDto.setContent("original content");
        CommentResponseDto savedComment = commentService.addComment(savedExcuse.getId(), addDto);

        CommentRequestDto updateDto = new CommentRequestDto();
        updateDto.setContent("updated content");

        // when
        CommentResponseDto updatedComment = commentService.updateComment(savedComment.getId(), updateDto);

        // then
        assertThat(updatedComment.getContent()).isEqualTo("updated content");
        
        Comment found = commentRepository.findById(savedComment.getId()).orElseThrow();
        assertThat(found.getContent()).isEqualTo("updated content");
    }

    @Test
    @DisplayName("댓글 삭제 기능 테스트")
    void deleteCommentTest() {
        // given
        CommentRequestDto addDto = new CommentRequestDto();
        addDto.setNickname("commenter");
        addDto.setContent("content to delete");
        CommentResponseDto savedComment = commentService.addComment(savedExcuse.getId(), addDto);

        // when
        commentService.deleteComment(savedComment.getId());

        // then
        assertThat(commentRepository.findById(savedComment.getId())).isEmpty();
    }
}
