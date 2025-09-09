import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  public numberOfParticipations = 0;
  public totalNumberOfMedals = 0;
  public totalNumberOfAthletes = 0;
  public country: string = '';

  constructor(private location: Location, private route: ActivatedRoute, private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.country = params['country'];
    });
    this.setCountryStats(this.country)
  }

  setCountryStats(country: string): void {
    this.olympicService.getCountryDetails(country).subscribe(countryData => {
      this.numberOfParticipations = countryData?.participations.length || 0;
      this.totalNumberOfMedals = countryData?.participations.reduce((sum, p) => sum + (p.medalsCount ?? 0), 0) ?? 0;
      this.totalNumberOfAthletes = countryData?.participations.reduce((sum, p) => sum + (p.athleteCount ?? 0), 0) ?? 0;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
