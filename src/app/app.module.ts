import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
// import { ModalComponent } from './_guards/model.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmDialogComponent } from './services/confirm-dialog.component';
import { ConfirmDialogService } from './services';
import { ToastrModule } from 'ngx-toastr';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ConfirmDialogComponent,
    // ModalComponent,
    HomeComponent,
    UpdateEmployeeComponent  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-right'
      }
    )
  ],
  providers: [ConfirmDialogService],
  entryComponents: [ ConfirmDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
