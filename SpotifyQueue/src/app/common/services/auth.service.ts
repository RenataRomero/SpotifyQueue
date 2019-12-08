import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  
}
