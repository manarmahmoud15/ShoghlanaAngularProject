import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApiAddProjectService {
  private baseUrl = `${environment.baseUrl}/job`;
  constructor(private httpClient:HttpClient) { }
  AddProject(projectData: any): Observable<any> {
    projectData.CategoryId = Number(projectData.categoryId);
    projectData.experienceLevel = Number(projectData.experienceLevel);
    console.log(projectData)
  
    return this.httpClient.post<any>(this.baseUrl, projectData);
  } 
}
