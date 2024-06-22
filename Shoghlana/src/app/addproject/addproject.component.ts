import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-addproject',
  standalone: true,
  imports: [RouterLink ,CommonModule, RouterLink , FormsModule ],
  templateUrl: './addproject.component.html',
  styleUrl: './addproject.component.css'
})
export class AddprojectComponent {

}
