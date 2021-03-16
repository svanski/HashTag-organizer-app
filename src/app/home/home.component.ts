import { Component, OnInit } from '@angular/core';
import { ITask } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tasks: ITask[] = [{} as ITask, {} as ITask]

  constructor() { }

  ngOnInit(): void {
  }

}
