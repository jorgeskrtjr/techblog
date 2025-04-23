package com.jorgejr.techblog.domain;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comments")
public class Comment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")  // null = comentário raiz
    private Comment parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> replies = new ArrayList<>();

    @Column(nullable = false, length = 1000)
    private String content;

    @Column(nullable = false)
    private Integer favorites = 0;

    public String getContent() {
        return content;
    }

    public List<Comment> getReplies() {
        return replies;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public void setArticle(Article article) {
        this.article = article;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public void setParent(Comment parent) {
        this.parent = parent;
    }
    public Article getArticle() {
        return article;
    }

    public Comment getParent() {
        return parent;
    }
    public Integer getFavorites() {
        return favorites;
    }
}