export interface Camera {
  id?: number;
  nom: string;
  location: string;
  active: boolean;
  lastActive?: Date;
}

export interface CameraRequest {
  nom: string;
  location: string;
  active: boolean;
}
