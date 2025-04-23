package com.jorgejr.techblog.repository;

import com.jorgejr.techblog.domain.Article;
import com.jorgejr.techblog.domain.Category;
import com.jorgejr.techblog.domain.DTO.ArticleDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Query("""
    SELECT a FROM Article a
    WHERE LOWER(a.title) LIKE LOWER(CONCAT('%', :title, '%'))
    AND (:category IS NULL OR a.category = :category)
""")
    Page<Article> searchByTitleAndOptionalCategory(@Param("title") String title, @Param("category") Category category, Pageable pageable);

}
