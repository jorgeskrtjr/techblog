package com.jorgejr.techblog.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;

    @MappedSuperclass
    public abstract class BaseEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        protected Long id;

        @Column(nullable = false, updatable = false)
        protected LocalDateTime createdAt;

        @Column(nullable = false)
        protected LocalDateTime updatedAt;

        @PrePersist
        protected void onCreate() {
            this.createdAt = LocalDateTime.now();
            this.updatedAt = LocalDateTime.now();
        }

        @PreUpdate
        protected void onUpdate() {
            this.updatedAt = LocalDateTime.now();
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public LocalDateTime getUpdatedAt() {
            return updatedAt;
        }

        public void setUpdatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
        }
    }

