import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../common/models';

@Pipe({
  name: 'adminPermissionsCheckPipe'
})
export class AdminPermissionsCheckPipe implements PipeTransform {

  transform(user: IUser): boolean {
    return user && user.permissions && user.permissions.length > 0 && user.permissions.includes('admin')
  }

}
