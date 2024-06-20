import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StaticClientJobsService } from '../Services/ClientJob/static-client-jobs.service';
import { IClientJob } from '../Models/iclient-job';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { ProjectService } from '../Services/Projects/project.service.service';
import { IProposal } from '../Models/iproposal';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ProposalService } from '../Services/proposal.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink , FormsModule] ,
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
  providers: [DatePipe]
})
export class ProjectDetailsComponent implements OnInit {
  currentID: number = 0;
  // clientJob :IClientJob = {}as IClientJob or clientJob !:IClientJob
  clientJob: IClientJob | undefined;
  proposal :IProposal ={} as IProposal ;
  proposalForm!: FormGroup ;
  constructor(
    private _activatedRoute: ActivatedRoute,
    // private _statisClientJobService: StaticClientJobsService ,
    private _ProjectService: ProjectService ,
    private _Location : Location,
    private datePipe: DatePipe ,
    private _proposalService: ProposalService ,
    private fb: FormBuilder,
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

    this.proposalForm = this.fb.group({
      deliveryTime: ['', Validators.required],
      offerValue: ['', Validators.required],
      offerDetails: ['', Validators.required]
    }) ;
  }
  
  goBack() {
    this._Location.back()
  }
  getFormattedDate(date: string): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy, h:mm a') || date;
  }
  addProposal(proposalForm: FormGroup )
  {
      if (this.proposalForm?.valid) {
        this._proposalService.postProposal(this.proposal).subscribe({
          next:()=>{
            alert('done')
          },
          error:(err)=>{
            console.log(err)
          }
          }
        );
      }
  

}
}
