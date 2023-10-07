import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { ApiserviceService } from '../../apiservice.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private chartsData: DashboardChartsData, private service: ApiserviceService) {}

  readData: any;
  successmsg: any;

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month'),
  });

  ngOnInit(): void {
    this.initCharts();
    this.getAllDataUser();
  }

  getAllDataUser() {
    this.service.getAllDataUser().subscribe((res) => {
      console.log(res, 'res ==>');
      this.readData = res.data.slice(0, 6);

      // Fetch the role for each user
      this.readData.forEach((user: any) => {
        this.service.getSingleDataRole(user.idRole).subscribe((roleRes) => {
          console.log(roleRes, 'roleRes ==>');
          user.role = roleRes.data[0];
        });
      });
    });
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 9) + 1; // Generates a random number from 1 to 9
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }
}
