import { Component, OnInit } from '@angular/core';
export interface InventoryItem {
  name: string;
  qty: number;
}
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

   displayedColumns: string[] = ['name', 'qty'];

  dataSource: InventoryItem[] = [
    { name: 'Brake Pads', qty: 12 },
    { name: 'Battery Pack', qty: 3 },
    { name: 'Controller', qty: 5 }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
