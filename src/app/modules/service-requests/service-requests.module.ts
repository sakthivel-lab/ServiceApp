import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRequestsRoutingModule } from './service-requests-routing.module';
import { ServiceRequestsComponent } from './service-requests/service-requests.component';
import { MaterialModule } from '../../shared/material.module';
import { AddServiceRequestComponent } from './add-service-request/add-service-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ServiceRequestsComponent,
    AddServiceRequestComponent
  ],
  imports: [
    CommonModule,
    ServiceRequestsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ServiceRequestsModule { }
