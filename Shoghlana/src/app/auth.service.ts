import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient:HttpClient) { }
   register(userdata:object):Observable<any>{
   // return this._httpClient.post(`http://localhost:5092/api/Auth/Register`, JSON.parse(userdata))

    return this._httpClient.post(`http://localhost:5092/api/Auth/Register`, userdata)
}
login(userdata:object):Observable<any>{

   return this._httpClient.post(`http://localhost:5092/api/Auth/Token`, userdata)
}
}
