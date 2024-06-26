import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { IFreelancer } from '../Models/ifreelancer';
import { CommonModule } from '@angular/common';
import { FreelancerService } from '../Services/freelancer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './freelancer-profile.component.html',
  styleUrl: './freelancer-profile.component.css'
})

export class FreelancerProfileComponent implements OnInit {

  freelancer!: IFreelancer;

  StringifiedPortfolio!: any

  StringifiedWorkingHistory!: any

  // personalImageBytes : any ;

  currentFreelancerId !: number;

  constructor(private activeRoute: ActivatedRoute, private freelancerService: FreelancerService,
    private router: Router) {

    console.log("Freelancer obj ctor :");

    this.currentFreelancerId = Number(this.activeRoute.snapshot.paramMap.get('id'));

    console.log("ID :" + this.currentFreelancerId);

    // this.loadFreelancerData(); // Fetch data whenever the route changes

    // console.log(this.freelancer);
  }

  ngOnInit(): void {

    this.currentFreelancerId = Number(this.activeRoute.snapshot.paramMap.get('id'));

    this.loadFreelancerData();
  }

  private loadFreelancerData(): void {
    if (this.currentFreelancerId) {
      this.freelancerService.getFreelancerById(this.currentFreelancerId).subscribe({
        next: (res) => {

          console.log("Response: ");
          console.log(res);

          if (res.isSuccess && res.data != null) {

            this.freelancer = res.data;

            console.log("freelancer")
            console.log(this.freelancer)

            console.log("Image comming from service")
            console.log(this.freelancer.personalImageBytes)

            if (res.data.personalImageBytes == null) {

              const imageUrl = res.data.personalImageBytes
                ? `data:image/png;base64,${res.data.personalImageBytes}`
                : 'assets/imgs/default-profile-picture-avatar-png-green.png';

              console.log("imageUrl")
              console.log(imageUrl)

              this.freelancer.personalImageBytes = imageUrl;
            }

            console.log("freelancer Image")
            console.log(this.freelancer.personalImageBytes)

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

  navigateToPortfolio() {
    this.router.navigate([`/freelancerprofile/${this.freelancer.id}/portfolio`]);
  }

  navigateToWorkingHistory() {
    this.router.navigate([`/freelancerprofile/${this.freelancer.id}/workhistory`]);
  }
}