import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CREATE_NEW_TASK_MEDIATOR } from '../actions.mediator';
import { Task } from '../models';
import { createTask } from '../models.factory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tasks: Task[] = []

  constructor(@Inject(CREATE_NEW_TASK_MEDIATOR) private createNewTaskMediator: Observable<undefined>) {
    this.createNewTaskMediator.subscribe(v => {

      const t = createTask();
      t.lastModifyUserEmail = "Dachi"; 
      this.tasks.push(t)
    });
  }

  ngOnInit(): void {
  }

}
