import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProjectSideBarComponent } from '../project-side-bar/project-side-bar.component';
import { IClientJob } from '../Models/iclient-job';
import { StaticClientJobsService } from '../Services/ClientJob/static-client-jobs.service';
import { Ijob } from '../Models/ijob';
import { ICategory } from '../Models/icategory';
import { JobService } from '../Services/job/job.service';
import { CategoryService } from '../Services/Category/category.service';
import { JobStatus } from '../Enums/JobStatus';
import { IPaginatedJobsRequestBody } from '../Models/i-paginated-jobs-request-body';
import { isAscii } from 'buffer';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ProjectSideBarComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [DatePipe]
})
export class ProjectsComponent implements OnInit {

  JobStatus = JobStatus;

  // ClientJob: IClientJob[] = [] as IClientJob[];

  selectedCategories: ICategory[] = [];

  selectedCategoriesIDs: number[] = [];

  // filteredJobs: IClientJob[];

  jobs: Ijob[] = [];

  categories: ICategory[] = [];

  filteredJobs: Ijob[] = [];

  selectedCategoryID: number = 0;

  currentPage = 1;

  pageSize = 5;

  totalItems = 0;

  minBudget: number = 0;

  maxBudget: number = 0;

  clientId: number = 0;

  freelancerId: number = 0;

  noJobsAvailable: boolean = false;

  jobsStatus: JobStatus = JobStatus.Active; //default value

  requestBody: IPaginatedJobsRequestBody = {
    CategoriesIDs: [],
    Includes: []
  }

  constructor(private jobService: JobService, private datePipe : DatePipe , private router: Router) {
    // this.filteredJobs = [...this.ClientJob];
  }

  ngOnInit(): void {
    // this.fetchAllCategories();
    this.fetchPaginatedJobs();
  }

  fetchPaginatedJobs(): void {

    this.noJobsAvailable = false;

    this.jobService.getPaginatedJobs(
      this.minBudget,
      this.maxBudget,
      this.clientId,
      this.freelancerId,
      this.currentPage,
      this.pageSize,
      this.jobsStatus,
      this.requestBody
    ).subscribe({
      next: (res) => {
        if (res.isSuccess) {

          console.log("Pagination Succeed");
          console.log(res);

          this.filteredJobs = res.data.items;

          this.totalItems = res.data.totalItems || 0;

          this.filteredJobs.forEach(job => {
            job.postTime = this.datePipe.transform(job.postTime, 'medium') || 'Invalid Date';
          });

        } else {

          this.noJobsAvailable = true;
          console.error('Response failed:', res);

        }
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      }
    })
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchPaginatedJobs();
  }

  // Method to calculate the ceiling of division
  calculateTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  // fetchAllJobs() {
  //   this.jobService.GetAll().subscribe({
  //     next: (res) => {
  //       if (res.isSuccess) {
  //         this.jobs = res.data || [];

  //         // Formatting the postTime for each job
  //         this.jobs.forEach(job => {
  //           job.postTime = this.datePipe.transform(job.postTime, 'medium') || 'Invalid Date';
  //         });

  //         console.log("Angular Jobs : ");
  //         console.log(this.jobs);

  //       } else {
  //         console.error('Response failed:', res);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching jobs', err);
  //     }
  //   });
  // }

  onCategorySelect(categoryId: number) {
    this.selectedCategoryID = categoryId;
    this.currentPage = 1; // returning it to first page in the new filteration
    this.fetchPaginatedJobs();
  }

  onStatusChange(status: JobStatus) {
    this.jobsStatus = status;
    this.fetchPaginatedJobs();
  }

  // applyFilters() {
  //   this.fetchPaginatedJobs();
  // }

  resetFilters() {
    this.minBudget = 0;
    this.maxBudget = 0;
    this.selectedCategoryID = 0;
    this.currentPage = 1;
    this.noJobsAvailable = false;
    this.jobsStatus = JobStatus.Active ;
    this.fetchPaginatedJobs(); // Apply filters after resetting
  }

  filterProjects(event: [ICategory[], number, number]): void {

    const [selectedCategories, selectedMinBudget, selectedMaxBudget] = event;

    this.selectedCategories = selectedCategories;
    this.selectedCategoriesIDs = selectedCategories.map(c => c.id);
    this.requestBody.CategoriesIDs = this.selectedCategoriesIDs;
    this.minBudget = selectedMinBudget;
    this.maxBudget = selectedMaxBudget;

    this.currentPage = 1 ; // always return to the first page if a new filteraion is applied

    this.fetchPaginatedJobs();
  }

  navigateToDetails(id: number): void {
    this.jobService.GetById(id).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log('Project details:', res.data);

          this.router.navigate(['/project-details', id]);
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => console.log(err)
    });
  }
}