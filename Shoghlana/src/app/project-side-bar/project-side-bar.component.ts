import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICategory } from '../Models/icategory';
import { CategoryService } from '../Services/Category/category.service';
import { IFreelancer } from '../Models/ifreelancer';
import { IClient } from '../Models/IClient';
import { JobService } from '../Services/job/job.service';
import { Ijob } from '../Models/ijob';
import { SearchStatus } from '../Enums/search-status';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-side-bar',
  standalone: true,
  imports: [FormsModule, CommonModule , RouterLink],
  templateUrl: './project-side-bar.component.html',
  styleUrls: ['./project-side-bar.component.css'],
})
export class ProjectSideBarComponent implements OnInit {

  categories: ICategory[] = []; // Initialize to an empty array
  selectedCategories: ICategory[] = []; // Initialize to an empty array
  minBudget: number = 0;
  maxBudget: number = 10000;
  searchKeyword: string = ''; // Variable to hold the search keyword

  searchResultJobsArr: Ijob[] = [];

  searchStatus : SearchStatus = SearchStatus.Ignored ;

  @Output() FiltersChangedEvent: EventEmitter<[ICategory[], number, number , Ijob[] , SearchStatus]> = new EventEmitter<[ICategory[], number, number ,  Ijob[] , SearchStatus]>();

  constructor(
    private categoryService: CategoryService,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.fetchAllCategories();
  }

  fetchAllCategories() {
    this.categoryService.GetAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log("Fetching All categories");
          console.log("res", res.data);
          this.categories = res.data || [];
          console.log("categories", this.categories);
        } else {
          console.error('Response failed:', res);
        }
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      }
    });
  }

  getSelectedCategories(): ICategory[] {
    return this.categories.filter(cat => cat.selected);
  }

  search() {
    if (this.searchKeyword.trim() === '') {
      console.log('No keyword to search');
      this.searchStatus = SearchStatus.Ignored ;
      return;
    }

    this.jobService.searchByJobTitle(this.searchKeyword).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log("Search Success");
          console.log("search result :", res.data);
          console.log("server message :", res.message);
          this.searchResultJobsArr = res.data;
          this.searchStatus = SearchStatus.Found ;
          this.invokeFiltersEventToParent();
        } else {
          console.log("Search word not found");
          console.log("search result :", res.data);
          console.log("server message :", res.message);
          this.searchStatus = SearchStatus.NotFound ;
          this.invokeFiltersEventToParent();
        }
      },
      error: (err) => {
        console.error("Error while searching");
        console.error("Error : ", err);
      }
    });
  }

  resetFilters() {
    this.minBudget = 0;
    this.maxBudget = 10000;
    this.categories.forEach(cat => cat.selected = false);
    this.selectedCategories = [];
    this.searchKeyword = '';
    this.searchResultJobsArr = [];
    this.searchStatus = SearchStatus.Ignored ;
    this.invokeFiltersEventToParent();
  }

  applyFilters() {
    this.invokeFiltersEventToParent();
  }

  categorySelected() {
    this.invokeFiltersEventToParent();
  }

  invokeFiltersEventToParent() {
    this.FiltersChangedEvent.emit([this.getSelectedCategories(), this.minBudget, this.maxBudget , this.searchResultJobsArr , this.searchStatus]);
    this.searchStatus = SearchStatus.Ignored ; // changing it back to default after invoking

  }
}
