import { Component, OnInit, numberAttribute } from '@angular/core';
import { IFreelancer } from '../Models/ifreelancer';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';
import { Iproject } from '../Models/Iproject';
import { json } from 'node:stream/consumers';
import { ProjectServiceService } from '../Services/Project/project-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-freelancer-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './freelancer-portfolio.component.html',
  styleUrl: './freelancer-portfolio.component.css'
})
export class FreelancerPortfolioComponent implements OnInit {
freelancer! : IFreelancer 
portfolio! : Iproject[]
FreelancerId! : number 

constructor(private ActiveRoute : ActivatedRoute, private ProjectService : ProjectServiceService)
{
  // this.FreelancerId = Number (this.ActiveRoute.snapshot.paramMap.get('id')); 
}

 ngOnInit(): void {
//   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
//   //Add 'implements OnInit' to the class.
//    this.ActiveRoute.paramMap.subscribe(params => {
//     console.log(params)
// this.FreelancerId = Number (params.get('id'))

// console.log(this.FreelancerId) 
//    });
const PortfolioData = this.ActiveRoute.snapshot.queryParamMap.get('portfolio')
console.log(PortfolioData)
  if(PortfolioData)
    {
      this.portfolio = JSON.parse(PortfolioData)
    }
  console.log(this.portfolio[0]);

  this.portfolio.forEach(project => {
    project.showSkills = false
  });
  
//  this.FreelancerId = Number (this.ActiveRoute.snapshot.paramMap.get('id'));
//   console.log(this.FreelancerId)
 

// this.ProjectService.GetByFreelancerId(this.FreelancerId).subscribe({
//   next : (res) => {console.log(res)}
// })
   }

   private convertToBase64(bytes: any): string {
    return `data:image/png;base64,${bytes}`;
  }

  ToggleProjectSkills(projectId : number)
  {
   const Project = this.portfolio.find(p => p.id == projectId)
   if(Project)
    {
      Project.showSkills = !Project.showSkills
    }
      // document.getElementById('skillsDiv').innerHTML = 's'   
  }
}
