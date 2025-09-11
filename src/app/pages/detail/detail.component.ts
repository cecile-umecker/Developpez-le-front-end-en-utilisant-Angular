/**
 * Component responsible for displaying detailed information about a selected Olympic country.
 *
 * Fetches country details and participation statistics using the OlympicService,
 * and displays them in the template.
 *
 * @remarks
 * - Uses Angular's `ActivatedRoute` to get the selected country from query parameters.
 * - Retrieves country details as an observable and transforms participation data for charting.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Observable, map } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public country$!: Observable<Olympic | null>;
  public countryName!: string;
  public medalByYear$!: Observable<Array<{ name: string; series: Array<{ name: string; value: number }> }>>;

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.countryName = params['country'];
      this.country$ = this.olympicService.getCountryDetails(this.countryName);
      this.medalByYear$ = this.country$.pipe(
        map((country) =>
          country
            ? [
                {
                  name: country.country,
                  series: country.participations.map((p) => ({
                    name: p.year.toString(),
                    value: p.medalsCount,
                  })),
                },
              ]
            : []
        )
      );
    });
  }

  public getNumberOfParticipations(country: Olympic | null): number {
    return country?.participations.length ?? 0;
  }

  public getTotalMedals(country: Olympic | null): number {
    return (
      country?.participations.reduce(
        (sum, p) => sum + (p.medalsCount ?? 0),
        0
      ) ?? 0
    );
  }

  public getTotalAthletes(country: Olympic | null): number {
    return (
      country?.participations.reduce(
        (sum, p) => sum + (p.athleteCount ?? 0),
        0
      ) ?? 0
    );
  }
}
