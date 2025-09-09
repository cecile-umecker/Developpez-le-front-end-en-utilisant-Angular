import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartType, ChartData, ChartConfiguration } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[] | null | undefined>;
  public medalsByCountry$!: Observable<{ country: string; totalMedals: number; id: number }[] | null | undefined>;
  public pieChartLabels: string[] = [];
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{ data: []}]
  };  
  public pieChartType: ChartType = 'pie';
  public labelConnectorPlugin = {
    id: 'labelConnector',
    afterDraw: (chart: any) => {
      const ctx = chart.ctx;
      const dataset = chart.data.datasets[0];
      const meta = chart.getDatasetMeta(0);

      meta.data.forEach((arc: any, index: number) => {
        const x1 = arc.x;
        const y1 = arc.y;
        const angle = (arc.startAngle + arc.endAngle) / 2;
        const radius = arc.outerRadius;
        const offset = 30;
        const lineLength = offset - 10; // 10px avant le label
        const x2 = x1 + Math.cos(angle) * (radius + offset);
        const y2 = y1 + Math.sin(angle) * (radius + offset);

        ctx.beginPath();
        ctx.moveTo(x1 + Math.cos(angle) * radius, y1 + Math.sin(angle) * radius);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#000';
        ctx.strokeStyle = (dataset.backgroundColor as string[])[index]; // couleur de la part
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 50,
        left: 100,
        right: 80,
        bottom: 50
      }
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        color: '#000',
        formatter: (value, context) => context.chart.data.labels![context.dataIndex],
        align: 'end',
        anchor: 'end',
        offset: 30,
        clamp: true,
        font: {
          weight: 'bold',
          size: 14
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#04838f',
        titleColor: '#ffffff',          // couleur du nom du pays
        bodyColor: '#ffffff',           // couleur du texte
        borderColor: '#04838f',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        bodyAlign: 'center',         // centre le texte de la 2e ligne
        titleAlign: 'center', 
        callbacks: {
          title: (tooltipItems) => {
            // 1ère ligne = nom du pays
            return tooltipItems[0].label || '';
          },
          label: (tooltipItem) => {
            const value = tooltipItem.raw || 0;
            // 2ème ligne avec icône de médaille
            return `🏅 ${value}`;
          }
        }
      }
    },
  };
  public numberOfJOs$!: Observable<number>;
  public numberOfCountries$!: Observable<number>;


  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
   // this.olympics$ = this.olympicService.getOlympics();
    this.olympicService.loadInitialData().subscribe();
    this.olympicService.getTotalMedalsByCountry().subscribe((data) => {
      if (data) {
        console.log(data);
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

  onChartClick(event: any) {
    if (event.active && event.active.length > 0) {
      const chartElement = event.active[0];
      const index = chartElement.index;
      const countryName = this.pieChartData.labels![index] as string;
      this.router.navigate(['/detail'], { queryParams: { country: countryName } });
    }
  }
}
