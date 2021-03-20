import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthoService {
    public isLoggedIn: boolean = false;
}