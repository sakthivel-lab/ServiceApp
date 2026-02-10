import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ManufacturerDetailsDialogComponent } from './manufacturer-details-dialog/manufacturer-details-dialog.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

@NgModule({
  declarations: [
    CustomersComponent,
    ManufacturerDetailsDialogComponent,
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    MaterialModule
  ]
})
export class CustomersModule { }
