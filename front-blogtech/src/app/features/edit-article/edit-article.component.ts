import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../core/services/article.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { Router } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-edit-article',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.css'
})

export class EditArticleComponent implements OnInit {
  articleForm: FormGroup;
  articleData: any;
  tags = ['Frontend', 'Backend', 'Mobile', 'DevOps', 'AI'];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router, 
    private toast: ToastService
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      image: [''],
      content: ['', Validators.required],
      tags: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.articleData = history.state['article'];

    if (this.articleData) {
      this.articleForm.patchValue({
        title: this.articleData.title,
        image: this.articleData.image,
        content: this.articleData.content,
        tags: [this.articleData.category] 
      });
    } else {
      
      console.warn('Nenhum artigo recebido, redirecionando...');
      this.router.navigate(['/']);
    }
  }

  toggleTag(tag: string): void {

    const tagSelected = this.articleForm.get('tags')?.value as string[];

    if (tagSelected.length === 1 && tagSelected[0] === tag) {
      this.articleForm.get('tags')?.setValue([]);
    } else {
      this.articleForm.get('tags')?.setValue([tag]);
    }
  }

  isSelected(tag: string): boolean {
    return this.articleForm.get('tags')?.value.includes(tag);
  }


  submitForm(): void {
    if (this.articleForm.valid) {
      const formValue = this.articleForm.value;

      const articlePayload = {
        title: formValue.title,
        content: formValue.content,
        authorName: this.articleData.authorName,
        image: formValue.image,
        category: formValue.tags[0].toUpperCase()
      };

      this.articleService.updateArticle(articlePayload, this.articleData.id).subscribe({
        next: () =>  {
          this.toast.show('Artigo atualizado com sucesso!', 'success');
          this.router.navigate(['/feed']);
        },
        error: err => this.toast.show('Erro ao atualizar artigo!', 'error')
      });
    } else {
      this.articleForm.markAllAsTouched();
    }
  }
}
