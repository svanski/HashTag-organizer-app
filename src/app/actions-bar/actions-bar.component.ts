import { Component, Inject, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { CREATE_NEW_TASK_MEDIATOR } from '../actions.mediator';

@Component({
  selector: 'app-actions-bar',
  templateUrl: './actions-bar.component.html',
  styleUrls: ['./actions-bar.component.css']
})
export class ActionsBarComponent implements OnInit {

  constructor(@Inject(CREATE_NEW_TASK_MEDIATOR) public createNewTaskMediator: Observer<undefined>) { }

  ngOnInit(): void {
  }

}
