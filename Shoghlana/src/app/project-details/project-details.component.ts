import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IClientJob } from '../Models/iclient-job';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { IProposal } from '../Models/iproposal';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProposalService } from '../Services/proposal.service';
import swal from 'sweetalert';
import { ProjectService } from '../Services/Projects/project.service';
import { JobStatus } from '../Enums/JobStatus';
import { FreelancerService } from '../Services/freelancer.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  providers: [DatePipe],
})
export class ProjectDetailsComponent implements OnInit {
  currentID: number = 0;
  proposalID :any ;
  proposalDetails : any;
  clientJob: IClientJob | undefined;
  proposalForm: FormGroup;
  freelancerId : any;
  JobStatus = JobStatus;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _ProjectService: ProjectService,
    private _Location: Location,
    private datePipe: DatePipe,
    private _proposalService: ProposalService,
    private _freelancer : FreelancerService,
    private fb: FormBuilder
  ) {
    this.proposalForm = this.fb.group({
      Duration: [null, [Validators.required]],
      Price: [null, [Validators.required]],
      Description: [null, [Validators.required]],
      JobId: [null, [Validators.required]],
      FreelancerId: [1, [Validators.required]], // Assuming the FreelancerId is 1 for now
      // ReposLinks: [null],
      // Images:[null]
    });
  }

  ngOnInit(): void {
    
    const id = +this._activatedRoute.snapshot.paramMap.get('id')!;

    this._ProjectService.GetById(id).subscribe({
      next: (res) => {

        if (res.isSuccess) {
          this.clientJob = res.data;
          this.proposalForm.patchValue({ JobId: id }); // Set the JobId in the form
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._proposalService.getProposalByJobId(id).subscribe({
      next: (res) => {
        this.proposalDetails = res.data;
        console.log('detailss', this.proposalDetails);
    
        if (Array.isArray(this.proposalDetails)) {
          this.proposalDetails.forEach((proposal: { freelancerId: any; }) => {
            const freelancerId = proposal.freelancerId;
            console.log('freelancerId', freelancerId);
    
            this._freelancer.getFreelancerById(freelancerId).subscribe({
              next: (freelancerRes) => {
                console.log('freelancer', freelancerRes);
              },
              error: (err) => {
                console.error('Error fetching freelancer data', err);
              }
            });
          });
        } else {
          console.error('Unexpected response data format', res.data);
        }
      },
      error: (err) => {
        console.error('Error fetching proposal data', err);
      }
    });
    
  }

  goBack() {
    this._Location.back();
  }
  getFormattedDate(date: string): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy, h:mm a') || date;
  }

  addProposal() {
let formData: FormData;
formData = new FormData();

formData.append('Duration', this.proposalForm.get('Duration')?.value);
formData.append('Description', this.proposalForm.get('Description')?.value);
formData.append('Price', this.proposalForm.get('Price')?.value);
formData.append('JobId', this.proposalForm.get('JobId')?.value);
formData.append('FreelancerId', this.proposalForm.get('FreelancerId')?.value);


    console.log("Submitting proposal...");
    if (this.proposalForm.valid) {
      // const payload = this.proposalForm.value;
      // console.log("Form is valid:", payload);
      this._proposalService.postProposal(formData).subscribe({
        next: () => {
          swal({
            // title: "wow!",
            text: ":) تم ارسال عرضك بنجاح ",
            icon: "success",

          })        },
        error: (err) => {
          console.log('Error response:', err);
          console.log('Payload sent:',formData);
          // console.log('Payload sent:', payload);
          swal({
            title: " :( فشل ارسال العرض ",
            icon: "warning",
            dangerMode: true,
          })
        }
      });
    } else {
      console.log("Form is invalid");
    }
  }
    
}
