import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ValidatorFn,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiAddProjectService } from '../Services/AddProject/api-add-project.service';
import { Iproject } from '../Models/Iproject';
import { IAddProject } from '../Models/iadd-project';
import swal from 'sweetalert';
import { SkillsService } from '../Services/Skill/skills.service';
import { Skill } from '../Models/Skill';
import { ISkill } from '../Models/i-skill';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoryService } from '../Services/Category/category.service';
import { ICategory } from '../Models/icategory';
import { ExperienceLevel } from '../Enums/experience-level';
import { User } from '../Models/user';
import { IndividualchatService } from '../Services/individualChat/individualchat.service';

@Component({
  selector: 'app-addproject',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  templateUrl: './addproject.component.html',
  styleUrl: './addproject.component.css',
})
export class AddprojectComponent implements OnInit {
  newProject: IAddProject = {} as IAddProject;
  skillsIds: ISkill[] = [];
  categories: ICategory[] = [];
  Beginner: ExperienceLevel = ExperienceLevel.Beginner;
  Intermediate: ExperienceLevel = ExperienceLevel.Intermediate;
  Expert: ExperienceLevel = ExperienceLevel.Expert;
  //SkillsIDs : Number[] = []
  projectForm: FormGroup;
  clientName!: string | null;
  visitedJobClientId! : Number;
  proposalID :any ;

  freelancerId : any;
  freelancerName : any;
  freelancerDetails : any[] =[];
  apiErrorMessage: string[] = [];
  openChat = false;
  JobId! : Number
  LoggedInId : Number = Number (localStorage.getItem('Id'));

  isFreelancer : boolean = false
  constructor(
    private _addprojectService: ApiAddProjectService,
    private fb: FormBuilder,
    private skillService: SkillsService,
    private categoryService: CategoryService,
    private _individualChatService : IndividualchatService ,

    
  ) {
    this.projectForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      minBudget: [null, [Validators.required, Validators.min(1)]],
      maxBudget: [null, [Validators.required, Validators.min(2)]], // validate max > min
      durationInDays: [null, [Validators.required, Validators.min(1)]],
      skillsIds: [],
      categoryId: [null, [Validators.required]],
      experienceLevel: [null, [Validators.required]],
      clientId: [localStorage.getItem('Id')],
    });
  }

  ngOnInit(): void {
    this.clientName = localStorage.getItem('Name') ;

    this.categoryService.GetAll().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log(this.categories);
      },
    });
    this.skillService.GetAll().subscribe({
      next: (res) => {
        this.skillsIds = res.data;
        console.log(this.skillsIds);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProject() {
    // let formData: FormData;
    // formData = new FormData();
    //   console.log(this.projectForm.get('SkillsIds')?.value);
    // You can perform further actions with the selected skills

    //   formData.append('title', this.projectForm.get('title')?.value);
    // formData.append('description', this.projectForm.get('description')?.value);
    // formData.append('minBudget', this.projectForm.get('minBudget')?.value);
    // formData.append('maxBudget', this.projectForm.get('maxBudget')?.value);
    // formData.append('durationInDays', this.projectForm.get('durationInDays')?.value);

    // this.projectForm.get('SkillsIds')?.value.forEach((id: any) => {
    //   formData.append('SkillsIds', id);
    // });

    console.log('Submitting proposal...');
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
      this._addprojectService.AddProject(this.projectForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.isSuccess) {
            swal({
              text: ':) تم اضافة المشروع بنجاح ',
              icon: 'success',
            });
          } else {
            swal({
              text: 'حدث خطأ اثناء اضافة المشروع',
              icon: 'warning',
              dangerMode: true,
            });
          }
        },
        error: (err) => {
          console.log('Error response:', err);
          // console.log('Payload sent:',formData);
          swal({
            title: ' :( فشل ارسال العرض ',
            icon: 'warning',
            dangerMode: true,
          });
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
