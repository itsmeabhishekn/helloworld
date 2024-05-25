// src/app/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment ';

interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    const apiUrl = `${environment.apiUrl}/signup`; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(apiUrl, user, { headers });
  }
}
