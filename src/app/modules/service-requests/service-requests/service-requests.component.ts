import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-requests',
  templateUrl: './service-requests.component.html',
  styleUrls: ['./service-requests.component.scss']
})
export class ServiceRequestsComponent implements OnInit {

    // Pagination
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  currentPage = 0;
  selectedStatus = 'all';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  refreshList(): void {
    // placeholder for refresh action (keeps template type checking happy)
  }

  // simple in-memory data for the table
  activeTab: 'all' | 'warranty' | 'maintenance' = 'all';

  // expose Math for template expressions (e.g., Math.min/Math.max)
  Math = Math;

  // total items derived from requests
  get totalItems() {
    return this.requests.length;
  }

  requests: Array<{
    id: string;
    name: string;
    email: string;
    model: string;
    issue: string;
    avatar?: string | null;
    initials?: string | null;
    type: 'warranty' | 'maintenance' | 'other';
    status: 'Open' | 'In Progress' | 'Completed';
  }> = [
    { id: '#SR-24-001', name: 'John Doe', email: 'j.doe@example.com', model: 'Super73 RX', issue: 'Brake Failure', avatar: 'assets/images/loev_model/LoEV3.avif', initials: null, type: 'other', status: 'Open' },
    { id: '#SR-24-002', name: 'Sarah Smith', email: 's.smith@gmail.com', model: 'RadRunner 2', issue: 'Battery Replacement', avatar: 'assets/images/loev_model/LoEV3.avif', initials: null, type: 'warranty', status: 'In Progress' },
    { id: '#SR-24-003', name: 'Mike K.', email: 'mike.k@yahoo.com', model: 'VanMoof S3', issue: 'Firmware Error', avatar: null, initials: 'MK', type: 'maintenance', status: 'Completed' },
    { id: '#SR-24-004', name: 'David Chen', email: 'd.chen@corp.com', model: 'Aventon Pace', issue: 'Motor Noise', avatar: 'assets/images/loev_model/LoEV3.avif', initials: null, type: 'other', status: 'Open' }
  ];

  get filteredRequests() {
    if (this.activeTab === 'all') { return this.requests; }
    if (this.activeTab === 'warranty') { return this.requests.filter(r => r.type === 'warranty'); }
    if (this.activeTab === 'maintenance') { return this.requests.filter(r => r.type === 'maintenance'); }
    return this.requests;
  }

  setTab(tab: 'all' | 'warranty' | 'maintenance') {
    this.activeTab = tab;
    // update dataSource when tab changes
    this.dataSource.data = this.filteredRequests;
  }

  displayedColumns: string[] = ['id', 'customer', 'model', 'issue', 'status', 'actions'];
  dataSource = new MatTableDataSource(this.requests);

  viewRequest(id: string) {
    // placeholder: open details drawer or dialog
    console.log('view request', id);
  }

  editRequest(id: string) {
    console.log('edit request', id);
  }
  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.currentPage = 0;
    this.loadInventoryData();
  }
  loadInventoryData(): void {
    let filtered = this.requests;    
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === this.selectedStatus);
    }

    this.dataSource.data = filtered;
  }
  createNewRequest(): void {
    console.log('Add new request clicked');
    this.router.navigate(['/service-requests/addServiceRequest']);
  }
} 
