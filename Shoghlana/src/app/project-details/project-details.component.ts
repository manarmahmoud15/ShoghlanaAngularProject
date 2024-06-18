import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaticClientJobsService } from '../Services/ClientJob/static-client-jobs.service';
import { IClientJob } from '../Models/iclient-job';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { ProjectService } from '../Services/Projects/project.service.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
  providers: [DatePipe]
})
export class ProjectDetailsComponent implements OnInit {
  currentID: number = 0;
  // clientJob :IClientJob = {}as IClientJob or clientJob !:IClientJob
  clientJob: IClientJob | undefined;

  constructor(
    private _activatedRoute: ActivatedRoute,
    // private _statisClientJobService: StaticClientJobsService ,
    private _ProjectService: ProjectService ,
    private _Location : Location,
    private datePipe: DatePipe
  ) {}
  // ngOnInit(): void {
  //   this.currentID = Number(this._activatedRoute.snapshot.paramMap.get('id'));
  //   console.log(this.currentID);
  //   this.clientJob = this._statisClientJobService.getClientJobByCatID(
  //     this.currentID
  //   );
  // }
  ngOnInit(): void {
    const id = +this._activatedRoute.snapshot.paramMap.get('id')!;
    this._ProjectService.getProjectById(id).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.clientJob = res.data;
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => console.log(err)
    });
  }
  goBack() {
    this._Location.back()
  }
  getFormattedDate(date: string): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy, h:mm a') || date;
  }

}
