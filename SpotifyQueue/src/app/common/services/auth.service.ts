import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  isLoggeIn() {
    return !!localStorage.getItem('token');
  }

  isLoggeInPromise():Promise<any> {
    const url = `${environment.url}login`;
    return this.httpClient.get(url).toPromise();
  }
  getTokens():Observable<any> {
    const url = `${environment.url}tokens`;
    return this.httpClient.get(url);
  }
}
