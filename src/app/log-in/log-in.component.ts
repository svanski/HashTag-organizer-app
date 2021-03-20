import { Component, OnInit } from '@angular/core';
import { AuthoService } from '../common/autho.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private authoService: AuthoService) { }

  ngOnInit(): void {
  }

}
