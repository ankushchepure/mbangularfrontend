import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Manager } from '../models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services';
import { ConfirmDialogService } from '../services';
import { EmployeeService } from '../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  EmployeeData:any;
  currentUserSubject: any;
  currentUser: Manager;
  managerid:any;
  registerForm: FormGroup;
    loading = false;
    submitted = false;
    @ViewChild('divClick') myDiv: ElementRef<HTMLElement>;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private employeeService:EmployeeService,
        private toastr: ToastrService,
        private confirmDialogService:ConfirmDialogService,
        private modalService: NgbModal,
        private formBuilder: FormBuilder
        // private modalService: ModalService
    ) {
      this.currentUserSubject = JSON.parse(localStorage.getItem('currentUser'));
      this.managerid=this.currentUserSubject.data.data.id;
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    ngOnInit() {
     this.getAllEmployeeList();
     this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNo:['',Validators.required],
      address:['',Validators.required],
      dateOfBirth:['',Validators.required]
          });
    }
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        
      }, (reason) => {
      });
    }
    get f() { return this.registerForm.controls; }
    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
      console.log(this.registerForm.value);
      this.employeeService.register(this.registerForm.value,this.managerid)
          .pipe(first())
          .subscribe(
              data => {
                  if(data.status==true){
                      this.toastr.success(data.errorMessage);
                      this.getAllEmployeeList();
                      this.loading = false;
                      let el: HTMLElement = this.myDiv.nativeElement;
                      
                      el.click();
                    
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

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
    getAllEmployeeList(){
      this.employeeService.getAll(this.managerid).pipe(first())
      .subscribe(
          data => {
              if(data.status==true){
                this.EmployeeData=data.data.data;
              } else {
                  this.toastr.error(data.errorMessage);
                  
              } 
          },
          error => {
              this.toastr.error(error);
             
          });
    }
    public openConfirmationDialog(empId) {
      this.confirmDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => this.delete(empId))
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
    
    delete(empId){
      console.log(empId);
      this.employeeService.deleteEmployee(empId,this.managerid).pipe(first())
      .subscribe(
          data => {
              if(data.status==true){
                this.toastr.success(data.errorMessage);
                
                this.getAllEmployeeList();
              } else {
                  this.toastr.error(data.errorMessage);
                  
              } 
          },
          error => {
              this.toastr.error(error);
             
          });
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

}
