import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { EMPTY, Observable, Subject } from 'rxjs';
import { first, map, scan, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { ITask, IUser } from '../common/models';
import { HashTagService } from '../common/hashtag.service';
import { UsersRepository } from '../common/users.repository';
import { TasksRepository } from '../common/tasks.repository';


@Component({
  selector: 'app-mini-tile',
  templateUrl: './mini-tile.component.html',
  styleUrls: ['./mini-tile.component.css'],
  providers: [HashTagService]
})
export class MiniTileComponent implements OnInit {

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
  private userService = {
    getCurrentUser(): IUser { return ({ id: 0, email: '', name: 'Mary', selected: false }) }
  }


  constructor(private hashTagService: HashTagService, userRepository: UsersRepository, private taskRepo: TasksRepository) {
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
      tap(v => console.log('DEBUG 0:', v)),
      scan((value: ITask, changes: any) => this.taskUpdated(changes, value), this.task),
      shareReplay(1)
    );
  }

  public displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  public onViewTaskDetails(): void {
    // this.taskState$.pipe(first()).subscribe(item =>  this.router.navigate(["task"], { queryParams: { continueUrl: route.url } });)
  }

  public onAssigneeSelected(event: MatAutocompleteSelectedEvent) {
    this.taskState$.pipe(first()).subscribe(v => this.objectStateManager$.next({ assignee: [(event.option.value as IUser).email] }))
  }

  public onDeleteTask(): void {
    this.taskState$.pipe(first()).subscribe(t => this.taskRepo.deleteTask(t))
  }

  private taskUpdated(change: any, task: ITask): ITask {
    const updateTask: ITask = { ...task, ...change, lastModifyDate: new Date(), lastModifyUserEmail: this.userService.getCurrentUser().email }

    this.hashTagService.recalculateHashTags(updateTask)

    return updateTask;
  }


  private _filter(name: string): Observable<IUser[]> {
    const filterValue = name.toLowerCase();
    return this.users$.pipe(map(users => users.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0)));
  }

  public add(event: MatChipInputEvent, chipInput: any): void {
    const value = (event.value || '').trim();

    if (!value) {
      return;
    }

    this.taskState$.pipe(first()).subscribe(item => {

      const hashTag = value.startsWith('#') ? value : `#${value}`;
      item.hashTags.push(hashTag);
      this.hashTagService.recalculateHashTags(item);
      chipInput.value = ''
    });

  }

  public remove(hashTag: string): void {
    this.taskState$.pipe(first()).subscribe(item => item.hashTags = item.hashTags.filter(v => v !== hashTag));
  }

}