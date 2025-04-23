package com.jorgejr.techblog.domain.DTO;

import com.jorgejr.techblog.domain.Article;
import com.jorgejr.techblog.domain.Category;
import com.jorgejr.techblog.domain.User;

public class ArticleDTO {

    private Long id;
    private String title;
    private String content;
    private String authorName;
    private String image;
    private Category category;
    private Long idAuthor;


    public static ArticleDTO fromEntity(Article article) {
        ArticleDTO dto = new ArticleDTO();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setContent(article.getContent());
        dto.setAuthorName(article.getAuthorName());
        dto.setImage(article.getImage());
        dto.setCategory(article.getCategory());
        dto.setIdAuthor(article.getAuthor());
        return dto;
    }

    public Article toEntity(User author) {
        Article article = new Article();
        article.setTitle(this.title);
        article.setContent(this.content);
        article.setAuthor(author);
        article.setAuthorName(this.authorName);
        article.setImage(this.image);
        article.setCategory(this.category);
        return article;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public Category getCategory() {
        return category;
    }

    public String getImage() {
        return image;
    }

    public String getAuthorName() {
        return authorName;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public Long getIdAuthor() {
        return idAuthor;
    }

    public void setIdAuthor(Long idAuthor) {
        this.idAuthor = idAuthor;
    }
}