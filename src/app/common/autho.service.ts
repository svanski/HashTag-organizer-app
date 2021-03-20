import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private isLoggedIn = false;

    public isUserLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    public logIn(userName: string, password: string): void {
        this.isLoggedIn = true;
    }
}