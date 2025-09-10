import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  getOlympics(): Observable<Olympic[] | null | undefined> {
    return this.olympics$.asObservable();
  }

  getCountryDetails(countryName: string): Observable<Olympic | null> {
    return this.olympics$.pipe(
      map((olympics => olympics?.find(c => c.country === countryName) ?? null))
    ); 
  }
}
