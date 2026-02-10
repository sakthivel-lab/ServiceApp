import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [
    InventoryComponent,
    AddInventoryComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InventoryModule { }

