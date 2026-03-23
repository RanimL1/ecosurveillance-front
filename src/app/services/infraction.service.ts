import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Infraction } from '../models/infraction.model';

@Injectable({ providedIn: 'root' })
export class InfractionService {
  private apiUrl = 'http://localhost:8081/api/infractions';

  constructor(private http: HttpClient) {}

  getInfractions(): Observable<Infraction[]> {
    return this.http.get<Infraction[]>(this.apiUrl);
  }

  getInfractionById(id: number): Observable<Infraction> {
    return this.http.get<Infraction>(`${this.apiUrl}/${id}`);
  }

  createInfraction(infraction: Infraction): Observable<Infraction> {
    return this.http.post<Infraction>(this.apiUrl, infraction);
  }

  updateInfraction(id: number, infraction: Infraction): Observable<Infraction> {
    return this.http.put<Infraction>(`${this.apiUrl}/${id}`, infraction);
  }

  deleteInfraction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getInfractionsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  getInfractionsEnAttente(): Observable<Infraction[]> {
    return this.http.get<Infraction[]>(`${this.apiUrl}/status/EN_ATTENTE`);
  }

  getInfractionsValidees(): Observable<Infraction[]> {
    return this.http.get<Infraction[]>(`${this.apiUrl}/status/VALIDEE`);
  }
}
