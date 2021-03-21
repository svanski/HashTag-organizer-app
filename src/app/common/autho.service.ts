import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, first, map, switchMap } from "rxjs/operators";
import { IUser } from "./models";
import { SessionFacade } from "./session.facade";
import { UsersRepository } from "./users.repository";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly loggedInUser: BehaviorSubject<IUser>
    private readonly sessionFacade = SessionFacade<IUser>('PlannerAppLoggedInUser');

    // [x: string]: any;

    constructor(private userRepo: UsersRepository) {
        const user = this.sessionFacade.load();
        this.loggedInUser = new BehaviorSubject<IUser>(user as IUser);

        this.loggedInUser.subscribe(user => this.sessionFacade.save(user))
    }

    public isUserLoggedIn(): Observable<boolean> { return this.getLoggedInUser().pipe(map(u => !!u), catchError(err => { console.error('Is user logged in error:', err); return of(false) })) }

    public getLoggedInUser(): Observable<IUser> {
        return this.loggedInUser.pipe(switchMap(user => this.userRepo.getUserById(user && user ? user.id.valueOf() : -1)));
    }

    public logIn(userName: string, password: string): void {
        this.userRepo.getUser(u => u.name === userName).pipe(first()).subscribe(user => this.loggedInUser.next(user), err => console.error('LogIn failed:', err))
    }

    private hashCode(s: string): Number {
        return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    }
}