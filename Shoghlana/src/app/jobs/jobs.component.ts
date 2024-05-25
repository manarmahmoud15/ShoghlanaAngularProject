import { Component } from '@angular/core';
import { Ijob } from '../Models/ijob';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ICategory } from '../Models/icategory';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule , RouterLink , FormsModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {
  jobs:Ijob[] 
  category : ICategory[]
  selectedCategoryID : Number = 0
  constructor (){
    this.jobs = [
      {
        id:1 ,
        freelancerName : 'محمد صلاح',
        frelancerImg : "https://fakeimg.pl/300/" ,
        Tilte : 'تصميم شعار احترافى ومميز' ,
        description : "تصميم واعمال فنيه واحترافيه" ,
        price : '25$',
        imgURL : "https://fakeimg.pl/300/" ,
        rate : 5 ,
        catID : 1
      },
      {
        id:2 ,
        freelancerName : 'محمد صلاح',
        frelancerImg : "https://fakeimg.pl/300/" ,
        Tilte : 'تصميم بوستر اعلانى لمواقع التواصل' ,
        description : "تصميم واعمال فنيه واداريه" ,
        price : '5$',
        imgURL : "https://fakeimg.pl/300/" ,
        rate : 3 ,
        catID : 1
      },     
      {
        id:3 ,
        freelancerName : 'محمد صلاح',
        frelancerImg : "https://fakeimg.pl/300/" ,
        Tilte : 'تصميم كارت شخصي احترافى للطباعه' ,
        description : "تصميم بطاقات اعمال" ,
        price : '5$',
        imgURL : "https://fakeimg.pl/300/" ,
        rate : 4,
        catID : 1
      },   

      {
        id:4 ,
        freelancerName : 'محمد صلاح',
        frelancerImg : "https://fakeimg.pl/300/" ,
        Tilte : "تركيب لوحه تحكم مجانيه مدى الحياة " ,
        description : "برمجه وتطوير المواقع والتطبيقات" ,
        price : '25$',
        imgURL : "https://fakeimg.pl/300/" ,
        rate : 2 ,
        catID : 2
      },
      {
        id: 5,
        freelancerName : 'محمد صلاح',
        frelancerImg : "https://fakeimg.pl/300/" ,  
        Tilte : "تصميم موقع تعريفي للشركات" ,
        description : "برمجه مواقع الانترنت" ,
        price : '25$',
        imgURL : "https://fakeimg.pl/300/" ,
        rate : 0 ,
        catID : 3
      },
    ] ,
    this.category = [
      { id : 1 , name : 'خدمات التصميم'} ,
      { id : 2 , name : 'خدمات برمجية'} ,
      { id : 3 , name : 'خدمات الكتابة والترجمة'} ,
    ]
  }
}
