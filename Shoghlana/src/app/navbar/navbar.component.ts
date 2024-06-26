import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from '../Services/chat/chat.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink ,RouterLinkActive , CommonModule ,ReactiveFormsModule,FormsModule] ,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
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
    this.ChatService.messages$.subscribe(res=>{
      this.messages = res;
      console.log(this.messages)
    });

  }
}
