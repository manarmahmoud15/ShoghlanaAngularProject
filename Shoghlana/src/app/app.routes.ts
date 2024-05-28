
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancersComponent } from './freelancers/freelancers.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FreelancerProfileComponent } from './freelancer-profile/freelancer-profile.component';
import { FreelancerWorkHistoryComponent } from './freelancer-work-history/freelancer-work-history.component';
import { FreelancerPortfolioComponent } from './freelancer-portfolio/freelancer-portfolio.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './Gards/auth.guard';
import { JobsComponent } from './jobs/jobs.component';
import { ProjectsComponent } from './projects/projects.component';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'home', component: HomeComponent, canActivate:[authGuard]},
    {path:'signin', component:LoginComponent},
    { path: 'login', component: LoginComponent },
    { path: 'freelancers', component: FreelancersComponent },
    { path: 'jobs', component: JobsComponent },
    { path: 'projects', component: ProjectsComponent },
    {
        path: 'freelancerprofile/:id', component: FreelancerProfileComponent, children: [
            { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
            { path: 'portfolio', component: FreelancerPortfolioComponent },
            { path: 'workhistory', component: FreelancerWorkHistoryComponent }
        ]
    },
    { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {   }
