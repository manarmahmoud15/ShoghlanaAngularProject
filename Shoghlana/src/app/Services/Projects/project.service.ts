import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Iproject } from '../../Models/Iproject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _HttpClient: HttpClient) { }

  GetAll(): Observable<any> {
    return this._HttpClient.get<any>(`${environment.baseUrl}/project`)
  }

  GetById(Id: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.baseUrl}/project/${Id}`)
  }

  GetByFreelancerId(Id: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.baseUrl}/project/freelancer/${Id}`)
  }

  addProject(freelancerId: number, projectData: FormData): Observable<any> {
    return this._HttpClient.post<any>(`${environment.baseUrl}/project/${freelancerId}`, projectData);
  }

  updateProject(freelancerId: number, projectData: FormData): Observable<any> {
    return this._HttpClient.put<any>(`${environment.baseUrl}/project/${freelancerId}`, projectData);
  }

  deleteProject(projectId: number): Observable<any> {
    return this._HttpClient.delete<any>(`${environment.baseUrl}/project/${projectId}`);
  }
}