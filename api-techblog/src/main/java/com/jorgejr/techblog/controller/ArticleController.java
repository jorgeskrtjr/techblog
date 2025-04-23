package com.jorgejr.techblog.controller;

import com.jorgejr.techblog.domain.Category;
import com.jorgejr.techblog.domain.DTO.ArticleDTO;
import com.jorgejr.techblog.service.ArticleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService service;

    public ArticleController(ArticleService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ArticleDTO> create(@RequestBody ArticleDTO dto) {

        return ResponseEntity.ok(service.createArticle(dto, dto.getIdAuthor()));
    }

    @GetMapping
    public ResponseEntity<Page<ArticleDTO>> getAll(
            @RequestParam(defaultValue = "") String param,
            @RequestParam(required = false) Category category,
            Pageable pageable
    ) {
        return ResponseEntity.ok(service.getArticles(param, category, pageable));
    }


    @GetMapping("/{id}")
    public ResponseEntity<ArticleDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getArticleById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleDTO> update(@PathVariable Long id, @RequestBody ArticleDTO dto) {
        return ResponseEntity.ok(service.updateArticle(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }
}