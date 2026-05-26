package com.example.demo.service;

import com.example.demo.dto.CommentRequestDto;
import com.example.demo.dto.CommentResponseDto;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Excuse;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.ExcuseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ExcuseRepository excuseRepository;

    @Transactional
    public CommentResponseDto addComment(Long excuseId, CommentRequestDto requestDto) {
        Excuse excuse = excuseRepository.findById(excuseId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid excuse ID"));
        
        Comment comment = Comment.builder()
                .excuse(excuse)
                .nickname(requestDto.getNickname())
                .content(requestDto.getContent())
                .build();
        
        Comment saved = commentRepository.save(comment);
        return new CommentResponseDto(saved);
    }

    @Transactional(readOnly = true)
    public List<CommentResponseDto> getComments(Long excuseId) {
        return commentRepository.findAllByExcuseIdOrderByCreatedAtDesc(excuseId).stream()
                .map(CommentResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public CommentResponseDto updateComment(Long commentId, CommentRequestDto requestDto) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid comment ID"));
        
        comment.setNickname(requestDto.getNickname());
        comment.setContent(requestDto.getContent());
        return new CommentResponseDto(comment);
    }

    @Transactional
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid comment ID"));
        
        commentRepository.delete(comment);
    }
}
