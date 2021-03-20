import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../common/models';

@Pipe({ name: 'taskBusy' })
export class TaskBusyPipe implements PipeTransform {

  public transform(task: ITask | undefined | null): boolean | undefined | null {
    return task && task.busy;
  }

}
