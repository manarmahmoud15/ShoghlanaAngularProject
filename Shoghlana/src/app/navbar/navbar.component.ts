import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink ,RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogged:boolean=false;
  logOut(){
    this._authService.logOut();
  }
constructor(private _authService : AuthService){
 //using behavoir subject this code works with every change in dom
  _authService.userdata.subscribe({
    next:()=>{
      if(_authService.userdata.getValue()!==null){
    this.isLogged=true
  }
  else{
    this.isLogged= false
  }
    }
  })
}
}
