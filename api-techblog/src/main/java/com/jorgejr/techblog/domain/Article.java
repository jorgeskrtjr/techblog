package com.jorgejr.techblog.domain;

import jakarta.persistence.*;


@Table(name = "articles")
@Entity(name = "Article")
public class Article extends BaseEntity {


    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;

    private String content;

    private String authorName;

    private String image;

    @Enumerated(EnumType.STRING)
    private Category category;


    public String getTitle() {
        return title;
    }

    public Long getAuthor() {
        return author.getId();
    }

    public String getContent() {
        return content;
    }

    public String getAuthorName() {
        return authorName;
    }

    public String getImage() {
        return image;
    }

    public Category getCategory() {
        return category;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setAuthor(User author) {
        this.author = author;
    }




}
