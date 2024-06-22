import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiAddProjectService } from '../Services/AddProject/api-add-project.service';

@Component({
  selector: 'app-addproject',
  standalone: true,
  imports: [RouterLink ,CommonModule, RouterLink , FormsModule ],
  templateUrl: './addproject.component.html',
  styleUrl: './addproject.component.css'
})
export class AddprojectComponent implements OnInit{
  constructor(private _addprojectService:ApiAddProjectService){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
