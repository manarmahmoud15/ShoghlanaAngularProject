import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {

  constructor(private httpclient: HttpClient) { }

  // TODO Dont forget Paginataion & filteration

  getAllFreelancers(): Observable<any> {
    return this.httpclient.get<any>(`${environment.baseUrl}/Freelancer`);
  }

  getFreelancerById(id: number): Observable<any> {
    return this.httpclient.get<any>(`${environment.baseUrl}/Freelancer/${id}`)
  }
}