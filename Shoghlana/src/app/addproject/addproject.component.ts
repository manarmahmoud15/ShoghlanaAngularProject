import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiAddProjectService } from '../Services/AddProject/api-add-project.service';
import { Iproject } from '../Models/Iproject';
import { IAddProject } from '../Models/iadd-project';
import swal from 'sweetalert';
import { SkillsService } from '../Services/Skill/skills.service';
import { Skill } from '../Models/Skill';
import { ISkill } from '../Models/i-skill';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-addproject',
  standalone: true,
  imports: [RouterLink ,CommonModule, RouterLink , FormsModule ,ReactiveFormsModule,NgSelectModule],
  templateUrl: './addproject.component.html',
  styleUrl: './addproject.component.css'
})
export class AddprojectComponent implements OnInit{
  newProject : IAddProject = {}as IAddProject;
  SkillsList : ISkill[] = []
  projectForm: FormGroup;
  constructor(private _addprojectService:ApiAddProjectService , private fb: FormBuilder,
    private skillService : SkillsService
  ){
    this.projectForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      minBudget: [null, [Validators.required]],
      maxBudget: [null, [Validators.required]],
      durationInDays: [null , [Validators.required]], 

    });
  }
  ngOnInit(): void {
    this.skillService.GetAll().subscribe({
      next : (res) => {this.SkillsList = res.data
        console.log(this.SkillsList)
      },
      error : (err) => {console.log(err)}
    })
  }
  addProject() {
    let formData: FormData;
    formData = new FormData();
    
    formData.append('title', this.projectForm.get('title')?.value);
    formData.append('description', this.projectForm.get('description')?.value);
    formData.append('minBudget', this.projectForm.get('minBudget')?.value);
    formData.append('maxBudget', this.projectForm.get('maxBudget')?.value);
    formData.append('durationInDays', this.projectForm.get('durationInDays')?.value);
    
    
        console.log("Submitting proposal...");
        if (this.projectForm.valid) {
          this._addprojectService.AddProject(formData).subscribe({
            next: (res) => {
              console.log(res)
              swal({
                text: ":) تم ارسال عرضك بنجاح ",
                icon: "success",
    
              })        },
            error: (err) => {
              console.log('Error response:', err);
              console.log('Payload sent:',formData);
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

