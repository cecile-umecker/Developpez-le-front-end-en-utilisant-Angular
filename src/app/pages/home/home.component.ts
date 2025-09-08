import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[] | null | undefined>;
  public medalsByCountry$!: Observable<{ country: string; totalMedals: number }[] | null | undefined>;


  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
   // this.olympics$ = this.olympicService.getOlympics();
    this.olympicService.loadInitialData().subscribe();
    this.medalsByCountry$ = this.olympicService.getTotalMedalsByCountry();
  }

  
}
