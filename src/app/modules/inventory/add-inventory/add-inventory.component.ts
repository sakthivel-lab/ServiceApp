import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {
  inventoryForm!: FormGroup;
  isLoading = false;
  imagePreview: string | null = null;
  
  // GST Calculation
  basePrice = 0;
  sgstPercentage = 0;
  cgstPercentage = 0;
  sgstAmount = 0;
  cgstAmount = 0;
  totalWithGST = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.inventoryForm = this.fb.group({
      // Step 1: Inventory Details
      barcode: ['', [Validators.required]],
      partName: ['', [Validators.required, Validators.minLength(2)]],
      sku: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: [''],
      quantity: [0, [Validators.required, Validators.min(0)]],
      basePrice: [0, [Validators.required, Validators.min(0)]],
      image: [null],
      location: [''],
      
      // GST Settings
      includeGST: ['no', Validators.required],
      sgstPercentage: [0],
      cgstPercentage: [0],
    });

    // Listen to form value changes for GST calculation
    this.inventoryForm.get('basePrice')?.valueChanges.subscribe(() => this.calculateGST());
    this.inventoryForm.get('sgstPercentage')?.valueChanges.subscribe(() => this.calculateGST());
    this.inventoryForm.get('cgstPercentage')?.valueChanges.subscribe(() => this.calculateGST());
    this.inventoryForm.get('includeGST')?.valueChanges.subscribe((value) => {
      if (value === 'no') {
        this.inventoryForm.get('sgstPercentage')?.setValue(0);
        this.inventoryForm.get('cgstPercentage')?.setValue(0);
      }
    });
  }

  calculateGST(): void {
    const basePrice = this.inventoryForm.get('basePrice')?.value || 0;
    const sgstPercent = this.inventoryForm.get('sgstPercentage')?.value || 0;
    const cgstPercent = this.inventoryForm.get('cgstPercentage')?.value || 0;

    this.basePrice = basePrice;
    this.sgstPercentage = sgstPercent;
    this.cgstPercentage = cgstPercent;

    // Calculate GST amounts
    this.sgstAmount = (basePrice * sgstPercent) / 100;
    this.cgstAmount = (basePrice * cgstPercent) / 100;
    this.totalWithGST = basePrice + this.sgstAmount + this.cgstAmount;
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
      this.inventoryForm.patchValue({
        image: file
      });
    }
  }

  onBarcodeScanned(barcode: string): void {
    this.inventoryForm.patchValue({
      barcode: barcode
    });
  }

  onCancel(): void {
    if (this.inventoryForm.dirty) {
      if (confirm('Are you sure you want to cancel? Unsaved changes will be lost.')) {
        this.router.navigate(['/inventory']);
      }
    } else {
      this.router.navigate(['/inventory']);
    }
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      this.isLoading = true;
      console.log('Inventory Data:', this.inventoryForm.value);
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.open('Inventory item added successfully!', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/inventory']);
      }, 1500);
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000
      });
    }
  }
}
