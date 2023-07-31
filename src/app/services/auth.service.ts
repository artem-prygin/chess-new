import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private tokenExpirationTimer: ReturnType<typeof setTimeout>;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getDecodedToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return jwt_decode(token);
    }
    return null;
  }

  resetTokenExpirationTimer(): void {
    clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = setTimeout(() => this.logout(), 3600000);
  }
}

