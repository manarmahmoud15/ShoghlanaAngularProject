import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JobsComponent } from './jobs/jobs.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { DarkModeService } from './Services/DarkMode/dark-mode.service';
import {TranslateLoader , TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// import { SignalRService } from './Services/signal-r.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
   
    RouterOutlet,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ReactiveFormsModule,
    CommonModule,
    FooterComponent,
    ProjectDetailsComponent,
    NavbarComponent,
    JobsComponent,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    FormsModule , 
    // BrowserAnimationsModule
  ],
})
export class AppComponent {
  title = 'signalr-angular-app';
  notifications: any[] = [];
  darkModeService : DarkModeService = inject(DarkModeService)

}
