import { Component, OnInit } from '@angular/core';
import { IFreelancer } from '../Models/ifreelancer';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FreelancerService } from '../Services/freelancer.service';

@Component({
  selector: 'app-freelancers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './freelancers.component.html',
  styleUrls: ['./freelancers.component.css']
})
export class FreelancersComponent implements OnInit {

  FreelancersArr: IFreelancer[] = [];

  constructor(private _FreelancerService: FreelancerService) { }

  ngOnInit(): void {
    this.loadFreelancers();
  }

  loadFreelancers() {
    this._FreelancerService.getAllFreelancers().subscribe({
      next: (res) => {

        console.log(res);
        // Ensure the response has the expected structure before mapping
        if (res.isSuccess && Array.isArray(res.data)) {

          this.FreelancersArr = res.data;

          this.FreelancersArr.forEach(freelancer => {
            if (freelancer.personalImageBytes == null || freelancer.personalImageBytes == 'data:image/png;base64,${freelancer.personalImageBytes}') {
              freelancer.personalImageBytes = '././assets/imgs/default-profile-picture-avatar-png-green.png';
            } else {
              freelancer.personalImageBytes = `data:image/png;base64,${freelancer.personalImageBytes}`;
            }
          });

        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => console.log(err)
    });
  }
}