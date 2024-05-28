import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../Models/icategory';
import { RouterLink } from '@angular/router';
import { HighlightDirective } from '../directives/highlight.directive';
import { HttpClientModule } from '@angular/common/http';
import { IClientJob } from '../Models/iclient-job';

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
  ClientJob : IClientJob[] ;
  constructor() {
    this.category = [
      { id: 1, name: 'أعمال وخدمات ادارية واستشارية' },
      { id: 2, name: 'برمجة, تطوير المواقع و التطبيقات' },
      { id: 3, name: 'تصميم' },
      { id: 4, name: 'فيديو' },
      { id: 5, name: 'كتابة و ترجمة ولغات' }
    ];
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
        title: " تعديلات و إعادة تصميم موقع ووردبريس",
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
    
  }
}
