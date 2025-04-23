import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ButtonComponent } from '../../shared/button/button.component';
import { ArticleService } from '../../core/services/article.service';
import { Router } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';
import { AuthService } from '../../core/services/auth.service';
import { ImageUploadService } from '../../core/services/image-upload.service';

@Component({
  selector: 'app-create-article',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent
   ],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})

export class CreateArticleComponent {
  articleForm: FormGroup;
  tags = ['Frontend', 'Backend', 'Mobile', 'DevOps', 'AI'];
  selectedFile?: File;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router, 
    private toast: ToastService, 
    private authService: AuthService,
    private imageUploadService: ImageUploadService
  ) 
    {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      image: [''],
      content: ['', Validators.required],
      tags: [[], Validators.required]  
    });
  }
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.selectedFile = file;
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
    if (this.articleForm.valid && this.selectedFile) {
      this.imageUploadService.uploadImage(this.selectedFile).subscribe({
        next: (imageUrl) => {
          const formValue = this.articleForm.value;

          const articlePayload = {
            title: formValue.title,
            content: formValue.content,
            authorName: this.authService.getUserName() ?? '',
            image: imageUrl,
            category: formValue.tags[0].toUpperCase() ?? '',
            idAuthor: this.authService.getUserId()
          };

          this.articleService.createArticle(articlePayload).subscribe(() => {
            this.toast.show('Artigo criado com sucesso!', 'success');
            this.router.navigate(['/feed']);
          });
        },
        error: () => this.toast.show('Erro ao enviar imagem!', 'error')
      });
    }
  }
}