import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaticClientJobsService } from '../Services/ClientJob/static-client-jobs.service';
import { IClientJob } from '../Models/iclient-job';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailsComponent implements OnInit {
  currentID: number = 0;
  // clientJob :IClientJob = {}as IClientJob or clientJob !:IClientJob
  clientJob: IClientJob[] = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _statisClientJobService: StaticClientJobsService ,
    private _Location : Location
  ) {}
  ngOnInit(): void {
    this.currentID = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.currentID);
    this.clientJob = this._statisClientJobService.getClientJobByCatID(
      this.currentID
    );
  }
  goBack() {
    this._Location.back()
  }
}
