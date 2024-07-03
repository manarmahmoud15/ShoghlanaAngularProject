import { Component, Input } from '@angular/core';
import { Message } from '../Models/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
@Input() messages :Message[] =[];
}
