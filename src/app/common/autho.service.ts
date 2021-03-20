import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { filter, map } from "rxjs/operators";
import { ITask, IUser } from "./models";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private loggedInUser: BehaviorSubject<IUser | undefined> = new BehaviorSubject<IUser | undefined>(undefined);

    public isUserLoggedIn(): Observable<boolean> { return this.loggedInUser.pipe(map(v => !!v)); }

    public getLoggedInUser(): Observable<IUser> { return this.loggedInUser.pipe(filter(v => !!v), map(v => v as IUser)) }


    public logIn(userName: string, password: string): void {
        this.loggedInUser.next({ name: userName, email: userName, id: this.hashCode(userName), selected: false })
    }

    private hashCode(s: string): Number {
        return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    }



}