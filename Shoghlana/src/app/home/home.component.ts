import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, TranslateModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  count!: number;
  counter: Observable<number>;
  isLogged:boolean=false; 


  constructor(  private _translateService: TranslateService,
    private store: Store<{ counter: number }>, private _authService : AuthService) {
    //type of store is generic just as the store i wanna use
    this.counter = this.store.select('counter');
    // this.counter.subscribe((newVal)=>{
    //   this.count=newVal
    // })
    //alternative to subscribe is async pie
    const lang = localStorage.getItem('language') || 'en';
    this._translateService.setDefaultLang(lang);
    this._translateService.use(lang);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._authService.decodeUserData(); 

    this._authService.userdata.subscribe({
      next: () => {
        if (this._authService.userdata.getValue() !== null) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      },
    });

  }
}
