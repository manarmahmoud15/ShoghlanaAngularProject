import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/Projects/project.service';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Iproject } from '../Models/Iproject';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-works-gallery',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './works-gallery.component.html',
  styleUrl: './works-gallery.component.css',
  providers : [DatePipe]
})
export class WorksGalleryComponent implements OnInit {

  LoggedInId! : number
  Projects! : Iproject[]
  FilteredProjects! : Iproject[]
  ProjectName : string = ''

  constructor(private ProjectService : ProjectService, private datePipe : DatePipe) 
  {
    
  }

  ngOnInit(): void {
  
    if(localStorage.getItem('Id'))
      {
        this.LoggedInId = Number (localStorage.getItem('Id'));
      }

  this.ProjectService.GetByFreelancerId(this.LoggedInId).subscribe({
    next : (res) => {
      if(res.isSuccess)
        {
          this.Projects = res.data 
          this.FilteredProjects = this.Projects
          console.log(this.Projects)
        }
        else
        {
          console.log(res.message)
        }
    },

    error : (err) => {
      console.log(err.message)
    }
  })
    
  }


  FormatTime(time : any) : string
  {
     return this.datePipe.transform(time , 'mediumDate')?? ''
  }

  FilterProjects()
  {
    this.FilteredProjects = this.Projects.filter(p => p.title.includes(this.ProjectName))
  }
}
