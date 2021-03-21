import { Component } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from './common/autho.service';
import { IUser } from './common/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isLoggedIn$: Observable<boolean> = EMPTY;
  public logInUser$: Observable<IUser> = EMPTY;

  constructor(authService: AuthService) {
    this.isLoggedIn$ = authService.isUserLoggedIn();
    this.logInUser$ = authService.getLoggedInUser();
  }
}
