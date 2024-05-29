import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProjectSideBarComponent } from '../project-side-bar/project-side-bar.component';
import { IClientJob } from '../Models/iclient-job';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ProjectSideBarComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  ClientJob: IClientJob[];
  filteredJobs: IClientJob[];
  selectedCategories: number[] = [];

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
        clientName: 'سارة',
        clientImg: "../../assets/imgs/Nerd-amico.png",
        catID: 3
      },
    ];
    this.filteredJobs = [...this.ClientJob];
  }

  filterProjects(selectedCategories: number[]) {
    this.selectedCategories = selectedCategories;
    if (this.selectedCategories.length > 0) {
      this.filteredJobs = this.ClientJob.filter(job => this.selectedCategories.includes(job.catID));
    } else {
      this.filteredJobs = [...this.ClientJob];
    }
  }
}
