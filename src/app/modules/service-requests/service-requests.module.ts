import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRequestsRoutingModule } from './service-requests-routing.module';
import { ServiceRequestsComponent } from './service-requests/service-requests.component';


@NgModule({
  declarations: [
    ServiceRequestsComponent
  ],
  imports: [
    CommonModule,
    ServiceRequestsRoutingModule
  ]
})
export class ServiceRequestsModule { }
