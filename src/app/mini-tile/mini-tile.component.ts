import { Component, Inject, Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { EMPTY, Observable, Observer, Subject } from 'rxjs';
import { first, map, scan, shareReplay, startWith, tap } from 'rxjs/operators';
import { ITask, IUser } from '../models';
import { HashTagService } from '../hashtag.service';
import { VIEW_TASK_DETAILS_MEDIATOR } from '../actions.mediator';


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


  public assigneeFormControl: FormControl = new FormControl();
  public options: IUser[] = [
    { id: 0, email: 'Mary@cerb', name: 'Mary', selected: false },
    { id: 1, email: 'Shelley@cerb', name: 'Shelley', selected: false },
    { id: 2, email: 'Igor@cerb', name: 'Igor', selected: false }
  ];

  public filteredOptions: Observable<IUser[]> = EMPTY;
  public taskState$: Observable<ITask> = EMPTY;


  public objectStateManager$!: Subject<any>;
  private userService = {
    getCurrentUser(): IUser { return ({ id: 0, email: '', name: 'Mary', selected: false }) }
  }


  constructor(private hashTagService: HashTagService, @Inject(VIEW_TASK_DETAILS_MEDIATOR) private taskSelectionMediator: Observer<ITask>) {
    this.objectStateManager$ = new Subject<any>();

  }

  ngOnInit(): void {
    this.filteredOptions = this.assigneeFormControl.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => typeof value === 'string' ? value : (value as IUser).name),
        map(name => name ? this._filter(name) : this.options.slice())
      );



    this.taskState$ = this.objectStateManager$.pipe(startWith(this.task), tap(v => console.log('DEBUG 0:', v)), scan((value: ITask, changes: any) => this.taskUpdated(changes, value), this.task), shareReplay(1));

    console.log('mini component constructed', this.task);

  }

  public displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  public onViewTaskDetails(): void {
    this.taskState$.pipe(first()).subscribe(item => this.taskSelectionMediator.next(item))
  }

  public onAssigneeSelected(event: MatAutocompleteSelectedEvent) {
    this.taskState$.pipe(first()).subscribe(v => this.objectStateManager$.next({ assignee: [(event.option.value as IUser).email] }))
  }

  private taskUpdated(change: any, task: ITask): ITask {
    const updateTask: ITask = { ...task, ...change, lastModifyDate: new Date(), lastModifyUserEmail: this.userService.getCurrentUser().email }

    this.hashTagService.recalculateHashTags(updateTask)

    return updateTask;
  }


  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
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