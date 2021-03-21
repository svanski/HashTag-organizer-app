import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first } from 'rxjs/operators';
import { AuthService } from '../common/autho.service';
import { UsersRepository } from '../common/users.repository';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public hide: boolean = true;

  private continueUrl: string | null = "tasks";


  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userRepo: UsersRepository) { }

  ngOnInit(): void {

    // this.activatedRoute.queryParamMap
    //   .subscribe(params => {
    //     this.continueUrl = params.get('continueUrl') ?? this.continueUrl;
    //     console.log('LoginComponent/ngOnInit ' + this.continueUrl);

    //     this.router.navigate([this.continueUrl]);
    //   });

    this.authService.isUserLoggedIn().pipe(filter(v => v), first()).subscribe(v => this.router.navigate([this.continueUrl]));
  }


  public onLogIn(userName: string, password: string): void {
    this.authService.logIn(userName, password);
    this.ngOnInit();
  }

  public onSingUp(userName: string, password: string): void {
    this.userRepo.addUser({ id: Date.now(), email: userName, name: userName, permissions: ['admin'], selected: false });
    this.onLogIn(userName, password);
  }

}
