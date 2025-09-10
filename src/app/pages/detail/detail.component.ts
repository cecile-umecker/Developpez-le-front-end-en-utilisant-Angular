import { Component, OnInit } from '@angular/core';
import { Location, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  public country$!: Observable<Olympic | null>;
  public countryName!: string;

  constructor(private location: Location, private route: ActivatedRoute, private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    this.countryName = params['country'];
    this.country$ = this.olympicService.getCountryDetails(this.countryName);    });
  }

  // helpers pour le template
  public getNumberOfParticipations(country: Olympic | null): number {
    return country?.participations.length ?? 0;
  }

  public getTotalMedals(country: Olympic | null): number {
    return country?.participations.reduce((sum, p) => sum + (p.medalsCount ?? 0), 0) ?? 0;
  }

  public getTotalAthletes(country: Olympic | null): number {
    return country?.participations.reduce((sum, p) => sum + (p.athleteCount ?? 0), 0) ?? 0;
  }

  goBack(): void {
    this.location.back();
  }
}
