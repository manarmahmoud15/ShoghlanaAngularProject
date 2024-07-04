import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { log } from 'console';
import { ClientServiceService } from '../Services/Client/client-service.service';
import { IClient } from '../Models/IClient';
import { DatePipe } from '@angular/common';
import { JobStatus } from '../Enums/JobStatus';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
// import $ from 'jquery';


@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule , RouterLink , RouterLinkActive , RouterOutlet, DatePipe, FormsModule ],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css',
  providers : [DatePipe]
})


export class ClientProfileComponent implements OnInit {

  VisitedClientId! : Number
  LoggedInId! : Number

  isFreelancer : boolean = false
  isClient : boolean = false

  Client : IClient = {} as IClient
  UpdatedClient : IClient = {} as IClient
  JobStatus = JobStatus
  ClientLevel! : number
  emptyClientDescription : boolean = true 
  emptyClientCountry : boolean = true 
  @ViewChild('fileInput') FileInput! : ElementRef
  imageError! : string 
  isEditing = false;
  tempDescription! : string;
  isEditingName = false;  // New state for editing the name
  tempName! : string;
  emptyClientName : boolean = true
  nameError : string = ''

 // jobStatus = JobStatus
  constructor(
    private _activatedRoute: ActivatedRoute,
    private ClientService : ClientServiceService,
   private datePipe : DatePipe,
  private _authService : AuthService)
  {

  }
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveDescription() {
    this.isEditing = false;       
    this.emptyClientDescription = !this.Client.description;
    this.UpdatedClient.description = this.tempDescription

    this.ClientService.Update(this.UpdatedClient).subscribe({
      next : (res) => {
        console.log(res)
        if(res.isSuccess)
          {
            console.log(res)
            this.Client = res.data;
          }
          else
          {
            console.log(res)
          }
        }
    })    
  }

  cancelEdit() {
    this.isEditing = false;
  }


  toggleEditName() {
    this.isEditingName = !this.isEditingName;
    this.nameError = ''
  }

  saveName() {
    if(this.tempName.trim()==='')
      {
        this.nameError = 'يجب ادخال الاسم'
        return;
      }
    this.isEditingName = false;
  this.UpdatedClient.name = this.tempName
  this.emptyClientName = !this.Client.name
    this.ClientService.Update(this.UpdatedClient).subscribe({
      next : (res) => {
        console.log(res)
        if(res.isSuccess)
          {
            console.log(res)
            this.Client = res.data;
          }
          else
          {
            console.log(res)
          }
        }
    })
  }

  cancelEditName() {
    this.isEditingName = false;
    this.nameError = ''
  }


  TriggerFileInput()
  {
   this.FileInput.nativeElement.click();
  }

  SelectedImgChanged(event : any)
  {
    const input = event.target as HTMLInputElement;
const img = event.target.files[0];
const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
if (!allowedExtensions.exec(img.name)) {
  this.imageError = '(Jpg , Png, Jpeg) يرجي استخدام ملف';
  input.value = '';
  return;
}

console.log(img);
this.UpdatedClient.image = img;
console.log('sent client : ' , this.Client)
this.ClientService.Update(this.UpdatedClient).subscribe({
  next : (res) => {
    console.log(res)
    if(res.isSuccess)
      {
        console.log(res)
        this.Client = res.data;
        this.tempDescription = this.Client.description
        console.log(this.Client)
        this.imageError = ''
      }
      else
      {
        console.log(res)
        console.log(res.data.value.data)
        this.Client = res.data.value.data
        this.imageError = res.message
      //  alert(res.message)
      }
    
//     this.ClientService.GetById(this.VisitedClientId).subscribe({
//       next : (res) => {this.Client = res.data}
//     })
   }
  
 })
  }

  formattedDateTime()
  {
    return this.datePipe.transform(this.Client.registerationTime , 'mediumDate')
  }


  ngOnInit(): void {

    this._authService.Id.subscribe({
      next : () => {
        if(this._authService.Id.getValue() !== null)
          {
            this.LoggedInId = Number (this._authService.Id.getValue())  
            console.log('id from navbar ' + this.LoggedInId)
          }
      }
    })

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


    this.VisitedClientId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
   // this.LoggedInId = Number(localStorage.getItem('Id'))
    console.log("id from local storage : " , this.LoggedInId)
    this.UpdatedClient.Id = Number(this.LoggedInId); // on using updatedClient >> means user can edit >> means loggedinId = visitedClientId

    console.log("loggedin client id" + this.LoggedInId)
    console.log("visited client id" +this.VisitedClientId)
    // if(this.ClientId === null || this.ClientId === undefined)
    //   {
    //     this.ClientId = Number (localStorage.getItem('Id'))
    //   }
  

   this.ClientService.GetById(this.VisitedClientId).subscribe({
    next : (res) => {
      console.log(res.data);
      if(res.isSuccess)
        {
          this.Client = res.data;
          console.log(this.Client)
          console.log(this.Client.image)
          console.log(this.Client.country);
          this.ClientLevel = Math.ceil(this.Client.completedJobsCount / 10); 

          this.UpdatedClient.name = this.Client.name;
          this.UpdatedClient.description = this.Client.description;
          this.UpdatedClient.country = this.Client.country;
          this.UpdatedClient.image = this.Client.image;

          console.log(this.Client.image)
          if(this.Client.description)
            {
              this.emptyClientDescription = false
            }
            if(this.VisitedClientId)
              {
                console.log("client id : " + this.VisitedClientId);
              }
            if(this.Client.country)
              {
                this.emptyClientCountry = false
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