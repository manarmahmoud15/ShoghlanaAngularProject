import { Injectable } from '@angular/core';
import { IClientJob } from '../../Models/iclient-job';

@Injectable({
  providedIn: 'root'
})
export class StaticClientJobsService {

  ClientJob : IClientJob[];
  selectedCategories: Number[] = [];
  filteredJobs: IClientJob[];
  constructor() { 
    this.ClientJob = [
      {
        id: 1,
        title: "مطلوب متخصص لعمل اسكربت علي موقع حجز مواعيد تأشيرة",
        MinPrice: '25$',
        MaxPrice: '50$',
        status: 'مفتوح',
        clientName: 'منار',
        clientImg: "../../assets/imgs/Nerd-amico.png",
        catID: 1
      },
      {
        id: 2,
        title: "تعديلات و إعادة تصميم موقع ووردبريس",
        MinPrice: '10$',
        MaxPrice: '30$',
        status: 'مغلق',
        clientName: 'أحمد',
        clientImg: "../../assets/imgs/Nerd-amico.png",
        catID: 2
      },
      {
        id: 3,
        title: "موقع ومتجر إلكتروني لجمعية خيرية",
        MinPrice: '20$',
        MaxPrice: '40$',
        status: 'مفتوح',
        clientName: 'اسماء',
        clientImg: "../../assets/imgs/Nerd-amico.png",
        catID: 3
      },
    ];
    this.filteredJobs = [...this.ClientJob];

  }
  getAllClientJobs():IClientJob[]{
    return this.ClientJob
  }
  getClientJobByID (id:Number): IClientJob |null{
    let foundedJob = this.ClientJob.find((job)=>job.id == id)
    return foundedJob ? foundedJob : null
  }
  getClientJobByCatID (catID:Number):IClientJob[]{
    return this.ClientJob.filter((job)=>job.catID == catID)
  }
  filterProjects(selectedCategories: Number[]):IClientJob[] {
    this.selectedCategories = selectedCategories;
    if (this.selectedCategories.length > 0) {
     return this.filteredJobs = this.ClientJob.filter(job => this.selectedCategories.includes(job.catID));
    } else {
     return this.filteredJobs = [...this.ClientJob];
    }
  }
}
