import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { EMPTY, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, first, map, scan, shareReplay, skip, startWith, switchMap, tap } from 'rxjs/operators';
import { ITask, IUser } from '../common/models';
import { UsersRepository } from '../common/users.repository';
import { TasksRepository } from '../common/tasks.repository';


@Component({
  selector: 'app-mini-tile',
  templateUrl: './mini-tile.component.html',
  styleUrls: ['./mini-tile.component.css']
})
export class MiniTileComponent implements OnInit, OnDestroy {

  @Input('task') public task!: ITask;
  @Input('isLargeItem') public isLargeItem: boolean = false;

  public startDate!: Date;
  public dueDate!: Date;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public assigneeNameFilter: string | undefined;

  public assigneeFormControl: FormControl = new FormControl();
  public filteredOptions: Observable<IUser[]> = EMPTY;
  public taskState$: Observable<ITask> = EMPTY;

  public users$: Observable<IUser[]> = EMPTY;

  public objectStateManager$!: Subject<any>;
  private subscription: Subscription = Subscription.EMPTY;


  constructor(userRepository: UsersRepository, private taskRepo: TasksRepository) {
    this.objectStateManager$ = new Subject<any>();
    this.users$ = userRepository.getUsers();
  }

  ngOnInit(): void {
    this.filteredOptions = this.assigneeFormControl.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => typeof value === 'string' ? value : (value as IUser).name),
        map(name => name ? this._filter(name) : this.users$),
        switchMap(v => v)
      );

    this.taskState$ = this.objectStateManager$.pipe(
      startWith(this.task),
      distinctUntilChanged(this.areEventsSame),
      tap(v => console.log('DEBUG 0:', v)),
      scan((value: ITask, changes: any) => this.taskUpdated(changes, value), this.task),
      shareReplay(1)
    );

    this.subscription = this.taskState$.pipe(skip(1)).subscribe(t => this.taskRepo.update(t));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  public onAssigneeSelected(event: MatAutocompleteSelectedEvent) {
    this.taskState$.pipe(first()).subscribe(v => this.objectStateManager$.next({ assignee: [(event.option.value as IUser).email] }))
  }

  public onDeleteTask(): void {
    this.taskState$.pipe(first()).subscribe(t => this.taskRepo.deleteTask(t))
  }

  private taskUpdated(change: any, task: ITask): ITask {
    const updateTask: ITask = { ...task, ...change }
    return updateTask;
  }


  private _filter(name: string): Observable<IUser[]> {
    const filterValue = name.toLowerCase();
    return this.users$.pipe(map(users => users.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0)));
  }

  public add(event: MatChipInputEvent, chipInput: any): void {
    const value = (event.value || '').trim();

    if (!value || value === '#') {
      return;
    }

    this.taskState$.pipe(first()).subscribe(item => {
      const hashTag = value.startsWith('#') ? value : `#${value}`;
      this.objectStateManager$.next({ hashTags: [hashTag, ...item.hashTags] })
      chipInput.value = ''
    });
  }

  public remove(hashTag: string): void {
    this.taskState$.pipe(first()).subscribe(item => item.hashTags = item.hashTags.filter(v => v !== hashTag));
  }

  private areEventsSame(a: any, b: any): boolean {

    if (typeof a === 'object' && typeof b === 'object') {
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      if (aKeys.length !== bKeys.length) {
        return false;
      }

      const areSame = aKeys.every(keyA => bKeys.includes(keyA) && a[keyA] === b[keyA]);
      return areSame;
    }

    return a === b;
  }
}