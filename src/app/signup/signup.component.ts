
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AlertService, ManagerService, AuthenticationService } from '../services';

@Component({selector: 'app-signup',
templateUrl: './signup.component.html',
styleUrls: ['./signup.component.css']})
export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private managerService: ManagerService,
        private alertService: AlertService,
        private toastr: ToastrService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email:['',Validators.required],
            address:['',Validators.required],
            company:['',Validators.required],
            dateOfBirth:['',Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.managerService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    if(data.status==true){
                        this.toastr.success('SignUp successful!');
                        this.router.navigate(['/login']);
                    } else {
                        this.toastr.error(data.errorMessage);
                        this.loading = false;
                    }                    
                },
                error => {
                    this.toastr.error(error.message);
                    this.loading = false;
                });

    }
    
}
