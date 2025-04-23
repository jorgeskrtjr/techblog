package com.jorgejr.techblog.controller;

import com.jorgejr.techblog.config.exception.BadRequestException;
import com.jorgejr.techblog.domain.DTO.CommentDTO;
import com.jorgejr.techblog.domain.DTO.CreateCommentDTO;
import com.jorgejr.techblog.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
public class CommentController {

    private final CommentService service;

    public CommentController(CommentService service) {
        this.service = service;
    }

    @GetMapping("/{articleId}/comments")
    public ResponseEntity<List<CommentDTO>> getByArticle(@PathVariable Long articleId) {
        List<CommentDTO> dtos = service.getCommentsByArticle(articleId);
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/{articleId}/comments")
    public ResponseEntity<CommentDTO> createComment(
            @PathVariable Long articleId,
            @RequestBody @Valid CreateCommentDTO dto
    ) {
        if (!articleId.equals(dto.getArticleId())) {
            throw new BadRequestException("ID do artigo no path e no corpo devem ser iguais.");
        }

        CommentDTO created = service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}