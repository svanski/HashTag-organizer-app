import { Component, Inject, OnInit } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { CREATE_NEW_TASK_MEDIATOR, VIEW_TASK_DETAILS_MEDIATOR } from '../common/actions.mediator';
import { ITask } from '../common/models';
import { createTask } from '../common/models.factory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tasks: ITask[] = [];
  public selectedTask!: ITask;

  constructor(@Inject(CREATE_NEW_TASK_MEDIATOR) private createNewTaskMediator: Observable<undefined>,
    @Inject(VIEW_TASK_DETAILS_MEDIATOR) public taskSelectedMediator: Observable<ITask>) {
    this.createNewTaskMediator.subscribe(v => {

      const t = createTask();
      t.lastModifyUserEmail = "Dachi";
      this.tasks.push(t)
    });

  }

  ngOnInit(): void { }

}
