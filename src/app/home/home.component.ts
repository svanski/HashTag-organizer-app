import { Component, Inject, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { CREATE_NEW_TASK_MEDIATOR, VIEW_TASK_DETAILS_MEDIATOR } from '../common/actions.mediator';
import { ITask } from '../common/models';
import { TasksRepository } from '../common/tasks.repository';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tasks: Observable<ITask[]> = EMPTY;

  constructor(
    @Inject(CREATE_NEW_TASK_MEDIATOR) createNewTaskMediator: Observable<undefined>,
    @Inject(VIEW_TASK_DETAILS_MEDIATOR) public taskSelectedMediator: Observable<ITask>,
    tasksRepository: TasksRepository) {

    this.tasks = tasksRepository.getTasks();

    createNewTaskMediator.subscribe(_ => { tasksRepository.insertNewTask() });
  }

  ngOnInit(): void { }

}
