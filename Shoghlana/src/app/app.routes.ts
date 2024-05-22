import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
export const routes: Routes = [
  //لازم pATH match
  { path: '', redirectTo:"register", pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'freelancers', component: FreelancersComponent },
  { path: '**', component:NotFoundComponent},
];
import { FreelancersComponent } from './freelancers/freelancers.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
// import { NotfoundComponent } from './notfound/notfound.component';

