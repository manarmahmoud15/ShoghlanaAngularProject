import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient } from '../../Models/IClient';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  // Update(UpdatedClient: IClient) {
  //   throw new Error('Method not implemented.');
  // }

  constructor(private _HttpClient : HttpClient) { }

  GetById(Id : Number) : Observable<any>
  {
return this._HttpClient.get<any>(`${environment.baseUrl}/Client/${Id}`)
  }

  Update( UpdatedClient : IClient) : Observable<any>
  {
    const formData : FormData = new FormData()
    formData.append('Id' , UpdatedClient.id.toString())
    formData.append('Image' , UpdatedClient.image)
    formData.append('Description' , UpdatedClient.description)
    formData.append('Country' , UpdatedClient.country)
    formData.append('Name' , UpdatedClient.name)
    // formData.append('Description' , Description)
    return this._HttpClient.put<any>(`${environment.baseUrl}/Client`, formData)
  }

  UpdateOverview( Description : string, Id : Number) : Observable<any>
  {
    const formData : FormData = new FormData()
    formData.append('Id' , Id.toString())
    formData.append('Image' , Description)
    // formData.append('Description' , Description)
    return this._HttpClient.put<any>(`${environment.baseUrl}/Client`, formData)
  }
}
