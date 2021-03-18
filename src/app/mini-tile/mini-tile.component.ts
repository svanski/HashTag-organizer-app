import { Component, Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { EMPTY, Observable, Subject } from 'rxjs';
import { first, map, scan, shareReplay, startWith, tap } from 'rxjs/operators';
import { ITask, IUser } from '../models';


@Component({
  selector: 'app-mini-tile',
  templateUrl: './mini-tile.component.html',
  styleUrls: ['./mini-tile.component.css']
})
export class MiniTileComponent implements OnInit {

  @Input('task') public task!: ITask;

  public startDate!: Date;
  public dueDate!: Date;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  public assigneeFormControl: FormControl = new FormControl();
  public options: IUser[] = [
    { id: 0, email: '', name: 'Mary', selected: false },
    { id: 1, email: '', name: 'Shelley', selected: false },
    { id: 2, email: '', name: 'Igor', selected: false }
  ];

  public filteredOptions: Observable<IUser[]> = EMPTY;
  public taskState$: Observable<ITask> = EMPTY;


  public objectStateManager$!: Subject<any>;
  private userService = {
    getCurrentUser(): IUser { return ({ id: 0, email: '', name: 'Mary', selected: false }) }
  }


  constructor() {
    this.objectStateManager$ = new Subject<any>();
  }

  ngOnInit(): void {
    this.filteredOptions = this.assigneeFormControl.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => typeof value === 'string' ? value : (value as IUser).name),
        map(name => name ? this._filter(name) : this.options.slice())
      );



    this.taskState$ = this.objectStateManager$.pipe(tap(v => console.log('State:', v)), scan((changes: any, value: ITask) => this.taskUpdated(changes, value), this.task), shareReplay(1));
  }

  public displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  public onAssigneeSelected(event: MatAutocompleteSelectedEvent) {
    this.taskState$.pipe(first()).subscribe(v => this.objectStateManager$.next({ assignee: [(event.option.value as IUser).email] }))
  }

  private taskUpdated(change: any, task: ITask): ITask {

    const freshObject = { ...task, ...change, lastModifyDate: new Date(), lastModifyUserEmail: this.userService.getCurrentUser().email }
    for (let key of Object.keys(change)) {

      if (key in ['hashTags', 'comments', 'description', 'title']) {
        continue;
      }


      if (key === 'assignee') {
        const assigneePrefix = '#assignee';
        const newAssigneeHashs = freshObject.assignee.map((name: string) => `${assigneePrefix}-${name}`);
        freshObject.hashTags = newAssigneeHashs.concat(freshObject.hashTags.filter((val: string) => !val.startsWith(assigneePrefix)));
      } else {

        const prefix = `#${key}`;

        freshObject.hashTags = freshObject.hashTags.filter((val: string) => !val.startsWith(prefix));
        const missingVlaue = freshObject[key] === null || freshObject[key] === undefined;
        if (!missingVlaue) {
          freshObject.hashTags.push(`${prefix}-${freshObject[key]}`);
        }

      }
    }

    const res: ITask = freshObject;
    res.hashTags = res.hashTags.sort((a, b) => a > b ? 1 : -1)
    return res;

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

      chipInput.value = ''
    });

  }

  public remove(hashTag: string): void {
    this.taskState$.pipe(first()).subscribe(item => item.hashTags = item.hashTags.filter(v => v !== hashTag));
  }

}