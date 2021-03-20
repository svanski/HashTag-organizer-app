import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ITask } from '../common/models';
import { TasksRepository } from '../common/tasks.repository';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.css']
})
export class TasksViewComponent implements OnInit {

  public tasks: Observable<ITask[]> = EMPTY;

  constructor(private tasksRepository: TasksRepository) {
    this.tasks = tasksRepository.getTasks();
  }

  ngOnInit(): void {
  }

  public onAddNewTask() {
    this.tasksRepository.insertNewTask();
  }
}
