import { Component } from '@angular/core';
import { IFreelancer } from '../Models/ifreelancer';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StaticFreelancersService } from '../Services/static-freelancers.service';

@Component({
  selector: 'app-freelancers',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './freelancers.component.html',
  styleUrl: './freelancers.component.css'
})
export class FreelancersComponent {

  FreelancersArr :IFreelancer[] 

  constructor(private staticFreelancersService : StaticFreelancersService) 
  {
   this.FreelancersArr = staticFreelancersService.getAll();
  }

  getStarsArray(rate: number): Array<number> 
  {
    return Array(5).fill(0).map((x, i) => i);
  }
}