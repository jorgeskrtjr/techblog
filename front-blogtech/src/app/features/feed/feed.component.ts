import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trash, Pencil} from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/button/button.component';
import { ArticleService } from '../../core/services/article.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Article } from '../../core/model/article.interface';
import { AuthService } from '../../core/services/auth.service';
import { debounceTime, Subject } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-feed',
  standalone: true, 
  imports: [
  CommonModule, 
  LucideAngularModule,
  FormsModule,
  ButtonComponent, 
  MatPaginatorModule
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})

export class FeedComponent {
  categories = ['Frontend', 'Backend', 'Mobile', 'DevOps', 'AI'];
  articles: Article[] = []; 
  selectedCategory = ''; 
  searchQuery = '';
  
  totalItems: number = 0;
  page: number = 0;
  pageSize: number = 5;

  readonly Trash = Trash
  readonly Pencil = Pencil;

  loggedUserId!: number;
 
  allArticles: Article[] = [];   
  searchSubject: any;

  constructor(
    private articleService: ArticleService,
    private router:Router, 
    private authService: AuthService, 
    private toast: ToastService
  ){}

  ngOnInit(): void {
    this.loadArticles();
    this.loggedUserId = parseInt(this.authService.getUserId() || '0', 10);
    
    this.searchSubject = new Subject<string>();

    this.searchSubject.pipe(debounceTime(300)).subscribe((term: string) => {
      this.page = 0;
      this.searchQuery = term;
      this.loadArticles();
    });
  }
  
  loadArticles() {
    this.articleService.getArticles(this.searchQuery, this.page, this.pageSize, this.selectedCategory)
      .subscribe(response => {
        this.articles = response.content;
        this.totalItems = response.totalElements;
        this.page = response.number;
      });
  }
  

  selectCategory(category: string) { 
     this.selectedCategory = category; 
     this.loadArticles(); 
  }
  

  goToArticle(articleId: number):void{ 
    this.router.navigate(['/article', articleId])
  }
  
  createArticle():void{
    this.router.navigate(['/create'])
  }

  editArticle(article: Article): void {
    console.log(article)
    this.router.navigate(['/edit'], {
      state: { article }
    });
  }

  onSearch(term: string) {
    this.searchSubject.next(term);
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadArticles();
  }

  deleteArticle(event: Event, article: Article): void {
    event.stopPropagation(); 
    event.preventDefault();  
  
    const confirmed = window.confirm(`Tem certeza que deseja excluir o artigo "${article.title}"?`);
  
    if (confirmed) {
      this.articleService.deleteArticle(article.id).subscribe({
        next: () => {
          this.toast?.show('Artigo excluído com sucesso!', 'success');
          this.loadArticles();
        },
        error: () => {
          this.toast?.show('Erro ao excluir o artigo!', 'error');
        }
      });
    }
  }
}