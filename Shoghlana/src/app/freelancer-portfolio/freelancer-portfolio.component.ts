import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iproject } from '../Models/Iproject';
import { ProjectService } from '../Services/Projects/project.service';
import { SkillsService } from '../Services/Skill/skills.service';
import { ISkill } from '../Models/i-skill';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-freelancer-portfolio',
  templateUrl: './freelancer-portfolio.component.html',
  styleUrls: ['./freelancer-portfolio.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})

export class FreelancerPortfolioComponent implements OnInit {
  projectForm: FormGroup;
  portfolio: Iproject[] = [];
  editingProject: Iproject | null = null;
  freelancerId!: number;
  allSkills: ISkill[] = [];
  showAddProjectForm: boolean = false;
  maxFileSize = 1 * 1024 * 1024; // 1 MB in bytes

  constructor(
    private projectService: ProjectService,
    private skillService: SkillsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.projectForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      link: [''],
      poster: [null, Validators.required], // Initialize poster form control
      skills: [] // Initialize skills form control as an empty array (optional)
    });
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.freelancerId = Number(params.get('id'));
      if (this.freelancerId) {
        this.loadPortfolio();
        this.loadSkills();
      }
    });
  }

 

  deleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log('Project deleted successfully');
          // Reload portfolio after deletion
          this.loadPortfolio();
        } else {
          console.error("Error deleting the project");
          console.log(res.Message);
        }
      },
      error: (err) => {
        console.error('Error deleting project', err);
      }
    });
  }

  showAddForm(): void {
    this.showAddProjectForm = true;
  }

  onAddSubmit(): void {
    
    console.log("Submitting ADD");

  // Check overall form validity
  console.log("Form Valid:", this.projectForm.valid);

  // Loop through each form control to check individual validity
  Object.keys(this.projectForm.controls).forEach(key => {
    const control = this.projectForm.get(key);
    console.log(`Control ${key} Valid:`, control?.valid);
  });


    if (this.projectForm.valid) {
      const formData = this.projectForm.value;

      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);

      if (formData.link) {
        uploadData.append('link', formData.link);
      }

      if (formData.poster instanceof File) {
        uploadData.append('poster', formData.poster);
      }

      if (formData.skills && formData.skills.length > 0) {
        formData.skills.forEach((skillId: number) => uploadData.append('skillIDs', skillId.toString()));
      }

      uploadData.append('freelancerId', this.freelancerId.toString());

      this.projectService.addProject(this.freelancerId, uploadData).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            console.log('Project added successfully');
            this.cancelAdd();
            this.loadPortfolio(); // Reload portfolio after add
          } else {
            console.error("Error adding the project");
            console.log(res.Message);
          }
        },
        error: (err) => {
          console.error('Error adding project', err);
        }
      });
    }
  }


  cancelAdd(): void {
    this.showAddProjectForm = false;
    this.projectForm.reset();
  }

  loadPortfolio(): void {
    this.projectService.GetByFreelancerId(this.freelancerId).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log("Getting freelancer portfolio Successfully :D");
          console.log(res.data);
          this.portfolio = res.data.map((project: Iproject) => ({
            ...project,
            poster: project.poster != null && project.poster != "" && project.poster != "ICEiIw==" ?
              `data:image/png;base64,${project.poster}` : './assets/imgs/default-project.png'
          }));
        } else {
          console.error("Error Fetching the Freelancer Portfolio");
          console.error(res.Message);
        }
      },
      error: (err) => {
        console.error("Error Fetching the freelancer Projects");
      }
    });
  }

  loadSkills(): void {
    this.skillService.GetAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log("Got All Skills:", res.data);
          this.allSkills = res.data;
        } else {
          console.error("Error Fetching skills:", res.Message);
        }
      },
      error: (err) => {
        console.error("Error Fetching skills", err);
      }
    });
  }

  ToggleProjectSkills(projectId: number): void {
    const project = this.portfolio.find(p => p.id === projectId);
    if (project) {

      console.log("Toggled Project")
      console.log(project);

      project.showSkills = !project.showSkills;
    }
  }

  // Helper function to get skill title by ID
  getSkillTitle(skillId: number): string {
    console.log("Getting Skill Title for ID : ", skillId);
    const skill = this.allSkills.find(skill => skill.id === skillId);
    return skill ? skill.title : '';
  }

  onSubmit(): void {
    if (this.projectForm.valid && this.editingProject) {
      const formData = this.projectForm.value;

      const updatedProject = {
        ...this.editingProject,
        title: formData.title,
        description: formData.description,
        link: formData.link,
        poster: formData.poster,
        skillIDs: formData.skills || [] // Set skillIDs to an empty array if no skills are selected
      };

      const uploadData = new FormData();
      uploadData.append('projectId', updatedProject.id.toString());
      uploadData.append('title', updatedProject.title);
      uploadData.append('description', updatedProject.description);

      if (formData.link) {
        uploadData.append('link', updatedProject.link);
      }

      // Handle the poster file if it exists
      if (formData.poster instanceof File) {
        uploadData.append('poster', formData.poster);
      }

      // Append skills as individual fields if they exist
      if (updatedProject.skillIDs.length > 0) {
        updatedProject.skillIDs.forEach((skillID: number) => uploadData.append('skillIDs', skillID.toString()));
      }

      // Additional fields if necessary
      uploadData.append('freelancerId', this.freelancerId.toString());

      this.projectService.updateProject(this.freelancerId, uploadData).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            console.log('Project updated successfully');
            this.cancelEdit();
            this.loadPortfolio(); // Reload portfolio after update
          } else {
            console.error("Error updating the project");
            console.log(res.Message);
          }
        },
        error: (err) => {
          console.error('Error updating project', err);
        }
      });
    }
  }

  editProject(project: Iproject): void {
    this.editingProject = project;

    // Convert base64 poster to File object if necessary
    let posterFile: File | null = null;
    if (project.poster && project.poster.startsWith('data:image/')) {
      try {
        posterFile = this.dataURLtoFile(project.poster, 'poster.png');
      } catch (error) {
        console.error("Error converting poster to file:", error);
      }
    }

    // Patch the form with project data
    this.projectForm.patchValue({
      title: project.title,
      description: project.description,
      link: project.link,
      poster: posterFile, // Assign the poster file object if available, null otherwise
      skills: project.skillIDs // Populate skills array in the form with project's skill IDs
    });

    // Log the patched form values
    console.log("Patched form values:", this.projectForm.value);
  }

  // Helper function to convert base64 to file object
  dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');

    // Ensure that the match result is not null
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error("Invalid data URL");
    }

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  cancelEdit(): void {
    this.editingProject = null;
    this.projectForm.reset();
  }

  // onFileSelected(event: any): void {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.projectForm.patchValue({
  //       poster: file
  //     });
  //   }
  // }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const validExtensions = ['image/png', 'image/jpeg', 'image/jpg'];

      if (!validExtensions.includes(file.type)) {
        alert('Invalid file type. Only PNG, JPG, and JPEG are allowed.');
        return;
      }

      if (file.size > this.maxFileSize) {
        alert('File size exceeds the 1 MB limit.');
        return;
      }

      this.projectForm.patchValue({
        poster: file
      });
    }
  }

  // Inside FreelancerPortfolioComponent class
  hasError(controlName: string, errorName: string): boolean {
    const control = this.projectForm.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }
}