import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ITask, IUser } from '../models';


@Component({
  selector: 'app-mini-tile',
  templateUrl: './mini-tile.component.html',
  styleUrls: ['./mini-tile.component.css']
})
export class MiniTileComponent implements OnInit {

  @Input('task') public task: ITask | undefined;

  public taskDescription: string = ''
  public startDate: any;
  public endDate: any;

  public assigneeFormControl: FormControl = new FormControl();
  public options: IUser[] = [
    { id: 0, email: '', name: 'Mary', selected: false },
    { id: 1, email: '', name: 'Shelley', selected: false },
    { id: 2, email: '', name: 'Igor', selected: false }
  ];

  public filteredOptions: Observable<IUser[]> = EMPTY;




  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.assigneeFormControl.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => typeof value === 'string' ? value : (value as IUser).name),
        map(name => name ? this._filter(name) : this.options.slice())
      );

    console.log('TASK+', this.task);

  }


  public push() {
    console.log('startDate=', this.startDate, 'end Date=', this.endDate);

  }

  startWith(arg0: string): any {
    throw new Error('Function not implemented.');
  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }


}