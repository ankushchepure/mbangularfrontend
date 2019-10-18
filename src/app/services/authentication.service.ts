import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Manager } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<Manager>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Manager {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        // if(username=="Admin" && password=="123"){
        //     console.log(username)
        //     var user={
        //         id:1,
        //         password:'123',
        //         firstName:"absf",
        //         lastName:"add",
        //         username:"Admin",
        //         token:"ssadasda"
        //     }
        //     localStorage.setItem('currentUser', JSON.stringify(user))
        //     this.currentUserSubject.next(user);
        //     return user;
        // }
        return this.http.post<any>(`${environment.apiUrl}/manager/login`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user.status==true) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }
    

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}