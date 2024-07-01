import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProposal } from '../Models/iproposal'
import { ProposalService } from '../Services/proposal.service';
import { JobStatus } from '../Enums/JobStatus';
import { ProposalStatus } from '../Enums/proposal-status';
import { stat } from 'fs';
@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
  Proposals: IProposal[]=[] as IProposal[] ; 
  FilteredProposals: IProposal[]=[] as IProposal[] ; 
  ProposalStatus = ProposalStatus
  ClientName : string = ''
  JobTitle : string = ''

  Approved : ProposalStatus = ProposalStatus.Approved 
  Rejected : ProposalStatus = ProposalStatus.Rejected 
  Waiting : ProposalStatus = ProposalStatus.Waiting
  All : ProposalStatus = ProposalStatus.All

  constructor(private _ProposalService:ProposalService , private router :Router,
    private _activatedRoute : ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = Number (localStorage.getItem('Id'))
    console.log('id from offers' + id)

    this._ProposalService.getProposalByFreelancerId(id).subscribe({
      next: (res) => {
        console.log('ress',res.data)
        if (res.isSuccess && Array.isArray(res.data)) {
          this.Proposals= res.data;
          this.FilteredProposals = this.Proposals

        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => console.log(err)
    });
  }

  FilterProposals(status : ProposalStatus)
  {
    switch(status)
    {
      case this.Approved: {
        this.FilteredProposals = this.Proposals.filter(p => p.status === this.Approved)
      }
      break;
      case this.Waiting:{
        this.FilteredProposals = this.Proposals.filter(p => p.status === this.Waiting)
      }
      break;
      case this.Rejected: {
        this.FilteredProposals = this.Proposals.filter(p => p.status === this.Rejected)
      }
      break;

      case this.All : this.FilteredProposals = this.Proposals
    }
  }

  FilterByClientName()
  {
    this.FilteredProposals = this.Proposals.filter(p => p.clientName?.includes(`${this.ClientName}`))
  }

  FilterByJobTitle()
  {
    this.FilteredProposals = this.Proposals.filter(p => p.jobTitle?.includes(`${this.JobTitle}`))
  }
}
