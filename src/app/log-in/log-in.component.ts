import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../common/autho.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public hide: boolean = true;

  private continueUrl: string | null = "home";


  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .subscribe(params => {
        this.continueUrl = params.get('continueUrl') ?? this.continueUrl;
        console.log('LoginComponent/ngOnInit ' + this.continueUrl);

        this.router.navigate([this.continueUrl]);
      });
  }


  public onLogIn(userName: string, password: string): void {
    this.authService.logIn(userName, password);
    this.ngOnInit();
  }

}
