import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Camera, CameraRequest } from '../models/camera.model';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private apiUrl = `${environment.apiUrl}/cameras`;

  constructor(private http: HttpClient) {}

  getAllCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.apiUrl);
  }

  getCameraById(id: number): Observable<Camera> {
    return this.http.get<Camera>(`${this.apiUrl}/${id}`);
  }

  getActiveCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>(`${this.apiUrl}/active`);
  }

  createCamera(request: CameraRequest): Observable<Camera> {
    return this.http.post<Camera>(this.apiUrl, request);
  }

  updateCamera(id: number, request: CameraRequest): Observable<Camera> {
    return this.http.put<Camera>(`${this.apiUrl}/${id}`, request);
  }

  deleteCamera(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleCameraStatus(id: number): Observable<Camera> {
    return this.http.put<Camera>(`${this.apiUrl}/${id}/toggle`, {});
  }
}
