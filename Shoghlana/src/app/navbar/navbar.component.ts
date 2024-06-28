import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from '../Services/chat/chat.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLogged:boolean=false;
 clientId! : Number

  logOut(){

    this._authService.logOut();
  }
  constructor(private _authService: AuthService) {
    //using behavoir subject this code works with every change in dom
    _authService.userdata.subscribe({
      next: () => {
        if (_authService.userdata.getValue() !== null) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      },
    });
  }
  isOpen = false;
  messages: any;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  ChatService = inject(ChatService);
  // loggedInUserName = sessionStorage.getItem("user");
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.isOpen = false;
    }
  }
  ngOnInit(): void {
  this.clientId = Number (localStorage.getItem('Id'));
    this.ChatService.messages$.subscribe(res=>{

      this.messages = res;
      console.log(this.messages);
    });
  }
}
