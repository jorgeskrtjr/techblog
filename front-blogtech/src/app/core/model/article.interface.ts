export interface Article {
 id: number;
 title: string;
 content: string;
 authorName: string; 
 image: string; 
 category: string; 
 idAuthor: number;
}

export interface ArticleRequest {
 title: string;
 content: string;
 authorName: string; 
 image: string; 
 category: string; 
}