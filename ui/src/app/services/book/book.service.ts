// src/app/services/book/book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../interfaces/book.interface';
import { Credential } from '../../interfaces/credential.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:3000';
  private apiUrl = this.baseUrl + '/books';
  private loginUrl = this.baseUrl + '/auth/login';

  constructor(private http: HttpClient) { }

  private getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private getHeaders(): HttpHeaders {
    const accessToken = this.getAccessToken();
    return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  }

  login(credentials: Credential): Observable<Credential> {
    return this.http.post<Credential>(this.loginUrl, credentials);
  }

  getBook(id: string): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book>(url, { headers: this.getHeaders() });
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, { headers: this.getHeaders() });
  }

  updateBook(id: string, book: Book): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Book>(url, book, { headers: this.getHeaders() });
  }

  deleteBook(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }
}
