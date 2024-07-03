import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { IFreelancer } from '../Models/ifreelancer';
import { CommonModule } from '@angular/common';
import { FreelancerService } from '../Services/freelancer.service';
import { Router } from '@angular/router';
import { ISkill } from '../Models/i-skill';
import { SkillsService } from '../Services/Skill/skills.service';
import { FormsModule } from '@angular/forms';
import { SuccessDialogComponent } from '../Models/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SaveSuccessWindowComponent } from '../Models/save-success-window/save-success-window.component';
import { Skill } from '../Models/Skill';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AuthService } from '../auth.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FormsModule,
    SaveSuccessWindowComponent,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    // BrowserAnimationsModule,
  ],
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.css'],
  providers:[FreelancerService , SkillsService]
})

export class FreelancerProfileComponent implements OnInit {

  freelancer!: IFreelancer;

  originalFreelancer!: IFreelancer;

  currentFreelancerId !: number;
  LoggedInId! : number;
  isFreelancer : boolean = false
  isClient : boolean = false

  editMode: boolean = false;

  allSkills: ISkill[] = []; // Array to hold all possible skills

  selectedSkillsIDs: number[] = []; // Array to hold selected skill IDs

  // selectedSkills: Skill[] = []; // Array to hold selected skill IDs

  previewImage: string | ArrayBuffer | null = null; // Property to hold the preview image URL

  skillInput !: string;

  // filteredSkills: Skill[] = [];


  constructor(
    private activeRoute: ActivatedRoute,
    private freelancerService: FreelancerService,
    private skillService: SkillsService,
    private router: Router,
    private dialog: MatDialog, // Inject MatDialog
    private _authService : AuthService

  ) {

    console.log("Freelancer obj ctor :");

    this.currentFreelancerId = Number(this.activeRoute.snapshot.paramMap.get('id'));

    console.log("ID :" + this.currentFreelancerId);

    // this.loadFreelancerData(); // Fetch data whenever the route changes

    // console.log(this.freelancer);
  }


  ngOnInit(): void {

    this.currentFreelancerId = Number(this.activeRoute.snapshot.paramMap.get('id'));

    this.loadFreelancerData();

    this.loadAllSkills();


    this._authService.Id.subscribe({
      next : () => {
        if(this._authService.Id.getValue() !== null)
          {
            this.LoggedInId = Number (this._authService.Id.getValue())  // test
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
  }


  public loadFreelancerData(): void {
    if (this.currentFreelancerId) {
      this.freelancerService.getFreelancerById(this.currentFreelancerId).subscribe({
        next: (res) => {

          console.log("Response: ");
          console.log(res);

          if (res.isSuccess && res.data != null) {

            this.freelancer = res.data;
            this.originalFreelancer = { ...res.data }; // Store a copy of the original freelancer data
            this.selectedSkillsIDs = this.freelancer.skills.map(skill => skill.id);
            // this.selectedSkills = [...this.freelancer.skills];

            console.log("freelancer")
            console.log(this.freelancer)

            console.log("Image comming from service")
            console.log(this.freelancer.personalImageBytes)

            const isBase64Image = /^data:image\/(png|jpeg|jpg);base64,/.test(res.data.personalImageBytes);


            if (res.data.personalImageBytes == null || isBase64Image) {

              this.freelancer.personalImageBytes = this.originalFreelancer.personalImageBytes = '././assets/imgs/default-profile-picture-avatar-png-green.png';

            } else {
              this.freelancer.personalImageBytes = `data:image/png;base64,${res.data.personalImageBytes}`;
              this.originalFreelancer.personalImageBytes = `data:image/png;base64,${res.data.personalImageBytes}`;
            }

            console.log("freelancer Image")
            console.log(this.freelancer.personalImageBytes)

          } else {
            console.error(`Failed to get the data, Status Code: ${res.Status}`);
            console.error(`Server Message: ${res.Message}`);
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  getImageSource(): string {
    if (this.editMode && this.previewImage) { 
      return String (this.previewImage);
    } else if (this.freelancer.personalImageBytes !== null) {
      return String (this.freelancer.personalImageBytes);
    } else {
      return '../../assets/imgs/default-profile-picture-avatar-png-green.png';
    }
  }


  private loadAllSkills(): void {
    this.skillService.GetAll().subscribe({
      next: (res) => {
        if (res.isSuccess && res.data != null) {
          console.log("Got all skills")
          this.allSkills = res.data;
        } else {
          console.error(`Failed to get skills, Status Code: ${res.Status}`);
          console.error(`Server Message: ${res.Message}`);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.originalFreelancer = { ...this.freelancer }; // Store a copy of the original data before editing
  }


  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // Get the first file from the input
  
      const validExtensions = ['image/png', 'image/jpeg']; // Allowed file types
      const maxSize = 1 * 1024 * 1024; // Maximum size in bytes (1 MB)
  
      if (!validExtensions.includes(file.type)) {
        alert('Only .png  , .jpeg and .jpg files are allowed.');
        input.value = ''; // Clear the input
        return;
      }
  
      if (file.size > maxSize) {
        alert('The file size must be less than 1 MB.');
        input.value = ''; // Clear the input
        return;
      }
  
      // Assuming this.freelancer.personalImageBytes should be updated with the file data
      this.freelancer.personalImageBytes = file;
  
      // You may want to display the selected file in your UI
      const reader = new FileReader();
      reader.onload = () => {
        // Example: Display the selected file as a preview
        this.previewImage = reader.result as string; // Assuming previewImage is bound to an <img> tag in your HTML
      };
      reader.readAsDataURL(file);
    }
  }
  

  // Method to save changes including file upload
  saveChanges(): void {

    const formData = new FormData();

    // Append personal image if it's selected
    if (this.freelancer.personalImageBytes instanceof File) {
      formData.append('personalImageBytes', this.freelancer.personalImageBytes);
    }

    // Append other fields
    formData.append('name', this.freelancer.name ?? '');
    formData.append('title', this.freelancer.title ?? '');
    formData.append('overview', this.freelancer.overview ?? '');
    formData.append('address', this.freelancer.address ?? '');
    // Append other fields as needed

    // Append skillIDs as array of integers
    this.selectedSkillsIDs.forEach(skillId => {
      formData.append('skillIDs', skillId.toString());
    });

    // Make your HTTP request with formData
    this.freelancerService.updateFreelancer(this.currentFreelancerId, formData).subscribe({
      next: (res) => {
        if (res.isSuccess) {

          this.freelancer = res.data;

          this.loadFreelancerData(); // Reload data after successful update

        } else {
          console.error(`Failed to update the profile, Status Code: ${res.Status}`);
          console.error(`Server Message: ${res.Message}`);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  cancelEdit() {
    this.freelancer = { ...this.originalFreelancer }; // Revert to the original data
    this.previewImage = null; // Clear the preview image
    this.editMode = false;
    this.loadFreelancerData();
  }


  onSkillChange(event: Event, skillId: number): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedSkillsIDs.push(skillId);
    } else {
      this.selectedSkillsIDs = this.selectedSkillsIDs.filter(id => id !== skillId);
    }
  }

  isSkillSelected(skillId: number): boolean {
    return this.selectedSkillsIDs.includes(skillId);
  }

}