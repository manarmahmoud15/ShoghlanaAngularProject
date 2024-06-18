import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private httpclient:HttpClient) { }

  getAllProposals(): Observable<any> {
    return this.httpclient.get<any>(`${environment.baseUrl}/Proposal`);
  }
  getProposalById(id:number):Observable<any>{
return this.httpclient.get<any>(`${environment.baseUrl}/Proposal${id}`)
  }
}
