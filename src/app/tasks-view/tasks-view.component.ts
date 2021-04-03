import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { HashTagsRepository } from '../common/hashtags.repository';
import { ITask } from '../common/models';
import { TasksRepository } from '../common/tasks.repository';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.css']
})
export class TasksViewComponent implements OnInit {

  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public readonly tasks: Observable<ITask[]> = EMPTY;
  public readonly searchFormControl: FormControl = new FormControl();
  public readonly hashTagsFromControl = new FormControl();
  public filteredOptions: Observable<string[]> = EMPTY;

  private readonly hashTags$: Observable<string[]>;
  public readonly selected$: BehaviorSubject<string[]>;
  public readonly filteredHashTags$: Observable<string[]> = EMPTY;

  constructor(private tasksRepository: TasksRepository, hashTagRepo: HashTagsRepository) {
    this.tasks = this.hashTagsFromControl.valueChanges.pipe(startWith([]), map(v => v ? v : []), switchMap((search: string[]) => tasksRepository.getTasks(task => !search || search.length === 0 || search.some(t => task.hashTags.includes(t)))))
    this.hashTags$ = hashTagRepo.getHashTags();

    this.selected$ = new BehaviorSubject<string[]>([]);

    this.filteredHashTags$ = this.searchFormControl.valueChanges.pipe(
      startWith(''),
      map((v: string) => v ? v.toLocaleLowerCase() : ''),
      switchMap(searchText => this.hashTags$.pipe(map(tags => tags.filter(t => t.toLocaleLowerCase().includes(searchText))))))
  }

  ngOnInit(): void {



    // this.filteredOptions = this.searchFormControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(name => name ? this._filter(name) : this.hashTags),
    //     switchMap(v => v)
    //   );
  }

  private _filter(name: string): Observable<string[]> {

    const parts = name.toLocaleLowerCase().split('#').map(v => `#${v}`);

    const filterValue = name.toLowerCase();
    return this.hashTags$.pipe(map(tags => tags.filter(t => parts.some(p => t.startsWith(p)))));
  }

  public onAddNewTask() {
    this.tasksRepository.insertNewTask();
  }

  public unselectFilterValue(tag: string) {
    this.selected$.next(this.selected$.value.filter(v => v !== tag));
  }

  public addToFilter(v: any, v2: any) {

  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.selected$.next([...this.selected$.value, event.option.value]);
    this.searchFormControl.reset();
  }
}
