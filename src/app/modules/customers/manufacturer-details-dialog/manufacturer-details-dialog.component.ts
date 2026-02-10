import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

export interface ManufacturerDetailsDialogData {
    cardType: string;
    manufacturers: any[];
}

@Component({
    selector: 'app-manufacturer-details-dialog',
    templateUrl: './manufacturer-details-dialog.component.html',
    styleUrls: ['./manufacturer-details-dialog.component.scss']
})
export class ManufacturerDetailsDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ManufacturerDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ManufacturerDetailsDialogData
    ) { }

    onClose(): void {
        this.dialogRef.close();
    }
}
