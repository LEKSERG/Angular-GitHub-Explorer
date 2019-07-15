import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  baseUrl = 'https://api.github.com/';

  constructor(private http: HttpClient) { }

  getUsers(user: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `search/users?q=${user}&per_page=20&page=1`);
  }

  getPage(page: number, user: string) {
    return this.http.get<any>(this.baseUrl + `search/users?q=${user}&per_page=20&page=${page}`);
  }

  getUser(userlogin: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `users/${userlogin}`);
  }

  getRepos(userlogin: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `users/${userlogin}/repos?sort=updated`);
  }
}
