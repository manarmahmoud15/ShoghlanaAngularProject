import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IFreelancer } from '../Models/ifreelancer';
import { log } from 'console';
// import { StaticFreelancersService } from '../Services/static-freelancers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [CommonModule , RouterLink , RouterLinkActive , RouterOutlet],
  templateUrl: './freelancer-profile.component.html',
  styleUrl: './freelancer-profile.component.css'
})

export class FreelancerProfileComponent implements OnInit {

  freelancer : IFreelancer | undefined = {} as IFreelancer

  currentFreelancerId !: number ;


  constructor(private activeRoute: ActivatedRoute) {

    this.currentFreelancerId = Number(this.activeRoute.snapshot.paramMap.get('id'));

    console.log("ID :" + this.currentFreelancerId );

    // this.freelancer = staticFreelancersService.getById(this.currentFreelancerId);

    console.log(this.freelancer);

  }

  ngOnInit(): void {

    // console.log(this.freelancer);

  }

}
