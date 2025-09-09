import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null | undefined>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        console.error('Erreur lors du chargement des données olympiques :', error);
        this.olympics$.next(null);
        return of(null);
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getTotalMedalsByCountry() {
    return this.olympics$.asObservable().pipe(
      map((olympics) => {
        if (!olympics) return null; // ou undefined
        return olympics.map((country) => ({
          country: country.country,
          totalMedals: country.participations.reduce(
            (total, p) => total + p.medalsCount,
            0
          ),
          id: country.id
        }));
      }),
    );
  }

  getNumberOfCountries() {
    return this.olympics$.asObservable().pipe(
      map((olympics) => (olympics ? olympics.length : 0))
    );
  }

  getNumberOfJOs() {
    return this.olympics$.asObservable().pipe(
      map((olympics) => {
        if (!olympics) return 0;
        const uniqueYears = new Set<number>();
        olympics.forEach((country) => {
          country.participations.forEach((p) => uniqueYears.add(p.year));
        });
        return uniqueYears.size;
      })
    );  
  }
}
