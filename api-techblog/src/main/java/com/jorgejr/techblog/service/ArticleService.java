package com.jorgejr.techblog.service;

import com.jorgejr.techblog.config.exception.NotFoundException;
import com.jorgejr.techblog.domain.Article;
import com.jorgejr.techblog.domain.Category;
import com.jorgejr.techblog.domain.DTO.ArticleDTO;
import com.jorgejr.techblog.domain.User;
import com.jorgejr.techblog.repository.ArticleRepository;
import com.jorgejr.techblog.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public ArticleService(ArticleRepository articleRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    public ArticleDTO createArticle(ArticleDTO dto, Long userId) {
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

        Article article = dto.toEntity(author);

        return ArticleDTO.fromEntity(articleRepository.save(article));
    }

    public Page<ArticleDTO> getArticles(String title, Category category, Pageable pageable) {

        String search = (title == null) ? "" : title;
        Page<Article> articles = articleRepository.searchByTitleAndOptionalCategory(search, category, pageable);

        return articles.map(ArticleDTO::fromEntity);
    }

    public ArticleDTO getArticleById(Long id) {
        return articleRepository.findById(id)
                .map(ArticleDTO::fromEntity)
                .orElseThrow(() -> new NotFoundException("Artigo não encontrado"));
    }

    public ArticleDTO updateArticle(Long id, ArticleDTO dto) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Artigo não encontrado"));

        article.setTitle(dto.getTitle());
        article.setContent(dto.getContent());
        article.setImage(dto.getImage());
        article.setCategory(dto.getCategory());
        article.setAuthorName(dto.getAuthorName());

        return ArticleDTO.fromEntity(articleRepository.save(article));
    }

    public void deleteArticle(Long id) {
        if (!articleRepository.existsById(id)) {
            throw new NotFoundException("Artigo não encontrado");
        }
        articleRepository.deleteById(id);
    }}
