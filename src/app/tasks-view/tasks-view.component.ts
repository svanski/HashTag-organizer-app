import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { HashTagsRepository } from '../common/hashtags.repository';
import { ITask } from '../common/models';
import { TasksRepository } from '../common/tasks.repository';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.css']
})
export class TasksViewComponent implements OnInit {

  public readonly tasks: Observable<ITask[]> = EMPTY;
  public readonly searchFormControl: FormControl = new FormControl();
  public readonly hashTagsFromControl = new FormControl();
  public filteredOptions: Observable<string[]> = EMPTY;

  private readonly hashTags: Observable<string[]>;

  constructor(private tasksRepository: TasksRepository, hashTagRepo: HashTagsRepository) {
    this.tasks = this.hashTagsFromControl.valueChanges.pipe(startWith([]), map(v => v ? v : []), switchMap((search: string[]) => tasksRepository.getTasks(task => !search || search.length === 0 || search.some(t => task.hashTags.includes(t)))))
    this.hashTags = hashTagRepo.getHashTags();
  }

  ngOnInit(): void {

    this.filteredOptions = this.searchFormControl.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this._filter(name) : this.hashTags),
        switchMap(v => v)
      );
  }

  private _filter(name: string): Observable<string[]> {

    const parts = name.toLocaleLowerCase().split('#').map(v => `#${v}`);

    const filterValue = name.toLowerCase();
    return this.hashTags.pipe(map(tags => tags.filter(t => parts.some(p => t.startsWith(p)))));
  }

  public onAddNewTask() {
    this.tasksRepository.insertNewTask();
  }
}
