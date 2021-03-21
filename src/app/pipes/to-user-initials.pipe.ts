import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../common/models';

@Pipe({ name: 'toUserInitials' })
export class ToUserInitialsPipe implements PipeTransform {
  transform(user: IUser | null): string {
    return user && user.email && user.email ? user.email[0].toUpperCase() : 'N/A';
  }
}
