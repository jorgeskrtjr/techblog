import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";

export interface Comment {
 id: number;
 content: string;
 authorName: string;
 replies?: Comment[];
}

@Injectable({
 providedIn: 'root',
})
export class CommentService {

 private apiUrl = `${environment.apiUrl}/articles`;

 constructor(private http: HttpClient) {}

 getCommentsByArticleId(articleId: number): Observable<Comment[]> {
   const url = `${this.apiUrl}/${articleId}/comments`;
   return this.http.get<Comment[]>(url);
 }

 postComment(comment: {
  articleId: number;
  userId: number;
  content: string;
  parentId: string | null;
}): Observable<any> {
  const url = `${this.apiUrl}/${comment.articleId}/comments`;
  return this.http.post(url, comment);
}
}