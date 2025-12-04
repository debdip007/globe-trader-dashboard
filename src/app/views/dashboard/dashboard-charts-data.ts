import { Injectable } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType, PluginOptionsByType, ScaleOptions, TooltipLabelStyle } from 'chart.js';
import { DeepPartial } from 'chart.js/dist/types/utils';
import { getStyle } from '@coreui/utils';
import { DashboardDataService } from '../../core/services/dashboard-data.service';
import { AuthService } from '../../core/services/auth.service';
import { Details } from '../../core/models/dashboard-count.model';

export interface IChartProps {
  data?: ChartData;
  labels?: any;
  options?: ChartOptions;
  colors?: any;
  type: ChartType;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
  providedIn: 'any'
})
export class DashboardChartsData {
  dashboardDetails?: Details;
  currentYear : any;

  data: any[] = [];

  constructor(
      private dashboardService: DashboardDataService,
      private authService: AuthService
    ) {
      const user = JSON.parse(localStorage.getItem(this.authService.USER_KEY) || '{}');
  
      this.currentYear = new Date().getFullYear();
  
      if(user) {
        let userType = user.details?.user_type;
  
        this.dashboardService.getDashboardCount(userType,this.currentYear).subscribe(data => {
          this.dashboardDetails = data?.details;
          this.initMainChart("Month"); 
          console.log(this.dashboardDetails);
        });        
      }   
  }

  public mainChart: IChartProps = { type: 'line' };

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  initMainChart(period: string = 'Month') {
    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = `rgba(${getStyle('--cui-info-rgb')}, .1)`
    const brandDanger = getStyle('--cui-danger') ?? '#f86c6b';

    // mainChart
    this.mainChart['elements'] = period === 'Month' ? 12 : 27;
    this.mainChart['Data1'] = [];
    this.mainChart['Data2'] = [];
    // this.mainChart['Data3'] = [];
    const year = 2025;

    const allMonths = Array.from({ length: 12 }, (_, i) => {
      const monthNum = (i + 1).toString().padStart(2, '0');
      return `${year}-${monthNum}`;
    });    


    const filledData = allMonths.map(month => {
      if(this.dashboardDetails !== undefined) {
        const found = this.dashboardDetails.monthly_request.BUYER.find(item => item.month === month);
        console.log("filled data month:", month, "found:", found);
        found !== undefined ? this.mainChart['Data1'].push(found.count) : this.mainChart['Data1'].push(0);

        const foundSeller = this.dashboardDetails.monthly_request.SELLER.find(item => item.month === month);
        console.log("filled data month:", month, "foundSeller:", foundSeller);
        foundSeller !== undefined ? this.mainChart['Data2'].push(foundSeller.count) : this.mainChart['Data2'].push(0);
      }
      
      // return {
      //   month,
      //   count: found ? found.count : 0
      // };
    });
    // generate random values for mainChart
    for (let i = 0; i <= this.mainChart['elements']; i++) {
      this.data.push(this.dashboardDetails?.monthly_request?.BUYER[i]);
      // const buyerdateStr = this.dashboardDetails?.monthly_request?.BUYER[i]?.month || '';
      // const buyermonthNum = parseInt(buyerdateStr.split('-')[1], 10);

      // const sellerdateStr = this.dashboardDetails?.monthly_request?.BUYER[i]?.month || '';
      // const sellermonthNum = parseInt(sellerdateStr.split('-')[1], 10);
      // console.log("buyer month num:", buyermonthNum);
      // console.log("seller month num:", sellermonthNum);
      // console.log("i value:", i);

      // if(i == buyermonthNum) {
      //   console.log("in if buyer");
      //   this.mainChart['Data1'].push(this.dashboardDetails?.monthly_request?.BUYER[i]?.count);
      // }

      // if(i == sellermonthNum) {
      //   console.log("in if seller");
      //   this.mainChart['Data2'].push(this.dashboardDetails?.monthly_request?.SELLER[i]?.count);
      // }
      // this.mainChart['Data1'].push(this.random(50, 240));
      // this.mainChart['Data2'].push(this.random(20, 160));
      // this.mainChart['Data3'].push(65);
    }

    console.log("monthly request data:", this.data);

    

    // console.log("filled data:", filledData);

    let labels: string[] = [];
    if (period === 'Month') {
      labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
    } else {
      /* tslint:disable:max-line-length */
      const week = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ];
      labels = week.concat(week, week, week);
    }

    const colors = [
      {
        // brandInfo
        backgroundColor: brandInfoBg,
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // brandSuccess
        backgroundColor: 'transparent',
        borderColor: brandSuccess || '#4dbd74',
        pointHoverBackgroundColor: '#fff'
      },
      {
        // brandDanger
        backgroundColor: 'transparent',
        borderColor: brandDanger || '#f86c6b',
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5]
      }
    ];

    const datasets: ChartDataset[] = [
      {
        data: this.mainChart['Data1'],
        label: 'Buyer Requests',
        ...colors[0]
      },
      {
        data: this.mainChart['Data2'],
        label: 'Seller Requests',
        ...colors[1]
      },
      {
        data: this.mainChart['Data3'],
        label: 'BEP',
        ...colors[2]
      }
    ];

    const plugins: DeepPartial<PluginOptionsByType<any>> = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: (context) => ({ backgroundColor: context.dataset.borderColor } as TooltipLabelStyle)
        }
      }
    };

    const scales = this.getScales();

    const options: ChartOptions = {
      maintainAspectRatio: false,
      plugins,
      scales,
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
      }
    };

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels
    };
  }

  getScales() {
    const colorBorderTranslucent = getStyle('--cui-border-color-translucent');
    const colorBody = getStyle('--cui-body-color');

    const scales: ScaleOptions<any> = {
      x: {
        grid: {
          color: colorBorderTranslucent,
          drawOnChartArea: false
        },
        ticks: {
          color: colorBody
        }
      },
      y: {
        border: {
          color: colorBorderTranslucent
        },
        grid: {
          color: colorBorderTranslucent
        },
        max: 50,
        beginAtZero: true,
        ticks: {
          color: colorBody,
          maxTicksLimit: 5,
          stepSize: Math.ceil(50 / 5)
        }
      }
    };
    return scales;
  }
}
