package com.jorgejr.techblog.service;

import com.jorgejr.techblog.config.GlobalExceptionHandler;
import com.jorgejr.techblog.config.exception.BadRequestException;
import com.jorgejr.techblog.config.exception.NotFoundException;
import com.jorgejr.techblog.domain.Article;
import com.jorgejr.techblog.domain.Comment;
import com.jorgejr.techblog.domain.DTO.CommentDTO;
import com.jorgejr.techblog.domain.DTO.CreateCommentDTO;
import com.jorgejr.techblog.domain.User;
import com.jorgejr.techblog.repository.ArticleRepository;
import com.jorgejr.techblog.repository.CommentRepository;
import com.jorgejr.techblog.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, ArticleRepository articleRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    public List<CommentDTO> getCommentsByArticle(Long articleId) {
        List<Comment> parents = commentRepository.findByArticleIdAndParentIsNullOrderByCreatedAtAsc(articleId);
        return parents.stream()
                .map(CommentDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public CommentDTO create(CreateCommentDTO dto) {
        Article article = articleRepository.findById(dto.getArticleId())
                .orElseThrow(() -> new NotFoundException("Artigo não encontrado"));

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

        Comment comment = new Comment();
        comment.setArticle(article);
        comment.setUser(user);
        comment.setContent(dto.getContent());

        if (dto.getParentId() != null) {
            Comment parent = commentRepository.findById(dto.getParentId())
                    .orElseThrow(() -> new NotFoundException("Comentário pai não encontrado"));

            if (parent.getParent() != null) {
                throw new BadRequestException("Não é permitido responder a um comentário que já é resposta.");
            }

            comment.setParent(parent);
        }

        Comment saved = commentRepository.save(comment);
        return new CommentDTO(saved);
    }
}