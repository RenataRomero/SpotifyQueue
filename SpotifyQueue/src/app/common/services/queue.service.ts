import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  createQueue(nameQueue:string, descriptionQueue:string):Promise<any> {
    const url = `${environment.url}queue/create`;
    const data = {
      "access_token": localStorage.getItem("token"),
      "user_id": localStorage.getItem("user_id"),
      "name": nameQueue,
      "description": descriptionQueue
    }
    let httpHeaders = new HttpHeaders(({'Content-Type': 'application/json', 'x-auth-user': localStorage.getItem("token")})); 
     let options = {
       headers: httpHeaders
     }
    return this.httpClient.post(url, JSON.stringify(data), options).toPromise();
  }

}
