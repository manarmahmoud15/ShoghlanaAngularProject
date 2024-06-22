import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproject } from '../../Models/Iproject';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProjectServiceService {
  constructor(private httpclient: HttpClient) {}

  GetByFreelancerId(id: number): Observable<Iproject> {
    console.log(id);
    return this.httpclient.get<Iproject>(`${environment.baseUrl}/Project/freelancer/${id}`);
  }
}
