import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICategory } from '../Models/icategory';

@Component({
  selector: 'app-project-side-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './project-side-bar.component.html',
  styleUrls: ['./project-side-bar.component.css'],
})
export class ProjectSideBarComponent {
  category: ICategory[];
  @Output() categorySelectedChanged: EventEmitter<number[]>;

  constructor() {
    this.category = [
      { id: 1, title: 'أعمال وخدمات ادارية واستشارية', selected: false , description : "" },
      { id: 2, title: 'برمجة, تطوير المواقع و التطبيقات', selected: false , description : "" },
      { id: 3, title: 'تصميم', selected: false , description : "" },
      { id: 4, title: 'فيديو', selected: false , description : "" },
      { id: 5, title: 'كتابة و ترجمة ولغات', selected: false , description : "" },
    ];
    this.categorySelectedChanged = new EventEmitter<number[]>();
  }
  getSelectedCategories(): number[] {
    return this.category.filter(cat => cat.selected).map(cat => cat.id);
  }

  categorySelected() {
    this.categorySelectedChanged.emit(this.getSelectedCategories());
  }
}
