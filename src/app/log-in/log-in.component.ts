import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../common/autho.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  private invalidCredentialMsg: string = '';
  private username: string = '';
  private password: string = '';
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
      });
  }

}
