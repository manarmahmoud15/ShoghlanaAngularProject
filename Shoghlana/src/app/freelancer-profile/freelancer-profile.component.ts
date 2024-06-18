import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IFreelancer } from '../Models/ifreelancer';
import { log } from 'console';
// import { StaticFreelancersService } from '../Services/static-freelancers.service';
import { CommonModule } from '@angular/common';
import { FreelancerService } from '../Services/freelancer.service';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './freelancer-profile.component.html',
  styleUrl: './freelancer-profile.component.css'
})

export class FreelancerProfileComponent implements OnInit {

  freelancer: IFreelancer | undefined = {} as IFreelancer

  // personalImageBytes : any ;

  currentFreelancerId !: number;

  constructor(private activeRoute: ActivatedRoute, private freelancerService: FreelancerService) {

    this.currentFreelancerId = Number(this.activeRoute.snapshot.paramMap.get('id'));

    console.log("ID :" + this.currentFreelancerId);

    this.loadFreelancerData(); // Fetch data whenever the route changes

    console.log("Freelancer obj ctor :");
    console.log(this.freelancer);
  }

  ngOnInit(): void {

    // this.currentFreelancerId = Number(this.activeRoute.snapshot.paramMap.get('id'));

    if (this.currentFreelancerId) {
      this.loadFreelancerData();
    }

    console.log("Freelancer obj OnInit :");
    console.log(this.freelancer);

  }

  loadFreelancerData(): void {
    if (!this.freelancer) {
      this.freelancerService.getFreelancerById(this.currentFreelancerId).subscribe({
        next: (res) => {
          console.log("Response: ", res);
          if (res.isSuccess) {
            this.freelancer = res.data;
            if (this.freelancer?.personalImageBytes) {
              this.freelancer.personalImageBytes = this.convertToBase64(this.freelancer.personalImageBytes);
            }
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
  }

  private convertToBase64(bytes: any): string {
    return `data:image/png;base64,${bytes}`;
  }
}