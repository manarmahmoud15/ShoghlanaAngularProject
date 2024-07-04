import { CommonModule } from '@angular/common';
import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule , CommonModule , ReactiveFormsModule ],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css'
})
export class ChatInputComponent {
  content :string = '';
  @Output() contentEmitter =new EventEmitter();
  sendMessage(){
    if(this.content.trim() !== ""){
      this.contentEmitter.emit(this.content)
    }
    this.content ='';
  }
}
