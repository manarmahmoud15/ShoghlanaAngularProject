import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private httpclient:HttpClient) { }

  getAllProjects(): Observable<any> {
    return this.httpclient.get<any>(`${environment.baseUrl}/Job`);
  }
  getProjectById(id:number):Observable<any>{
return this.httpclient.get<any>(`${environment.baseUrl}/Job${id}`)
  }
}