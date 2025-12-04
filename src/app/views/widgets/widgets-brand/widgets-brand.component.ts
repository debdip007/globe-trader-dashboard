import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { ColComponent, RowComponent, WidgetStatDComponent } from '@coreui/angular';
import { ChartData } from 'chart.js';
import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { Details } from '../../../core/models/dashboard-count.model';
import { AuthService } from '../../../core/services/auth.service';

type BrandData = {
  icon: string
  values: any[]
  capBg?: any
  color?: string
  labels?: string[]
  data: ChartData
}

@Component({
    selector: 'app-widgets-brand',
    templateUrl: './widgets-brand.component.html',
    styleUrls: ['./widgets-brand.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [RowComponent, ColComponent, WidgetStatDComponent, IconDirective, ChartjsComponent]
})
export class WidgetsBrandComponent implements AfterContentInit {
  
  dashboardDetails?: Details;
  currentYear : any;
  brandData : any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private dashboardService: DashboardDataService,
    private authService: AuthService
  ) {
    const user = JSON.parse(localStorage.getItem(this.authService.USER_KEY) || '{}');

    this.currentYear = new Date().getFullYear();

    if(user) {
      let userType = user.details?.user_type;

      this.dashboardService.getDashboardCount(userType,this.currentYear).subscribe(data => {
        this.dashboardDetails = data?.details; 
        console.log(this.dashboardDetails);

        this.brandData  = [
        {
          icon: 'cil-user',
          values: [{ title: 'Sellers', value: this.dashboardDetails?.user_count[0].count }],
          capBg: { '--cui-card-cap-bg': '#3b5998' },
          labels: [...this.labels],
          data: {
            labels: [...this.labels],
            datasets: [{ ...this.datasets, data: [65, 59, 84, 84, 51, 55, 40, 100], label: 'Sellers', ...this.colors }]
          }
        },
        {
          icon: 'cil-user',
          values: [{ title: 'Buyers', value: this.dashboardDetails?.user_count[1].count }],
          capBg: { '--cui-card-cap-bg': '#00aced' },
          data: {
            labels: [...this.labels],
            datasets: [{ ...this.datasets, data: [1, 13, 9, 17, 34, 41, 38], label: 'Buyers', ...this.colors }]
          }
        },
        {
          icon: 'cil-user',
          values: [{ title: 'Admin Users', value: this.dashboardDetails?.user_count[2].count }],
          capBg: { '--cui-card-cap-bg': '#4875b4' },
          data: {
            labels: [...this.labels],
            datasets: [{ ...this.datasets, data: [78, 81, 80, 45, 34, 12, 40], label: 'Admin Users', ...this.colors }]
          }
        },
        {
          icon: 'cilCalendar',
          values: [{ title: 'Products', value: this.dashboardDetails?.product_count }],
          capBg: { '--cui-card-cap-bg': 'var(--cui-warning)' },
          data: {
            labels: [...this.labels],
            datasets: [{ ...this.datasets, data: [35, 23, 56, 22, 97, 23, 64], label: 'Products', ...this.colors }]
          }
        }
      ];
      });
    }
    
  }

  @Input() withCharts?: boolean;
  // @ts-ignore
  chartOptions = {
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3
      }
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  };
  labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  datasets = {
    borderWidth: 2,
    fill: true
  };
  colors = {
    backgroundColor: 'rgba(255,255,255,.1)',
    borderColor: 'rgba(255,255,255,.55)',
    pointHoverBackgroundColor: '#fff',
    pointBackgroundColor: 'rgba(255,255,255,.55)'
  };
  
  capStyle(value: string) {
    return !!value ? { '--cui-card-cap-bg': value } : {};
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
