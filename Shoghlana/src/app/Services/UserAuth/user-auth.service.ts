import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  login(){
    localStorage.setItem('token' , 'anyThingUntilConnectedWithAPI')
  }
  logout()
  {
    localStorage.removeItem('token')
  }
  getUserLogged():boolean{
    return localStorage.getItem('token')?true:false; 
  }
}
