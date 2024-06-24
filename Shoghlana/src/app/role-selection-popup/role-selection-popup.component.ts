import { Component, Output } from '@angular/core';
import { EventEmitter } from 'stream';
import { UserRole } from '../Enums/UserRole';
import { UserRoleServiceService } from '../Services/UserRole/user-role-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-selection-popup',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './role-selection-popup.component.html',
  styleUrl: './role-selection-popup.component.css'
})
export class RoleSelectionPopupComponent {
  showModal : boolean = true;
  // @Output() RoleSelected : EventEmitter<string>;
 freelancer : UserRole = UserRole.Freelancer
 client : UserRole = UserRole.Client
  constructor(private UserRoleService : UserRoleServiceService) {
  //  this.RoleSelected = new EventEmitter<string>();
      }



  selectRole(selectedRole : UserRole)
  {
    console.log(selectedRole)
    this.UserRoleService.set(selectedRole);
   //  this.RoleSelected.emit(selectedRole);
   console.log(this.UserRoleService.get())
     this.showModal = false;
  }

}
