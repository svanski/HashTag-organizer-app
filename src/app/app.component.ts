import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthoService } from './common/autho.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hashtag-planner-app';

  constructor(private authoService: AuthoService, private router: Router) { }

  ngOnInit(): void {

    if (this.authoService.isLoggedIn) {
      this.router.navigateByUrl('/login');
    }

  }
}
