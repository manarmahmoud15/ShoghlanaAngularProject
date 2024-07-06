// important NOTE >> this comp represents job details not project details "name will be updated later"

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IClientJob } from '../Models/iclient-job';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { IProposal } from '../Models/iproposal';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProposalService } from '../Services/proposal.service';
import swal from 'sweetalert';
import { ProjectService } from '../Services/Projects/project.service';
import { JobStatus } from '../Enums/JobStatus';
import { FreelancerService } from '../Services/freelancer.service';
import { IndividualchatService } from '../Services/individualChat/individualchat.service';
import { User } from '../Models/user';
import { IndividualChatComponent } from '../individualChat/individual-chat/individual-chat.component';
import { JobService } from '../Services/job/job.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule , IndividualChatComponent],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  providers: [DatePipe],
})
export class ProjectDetailsComponent implements OnInit {
  visitedJobClientId! : Number;
  proposalID :any ;
  proposalsDetails! : IProposal[];
  clientJob! : IClientJob;
  proposalForm: FormGroup;
  freelancerId : any;
  freelancerName : any;
  freelancerDetails : any[] =[];
  apiErrorMessage: string[] = [];
  openChat = false;
  JobStatus = JobStatus;
  JobId! : Number
  LoggedInId : Number = Number (localStorage.getItem('Id'));
  

  isFreelancer : boolean = false
  isClient : boolean = false
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _ProjectService: ProjectService,
    private _JobService : JobService,
    private _Location: Location,
    private datePipe: DatePipe,
    private _proposalService: ProposalService,
    private _freelancer : FreelancerService,
    private fb: FormBuilder ,
    private _individualChatService : IndividualchatService ,
    private router : Router ,
    private _authService : AuthService
  ) {
    this.proposalForm = this.fb.group({
      Duration: [null, [Validators.required]],
      Price: [null, [Validators.required]],
      Description: [null, [Validators.required]],
      JobId: [null, [Validators.required]],
      FreelancerId: [this.LoggedInId, [Validators.required]], // Assuming the FreelancerId is 1 for now
      // ReposLinks: [null],
      // Images:[null]
    });
  }

  // ngOnInit(): void {
    
  //   const id = +this._activatedRoute.snapshot.paramMap.get('id')!;

  //   this._ProjectService.GetById(id).subscribe({
  //     next: (res) => {

  //       if (res.isSuccess) {
  //         this.clientJob = res.data;
  //         this.proposalForm.patchValue({ JobId: id }); // Set the JobId in the form
  //       } else {
  //         console.error('Unexpected response structure:', res);
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  //   this._proposalService.getProposalByJobId(id).subscribe({
  //     next: (res) => {
  //       this.proposalsDetails = res.data;
  //       console.log('detailss', this.proposalsDetails);
    
  //       if (Array.isArray(this.proposalsDetails)) {
  //         this.proposalsDetails.forEach((proposal: { freelancerId: any; }) => {
  //           const freelancerId = proposal.freelancerId;
  //           console.log('freelancerId', freelancerId);
    
  //           this._freelancer.getFreelancerById(freelancerId).subscribe({
  //             next: (freelancerRes) => {
  //               console.log('freelancer', freelancerRes);
  //             },
  //             error: (err) => {
  //               console.error('Error fetching freelancer data', err);
  //             }
  //           });
  //         });
  //       } else {
  //         console.error('Unexpected response data format', res.data);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching proposal data', err);
  //     }
  //   });
    
  // }

  ngOnInit(): void {

    this._authService.IsClient.subscribe({
      next : () => {
        if(this._authService.IsClient.getValue() !== null)
          {
              this.isClient = true
              console.log(this._authService.IsClient.getValue()) 
          }
          else
          {
            this.isClient = false
            console.log(this._authService.IsClient.getValue()) 
          }
      }
    })


    this._authService.IsFreelancer.subscribe({
      next : () => {
        if(this._authService.IsFreelancer.getValue() !== null)
          {
              this.isFreelancer = true
              console.log(this._authService.IsFreelancer.getValue()) 
          }
          else
          {
            this.isFreelancer = false
            console.log(this._authService.IsFreelancer.getValue()) 
          }
      }
    })

    this._activatedRoute.params.subscribe(params => {
      this.JobId = +params['id'];
      this.LoadJobData();
      this.LoadProposalsData();
    })

    //this.JobId = +this._activatedRoute.snapshot.paramMap.get('id')!;
   // console.log('Route ID:', this.JobId);

   
    this._individualChatService.myName = { name: 'Initial Name' };
  }


  LoadJobData()
  {
    this._JobService.GetById(this.JobId).subscribe({
      next: (res) => {
        console.log('Job response:', res);
        if (res.isSuccess) {
          this.clientJob = res.data;
         this.visitedJobClientId = this.clientJob.clientId

          this.proposalForm.patchValue({ JobId: this.JobId });
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => {
        console.error('Error fetching project data:', err);
      }
    });
  }

  LoadProposalsData()
  {
    this._proposalService.getProposalByJobId(this.JobId).subscribe({
      next: (res) => {
        if(res.isSuccess)
        {
          console.log('Proposal response:', res);
          this.proposalsDetails = res.data;
          console.log('Proposal details:', this.proposalsDetails);
        }
      else
      {
        console.log(res.message)
      }
      },
      error: (err) => {
        console.error('Error fetching proposal data:', err);
      },
    });
  }
  chat(freelancerName : string){ 
    this.apiErrorMessage =[];
    this.openChat = true ;
    const user: User = { name: freelancerName };
      this._individualChatService.registerUser(user).subscribe({
        next:()=> {
          // console.log('openchar')
          // this.router.navigate(['individualChat']);
          this._individualChatService.myName = user
          console.log('myname',this._individualChatService.myName)
          this.openChat =true
        },
        error: err=>{
          if(typeof(err.error) !== 'object'){
            this.apiErrorMessage.push(err.error)
          }
        }
      })
  }
  closeChat(){
    this.openChat =false;
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
        next: (res) => {
          if(res.isSuccess)
          {
            swal({
              // title: "wow!",
              text: ":) تم ارسال عرضك بنجاح ",
              icon: "success",
  
            })  
            
            
            this._proposalService.getProposalByJobId(this.JobId).subscribe({
              next: (res) => {
                if(res.isSuccess)
                {
                  console.log('Proposal response:', res);
                  this.proposalsDetails = res.data;
                  this.clientJob.proposalsCount = this.proposalsDetails.length
                  console.log('Proposal details:', this.proposalsDetails);
                }
              else
              {
                console.log(res.message)
              }
              
              },
              error: (err) => {
                console.error('Error fetching proposal data:', err);
              },
            });
          }
          else
          {
            swal({
              title: " :( فشل ارسال العرض ",
              icon: "warning",
              dangerMode: true,
            })
          }
              },
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

  AcceptProposal(id : Number)
  {
     this._proposalService.AcceptProposal(id).subscribe(
      {
        next : (res) => {
          console.log(res)
          if(res.isSuccess)
          {
            swal({
              text: ":) تم قبول العرض بنجاح ",
              icon: "success",
  
            }) 

            this._JobService.GetById(this.JobId).subscribe(
              {
                next : (res) => {
                  console.log(res)
                  if(res.isSuccess)
                  {
                    this.clientJob = res.data
                  }
                  else
                  {
                    console.log(res.message)
                  }
                },
                error : (err) => {
                  console.log(err)
                }
              }
            )
          }
          else
          {
            swal({
              title: " :( فشل قبول العرض ",
              icon: "warning",
              dangerMode: true,
            })
            console.log(res.message)
          }
        },
        error : (err)=> {
          swal({
            title: " :( فشل قبول العرض ",
            icon: "warning",
            dangerMode: true,
          })
           console.log(err)
        }
      }
     )
  }
}
