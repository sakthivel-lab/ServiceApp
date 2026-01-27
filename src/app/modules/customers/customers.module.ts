import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ManufacturerDetailsDialogComponent } from './customers/manufacturer-details-dialog/manufacturer-details-dialog.component';

@NgModule({
  declarations: [
    CustomersComponent,
    ManufacturerDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomersRoutingModule,
    MaterialModule
  ]
})
export class CustomersModule { }
