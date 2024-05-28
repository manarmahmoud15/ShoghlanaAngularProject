import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../Models/icategory';
import { RouterLink } from '@angular/router';
import { HighlightDirective } from '../directives/highlight.directive';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HighlightDirective, HttpClientModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  category: ICategory[];
  selectedCategoryID: number = 0;

  constructor() {
    this.category = [
      { id: 1, name: 'أعمال وخدمات ادارية واستشارية' },
      { id: 2, name: 'برمجة, تطوير المواقع و التطبيقات' },
      { id: 3, name: 'تصميم' },
      { id: 4, name: 'فيديو' },
      { id: 5, name: 'كتابة و ترجمة ولغات' }
    ];
  }
}
