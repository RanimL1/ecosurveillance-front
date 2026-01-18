import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Detection, DetectionRequest } from '../models/detection.model';

@Injectable({
  providedIn: 'root'
})
export class DetectionService {
  private apiUrl = `${environment.apiUrl}/detections`;

  constructor(private http: HttpClient) {}

  getAllDetections(): Observable<Detection[]> {
    return this.http.get<Detection[]>(this.apiUrl);
  }

  getDetectionById(id: number): Observable<Detection> {
    return this.http.get<Detection>(`${this.apiUrl}/${id}`);
  }

  createDetection(request: DetectionRequest): Observable<Detection> {
    return this.http.post<Detection>(this.apiUrl, request);
  }

  confirmDetection(id: number): Observable<Detection> {
    return this.http.put<Detection>(`${this.apiUrl}/${id}/confirm`, {});
  }

  deleteDetection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
