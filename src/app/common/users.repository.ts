import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IUser } from "./models";

@Injectable({ providedIn: 'root' })
export class UsersRepository {


    public getUsers(): Observable<IUser[]> {
        return of([
            { id: 0, email: 'Mary@cerb', name: 'Mary', selected: false, permissions: [] },
            { id: 1, email: 'Shelley@cerb', name: 'Shelley', selected: false, permissions: [] },
            { id: 2, email: 'Igor@cerb', name: 'Igor', selected: false, permissions: [] }
        ])
    }


}