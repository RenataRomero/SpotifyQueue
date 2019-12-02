import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private httpClient:HttpClient) { }

  getSongs(queueToken:string):Promise<any> {
    const url = `${environment.url}queue/${queueToken}`;
    return this.httpClient.get(url).toPromise();
  }
}
