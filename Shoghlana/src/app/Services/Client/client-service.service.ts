import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient } from '../../Models/IClient';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private _HttpClient : HttpClient) { }

  GetById(Id : number) : Observable<any>
  {
return this._HttpClient.get<any>(`${environment.baseUrl}/Client/${Id}`)
  }
}
