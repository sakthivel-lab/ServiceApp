import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import {AuthGuard} from './core/authGuard/auth.guard'

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/login/login.module')
        .then(m => m.LoginModule)
  },  
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module')
            .then(m => m.DashboardModule)
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./modules/customers/customers.module')
            .then(m => m.CustomersModule)
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./modules/inventory/inventory.module')
            .then(m => m.InventoryModule)
      },
      {
        path: 'service-requests',
        loadChildren: () =>
          import('./modules/service-requests/service-requests.module')
            .then(m => m.ServiceRequestsModule)
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./modules/reports/reports.module')
            .then(m => m.ReportsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./modules/notifications/notifications.module')
            .then(m => m.NotificationsModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  
  { path: '**', redirectTo: 'dashboard' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]   // 👈 REQUIRED
})
export class AppRoutingModule {}   // 👈 REQUIRED