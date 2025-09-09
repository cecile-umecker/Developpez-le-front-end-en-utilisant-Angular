import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartType, ChartData, ChartConfiguration } from 'chart.js';

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
    datasets: [{ data: []}]
  };  
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            family: 'Arial, sans-serif',
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`;
          }
        }
      }
    }
  };
  public numberOfJOs$!: Observable<number>;
  public numberOfCountries$!: Observable<number>;


  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
   // this.olympics$ = this.olympicService.getOlympics();
    this.olympicService.loadInitialData().subscribe();
    this.olympicService.getTotalMedalsByCountry().subscribe((data) => {
      if (data) {
        this.pieChartLabels = data.map(d => d.country);
        this.pieChartData = {
          labels: data.map(d => d.country),
          datasets: [{ 
            data: data.map(d => d.totalMedals), 
            backgroundColor: [
              '#783c51',
              '#945f64',
              '#b8cbe7',
              '#89a1db',
              '#bfe0f1',
              '#9780a1'
            ],
            borderWidth: 0
          }]
        };
      }
    });

    this.getnumberOfCountries();
    this.getnumberOfJOs();
  }
  
  getnumberOfJOs(): Observable<number> {
    return this.numberOfJOs$ = this.olympicService.getNumberOfJOs();
  }

  getnumberOfCountries(): Observable<number> {
    return this.numberOfCountries$ = this.olympicService.getNumberOfCountries();
  }
}
