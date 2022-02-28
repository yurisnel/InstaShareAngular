import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(protected httpClient: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    const body = {
      email: username,
      password: password,
    };
    return this.httpClient.post<string>(
      environment.apiUrl + '/auth/login',
      body
    );
  }

  saveProfile(body: any): Observable<string> {  
    return this.httpClient.put<string>(
      environment.apiUrl + '/profile',
      body
    );
  }
}
