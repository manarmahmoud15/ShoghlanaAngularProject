import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IProposal } from '../Models/iproposal';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  private baseUrl = `${environment.baseUrl}/Proposal`;

  constructor(private httpclient: HttpClient) {}

  getAllProposals(): Observable<any> {
    return this.httpclient.get<any>(this.baseUrl);
  }

  getProposalById(id: number): Observable<any> {
    return this.httpclient.get<any>(`${this.baseUrl}/${id}`);
  }
  getProposalByJobId(id: Number): Observable<any> {  // saeed changed it from number to Number
    return this.httpclient.get<any>(`${this.baseUrl}/GetByJobId/${id}`);
  }

  getProposalByFreelancerId(id : Number) : Observable<any>
  {
    return this.httpclient.get<any>(`${this.baseUrl}/GetByFreelancerId/${id}`)
  }

  postProposal(proposalData: any): Observable<any> {
    return this.httpclient.post<any>(this.baseUrl, proposalData);
  }

  AcceptProposal(id : Number) : Observable<any>  // here
  {
    return this.httpclient.get<any>(`${this.baseUrl}/Accept/${id}`)
  }

  RejectProposal(id : Number) : Observable<any>  // here
  {
    return this.httpclient.get<any>(`${this.baseUrl}/Reject/${id}`)
  }
}  
