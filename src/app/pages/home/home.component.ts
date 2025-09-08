import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[] | null | undefined>;
  public medalsByCountry$!: Observable<{ country: string; totalMedals: number }[] | null | undefined>;
  public pieChartLabels: string[] = [];
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{ data: [] }]
  };  
  public pieChartType: ChartType = 'pie';
  public pieChartOptions = {
    responsive: true,
    legend: { position: 'bottom' }
  };

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
   // this.olympics$ = this.olympicService.getOlympics();
    this.olympicService.loadInitialData().subscribe();
    this.olympicService.getTotalMedalsByCountry().subscribe((data) => {
      if (data) {
        this.pieChartLabels = data.map(d => d.country);
        this.pieChartData = {
          labels: data.map(d => d.country),
          datasets: [{ data: data.map(d => d.totalMedals) }]
        };
      }
    });
  }  
}
