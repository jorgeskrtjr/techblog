import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginError = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private toast: ToastService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.loginForm.get('email')?.setErrors(null);
    this.loginForm.get('password')?.setErrors(null);

    if (this.loginForm.valid) {

      const { email, password } = this.loginForm.value

      this.auth.login(email, password).subscribe({
        next: () => { 
          this.toast.show('Login efetuado com sucesso', 'success');
          this.router.navigate(['/feed']);
        },
        error: () => {
          this.loginError = true;
          this.loginForm.markAllAsTouched();
  
          this.loginForm.get('email')?.setErrors({ credentials: true });
          this.loginForm.get('password')?.setErrors({ credentials: true });
  
          this.toast.show('Email ou senha incorretos', 'error');
        },
      });

    }
  }
}
