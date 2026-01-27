import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManufacturerDetailsDialogComponent } from './manufacturer-details-dialog/manufacturer-details-dialog.component';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  bikeModel: string;
  status: 'active' | 'inactive' | 'pending';
  registrationDate: Date;
}

export interface ManufacturerDetails {
  manufacturer: string;
  count: number;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  // Table properties
  displayedColumns: string[] = ['name', 'email', 'phone', 'bikeModel', 'status', 'actions'];
  dataSource = new MatTableDataSource<Customer>();
  paginatedCustomers: Customer[] = [];

  // Search and filter
  searchTerm: string = '';
  selectedStatus: string = '';

  // Pagination
  pageSize: number = 10;
  currentPage: number = 0;

  // Sort
  @ViewChild(MatSort) sort!: MatSort;

  // Paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Mock data
  allCustomers: Customer[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', bikeModel: 'Hero Splendor', status: 'active', registrationDate: new Date('2024-01-15') },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', bikeModel: 'Honda Activa', status: 'active', registrationDate: new Date('2024-01-20') },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1234567892', bikeModel: 'TVS Apache', status: 'pending', registrationDate: new Date('2024-02-01') },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1234567893', bikeModel: 'Bajaj Pulsar', status: 'active', registrationDate: new Date('2024-02-10') },
    { id: 5, name: 'David Brown', email: 'david@example.com', phone: '+1234567894', bikeModel: 'Royal Enfield', status: 'inactive', registrationDate: new Date('2023-12-15') },
    { id: 6, name: 'Emma Davis', email: 'emma@example.com', phone: '+1234567895', bikeModel: 'Suzuki Access', status: 'active', registrationDate: new Date('2024-02-15') },
    { id: 7, name: 'Chris Lee', email: 'chris@example.com', phone: '+1234567896', bikeModel: 'Yamaha FZ', status: 'pending', registrationDate: new Date('2024-02-20') },
    { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', phone: '+1234567897', bikeModel: 'Hero Glamour', status: 'active', registrationDate: new Date('2024-01-25') },
    { id: 9, name: 'Tom Martinez', email: 'tom@example.com', phone: '+1234567898', bikeModel: 'Honda CB Shine', status: 'active', registrationDate: new Date('2024-02-05') },
    { id: 10, name: 'Amy Taylor', email: 'amy@example.com', phone: '+1234567899', bikeModel: 'Bajaj Avenger', status: 'inactive', registrationDate: new Date('2023-11-20') },
    { id: 11, name: 'Robert Garcia', email: 'robert@example.com', phone: '+1234567800', bikeModel: 'TVS Jupiter', status: 'active', registrationDate: new Date('2024-02-25') },
    { id: 12, name: 'Jennifer White', email: 'jennifer@example.com', phone: '+1234567801', bikeModel: 'Hero Passion', status: 'pending', registrationDate: new Date('2024-02-28') }
  ];

  filteredCustomers: Customer[] = [];

  // Statistics
  totalCustomers: number = 0;
  newCustomers: number = 0;
  activeRepairs: number = 0;
  pendingService: number = 0;

  // View Details Toggle - Individual card states
  showTotalDetails: boolean = false;
  showNewDetails: boolean = false;
  showActiveDetails: boolean = false;
  showPendingDetails: boolean = false;

  // Bike manufacturer statistics
  bikeManufacturers: { [key: string]: number } = {
    'Hero': 0,
    'Honda': 0,
    'TVS': 0,
    'Bajaj': 0,
    'Royal Enfield': 0,
    'Suzuki': 0,
    'Yamaha': 0,
    'Other': 0
  };

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.allCustomers;
    this.filteredCustomers = [...this.allCustomers];
    this.updateStatistics();
    this.updatePaginatedData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Search functionality
  onSearchChange(event: any): void {
    this.applyFilters();
  }

  // Filter functionality
  onFilterChange(event: any): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.allCustomers];

    // Apply search filter
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.phone.includes(searchLower) ||
        customer.bikeModel.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (this.selectedStatus) {
      filtered = filtered.filter(customer => customer.status === this.selectedStatus);
    }

    this.filteredCustomers = filtered;
    this.currentPage = 0; // Reset to first page
    this.updatePaginatedData();
  }

  // Pagination
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }

  private updatePaginatedData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCustomers = this.filteredCustomers.slice(startIndex, endIndex);
  }

  // Statistics
  private updateStatistics(): void {
    this.totalCustomers = this.allCustomers.length;

    // New customers (registered in current month)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    this.newCustomers = this.allCustomers.filter(customer => {
      const regDate = new Date(customer.registrationDate);
      return regDate.getMonth() === currentMonth && regDate.getFullYear() === currentYear;
    }).length;

    // Active repairs (active status)
    this.activeRepairs = this.allCustomers.filter(customer => customer.status === 'active').length;

    // Pending service
    this.pendingService = this.allCustomers.filter(customer => customer.status === 'pending').length;

    // Bike manufacturer statistics
    this.bikeManufacturers = {
      'Hero': 0,
      'Honda': 0,
      'TVS': 0,
      'Bajaj': 0,
      'Royal Enfield': 0,
      'Suzuki': 0,
      'Yamaha': 0,
      'Other': 0
    };

    // Count customers by bike manufacturer
    this.allCustomers.forEach(customer => {
      const manufacturer = this.getBikeManufacturer(customer.bikeModel);
      if (this.bikeManufacturers.hasOwnProperty(manufacturer)) {
        this.bikeManufacturers[manufacturer]++;
      } else {
        this.bikeManufacturers['Other']++;
      }
    });
  }

  // Helper method to extract bike manufacturer
  private getBikeManufacturer(bikeModel: string): string {
    const heroModels = ['Splendor', 'Passion', 'Glamour', 'HF Deluxe'];
    const hondaModels = ['Activa', 'CB Shine', 'CD Dream'];
    const tvsModels = ['Apache', 'Jupiter', 'Access'];
    const bajajModels = ['Pulsar', 'Avenger', 'Dominar'];
    const royalEnfieldModels = ['Classic', 'Thunderbird', 'Himalayan'];
    const suzukiModels = ['Access', 'Gixxer', 'Intruder'];
    const yamahaModels = ['FZ', 'R15', 'MT-15'];

    if (heroModels.some(model => bikeModel.includes(model))) return 'Hero';
    if (hondaModels.some(model => bikeModel.includes(model))) return 'Honda';
    if (tvsModels.some(model => bikeModel.includes(model))) return 'TVS';
    if (bajajModels.some(model => bikeModel.includes(model))) return 'Bajaj';
    if (royalEnfieldModels.some(model => bikeModel.includes(model))) return 'Royal Enfield';
    if (suzukiModels.some(model => bikeModel.includes(model))) return 'Suzuki';
    if (yamahaModels.some(model => bikeModel.includes(model))) return 'Yamaha';

    return 'Other';
  }

  // Helper method to get manufacturer keys
  getManufacturerKeys(): string[] {
    return Object.keys(this.bikeManufacturers);
  }

  // Open Details Dialog
  openDetailsDialog(cardType: string): void {
    const dialogRef = this.dialog.open(ManufacturerDetailsDialogComponent, {
      width: '600px',
      data: {
        cardType: cardType,
        manufacturers: this.getManufacturerData()
      }
    });
  }

  // Get Manufacturer Data
  getManufacturerData(): ManufacturerDetails[] {
    return Object.keys(this.bikeManufacturers).map(key => ({
      manufacturer: key,
      count: this.bikeManufacturers[key]
    }));
  }

  // Toggle View Details - Open Popup Dialog
  toggleTotalDetails(): void {
    this.openDetailsDialog('Total Customers');
  }

  toggleNewDetails(): void {
    this.openDetailsDialog('New Customers');
  }

  toggleActiveDetails(): void {
    this.openDetailsDialog('Active Repairs');
  }

  togglePendingDetails(): void {
    this.openDetailsDialog('Pending Service');
  }

  // CRUD operations
  openAddCustomerDialog(): void {
    // TODO: Implement add customer dialog
    this.snackBar.open('Add Customer dialog - To be implemented', 'Close', {
      duration: 3000
    });
  }

  viewCustomer(customer: Customer): void {
    // TODO: Implement view customer details
    console.log('View customer:', customer);
    this.snackBar.open(`Viewing ${customer.name}`, 'Close', {
      duration: 2000
    });
  }

  editCustomer(customer: Customer): void {
    // TODO: Implement edit customer dialog
    console.log('Edit customer:', customer);
    this.snackBar.open(`Editing ${customer.name}`, 'Close', {
      duration: 2000
    });
  }

  deleteCustomer(customer: Customer): void {
    // TODO: Implement delete confirmation dialog
    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
      const index = this.allCustomers.findIndex(c => c.id === customer.id);
      if (index > -1) {
        this.allCustomers.splice(index, 1);
        this.applyFilters();
        this.updateStatistics();
        this.snackBar.open(`${customer.name} deleted successfully`, 'Close', {
          duration: 3000
        });
      }
    }
  }
}
