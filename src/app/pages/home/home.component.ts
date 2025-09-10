import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[] | null | undefined>;
  public medalsByCountry$!: Observable<{ name: string; value: number }[]>;
  public numberOfJOs$!: Observable<number>;
  public numberOfCountries$!: Observable<number>;

  public pieChartData: { name: string; value: number }[] = [];
  public activeSlice: { name: string; value: number } | null = null;
  trimLabels: boolean = false;
  legend: boolean = false;
  labels: boolean = true;
  explodeSlices: boolean = false;
  doughnut: boolean = false;
  tooltipDisabled: boolean = false;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe();
    this.olympics$ = this.olympicService.getOlympics();
    this.medalsByCountry$ = this.olympics$.pipe(
      map(olympics =>
        olympics
          ? olympics.map(c => ({
              name: c.country,
              value: c.participations.reduce((t, p) => t + p.medalsCount, 0)
            }))
          : []
      )
    );

    this.numberOfCountries$ = this.olympics$.pipe(
      map(olympics => olympics?.length ?? 0)
    );

    this.numberOfJOs$ = this.olympics$.pipe(
      map(olympics => {
        if (!olympics) return 0;
        const years = new Set<number>();
        olympics.forEach(c => c.participations.forEach(p => years.add(p.year)));
        return years.size;
      })
    );

  }
    
  onChartSelect(event: any): void {
    if (event && event.name) {
      this.router.navigate(['/detail'], { queryParams: { country: event.name } });
    }
  }
}