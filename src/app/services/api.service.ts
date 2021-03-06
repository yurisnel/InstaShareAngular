import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(protected httpClient: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      email: username,
      password: password,
    };
    return this.httpClient.post<any>(
      environment.apiUrl + '/auth/login',
      body
    );
  }

  register(user: User): Observable<any> {
    return this.httpClient.post<any>(
      environment.apiUrl + '/auth/signup',
      user
    );
  }

  getProfile(): Observable<any> {
    return this.httpClient.get<any>(
      environment.apiUrl + '/profile'
    );
  }  

  saveProfile(profile: Profile): Observable<any> {
    return this.httpClient.put<any>(
      environment.apiUrl + '/profile',
      profile
    );
  }
  
  uploadAvatar(file: File, requestAction: string = 'files'): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();
    headers = headers.append('content-type', 'application/x-www-form-urlencoded');

    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', environment.apiUrl + '/files/' + requestAction, formData, {
      reportProgress: true,
      //headers: headers,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/files');
  }
}
