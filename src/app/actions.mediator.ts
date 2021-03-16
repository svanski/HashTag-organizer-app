import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export const CREATE_NEW_TASK_MEDIATOR = new InjectionToken<Subject<undefined>>('CREATE_NEW_TASK_MEDIATOR');