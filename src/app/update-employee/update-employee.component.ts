import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { AuthenticationService, EmployeeService } from '../services';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
   managerid:any;
   empid:any;
   firstName:any;
   lastName:any;
   address:any;
   mobileNo:any;
   dateOfBirth:any;
   registerForm: FormGroup;
    loading = false;
    submitted = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
        private employeeService:EmployeeService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.managerid=this.route.snapshot.params['managerid'];
    this.empid=this.route.snapshot.params['empid'];
    this.getEmpDetails(this.managerid,this.empid);
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNo:['',Validators.required],
      address:['',Validators.required],
      dateOfBirth:['',Validators.required]
          });
   
  }
  getEmpDetails(managerid,empid){
    this.employeeService.getEmployee(managerid,empid).pipe(first())
    .subscribe(
        data => {
            if(data.status==true){
               this.firstName=data.data.data.firstName;  
               this.lastName=data.data.data.lastName;  
               this.address=data.data.data.address;  
               this.dateOfBirth=data.data.data.dateOfBirth;  
               this.mobileNo=data.data.data.mobileNo;                      
            } else {
                this.toastr.error(data.errorMessage);
            }                    
        },
        error => {
            this.toastr.error(error.message);
        });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.employeeService.update(this.registerForm.value,this.managerid,this.empid)
        .pipe(first())
        .subscribe(
            data => {
                if(data.status==true){
                  this.router.navigate(['/login']);
                  console.log(data);
                    this.toastr.success(data.errorMessage);
                    this.loading = false;
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
