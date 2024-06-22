import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICategory } from '../Models/icategory';
import { CategoryService } from '../Services/Category/category.service';
import { IFreelancer } from '../Models/ifreelancer';
import { IClient } from '../Models/IClient';

@Component({
  selector: 'app-project-side-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './project-side-bar.component.html',
  styleUrls: ['./project-side-bar.component.css'],
})
export class ProjectSideBarComponent implements OnInit {

  categories!: ICategory[];

  selectedCategories!: ICategory[];

  minBudget: number = 0;

  maxBudget: number = 0;

  @Output() FiltersChangedEvent: EventEmitter<[ICategory[], number, number]>= new EventEmitter<[ICategory[], number, number]>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchAllCategories();
    this.categories = this.selectedCategories;
  }

  fetchAllCategories() {
    this.categoryService.GetAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.selectedCategories = res.data || [];
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

  resetFilters() {
    this.minBudget = 0;
    this.maxBudget = 0;
    this.categories.forEach(cat => cat.selected = false);
    this.selectedCategories = [];
    this.invokeFiltersEventToParent();
  }

  applyFilters() {
    this.invokeFiltersEventToParent();
  }

  categorySelected() {
    this.invokeFiltersEventToParent();
  }

  invokeFiltersEventToParent() {
    this.FiltersChangedEvent.emit([this.getSelectedCategories(), this.minBudget, this.maxBudget]);
  }
}
