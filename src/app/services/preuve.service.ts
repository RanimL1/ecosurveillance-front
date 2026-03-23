import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Preuve {
  id: number;
  type: 'image' | 'video';
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class PreuveService {

  private apiUrl = 'http://localhost:8082/api/preuves';

  constructor(private http: HttpClient) {}

  getPreuvesByInfraction(id: number) {
    return this.http.get<Preuve[]>(`${this.apiUrl}/infraction/${id}`);
  }

  getPreuvesByNomAndDate(nom: string, date: string): Observable<Preuve[]> {
    return this.http.get<Preuve[]>(
      `${this.apiUrl}/search?nom=${nom}&date=${date}`
    );
  }
}
