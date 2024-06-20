import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient: HttpClient) { }

  GetAll(): Observable<any> {
    return this._HttpClient.get<any>(`${environment.baseUrl}/category`)
  }

  GetById(Id: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.baseUrl}/category/${Id}`)
  }

  Add(job: any): Observable<any> {
    return this._HttpClient.post<any>(`${environment.baseUrl}/category`, job);
  }

  Delete(jobId: number): Observable<any> {
    return this._HttpClient.delete<any>(`${environment.baseUrl}/category/${jobId}`);
  }

  Edit(jobId: number, job: any): Observable<any> {
    return this._HttpClient.put<any>(`${environment.baseUrl}/category/${jobId}`, job);
  }
}