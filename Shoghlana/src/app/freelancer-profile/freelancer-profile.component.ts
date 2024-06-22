import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { IFreelancer } from '../Models/ifreelancer';
import { log } from 'console';
// import { StaticFreelancersService } from '../Services/static-freelancers.service';
import { CommonModule } from '@angular/common';
import { FreelancerService } from '../Services/freelancer.service';
import { Router } from '@angular/router';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './freelancer-profile.component.html',
  styleUrl: './freelancer-profile.component.css'
})

export class FreelancerProfileComponent implements OnInit {

  freelancer!: IFreelancer;
  StringifiedPortfolio! : any
  StringifiedWorkingHistory! : any
  // personalImageBytes : any ;

  currentFreelancerId !: number;

  constructor(private activeRoute: ActivatedRoute, private freelancerService: FreelancerService,
    private router : Router
  ) {

    this.currentFreelancerId = Number(this.activeRoute.snapshot.paramMap.get('id'));

    console.log("ID :" + this.currentFreelancerId);

   // this.loadFreelancerData(); // Fetch data whenever the route changes

    console.log("Freelancer obj ctor :");
    console.log(this.freelancer);
  }

  ngOnInit(): void {

     this.currentFreelancerId = Number(this.activeRoute.snapshot.paramMap.get('id'));



  //    this.activeRoute.paramMap.subscribe(params => {
  //     console.log(params)
  // this.currentFreelancerId = Number (params.get('id'))
  
  // console.log(this.currentFreelancerId) 
  //    });

    // if (this.currentFreelancerId) {
    //   console.log("enterd if condition")
    //   this.loadFreelancerData();
    // }

    // console.log("Freelancer obj OnInit :");
    // console.log(this.freelancer);

    if (this.freelancer == null) {
      this.freelancerService.getFreelancerById(this.currentFreelancerId).subscribe({
        next: (res) => { 
          console.log("Response: ", res);
          if (res.isSuccess) {
            this.freelancer = res.data;
            console.log(this.freelancer);
            this.StringifiedPortfolio = JSON.stringify(this.freelancer.portfolio)
            this.StringifiedWorkingHistory = JSON.stringify(this.freelancer.workingHistory)
            // if (this.freelancer?.personalImageBytes) {
            //   // console.log( "image before converting" + this.freelancer.personalImageBytes) 
            //   this.freelancer.personalImageBytes = this.convertToBase64(this.freelancer.personalImageBytes);
            //   // console.log( "image after converting" + this.freelancer.personalImageBytes) 
            // }
          } else {
            console.error(`Failed to get the data, Status Code: ${res.Status}`);
            console.error(`Server Message: ${res.Message}`);
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

    this.navigateToPortfolio()
  }

  private convertToBase64(bytes: any): string {
    return `data:image/png;base64,${bytes}`;
  }

  navigateToPortfolio()
  { 
    console.log(this.freelancer.portfolio)
     this.router.navigate([`/freelancerprofile/${this.freelancer.id}/portfolio`] , { queryParams : {portfolio :this.StringifiedPortfolio}}) 
  } 

  navigateToWorkingHistory()
  { 
    console.log(this.freelancer.workingHistory)
     this.router.navigate([`/freelancerprofile/${this.freelancer.id}/workhistory`] , { queryParams : {workingHistory :this.StringifiedWorkingHistory}}) 
  } 
}

