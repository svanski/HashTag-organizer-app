import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { IUser } from "./models";
import { SessionFacade } from "./session.facade";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly loggedInUser: BehaviorSubject<IUser | undefined>
    private readonly sessionFacade = SessionFacade<IUser>('PlannerAppAuthService');

    // [x: string]: any;

    constructor() {
        const user = this.sessionFacade.load();
        this.loggedInUser = new BehaviorSubject<IUser | undefined>(user);
    }

    public isUserLoggedIn(): Observable<boolean> { return this.loggedInUser.pipe(map(v => !!v)); }

    public getLoggedInUser(): Observable<IUser> { return this.loggedInUser.pipe(filter(v => !!v), map(v => v as IUser)) }


    public logIn(userName: string, password: string): void {
        this.loggedInUser.next({ name: userName, email: userName, id: this.hashCode(userName), selected: false });
        this.sessionFacade.save(this.loggedInUser.value as IUser)
    }

    private hashCode(s: string): Number {
        return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    }
}