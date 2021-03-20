import { Component, Inject, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ITask } from '../common/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tasks: Observable<ITask[]> = EMPTY;

  constructor() {


  }

  ngOnInit(): void { }

}
