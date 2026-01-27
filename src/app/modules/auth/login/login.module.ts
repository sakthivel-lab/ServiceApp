import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,        // ✅ needed for inputs
    MaterialModule      // ✅ fixes mat-card, mat-form-field
  ]
})
export class LoginModule {}
