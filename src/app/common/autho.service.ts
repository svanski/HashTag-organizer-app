import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { IUser } from "./models";
import { SessionFacade } from "./session.facade";
import { UsersRepository } from "./users.repository";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly loggedInUser: BehaviorSubject<IUser | undefined>
    private readonly sessionFacade = SessionFacade<IUser>('PlannerAppLoggedInUser');

    // [x: string]: any;

    constructor(private userRepo: UsersRepository) {
        const user = this.sessionFacade.load();
        this.loggedInUser = new BehaviorSubject<IUser | undefined>(user);
    }

    public isUserLoggedIn(): Observable<boolean> { return this.getLoggedInUser().pipe(map(u => !!u)) }

    public getLoggedInUser(): Observable<IUser> {
        return this.loggedInUser.pipe(
            switchMap(user => this.userRepo.getUserById(user && user ? user.id.valueOf() : -1)),
            map(v => v ? v as IUser : new Error("No user logged in")),
            map(v => v as IUser) // TODO need better to handle this
        );
    }

    public logIn(userName: string, password: string): void {
        this.loggedInUser.next({ name: userName, email: userName, id: this.hashCode(userName), selected: false, permissions: ['admin'] });
        this.sessionFacade.save(this.loggedInUser.value as IUser)
    }

    private hashCode(s: string): Number {
        return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    }
}