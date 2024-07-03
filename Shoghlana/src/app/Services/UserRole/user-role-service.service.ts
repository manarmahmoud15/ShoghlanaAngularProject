import { Injectable } from '@angular/core';
import { UserRole } from '../../Enums/UserRole';

@Injectable({
  providedIn: 'root'
})
export class UserRoleServiceService {
 role! : number | null
  constructor() { }

  set(role : UserRole | null )
  {
    this.role = role
  }

  get() : number | null
  {
    return this.role
  }
}
