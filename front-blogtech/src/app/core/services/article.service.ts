import { Injectable } from '@angular/core';
import { Observable, of, map, tap } from 'rxjs';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Article, ArticleRequest } from '../model/article.interface';
import { environment } from '../environments/environments';
import { Page } from '../model/page.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
  private apiUrl = `${environment.apiUrl}/articles`;
  
  constructor(private http:HttpClient) { }
 
  getArticles(
    searchQuery: string = '',
    page: number = 0,
    size: number = 5,
    category?: string 
  ): Observable<Page<Article>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (searchQuery) {
      params = params.set('param', searchQuery);
    }

    if (category) {
      params = params.set('category', category.toUpperCase());    
    }

    return this.http.get<Page<Article>>(this.apiUrl, { params });
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`, {
      responseType: 'json'
    }).pipe( 
      tap(res => console.log('Resposta da API:', res))
    );
  }

  createArticle(article: ArticleRequest): Observable<ArticleRequest>{ 
    return this.http.post<ArticleRequest>(this.apiUrl, article); 
  }

 updateArticle(article: ArticleRequest, id: number): Observable<ArticleRequest>{ 
    return this.http.put<ArticleRequest>(`${this.apiUrl}/${id}`, article); 
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
