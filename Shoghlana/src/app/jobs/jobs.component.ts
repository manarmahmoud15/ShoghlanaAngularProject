import { Component, OnInit } from '@angular/core';
import { Ijob } from '../Models/ijob';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { ICategory } from '../Models/icategory';
import { FormsModule, NgModel } from '@angular/forms';
import { HighlightDirective } from '../directives/highlight.directive';
import { HttpClientModule } from '@angular/common/http';
import { JobService } from '../Services/job/job.service';
import { CategoryService } from '../Services/Category/category.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HighlightDirective, HttpClientModule, FormsModule, DatePipe],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  providers: [DatePipe] // Add DatePipe here
})

export class JobsComponent implements OnInit {

  jobs: Ijob[] = [];

  categories: ICategory[] = [];

  filteredJobs: Ijob[] = [];

  selectedCategoryID: number = 0;

  currentPage = 1;

  pageSize = 5;

  totalItems = 0;

  minBudget : number = 0 ;

  maxBudget : number = 0 ;

  noJobsAvailable: boolean = false; 

  constructor(private jobService: JobService, private categoryService: CategoryService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchAllCategories();
    this.fetchPaginatedJobs();
  }

  fetchAllCategories() {
    this.categoryService.GetAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.categories = res.data || [];
        } else {
          console.error('Response failed:', res);
        }
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      }
    });
  }

  fetchPaginatedJobs() : void {
    
    this.noJobsAvailable = false ;

    this.jobService.getPaginatedJobs(this.currentPage , this.pageSize , this.selectedCategoryID  , this.minBudget , this.maxBudget).subscribe({
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

  fetchAllJobs() {
    this.jobService.GetAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.jobs = res.data || [];

          // Formatting the postTime for each job
          this.jobs.forEach(job => {
            job.postTime = this.datePipe.transform(job.postTime, 'medium') || 'Invalid Date';
          });

          console.log("Angular Jobs : ");
          console.log(this.jobs);

        } else {
          console.error('Response failed:', res);
        }
      },
      error: (err) => {
        console.error('Error fetching jobs', err);
      }
    });
  }

  onCategorySelect(categoryId: number) {
    this.selectedCategoryID = categoryId; 
    this.currentPage = 1 ; // returning it to first page in the new filteration
    this.fetchPaginatedJobs(); 
  }

  applyFilters() {
    this.fetchPaginatedJobs();
  }

  resetFilters() {
    this.minBudget = 0;
    this.maxBudget = 0;
    this.selectedCategoryID = 0 ;
    this.currentPage = 1 ;
    this.noJobsAvailable = false ;
    this.fetchPaginatedJobs(); // Apply filters after resetting
  }
}