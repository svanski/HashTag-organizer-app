import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { IUser } from "./models";
import { SessionFacade } from "./session.facade";

@Injectable({ providedIn: 'root' })
export class UsersRepository {

    private readonly repo: BehaviorSubject<IUser[]>;
    private readonly sessionFacade = SessionFacade<IUser[]>('PlannerAppUsers');

    constructor() {
        const data = this.sessionFacade.load() ?? [
            { id: 0, email: 'Mary@test', name: 'Mary', selected: false, permissions: [] },
            { id: 1, email: 'Shelley@test', name: 'Shelley', selected: false, permissions: [] },
            { id: 2, email: 'Igor@test', name: 'Igor', selected: false, permissions: [] }
        ];
        this.repo = new BehaviorSubject<IUser[]>(data);

        this.repo.subscribe(tasks => this.sessionFacade.save(tasks));
    }

    public getUsers(): Observable<IUser[]> { return this.repo; }

    public getUserById(userId: number): Observable<IUser> {
        return this.repo.pipe(map(users => users.find(u => u.id === userId)), switchMap(user => user ? of(user) : throwError(`There is no user with ID:${userId}`)));
    }

    public deleteUser(userId: Number) { this.repo.next(this.repo.value.filter(v => v.id !== userId)); }

    public addUser(user: IUser) {
        this.deleteUser(user.id);
        const newList = [user, ...this.repo.value].sort((a, b) => a.id.valueOf() - b.id.valueOf());
        this.repo.next(newList);
    }
}