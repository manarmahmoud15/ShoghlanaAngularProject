import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

 // UnReadNotificationsCount! : number

  constructor(private _HttpClient: HttpClient) { }
  // saeed commented this 
  
  // headers:any = {
  //   token:localStorage.getItem('token')
  // }
  // AddNotification(ClientID : string):Observable<any>{
  //   return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/cart` ,{
  //     productId:ClientID
  //   },{
  //     headers : this.headers 
  //   })
  // }


  GetByFreelancerId(id : Number) : Observable<any>
  {
      return this._HttpClient.get(`${environment.baseUrl}/Notification/FreelancerId/` + id)
  }

  GetByClientId(id : Number) : Observable<any>
  {
      return this._HttpClient.get(`${environment.baseUrl}/Notification/ClientId/` + id)
  }


  getUnReadNotificationsCount() : number
  {
       return Number (localStorage.getItem('UnReadNotificationsCount'));
  }

  setUnReadNotificationsCount(count : any) : void
  {
     localStorage.setItem('UnReadNotificationsCount' , count)
  }  

}
