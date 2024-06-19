import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private _HttpClient: HttpClient) { }

  GetAll(): Observable<any> {
    return this._HttpClient.get<any>(`${environment.baseUrl}/Job`)
  }

  getPaginatedJobs(
    // The server handles the Zeros & nulls and doesn't do any filteration then
    page: number = 1,
    pageSize: number = 5,
    categoryId: number = 0 ,
    minBudget: number = 0,
    maxBudget: number = 0 ,
    clientId: number = 0 ,
    freelancerId: number = 0,
    includes: string[] | null = null  
  ): Observable<any> {
    let params = new HttpParams()
      .set('MinBudget', minBudget.toString())
      .set('MaxBudget', maxBudget.toString())
      .set('CategoryId', categoryId.toString())
      .set('ClientId', clientId.toString())
      .set('FreelancerId', freelancerId.toString())
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (includes) {
      params = params.set('includes', includes.join(','));
    }

    return this._HttpClient.get<any>(`${environment.baseUrl}/job/pagination`, { params });
  }

  GetById(Id: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.baseUrl}/job/${Id}`)
  }

  GetByfreelancerId(Id: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.baseUrl}/job/freelancer/${Id}`)
  }

  GetByClientId(Id: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.baseUrl}/job/client/${Id}`)
  }

  GetByCategoryId(Id: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.baseUrl}/job/category/${Id}`)
  }

  getJobsByCategoryIds(ids: number[]): Observable<any> {
    let params = new HttpParams();

    ids.forEach(id => {
      params = params.append('ids', id.toString());
    });

    return this._HttpClient.get<any>(`${environment.baseUrl}/job/categories`, { params });
  }

  addJob(job: any): Observable<any> {
    return this._HttpClient.post<any>(`${environment.baseUrl}/job`, job);
  }

  deleteJob(jobId: number): Observable<any> {
    return this._HttpClient.delete<any>(`${environment.baseUrl}/job/${jobId}`);
  }

  editJob(jobId: number, job: any): Observable<any> {
    return this._HttpClient.put<any>(`${environment.baseUrl}/job/${jobId}`, job);
  }
}