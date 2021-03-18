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



    this.taskState$ = this.objectStateManager$.pipe(tap(v => console.log('DEBUG 0:', v)), scan((value: ITask, changes: any) => this.taskUpdated(changes, value), this.task), shareReplay(1));

    console.log('mini component constructed', this.task);

  }

  public displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  public onAssigneeSelected(event: MatAutocompleteSelectedEvent) {
    this.taskState$.pipe(first()).subscribe(v => this.objectStateManager$.next({ assignee: [(event.option.value as IUser).email] }))
  }

  private taskUpdated(change: any, task: ITask): ITask {
    const clone: ITask = { ...task, ...change, lastModifyDate: new Date(), lastModifyUserEmail: this.userService.getCurrentUser().email }

    for (let key of Object.keys(change)) {
      clone.hashTags = this.handleProperty(clone, key as any);
    }

    clone.hashTags = clone.hashTags.sort((a, b) => a > b ? 1 : -1);

    return clone;
  }

  private handleProperty(obj: ITask, key: keyof ITask): string[] {

    if (['hashTags', 'comments', 'description', 'title'].includes(key)) {
      return obj.hashTags;
    }

    if (key === 'assignee') {
      const assigneePrefix = '#assignee';
      const newAssigneeHashs = obj.assignee.map((name: string) => `${assigneePrefix}-${name}`);
      const res = newAssigneeHashs.concat(obj.hashTags.filter((val: string) => !val.startsWith(assigneePrefix)));

      return res;
    }

    const prefix = `#${key}`;
    const res = obj.hashTags.filter((val: string) => !val.startsWith(prefix));

    const propValueMissing = (obj[key] !== typeof Boolean && !obj[key])
      || (obj[key] && obj[key] === typeof [] && (obj[key] as []).length === 0);

    if (propValueMissing) {
      return res;
    }

    let newHashTag = `${prefix}-${obj[key]}`;
    if (obj[key] === typeof Date) {
      const date: Date = obj[key] as Date;
      newHashTag = `${prefix}-${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    }
    res.push(newHashTag);
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