import { Injectable } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils';
import { ApiserviceService } from '../../apiservice.service';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;
  [propName: string]: any;
}

@Injectable({
  providedIn: 'any'
})

export class DashboardChartsData{
  constructor(private service: ApiserviceService) { this.initMainChart(); }

  readData: any;
  resData1: any[] = [];
  resData2: any[] = [];
  resData3: any[] = [];
  resData4: any[] = [];
  resData5: any[] = [];
  resData6: any[] = [];
  resData7: any[] = [];
  resData8: any[] = [];
  resData9: any[] = [];
  resData10: any[] = [];
  resData11: any[] = [];
  resData12: any[] = [];
  
  public mainChart: IChartProps = { };
  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getTopThreeCounts(dataArray: any[], idKey: string): { idFournisseur: number, count: number }[] {
    const countMap = new Map<number, number>();
  
    dataArray.forEach((item) => {
      const id = item[idKey];
      countMap.set(id, (countMap.get(id) || 0) + 1);
    });
  
    const sortedCounts = Array.from(countMap.entries()).sort((a, b) => b[1] - a[1]);
    const result: { idFournisseur: number, count: number }[] = [];
    for (let i = 0; i < Math.min(3, sortedCounts.length); i++) {
      const [idFournisseur, count] = sortedCounts[i];
      result.push({ idFournisseur, count });
    }
  
    return result;
  }

  initMainChart(period: string = 'Month') {
    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = hexToRgba(brandInfo, 10);
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';
    
    // mainChart
    this.mainChart['elements'] = period === 'Month' ? 12 : 27;
    this.mainChart['Data1'] = [];
    this.mainChart['Data2'] = [];
    this.mainChart['Data3'] = [];

    this.service.getAllDataLivraison().subscribe((res) => {
      console.log(res, 'res ==>');
      this.readData = res.data;
    
      this.resData1 = [];
      this.resData2 = [];
      this.resData3 = [];
      this.resData4 = [];
      this.resData5 = [];
      this.resData6 = [];
      this.resData7 = [];
      this.resData8 = [];
      this.resData9 = [];
      this.resData10 = [];
      this.resData11 = [];
      this.resData12 = [];

      for (let i = 0; i < this.readData.length; i++) {
        const dateLivraison = this.readData[i].delaisLivraison;
        if (dateLivraison) {
          const dateLivraisonMonth = this.readData[i].delaisLivraison.split('T')[0].split('-')[1];
          if (dateLivraisonMonth === '01') this.resData1.push(this.readData[i]);
          if (dateLivraisonMonth === '02') this.resData2.push(this.readData[i]);
          if (dateLivraisonMonth === '03') this.resData3.push(this.readData[i]);
          if (dateLivraisonMonth === '04') this.resData4.push(this.readData[i]);
          if (dateLivraisonMonth === '05') this.resData5.push(this.readData[i]);
          if (dateLivraisonMonth === '06') this.resData6.push(this.readData[i]);
          if (dateLivraisonMonth === '07') this.resData7.push(this.readData[i]);
          if (dateLivraisonMonth === '08') this.resData8.push(this.readData[i]);
          if (dateLivraisonMonth === '09') this.resData9.push(this.readData[i]);
          if (dateLivraisonMonth === '10') this.resData10.push(this.readData[i]);
          if (dateLivraisonMonth === '11') this.resData11.push(this.readData[i]);
          if (dateLivraisonMonth === '12') this.resData12.push(this.readData[i]);
        }
        
      }

      // Arrays to hold the results for each resData
      const result1: { idFournisseur: number, count: number }[] = this.getTopThreeCounts(this.resData1, 'idFournisseur');
      const result2: { idFournisseur: number, count: number }[] = this.getTopThreeCounts(this.resData2, 'idFournisseur');
      const result3: { idFournisseur: number, count: number }[] = this.getTopThreeCounts(this.resData3, 'idFournisseur');
      const result4: { idFournisseur: number, count: number }[] = this.getTopThreeCounts(this.resData4, 'idFournisseur');
      const result5: { idFournisseur: number, count: number }[] = this.getTopThreeCounts(this.resData5, 'idFournisseur');
      const result6: { idFournisseur: number, count: number }[] = this.getTopThreeCounts(this.resData6, 'idFournisseur');
      const result7: { idFournisseur: number, count: number }[] = this.getTopThreeCounts(this.resData7, 'idFournisseur');
      const result8: { idFournisseur: number, count: number }[] = this.getTopThreeCounts(this.resData8, 'idFournisseur');
      const result9: { idFournisseur: number, count: number }[] = this.getTopThreeCounts(this.resData9, 'idFournisseur');
      const result10: { idFournisseur: number, count: number }[] = this.getTopThreeCounts(this.resData10, 'idFournisseur');
      const result11: { idFournisseur: number, count: number }[] = this.getTopThreeCounts(this.resData11, 'idFournisseur');
      const result12: { idFournisseur: number, count: number }[] = this.getTopThreeCounts(this.resData12, 'idFournisseur');
      
      // Sort the individual result arrays in descending order based on count
      result1.sort((a, b) => b.count - a.count);
      result2.sort((a, b) => b.count - a.count);
      result3.sort((a, b) => b.count - a.count);
      result4.sort((a, b) => b.count - a.count);
      result5.sort((a, b) => b.count - a.count);
      result6.sort((a, b) => b.count - a.count);
      result7.sort((a, b) => b.count - a.count);
      result8.sort((a, b) => b.count - a.count);
      result9.sort((a, b) => b.count - a.count);
      result10.sort((a, b) => b.count - a.count);
      result11.sort((a, b) => b.count - a.count);
      result12.sort((a, b) => b.count - a.count);

      this.mainChart['Data1'].push(result1[0].count);
      this.mainChart['Data1'].push(result2[0].count);
      this.mainChart['Data1'].push(result3[0].count);
      this.mainChart['Data1'].push(result4[0].count);
      this.mainChart['Data1'].push(result5[0].count);
      this.mainChart['Data1'].push(result6[0].count);
      this.mainChart['Data1'].push(result7[0].count);
      this.mainChart['Data1'].push(result8[0].count);
      this.mainChart['Data1'].push(result9[0].count);
      this.mainChart['Data1'].push(result10[0].count);
      this.mainChart['Data1'].push(result11[0].count);
      this.mainChart['Data1'].push(result12[0].count);

      this.mainChart['Data2'].push(result1[1].count);
      this.mainChart['Data2'].push(result2[1].count);
      this.mainChart['Data2'].push(result3[1].count);
      this.mainChart['Data2'].push(result4[1].count);
      this.mainChart['Data2'].push(result5[1].count);
      this.mainChart['Data2'].push(result6[1].count);
      this.mainChart['Data2'].push(result7[1].count);
      this.mainChart['Data2'].push(result8[1].count);
      this.mainChart['Data2'].push(result9[1].count);
      this.mainChart['Data2'].push(result10[1].count);
      this.mainChart['Data2'].push(result11[1].count);
      this.mainChart['Data2'].push(result12[1].count);

      this.mainChart['Data3'].push(result1[2].count);
      this.mainChart['Data3'].push(result2[2].count);
      this.mainChart['Data3'].push(result3[2].count);
      this.mainChart['Data3'].push(result4[2].count);
      this.mainChart['Data3'].push(result5[2].count);
      this.mainChart['Data3'].push(result6[2].count);
      this.mainChart['Data3'].push(result7[2].count);
      this.mainChart['Data3'].push(result8[2].count);
      this.mainChart['Data3'].push(result9[2].count);
      this.mainChart['Data3'].push(result10[2].count);
      this.mainChart['Data3'].push(result11[2].count);
      this.mainChart['Data3'].push(result12[2].count);
    });

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
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        fill: true
      },
      {
        // brandDanger
        backgroundColor: 'transparent',
        borderColor: brandDanger || '#f86c6b',
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 2,
        fill: true
      }
    ];

    const datasets = [
      {
        data: this.mainChart['Data1'],
        label: 'Top count',
        ...colors[0]
      },
      {
        data: this.mainChart['Data2'],
        label: 'Second count',
        ...colors[1]
      },
      {
        data: this.mainChart['Data3'],
        label: 'Third count',
        ...colors[2]
      }
    ];

    const plugins = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: function(context: any) {
            return {
              backgroundColor: context.dataset.borderColor
            };
          }
        }
      }
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          beginAtZero: true,
          max: 25,
          ticks: {
            maxTicksLimit: 5,
            stepSize: Math.ceil(25 / 5)
          }
        }
      },
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
    this.mainChart.data = { datasets, labels };
  }
}