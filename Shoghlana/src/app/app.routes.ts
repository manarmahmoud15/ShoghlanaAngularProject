import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
  //لازم pATH match
  { path: '', redirectTo:"register", pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {path:'signin', component:LoginComponent},
  { path: 'freelancers', component: FreelancersComponent },
  { path: '**', component:NotFoundComponent},
];
import { FreelancersComponent } from './freelancers/freelancers.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
// import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {   }