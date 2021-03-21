import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../common/models';
import { UsersRepository } from '../common/users.repository';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {

  public users$: Observable<IUser[]>;

  constructor(private usersRepo: UsersRepository) {
    this.users$ = usersRepo.getUsers();
  }

  public onDelete(user: IUser) {
    this.usersRepo.deleteUser(user.id);
  }

  public onUserAdd(nameInput: string, emailInput: string, permissionsInput: string) {
    this.usersRepo.addUser({ id: Date.now(), email: emailInput, name: nameInput, selected: false, permissions: permissionsInput ? [] : permissionsInput.split(',') })
  }
}
