import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Employee } from '../models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    currentUserSubject: any;
    constructor(private http: HttpClient) {
        this.currentUserSubject = JSON.parse(localStorage.getItem('currentUser'));
     }
    

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'Token ' +
        this.currentUserSubject.data.data.token); 
      }
    getAll(managerid:number) {
        const url = `${environment.apiUrl}/employee/getEmployeeList`;
         let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':'Token '+this.currentUserSubject.data.data.token
         });
          let params = new HttpParams().set("managerid", managerid.toString());  
          return this.http.get<any>(url,{
            headers:headers,
            params: params
          });
    }

    deleteEmployee(empid: number,managerid:number) {
        const url = `${environment.apiUrl}/employee/deleteEmployee`;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':'Token '+this.currentUserSubject.data.data.token
         });
         let params = new HttpParams().set("managerid", managerid.toString()); 
         params = params.append('empid', empid.toString());
       return this.http.get<any>(url,{
           headers:headers,
           params: params
         });
         }
    getEmployee(managerid: number,empid:number) {
        const url = `${environment.apiUrl}/employee/getEmployeeDetails`;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':'Token '+this.currentUserSubject.data.data.token
         });
         let params = new HttpParams().set("managerid", managerid.toString()); 
         params = params.append('empid', empid.toString());
       return this.http.get<any>(url,{
           headers:headers,
           params: params
         });
   
        //return this.http.get<any>(`${environment.apiUrl}/employee/getEmployeeDetails?managerid=${managerid}&empid=${empid}`);
    }

    register(user: Employee,managerid:number) {
        console.log(user)
        user.managerid=Number(managerid);
        const url = `${environment.apiUrl}/employee/add`;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':'Token '+this.currentUserSubject.data.data.token
         });
        return this.http.post<any>(url, user,{
            headers: headers
          });
    }
    update(user: Employee,managerid:number,empid:number) {
        user.managerid=Number(managerid);
        user.empId=empid;
        const url = `${environment.apiUrl}/employee/update`;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':'Token '+this.currentUserSubject.data.data.token
         });
        return this.http.post<any>(url, user,{
            headers: headers
          });
    }
    
}