import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';
import { ITask } from './models';

export const VIEW_TASK_DETAILS_MEDIATOR = new InjectionToken<Subject<ITask | undefined>>('VIEW_TASK_DETAILS_MEDIATOR');

