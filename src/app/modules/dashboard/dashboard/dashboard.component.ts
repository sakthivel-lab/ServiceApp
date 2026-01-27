import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType, ChartOptions, ChartConfiguration } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public pieChartType: 'pie' = 'pie';
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Battery', 'Charger', 'Motor', 'Others'],
    datasets: [
      {
        data: [300, 500, 200, 100],
        backgroundColor: ['#FFC107', '#00BCD4', '#E91E63', '#1ebd0fff']
      }
    ]
  };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false, // ✅ MOST IMPORTANT
    layout: {
      padding: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
      }
    },
    plugins: {
      legend: {
        position: 'right', // Same as your screenshot
        labels: {
          boxWidth: 14,
          padding: 12,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        enabled: true
      }
    }
  };

  // LINE CHART DATA
  public lineChartData: ChartData<'line'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'This Week',
        data: [12, 18, 25, 20, 30, 22, 15],
        borderColor: '#00BCD4',
        backgroundColor: 'rgba(0,188,212,0.2)',
        pointBackgroundColor: '#00BCD4',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Last Week',
        data: [10, 15, 22, 18, 28, 20, 60],
        borderColor: '#FFC107',
        backgroundColor: 'rgba(255,193,7,0.2)',
        pointBackgroundColor: '#FFC107',
        tension: 0.4,
        fill: false
      }
    ]
  };

  // CHART OPTIONS  
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // ✅ crucial to reduce white space
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 0,
        right: 0
      }
    },
    scales: {
      y: {
        min: 0,
        max: 60, // Fixed Y-axis
        ticks: {
          stepSize: 10,
          color: '#333',
          font: {
            size: 12
          }
        },
        grid: {
          drawBorder: false,
          color: 'rgba(0,0,0,0.05)'
        }
      },
      x: {
        ticks: {
          color: '#333',
          font: {
            size: 12
          }
        },
        grid: {
          drawBorder: false,
          color: 'rgba(0,0,0,0.05)'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20
        }
      },
      tooltip: {
        enabled: true
      }
    }
  };


  public lineChartType: 'line' = 'line';


  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: ['Ambere', 'Battre', 'Vike', 'Commercial'],
    datasets: [
      {
        label: 'Weekly Volume',
        data: [120, 150, 90, 180],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350']
      }
    ]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };


  constructor() { }

  ngOnInit(): void {
  }

  refreshDashboard() {
    console.log('Refreshing dashboard data...');
    // Add logic to refresh all dashboard data
  }

  refreshStock() {
    console.log('Refreshing stock data...');
    // Add logic to refresh stock data
  }

  refreshPerformance() {
    console.log('Refreshing performance data...');
    // Add logic to refresh performance data
  }

  refreshAppointments() {
    console.log('Refreshing appointments data...');
    // Add logic to refresh appointments data
  }

  refreshTechnicians() {
    console.log('Refreshing technicians data...');
    // Add logic to refresh technicians data
  }

  refreshRevenue() {
    console.log('Refreshing revenue data...');
    // Add logic to refresh revenue data
  }

  refreshFeedback() {
    console.log('Refreshing feedback data...');
    // Add logic to refresh feedback data
  }

}
