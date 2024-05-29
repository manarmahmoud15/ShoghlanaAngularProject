import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProjectSideBarComponent } from '../project-side-bar/project-side-bar.component';
import { IClientJob } from '../Models/iclient-job';
import { StaticClientJobsService } from '../Services/ClientJob/static-client-jobs.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ProjectSideBarComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnChanges{
  ClientJob: IClientJob[];
  filteredJobs: IClientJob[];
  selectedCategories: Number[] = [];

  constructor(private _StaticClientJobsService:StaticClientJobsService) {

    this.ClientJob = this._StaticClientJobsService.getAllClientJobs()
    this.filteredJobs = [...this.ClientJob];

  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedCategories) {
      this.filteredJobs = this._StaticClientJobsService.filterProjects(this.selectedCategories);
    }
  }

  filterProjects(selectedCategories: Number[]) {
    this.selectedCategories = selectedCategories;
    this.filteredJobs = this._StaticClientJobsService.filterProjects(this.selectedCategories);
  }
  
}