import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  darkModeSignal = signal<string>('null');
  updateDarkMode (){
    this.darkModeSignal.update((value) => (value === 'dark' ? 'null' : 'dark'))
  }
  constructor() { }
}
