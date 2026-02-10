import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  type: string;
  vin: string;
  motorSerialNo: string,
  batterySerialNo: string,
  chargerSerialNo: string,
  controllerSerialNo: string
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  vehicles: Vehicle[];
}

@Component({
  selector: 'app-add-service-request',
  templateUrl: './add-service-request.component.html',
  styleUrls: ['./add-service-request.component.scss']
})
export class AddServiceRequestComponent implements OnInit {
  serviceForm!: FormGroup;
  isLoading = false;
  imagePreview: string | null = null;

  // Search Properties
  searchQuery: string = '';
  isSearching: boolean = false;
  searchPerformed: boolean = false;
  customerFound: boolean = false;
  foundCustomer: Customer | null = null;
  selectedVehicle: Vehicle | null = null;



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }



  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.serviceForm = this.fb.group({

    });


  }


  onCancel(): void {
    if (this.serviceForm.dirty) {
      if (confirm('Are you sure you want to cancel? Unsaved changes will be lost.')) {
        this.router.navigate(['/service-requests']);
      }
    } else {
      this.router.navigate(['/service-requests']);
    }
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      this.isLoading = true;
      console.log('service Data:', this.serviceForm.value);

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.open('service item added successfully!', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/service']);
      }, 1500);
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000
      });
    }
  }

  // Search Methods
  searchCustomer(): void {
    if (!this.searchQuery?.trim()) {
      return;
    }

    this.isSearching = true;
    this.searchPerformed = false;

    // Simulate API call to search customer
    setTimeout(() => {
      this.performCustomerSearch(this.searchQuery.trim());
      this.isSearching = false;
      this.searchPerformed = true;
    }, 1500);
  }

  private performCustomerSearch(query: string): void {
    // Mock customer data for demonstration
    const mockCustomers: Customer[] = [
      {
        id: 'CUST001',
        name: 'John Doe',
        phone: '+1 234-567-8900',
        email: 'john.doe@email.com',
        address: '123 Main St, New York, NY 10001',
        vehicles: [
          {
            id: 'VEH001',
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            licensePlate: 'ABC-1234',
            vin: '1HGBH41JXMN109186',
            color: 'Silver',
            type: 'Sedan',
            motorSerialNo: 'MOT123456',
            batterySerialNo: 'BAT123456',
            chargerSerialNo: 'CHR123456',
            controllerSerialNo: 'CON123456'
          },
          {
            id: 'VEH002',
            make: 'Honda',
            model: 'CR-V',
            year: 2021,
            licensePlate: 'XYZ-5678',
            vin: '2HGBH41JXMN109187',
            color: 'Blue',
            type: 'SUV',
            motorSerialNo: 'MOT789012',
            batterySerialNo: 'BAT789012',
            chargerSerialNo: 'CHR789012',
            controllerSerialNo: 'CON789012'
          }
        ]
      },
      {
        id: 'CUST002',
        name: 'Jane Smith',
        phone: '+1 234-567-8901',
        email: 'jane.smith@email.com',
        address: '456 Oak Ave, Los Angeles, CA 90001',
        vehicles: [
          {
            id: 'VEH003',
            make: 'Tesla',
            model: 'Model 3',
            year: 2022,
            licensePlate: 'ELEC-9012',
            vin: '3HGBH41JXMN109188',
            color: 'Red',
            type: 'Electric',
            motorSerialNo: 'MOT345678',
            batterySerialNo: 'BAT345678',
            chargerSerialNo: 'CHR345678',
            controllerSerialNo: 'CON345678'
          }
        ]
      },
      {
        id: 'CUST003',
        name: 'Bob Johnson',
        phone: '+1 234-567-8902',
        email: 'bob.johnson@email.com',
        address: '789 Pine Rd, Chicago, IL 60007',
        vehicles: [
          {
            id: 'VEH004',
            make: 'Ford',
            model: 'F-150',
            year: 2019,
            licensePlate: 'TRUCK-3456',
            vin: '4HGBH41JXMN109189',
            color: 'Black',
            type: 'Truck',
            motorSerialNo: 'MOT456789',
            batterySerialNo: 'BAT456789',
            chargerSerialNo: 'CHR456789',
            controllerSerialNo: 'CON456789'
          },
          {
            id: 'VEH005',
            make: 'Chevrolet',
            model: 'Malibu',
            year: 2020,
            licensePlate: 'CAR-7890',
            vin: '5HGBH41JXMN109190',
            color: 'White',
            type: 'Sedan',
            motorSerialNo: 'MOT567890',
            batterySerialNo: 'BAT567890',
            chargerSerialNo: 'CHR567890',
            controllerSerialNo: 'CON567890'
          },
          {
            id: 'VEH006',
            make: 'Harley-Davidson',
            model: 'Street Glide',
            year: 2021,
            licensePlate: 'BIKE-1122',
            vin: '6HGBH41JXMN109191',
            color: 'Orange',
            type: 'Motorcycle',
            motorSerialNo: 'MOT678901',
            batterySerialNo: 'BAT678901',
            chargerSerialNo: 'CHR678901',
            controllerSerialNo: 'CON678901'
          }
        ]
      }
    ];

    // Search by ID, phone, or email (case-insensitive)
    const foundCustomer = mockCustomers.find(customer =>
      customer.id.toLowerCase() === query.toLowerCase() ||
      customer.phone.includes(query) ||
      customer.email.toLowerCase() === query.toLowerCase()
    );

    if (foundCustomer) {
      this.customerFound = true;
      this.foundCustomer = foundCustomer;
      this.snackBar.open('Customer found successfully!', 'Close', {
        duration: 3000
      });
    } else {
      this.customerFound = false;
      this.foundCustomer = null;
      this.snackBar.open('No customer found with the provided details', 'Close', {
        duration: 3000
      });
    }
  }

  addNewCustomer(): void {
    // Navigate to add customer page or open a dialog
    this.snackBar.open('Opening customer registration form...', 'Close', {
      duration: 2000
    });

    // For now, just reset the search and show a message
    // In a real implementation, you would navigate to customer creation
    setTimeout(() => {
      this.resetSearch();
      // this.router.navigate(['/customers/add']); // Uncomment when customer add route exists
    }, 1000);
  }

  resetSearch(): void {
    this.searchQuery = '';
    this.searchPerformed = false;
    this.customerFound = false;
    this.foundCustomer = null;
    this.selectedVehicle = null;
  }

  // Method to populate form with customer and vehicle details
  populateServiceForm(): void {
    if (this.foundCustomer && this.selectedVehicle) {
      this.serviceForm.patchValue({
        // You can add customer details here if needed
        // For now, we'll focus on vehicle-related fields

        // Auto-populate some vehicle-related fields
        partName: `${this.selectedVehicle.make} ${this.selectedVehicle.model} Service`,
        category: this.selectedVehicle.type,
        description: `Service for ${this.selectedVehicle.year} ${this.selectedVehicle.make} ${this.selectedVehicle.model}`,
        location: `${this.selectedVehicle.licensePlate} - ${this.foundCustomer.name}`
      });

      this.snackBar.open('Customer and vehicle details added to service form', 'Close', {
        duration: 3000
      });
    }
  }

  // Vehicle Selection Methods
  onVehicleSelected(vehicle: Vehicle): void {
    this.selectedVehicle = vehicle;
    this.populateServiceForm();
  }

  getSelectedVehicleDisplay(): string {
    if (!this.selectedVehicle) return 'No vehicle selected';
    return `${this.selectedVehicle.year} ${this.selectedVehicle.make} ${this.selectedVehicle.model} (${this.selectedVehicle.licensePlate})`;
  }
}
