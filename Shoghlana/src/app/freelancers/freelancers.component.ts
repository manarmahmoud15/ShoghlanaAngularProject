import { Component } from '@angular/core';
import { IFreelancer } from '../Models/ifreelancer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-freelancers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './freelancers.component.html',
  styleUrl: './freelancers.component.css'
})
export class FreelancersComponent {

  FreelancersArr :IFreelancer[] 
  constructor() {
    this.FreelancersArr = [
      {id :1 , name : "علاء" , title:"مهندس برمجيات" , rate:3 , imgURL:"https://randomuser.me/api/portraits/men/47.jpg"} , 
      {id :2 , name : "أحمد" , title:"مطور الواجهة الأمامية" , rate:2 , imgURL : "https://randomuser.me/api/portraits/men/32.jpg"} , 
      {id :3 , name : "علي" , title:"مصمم ويب" , rate:5 , imgURL : "https://randomuser.me/api/portraits/men/79.jpg"} , 
      {id :4 , name : "ساره" , title:"مطور سي ار ام" , rate:1 , imgURL:"https://randomuser.me/api/portraits/women/71.jpg"} , 
      {id :5 , name : "عمر" , title:"مطور الواجهة الخلفية" , rate:5 , imgURL:"https://randomuser.me/api/portraits/men/67.jpg"} , 
      {id :6 , name : "مينا" , title:"مصمم جرافيك" , rate:4 , imgURL : "https://randomuser.me/api/portraits/men/9.jpg"} , 
    ];
  }

  getStars(rate: number): Array<number> 
  {
    return Array(5).fill(0).map((x, i) => i);
  }

}