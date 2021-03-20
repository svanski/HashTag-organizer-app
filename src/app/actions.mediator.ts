import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';
import { ITask } from './models';

export const CREATE_NEW_TASK_MEDIATOR = new InjectionToken<Subject<undefined>>('CREATE_NEW_TASK_MEDIATOR');
export const VIEW_TASK_DETAILS_MEDIATOR = new InjectionToken<Subject<ITask | undefined>>('VIEW_TASK_DETAILS_MEDIATOR');

