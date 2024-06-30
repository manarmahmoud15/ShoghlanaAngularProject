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
import { WorksGalleryComponent } from './works-gallery/works-gallery.component';
import { JobsComponent } from './jobs/jobs.component';
import { ProjectsComponent } from './projects/projects.component';
import { FreelancerEditProfileComponent } from './freelancer-edit-profile/freelancer-edit-profile.component';
// import { ClientProfileComponent } from './client-profile/client-profile.component';
import { AddprojectComponent } from './addproject/addproject.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'register', loadComponent: () => import('./register/register.component')
      .then((obj) => obj.RegisterComponent)
  },
  {
    path: 'home', loadComponent: () => import('./home/home.component')
      .then((obj) => obj.HomeComponent)
  },
  {
    path: 'signin', loadComponent: () => import('./login/login.component')
      .then((obj) => obj.LoginComponent)
  },
  {
    path: 'galleryworks', loadComponent: () => import('./works-gallery/works-gallery.component')
      .then((obj) => obj.WorksGalleryComponent)
  },
  {
    path: 'freelancers', loadComponent: () => import('./freelancers/freelancers.component')
      .then((obj) => obj.FreelancersComponent)
  },
  {
    path: 'works', loadComponent: () => import('./work/work.component')
      .then((obj) => obj.WorkComponent)
  },
  { path: 'jobs', loadComponent: () => import('./jobs/jobs.component').then((obj) => obj.JobsComponent) },
  {
    path: 'offers', loadComponent: () => import('./offers/offers.component')
      .then((obj) => obj.OffersComponent)
  },
  { path: 'projects', loadComponent: () => import('./projects/projects.component').then((Obj) => Obj.ProjectsComponent) },
  //  { path : 'projectDetails/:id' , loadComponent:()=> import('./project-details/project-details.component')
  // .then((obj) =>obj.ProjectDetailsComponent)} ,
  { path: 'clientProfile/:id', component: ClientProfileComponent },
  { path: 'project-details/:id', loadComponent: () => import('./project-details/project-details.component').then((obj) => obj.ProjectDetailsComponent) },

  {
    path: 'freelancerprofile/:id',
    loadComponent: () => import('./freelancer-profile/freelancer-profile.component').then(obj => obj.FreelancerProfileComponent),
    children: [
      //  { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
      { path: 'portfolio', loadComponent: () => import('./freelancer-portfolio/freelancer-portfolio.component').then(obj => obj.FreelancerPortfolioComponent) },
      { path: 'workhistory', loadComponent: () => import('./freelancer-work-history/freelancer-work-history.component').then(obj => obj.FreelancerWorkHistoryComponent) },
      {
        path: 'edit', loadComponent: () => import('./freelancer-edit-profile/freelancer-edit-profile.component')
          .then(obj => obj.FreelancerEditProfileComponent)
      }
    ]
  },


  {
    path: 'addproject', loadComponent: () =>
      import('./addproject/addproject.component').then(obj => obj.AddprojectComponent)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'register', loadComponent: () => import('./register/register.component')
      .then((obj) => obj.RegisterComponent)
  },
  {
    path: 'home', loadComponent: () => import('./home/home.component')
      .then((obj) => obj.HomeComponent)
  },
  {
    path: 'signin', loadComponent: () => import('./login/login.component')
      .then((obj) => obj.LoginComponent)
  },
  {
    path: 'galleryworks', canActivate: [authGuard], loadComponent: () => import('./works-gallery/works-gallery.component')
      .then((obj) => obj.WorksGalleryComponent)
  },
  {
    path: 'freelancers', canActivate: [authGuard], loadComponent: () => import('./freelancers/freelancers.component')
      .then((obj) => obj.FreelancersComponent)
  },
  {
    path: 'works', canActivate: [authGuard], loadComponent: () => import('./work/work.component')
      .then((obj) => obj.WorkComponent)
  },
  { path: 'jobs', canActivate: [authGuard], loadComponent: () => import('./jobs/jobs.component').then((obj) => obj.JobsComponent) },
  {
    path: 'offers', canActivate: [authGuard], loadComponent: () => import('./offers/offers.component')
      .then((obj) => obj.OffersComponent)
  },
  {
    path: 'joinRoom', canActivate: [authGuard], loadComponent: () => import('./join-room/join-room.component')
      .then((obj) => obj.JoinRoomComponent)
  },
  {
    path: 'welcome', canActivate: [authGuard], loadComponent: () => import('./welcome/welcome.component')
      .then((obj) => obj.WelcomeComponent)
  },
  {
    path: 'chat', canActivate: [authGuard], loadComponent: () => import('./chat/chat.component')
      .then((obj) => obj.ChatComponent)
  },
  { path: 'projects', canActivate: [authGuard], loadComponent: () => import('./projects/projects.component').then((Obj) => Obj.ProjectsComponent) },
  //  { path : 'projectDetails/:id' , loadComponent:()=> import('./project-details/project-details.component')
  // .then((obj) =>obj.ProjectDetailsComponent)} ,
  // { path: 'clientProfile/:id', component: ClientProfileComponent },
  { path: 'project-details/:id', loadComponent: () => import('./project-details/project-details.component').then((obj) => obj.ProjectDetailsComponent) },

  {
    path: 'freelancerprofile/:id', canActivate: [authGuard],
    loadComponent: () => import('./freelancer-profile/freelancer-profile.component').then(obj => obj.FreelancerProfileComponent),
    children: [
      //  { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
      { path: 'portfolio', loadComponent: () => import('./freelancer-portfolio/freelancer-portfolio.component').then(obj => obj.FreelancerPortfolioComponent) },
      { path: 'workhistory', loadComponent: () => import('./freelancer-work-history/freelancer-work-history.component').then(obj => obj.FreelancerWorkHistoryComponent) },
      {
        path: 'edit', loadComponent: () => import('./freelancer-edit-profile/freelancer-edit-profile.component')
          .then(obj => obj.FreelancerEditProfileComponent)
      }

    ]
  },


  // { path: 'clientProfile/:id', component: ClientProfileComponent },

  {
    path: 'addproject', loadComponent: () =>
      import('./addproject/addproject.component').then(obj => obj.AddprojectComponent)
  },
  {
    path: 'addservice', loadComponent: () =>
      import('./add-service/add-service.component').then(obj => obj.AddServiceComponent)
  },
  { path: '**', loadComponent: () => import('./not-found/not-found.component').then(obj => obj.NotFoundComponent) }
]
// canActivate:[authGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
