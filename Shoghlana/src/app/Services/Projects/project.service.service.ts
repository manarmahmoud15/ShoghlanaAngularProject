import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private httpclient:HttpClient) { }

  getAllProjects(): Observable<any> {
    return this.httpclient.get<any>(`${environment.baseUrl}/Job`);
  }
  getProjectById(id:number):Observable<any>{
    let searchString= new HttpParams();
    // searchString= searchString.append("projId",id)
    // searchString= searchString.append("limit",5)
// return this.httpclient.get<any>(`${environment.baseUrl}/Job${id}`,{params:searchString})
return this.httpclient.get<any>(`${environment.baseUrl}/Job/${id}`)

  }
}
