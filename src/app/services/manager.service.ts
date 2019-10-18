import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Manager } from '../models';

@Injectable({ providedIn: 'root' })
export class ManagerService {
    constructor(private http: HttpClient) { }

    // getAll() {
    //     return this.http.get<Manager[]>(`${environment.apiUrl}/users`);
    // }

    // getById(id: number) {
    //     return this.http.get(`${environment.apiUrl}/users/${id}`);
    // }

    register(user: Manager) {
        return this.http.post<any>(`${environment.apiUrl}/manager/signup`, user);
    }
}