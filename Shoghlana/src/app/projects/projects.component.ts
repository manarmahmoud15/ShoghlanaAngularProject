import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProjectSideBarComponent } from '../project-side-bar/project-side-bar.component';
import { IClientJob } from '../Models/iclient-job';
import { ProjectService } from '../Services/Projects/project.service.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ProjectSideBarComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  ClientJob: IClientJob[] = [] as IClientJob[];

  constructor(private _ClientJobsService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this._ClientJobsService.getAllProjects().subscribe({
      next: (res) => {
        if (res.isSuccess && Array.isArray(res.data)) {
          this.ClientJob = res.data;
          console.log('title', res.data);
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => console.log(err)
    });
  }

  navigateToDetails(id: number): void {
    this._ClientJobsService.getProjectById(id).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log('Project details:', res.data);
          // Navigate to the details page
          this.router.navigate(['/project-details', id]);
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => console.log(err)
    });
  }

}
