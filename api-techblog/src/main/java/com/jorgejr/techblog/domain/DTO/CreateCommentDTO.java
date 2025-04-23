package com.jorgejr.techblog.domain.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateCommentDTO {

    @NotNull(message = "O ID do artigo é obrigatório")
    private Long articleId;

    @NotNull(message = "O ID do usuário é obrigatório")
    private Long userId;

    private Long parentId;

    @NotBlank(message = "O conteúdo não pode estar vazio")
    private String content;

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
