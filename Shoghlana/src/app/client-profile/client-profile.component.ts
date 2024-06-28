import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { log } from 'console';
import { ClientServiceService } from '../Services/Client/client-service.service';
import { IClient } from '../Models/IClient';
import { DatePipe } from '@angular/common';
import { JobStatus } from '../Enums/JobStatus';
// import $ from 'jquery';


@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule , RouterLink , RouterLinkActive , RouterOutlet, DatePipe ],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css',
  providers : [DatePipe]
})


export class ClientProfileComponent implements OnInit {

  ClientId! : Number
  Client! : IClient
  JobStatus = JobStatus
  ClientLevel! : number
  emptyClientDescription : boolean = true
 // jobStatus = JobStatus
  constructor(
    private _activatedRoute: ActivatedRoute,
    private ClientService : ClientServiceService,
   private datePipe : DatePipe)
  {

  }

  formattedDateTime()
  {
    return this.datePipe.transform(this.Client.registerationTime , 'mediumDate')
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ClientId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    // if(this.ClientId === null || this.ClientId === undefined)
    //   {
    //     this.ClientId = Number (localStorage.getItem('Id'))
    //   }
  

   this.ClientService.GetById(this.ClientId).subscribe({
    next : (res) => {
      console.log(res.data);
      if(res.isSuccess)
        {
          this.Client = res.data;
          console.log(res)
          console.log(this.Client);
          console.log(this.Client.country);
          this.ClientLevel = Math.ceil(this.Client.completedJobsCount / 10); 

          console.log(this.Client.image)
          if(this.Client.description)
            {
              this.emptyClientDescription = false
            }
            if(this.ClientId)
              {
                console.log("client id : " + this.ClientId);
              }
        }
    },
    error : (err) => {console.log(err)}
   });
  }


ngAfterViewInit() {
  // console.log(this.Client.Name)
  const blockHeads = document.querySelectorAll('.block-head');
  blockHeads.forEach(blockHead => {
    blockHead.addEventListener('click', () => {
      const targetSelector = blockHead.getAttribute('data-target');

      // Check if targetSelector is not null before proceeding
      if (targetSelector !== null) {
        const targetElement = document.querySelector(targetSelector);
        const chevronIcon = blockHead.querySelector('i.fa-chevron-down, i.fa-chevron-up');

        if (targetElement && chevronIcon) {
          targetElement.classList.toggle('show');
          chevronIcon.classList.toggle('fa-chevron-down');
          chevronIcon.classList.toggle('fa-chevron-up');
        }
      }
    });
  });
}



}
