import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../core/model/article.interface';
import { NgIf } from '@angular/common';
import { ArticleService } from '../../core/services/article.service';
import { CommentListComponent } from '../comment-list/comment-list.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    NgIf,
    CommentListComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  
  article?: Article; 

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ){}

  ngOnInit(): void{
    const id = this.route.snapshot.paramMap.get('id');
     
    if (id) {
      this.articleService.getArticleById(Number(id)).subscribe((article) => {
        this.article = article;
      });
    }
  }
 
}
