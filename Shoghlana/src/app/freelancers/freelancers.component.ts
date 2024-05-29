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
    this._FreelancerService.getAllFreelancers().subscribe({
      next: (res) => {
        console.log(res); // Log the response to verify its structure

        // Ensure the response has the expected structure before mapping
        if (res.isSuccess && Array.isArray(res.data)) {
          this.FreelancersArr = res.data.map((freelancer: { personalImageBytes: any; }) => {
            return {
              ...freelancer,
              personalImageBytes: freelancer.personalImageBytes ? `data:image/png;base64,${freelancer.personalImageBytes}` : null
            };
          });
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => console.log(err)
    });
  }
}
