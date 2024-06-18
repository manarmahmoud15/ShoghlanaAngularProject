import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IProposal } from '../Models/iproposal'
import { ProposalService } from '../Services/proposal.service';
@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
  Proposals: IProposal[]=[] as IProposal[] ;
  constructor(private _ProposalService:ProposalService , private router :Router) {}
  ngOnInit(): void {
    this._ProposalService.getAllProposals().subscribe({
      next: (res) => {
        console.log('ress',res.data)
        if (res.isSuccess && Array.isArray(res.data)) {
          this.Proposals= res.data;

        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => console.log(err)
    });
  }

}
