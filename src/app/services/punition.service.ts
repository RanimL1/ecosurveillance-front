import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Punition } from '../models/punition.model';

@Injectable({ providedIn: 'root' })
export class PunitionService {
  private apiUrl = 'http://localhost:8082/api/punitions';

  constructor(private http: HttpClient) {}

  getPunitions(): Observable<Punition[]> {
    return this.http.get<Punition[]>(this.apiUrl);
  }

  getPunitionById(id: number): Observable<Punition> {
    return this.http.get<Punition>(`${this.apiUrl}/${id}`);
  }

  createPunition(punition: Punition): Observable<Punition> {
    return this.http.post<Punition>(this.apiUrl, punition);
  }

  updatePunition(id: number, punition: Punition): Observable<Punition> {
    return this.http.put<Punition>(`${this.apiUrl}/${id}`, punition);
  }

  deletePunition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPunitionsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}
