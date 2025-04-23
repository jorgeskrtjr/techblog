import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { LoginResponse } from '../model/loginResponse.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })

export class AuthService {
  
  private apiUrl = 'http://localhost:8080/auth/login';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        console.log("chegou");
        localStorage.setItem(this.tokenKey, response.token);
        console.log(response.token);
        localStorage.setItem('user_name', response.name);
        const decodedToken: any = jwtDecode(response.token);
        localStorage.setItem('user_id', decodedToken.userId);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  getUserName(): string | null {
    return localStorage.getItem('user_name');
  }
}
