import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { IFreelancer } from '../Models/ifreelancer';
import { CommonModule } from '@angular/common';
import { FreelancerService } from '../Services/freelancer.service';
import { Router } from '@angular/router';
import { ISkill } from '../Models/i-skill';
import { SkillsService } from '../Services/Skill/skills.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './freelancer-profile.component.html',
  styleUrl: './freelancer-profile.component.css'
})

export class FreelancerProfileComponent implements OnInit {

  freelancer!: IFreelancer;

  originalFreelancer!: IFreelancer;

  // StringifiedPortfolio!: any

  // StringifiedWorkingHistory!: any

  // personalImageBytes : any ;

  currentFreelancerId !: number;

  editMode: boolean = false;

  allSkills: ISkill[] = []; // Array to hold all possible skills

  selectedSkills: number[] = []; // Array to hold selected skill IDs

  previewImage: string | ArrayBuffer | null = null; // Property to hold the preview image URL


  constructor(
    private activeRoute: ActivatedRoute,
    private freelancerService: FreelancerService,
    private skillService: SkillsService,
    private router: Router
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
  }


  private loadFreelancerData(): void {
    if (this.currentFreelancerId) {
      this.freelancerService.getFreelancerById(this.currentFreelancerId).subscribe({
        next: (res) => {

          console.log("Response: ");
          console.log(res);

          if (res.isSuccess && res.data != null) {

            this.freelancer = res.data;
            this.originalFreelancer = { ...res.data }; // Store a copy of the original freelancer data
            this.selectedSkills = this.freelancer.skills.map(skill => skill.id);

            console.log("freelancer")
            console.log(this.freelancer)

            console.log("Image comming from service")
            console.log(this.freelancer.personalImageBytes)

            if (res.data.personalImageBytes == null) {

              const imageUrl = res.data.personalImageBytes
                ? `data:image/png;base64,${res.data.personalImageBytes}`
                : 'assets/imgs/default-profile-picture-avatar-png-green.png';

              console.log("imageUrl")
              console.log(imageUrl)

              this.freelancer.personalImageBytes = imageUrl;
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
 this.selectedSkills.forEach(skillId => {
  formData.append('skillIDs', skillId.toString());
});

  // Make your HTTP request with formData
  this.freelancerService.updateFreelancer(this.currentFreelancerId, formData).subscribe({
    next: (res) => {
      if (res.isSuccess) {
        this.freelancer = res.data;
        this.editMode = false;
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
}


  onSkillChange(event: Event, skillId: number): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedSkills.push(skillId);
    } else {
      this.selectedSkills = this.selectedSkills.filter(id => id !== skillId);
    }
  }

  isSkillSelected(skillId: number): boolean {
    return this.selectedSkills.includes(skillId);
  }

  // updateOverview(): void {
    // this.freelancerService.updateFreelancer(this.freelancer).subscribe({
    //   next: (res) => {
    //     if (res.isSuccess) {
    //       this.editMode = false;
    //     } else {
    //       console.error(`Failed to update the overview, Status Code: ${res.Status}`);
    //       console.error(`Server Message: ${res.Message}`);
    //     }
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // });
  // }

  // private convertToBase64(bytes: any): string {
  //   return `data:image/png;base64,${bytes}`;
  // }

  // navigateToPortfolio() {
  //   this.router.navigate([`/freelancerprofile/${this.freelancer.id}/portfolio`]);
  // }

  // navigateToWorkingHistory() {
  //   this.router.navigate([`/freelancerprofile/${this.freelancer.id}/workhistory`]);
  // }
}