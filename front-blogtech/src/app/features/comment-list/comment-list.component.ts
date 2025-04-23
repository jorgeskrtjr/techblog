import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../core/services/comment.service';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../../shared/comment/comment.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, CommentComponent, ButtonComponent, FormsModule],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})

export class CommentListComponent implements OnInit {
  @Input() articleId!: number;
  commentContent: string = '';

  comments: any[] = [];

  constructor(
    private commentService: CommentService,
    private toast: ToastService, 
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    if (this.articleId) {
      this.loadComments();
    }
  }

  submitComment() {
    const comment = {
      articleId: this.articleId,
      userId: Number(this.authService.getUserId()), 
      content: this.commentContent,
      parentId: '' 
    };

    this.commentService.postComment(comment).subscribe({
      next: (res) => {
        this.toast.show('Comentário enviado com sucesso!', 'success'),       
        this.commentContent = ''; 
        this.loadComments();
      },
      error: (err) => {
        this.toast.show('Erro ao enviar comentário!', 'error')      }
    });
  }

  loadComments() {
    this.commentService.getCommentsByArticleId(this.articleId).subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (err) => {
        console.error('Erro ao carregar comentários', err);
      },
    });
  }
}