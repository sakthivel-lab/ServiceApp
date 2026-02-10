import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
export interface InventoryItem {
  sku: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  unitPrice: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  displayedColumns: string[] = ['sku', 'name', 'category', 'location', 'quantity', 'unitPrice', 'status', 'actions'];
  dataSource = new MatTableDataSource<InventoryItem>();

  // Make Math available in template
  Math = Math;

  // Stats
  totalInventoryValue = 124500;
  inventoryGrowth = 12;
  lowStockCount = 12;
  outOfStockCount = 3;
  mostUsedPart = 'Brake Pads (Hydraulic)';

  // Pagination
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  totalItems = 458;
  currentPage = 0;

  // Filter
  showLowStockOnly = false;
  selectedCategory = 'all';
  selectedStatus = 'all';
  searchQuery = '';

  inventoryItems: InventoryItem[] = [
    { sku: 'BAT-SAM', name: 'Samsung 48V Battery Pack', category: 'Electronics', location: 'Bin A-14', quantity: 4, unitPrice: 350, status: 'low-stock' },
    { sku: 'TR-275-MTB', name: '27.5" MTB Tire (All-Terrain)', category: 'Wheels', location: 'Bin C-02', quantity: 42, unitPrice: 45, status: 'in-stock' },
    { sku: 'BRK-HYD-PAD', name: 'Hydraulic Brake Pads (Set)', category: 'Brakes', location: 'Bin B-05', quantity: 0, unitPrice: 22.50, status: 'out-of-stock' },
    { sku: 'MTR-HUB-750', name: '750W Rear Hub Motor', category: 'Electronics', location: 'Bin A-02', quantity: 8, unitPrice: 185, status: 'in-stock' },
    { sku: 'DIS-LCD-05', name: 'C5 Color LCD Display', category: 'Electronics', location: 'Bin A-09', quantity: 15, unitPrice: 85, status: 'in-stock' },
    { sku: 'CHR-48V-20', name: '48V 20A Charger', category: 'Electronics', location: 'Bin A-15', quantity: 6, unitPrice: 120, status: 'low-stock' },
    { sku: 'SPK-LED-001', name: 'LED Spoke Lights (Pair)', category: 'Accessories', location: 'Bin D-03', quantity: 28, unitPrice: 32, status: 'in-stock' },
    { sku: 'BEL-ELEC-01', name: 'Electronic Bell', category: 'Accessories', location: 'Bin D-04', quantity: 0, unitPrice: 15, status: 'out-of-stock' },
    { sku: 'CAB-USB-002', name: 'USB-C Charging Cable', category: 'Cables', location: 'Bin E-01', quantity: 35, unitPrice: 8, status: 'in-stock' },
    { sku: 'FEN-ALU-001', name: 'Aluminum Fender Set', category: 'Accessories', location: 'Bin D-07', quantity: 2, unitPrice: 55, status: 'low-stock' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadInventoryData();
  }

  loadInventoryData(): void {
    let filtered = this.inventoryItems;

    if (this.showLowStockOnly) {
      filtered = filtered.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock');
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.sku.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query)
      );
    }

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === this.selectedCategory);
    }

    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === this.selectedStatus);
    }

    this.dataSource.data = filtered;
  }

  onSearchChange(value: string): void {
    this.searchQuery = value;
    this.currentPage = 0;
    this.loadInventoryData();
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 0;
    this.loadInventoryData();
  }

  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.currentPage = 0;
    this.loadInventoryData();
  }

  onLowStockToggle(value: boolean): void {
    this.showLowStockOnly = value;
    this.currentPage = 0;
    this.loadInventoryData();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  addNewPart(): void {
    console.log('Add new part clicked');
    this.router.navigate(['/inventory/addInventory']);
  }

  openFilters(): void {
    console.log('Open filters');
  }

  exportData(): void {
    console.log('Export inventory data');
  }

  editPart(item: InventoryItem): void {
    console.log('Edit part:', item);
  }

  deletePart(item: InventoryItem): void {
    console.log('Delete part:', item);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'in-stock':
        return 'in-stock';
      case 'low-stock':
        return 'low-stock';
      case 'out-of-stock':
        return 'out-of-stock';
      default:
        return '';
    }
  }

  getPaginatedData(): InventoryItem[] {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.dataSource.data.slice(start, end);
  }
}
