import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceRequestsComponent } from './service-requests/service-requests.component';
import { AddServiceRequestComponent } from './add-service-request/add-service-request.component';
import { JobCardComponent } from './job-card/job-card.component';
const routes: Routes = [{ path: '', component: ServiceRequestsComponent },
{ path: 'addServiceRequest', component: AddServiceRequestComponent },
{ path: 'createJobCard', component: JobCardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRequestsRoutingModule { }
