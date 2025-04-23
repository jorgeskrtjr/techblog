import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface Comment {
  id: number;
  content: string;
  authorName: string;
  replies?: Comment[];
} //preciso exportar isso 

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Input() isReply = false;
}