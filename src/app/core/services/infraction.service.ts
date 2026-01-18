import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Infraction, InfractionRequest, EtudiantStats } from '../models/infraction.model';

@Injectable({
  providedIn: 'root'
})
export class InfractionService {
  private apiUrl = `${environment.apiUrl}/infractions`;

  constructor(private http: HttpClient) {}

  getAllInfractions(): Observable<Infraction[]> {
    return this.http.get<Infraction[]>(this.apiUrl);
  }

  getInfractionsByEtudiant(etudiantId: number): Observable<Infraction[]> {
    return this.http.get<Infraction[]>(`${this.apiUrl}/etudiant/${etudiantId}`);
  }

  createInfraction(request: InfractionRequest): Observable<Infraction> {
    return this.http.post<Infraction>(this.apiUrl, request);
  }

  updateStatus(id: number, status: string): Observable<Infraction> {
    return this.http.put<Infraction>(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }

  getEtudiantStats(etudiantId: number): Observable<EtudiantStats> {
    return this.http.get<EtudiantStats>(`${this.apiUrl}/etudiant/${etudiantId}/stats`);
  }

  deleteInfraction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
