import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { env } from 'process';
import { IPaginatedJobsRequestBody } from '../../Models/i-paginated-jobs-request-body';
import { JobStatus } from '../../Enums/JobStatus';
import { keyframes } from '@angular/animations';

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

    minBudget: number = 0,
    maxBudget: number = 0,
    clientId: number = 0,
    freelancerId: number = 0,
    HasManyProposals: boolean = false,
    IsNew: boolean = true,
    page: number = 1,
    pageSize: number = 5,
    status: JobStatus = JobStatus.Active,
    requestBody: IPaginatedJobsRequestBody = {
      CategoriesIDs: [],
      Includes: []
    }
  ): Observable<any> {
    let params = new HttpParams()
      .set('MinBudget', (minBudget ?? 0).toString())
      .set('MaxBudget', (maxBudget ?? 0).toString())
      .set('ClientId', (clientId ?? 0).toString())
      .set('FreelancerId', (freelancerId ?? 0).toString())
      .set('HasManyProposals', (HasManyProposals ?? 0).toString())
      .set('IsNew', (IsNew ?? 1).toString())
      .set('page', (page ?? 1).toString())
      .set('pageSize', (pageSize ?? 5).toString())
      .set('status', (status ?? 5).toString());

    return this._HttpClient.post<any>(`${environment.baseUrl}/job/pagination`, requestBody, { params });
  }

  GetById(Id: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.baseUrl}/job/${Id}`)
  }

  GetByFreelancerId(Id: number): Observable<any> {
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

  searchByJobTitle(keyword: string): Observable<any> {
    let params = new HttpParams().set('KeyWord', keyword);
    return this._HttpClient.get<any>(`${environment.baseUrl}/job/Search`, { params });
  }
  
}