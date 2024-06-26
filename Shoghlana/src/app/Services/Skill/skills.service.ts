import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private _HttpClient: HttpClient) { }

  GetAll(): Observable<any> {
    return this._HttpClient.get<any>(`${environment.baseUrl}/skill`)
  }
}