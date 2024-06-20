import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { JobsComponent } from './jobs/jobs.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
// import { SignalRService } from './Services/signal-r.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [  RouterOutlet, LoginComponent , RegisterComponent, HomeComponent, ReactiveFormsModule, CommonModule , FooterComponent,  ProjectDetailsComponent,NavbarComponent ,JobsComponent , RouterLink , RouterLinkActive ]
})
export class AppComponent implements OnInit , OnDestroy {
  constructor(
    // public _SignalRService:SignalRService
  ){}
  ngOnDestroy(): void {
    // this._SignalRService.hubConnection?.off('askServerResponse')
    // this._SignalRService.hubConnection?.stop()
    // .catch(err => console.error('Error while stopping connection: ' + err));
  }
  ngOnInit(): void {
// <<<<<<< new-new
//     // this._SignalRService.startConnection();

//     // setTimeout(()=> {
//     //   this._SignalRService.askServerListener();
//     //   this._SignalRService.askServer();
//     // },2000)
// =======
//     this._SignalRService.startConnection();
    
//     setTimeout(()=> {
//       this._SignalRService.askServerListener();
//       this._SignalRService.askServer();
//     },2000)
// >>>>>>> main
  }
  title = 'Shoghlana';
}
