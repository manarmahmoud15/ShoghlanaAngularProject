import { Injectable } from '@angular/core';
import { IClientJob } from '../../Models/iclient-job';
import { JobStatus } from '../../Enums/JobStatus';

@Injectable({
  providedIn: 'root'
})
export class StaticClientJobsService {
  getProjectById(id: number) {
    throw new Error('Method not implemented.');
  }

  ClientJob : IClientJob[];
  selectedCategories: Number[] = [];
  filteredJobs: IClientJob[];
  constructor() { 
    this.ClientJob = [
      // {
      //   id: 1,
      //   title: "مطلوب متخصص لعمل اسكربت علي موقع حجز مواعيد تأشيرة",
      //   minBudget: '25$',
      //   maxBudget: '50$',
      //   // status: JobStatus.Closed,
      //   clientName: 'منار',
      //   clientImg: "../../assets/imgs/Nerd-amico.png",
      //   catID: 1,
      //   description: '',
      //   status: ''
      // },
      // {
      //   id: 2,
      //   title: "تعديلات و إعادة تصميم موقع ووردبريس",
      //   minBudget: '10$',
      //   maxBudget: '30$',
      //   // status: JobStatus.completed,
      //   clientName: 'أحمد',
      //   clientImg: "../../assets/imgs/Nerd-amico.png",
      //   catID: 2,
      //   description: '',
      //   status: ''
      // },
      // {
      //   id: 3,
      //   title: "موقع ومتجر إلكتروني لجمعية خيرية",
      //   minBudget: '20$',
      //   maxBudget: '40$',
      //   // status: JobStatus.Active,
      //   clientName: 'اسماء',
      //   clientImg: "../../assets/imgs/Nerd-amico.png",
      //   catID: 3,
      //   description: '',
      //   status: ''
      // },
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
