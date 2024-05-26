import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient:HttpClient) { }
   register(userdata:object):Observable<any>{
    return this._httpClient.post('https://route-ecommerce.onrender.com/api/v1/auth//signup', JSON.stringify(userdata))
}
}
