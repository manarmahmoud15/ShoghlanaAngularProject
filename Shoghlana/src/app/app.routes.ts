import { Routes } from '@angular/router';
import { FreelancersComponent } from './freelancers/freelancers.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FreelancerProfileComponent } from './freelancer-profile/freelancer-profile.component';
import { FreelancerWorkHistoryComponent } from './freelancer-work-history/freelancer-work-history.component';
import { FreelancerPortfolioComponent } from './freelancer-portfolio/freelancer-portfolio.component';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'freelancers', component: FreelancersComponent },
    {
        path: 'freelancerprofile/:id', component: FreelancerProfileComponent, children: [
            { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
            { path: 'portfolio', component: FreelancerPortfolioComponent },
            { path: 'workhistory', component: FreelancerWorkHistoryComponent }
        ]
    },
    { path: '**', component: NotfoundComponent }
];
