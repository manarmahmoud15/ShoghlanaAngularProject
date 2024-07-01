import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../../Models/user';


@Injectable({
  providedIn: 'root'
})
export class IndividualchatService {

  constructor(private httpClient:HttpClient) { }
  
  registerUser (user :User){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(`${environment.baseUrl}/chat/register-user` ,JSON.stringify(user) ,{headers,responseType:'text'});
  }
}



