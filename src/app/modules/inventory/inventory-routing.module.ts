import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

const routes: Routes = [{ path: '', component: InventoryComponent },
    { path: 'addInventory', component: AddInventoryComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
