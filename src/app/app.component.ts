import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './common/autho.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isLoggedIn$: Observable<boolean> = EMPTY;
  public logInUserInitial$: Observable<string> = EMPTY;

  constructor(authService: AuthService, private router: Router) {
    this.isLoggedIn$ = authService.isUserLoggedIn();
    this.logInUserInitial$ = authService.getLoggedInUser().pipe(map(user => user ? user.email[0].toUpperCase() : 'Err'));
  }

  public logIn(): void { this.router.navigate(["login"]); }
}
