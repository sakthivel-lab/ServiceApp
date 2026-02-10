import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  vehiclesForm!: FormGroup;
  isLoading = false;
  stepperCompleted = false;

  // Bike model to manufacturer mapping
  bikeModelMap: { [key: string]: string } = {
    'hero-splendor': 'Hero',
    'hero-hf-deluxe': 'Hero',
    'hero-passion': 'Hero',
    'honda-activa': 'Honda',
    'honda-shine': 'Honda',
    'honda-cb-shine': 'Honda',
    'tvs-apache': 'TVS',
    'tvs-sport': 'TVS',
    'tvs-jupiter': 'TVS',
    'bajaj-pulsar': 'Bajaj',
    'bajaj-ct100': 'Bajaj',
    'bajaj-discover': 'Bajaj',
    'royal-enfield-classic': 'Royal Enfield',
    'royal-enfield-bullet': 'Royal Enfield',
    'yamaha-fz': 'Yamaha',
    'yamaha-sz': 'Yamaha',
    'ktm-duke': 'KTM',
    'ktm-rc': 'KTM'
  };

  bikeModels = [
    { name: 'Hero Splendor', value: 'hero-splendor' },
    { name: 'Hero HF Deluxe', value: 'hero-hf-deluxe' },
    { name: 'Hero Passion', value: 'hero-passion' },
    { name: 'Honda Activa', value: 'honda-activa' },
    { name: 'Honda Shine', value: 'honda-shine' },
    { name: 'Honda CB Shine', value: 'honda-cb-shine' },
    { name: 'TVS Apache', value: 'tvs-apache' },
    { name: 'TVS Sport', value: 'tvs-sport' },
    { name: 'TVS Jupiter', value: 'tvs-jupiter' },
    { name: 'Bajaj Pulsar', value: 'bajaj-pulsar' },
    { name: 'Bajaj CT100', value: 'bajaj-ct100' },
    { name: 'Bajaj Discover', value: 'bajaj-discover' },
    { name: 'Royal Enfield Classic', value: 'royal-enfield-classic' },
    { name: 'Royal Enfield Bullet', value: 'royal-enfield-bullet' },
    { name: 'Yamaha FZ', value: 'yamaha-fz' },
    { name: 'Yamaha SZ', value: 'yamaha-sz' },
    { name: 'KTM Duke', value: 'ktm-duke' },
    { name: 'KTM RC', value: 'ktm-rc' }
  ];

  // File attachments
  aadharFile: File | null = null;
  aadharPreview: string | null = null;
  panFile: File | null = null;
  panPreview: string | null = null;
  otherDocuments: { file: File; name: string; preview: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeCustomerForm();
    this.initializeVehiclesForm();
  }

  initializeCustomerForm(): void {
    this.customerForm = this.fb.group({
      aadharNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],
      panNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      status: ['active', Validators.required]
    });
  }

  initializeVehiclesForm(): void {
    this.vehiclesForm = this.fb.group({
      vehicles: this.fb.array([this.createVehicleGroup()])
    });
  }

  createVehicleGroup(): FormGroup {
    const vehicleGroup = this.fb.group({
      bikeModel: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      manufacturer: ['', Validators.required],
      engineNumber: ['', Validators.required],
      chassisNumber: ['', Validators.required],
      batteryNumber: ['', Validators.required],
      chargerNumber: ['', Validators.required],
      orderedFromEcommerce: ['no', Validators.required],
      ecommercePlatform: [''],
      orderId: [''],
      orderedDate: [''],
      paymentType: ['', Validators.required],
      vehiclePrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      gstPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      extraFittingPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      miscellaneousCharges: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      discountPrice: ['0', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]]
    });

    // Subscribe to bike model changes
    vehicleGroup.get('bikeModel')?.valueChanges.subscribe((bikeModel) => {
      if (bikeModel && this.bikeModelMap[bikeModel]) {
        vehicleGroup.patchValue(
          { manufacturer: this.bikeModelMap[bikeModel] },
          { emitEvent: false }
        );
      }
    });

    // Subscribe to ecommerce changes
    vehicleGroup.get('orderedFromEcommerce')?.valueChanges.subscribe((value) => {
      const platformControl = vehicleGroup.get('ecommercePlatform');
      const orderIdControl = vehicleGroup.get('orderId');
      const orderedDateControl = vehicleGroup.get('orderedDate');

      if (value === 'yes') {
        platformControl?.setValidators([Validators.required]);
        orderIdControl?.setValidators([Validators.required]);
        orderedDateControl?.setValidators([Validators.required]);
      } else {
        platformControl?.setValidators([]);
        orderIdControl?.setValidators([]);
        orderedDateControl?.setValidators([]);
      }

      platformControl?.updateValueAndValidity();
      orderIdControl?.updateValueAndValidity();
      orderedDateControl?.updateValueAndValidity();
    });

    return vehicleGroup;
  }

  get vehiclesArray(): FormArray {
    return this.vehiclesForm.get('vehicles') as FormArray;
  }

  addVehicle(): void {
    this.vehiclesArray.push(this.createVehicleGroup());
  }

  removeVehicle(index: number): void {
    if (this.vehiclesArray.length > 1) {
      this.vehiclesArray.removeAt(index);
    } else {
      this.snackBar.open('At least one vehicle is required', 'Close', { duration: 3000 });
    }
  }

  calculateVehicleTotal(index: number): number {
    const vehicle = this.vehiclesArray.at(index);
    if (!vehicle || !vehicle.valid) return 0;
    const vehiclePrice = parseFloat(vehicle.get('vehiclePrice')?.value || 0);
    const gstPrice = parseFloat(vehicle.get('gstPrice')?.value || 0);
    const extraFittingPrice = parseFloat(vehicle.get('extraFittingPrice')?.value || 0);
    const miscellaneousCharges = parseFloat(vehicle.get('miscellaneousCharges')?.value || 0);
    return vehiclePrice + gstPrice + extraFittingPrice + miscellaneousCharges;
  }

  calculateVehicleFinalPrice(index: number): number {
    const vehicle = this.vehiclesArray.at(index);
    if (!vehicle) return 0;
    const totalPrice = this.calculateVehicleTotal(index);
    const discountPrice = parseFloat(vehicle.get('discountPrice')?.value || 0);
    return totalPrice - discountPrice;
  }

  calculateGrandTotal(): number {
    let grandTotal = 0;
    for (let i = 0; i < this.vehiclesArray.length; i++) {
      grandTotal += this.calculateVehicleFinalPrice(i);
    }
    return grandTotal;
  }

  onSubmit(): void {
    if (this.customerForm.valid && this.vehiclesForm.valid) {
      this.isLoading = true;
      
      const formData = {
        ...this.customerForm.value,
        vehicles: this.vehiclesArray.value,
        registrationDate: new Date()
      };
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.stepperCompleted = true;
        this.snackBar.open('Customer added successfully!', 'Close', {
          duration: 3000
        });
        
        // Navigate back to customers list after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/customers']);
        }, 2000);
      }, 1500);
    } else {
      this.markFormGroupTouched(this.customerForm);
      this.markFormArrayTouched(this.vehiclesArray);
    }
  }

  getFormattedValue(value: any): string {
    if (value instanceof Date) {
      return value.toLocaleDateString('en-IN');
    }
    return String(value);
  }

  // File handling methods
  onAadharFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (this.isValidImage(file)) {
        this.aadharFile = file;
        this.createImagePreview(file, (preview) => {
          this.aadharPreview = preview;
        });
      } else {
        this.snackBar.open('Please select a valid image file (JPG, PNG, PDF)', 'Close', { duration: 3000 });
      }
    }
  }

  onPanFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (this.isValidImage(file)) {
        this.panFile = file;
        this.createImagePreview(file, (preview) => {
          this.panPreview = preview;
        });
      } else {
        this.snackBar.open('Please select a valid image file (JPG, PNG, PDF)', 'Close', { duration: 3000 });
      }
    }
  }

  onOtherDocumentSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        if (this.isValidDocument(file)) {
          this.createImagePreview(file, (preview) => {
            this.otherDocuments.push({
              file: file,
              name: file.name,
              preview: preview
            });
          });
        }
      }
      if (input.files.length === 0) {
        this.snackBar.open('No valid files selected', 'Close', { duration: 3000 });
      }
    }
  }

  removeAadharFile(): void {
    this.aadharFile = null;
    this.aadharPreview = null;
  }

  removePanFile(): void {
    this.panFile = null;
    this.panPreview = null;
  }

  removeOtherDocument(index: number): void {
    this.otherDocuments.splice(index, 1);
  }

  private isValidImage(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    return validTypes.includes(file.type) && file.size <= 5242880; // 5MB
  }

  private isValidDocument(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    return validTypes.includes(file.type) && file.size <= 10485760; // 10MB
  }

  private createImagePreview(file: File, callback: (preview: string) => void): void {
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? Any unsaved data will be lost.')) {
      this.router.navigate(['/customers']);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  private markFormArrayTouched(formArray: FormArray): void {
    formArray.controls.forEach(control => {
      control.markAsTouched();
    });
  }
}

