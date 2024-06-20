import { Injectable } from '@angular/core';
import { UserRole } from '../../Enums/UserRole';

@Injectable({
  providedIn: 'root'
})
export class UserRoleServiceService {
 role! : number
  constructor() { }

  set(role : UserRole )
  {
    this.role = Number (role)
  }

  get() : number
  {
    return this.role
  }
}
