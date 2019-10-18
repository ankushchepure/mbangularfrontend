import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Employee } from '../models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    constructor(private http: HttpClient) { }
    
    getAll(managerid:number) {
        // const params = new URLSearchParams();
        //   params.set('managerid', 3);
        return this.http.get<any>(`${environment.apiUrl}/employee/getEmployeeList?managerid=${managerid}`);
    }

    deleteEmployee(empid: number,managerid:number) {
        return this.http.get<any>(`${environment.apiUrl}/employee/deleteEmployee?managerid=${managerid}&empid=${empid}`);
    }
    getEmployee(managerid: number,empid:number) {
   
        return this.http.get<any>(`${environment.apiUrl}/employee/getEmployeeDetails?managerid=${managerid}&empid=${empid}`);
    }

    register(user: Employee,managerid:number) {
        console.log(user)
        user.managerId=managerid;
        return this.http.post<any>(`${environment.apiUrl}/employee/add`, user);
    }
    update(user: Employee,managerid:number,empid:number) {
        user.managerId=managerid;
        user.empId=empid;
        return this.http.post<any>(`${environment.apiUrl}/employee/update`, user);
    }
    
}