export interface Detection {
  id?: number;
  type: string;
  detectedAt: Date;
  confirmed: boolean;
  userId?: number;
  user?: {
    id: number;
    nom: string;
    email: string;
  };
}

export interface DetectionRequest {
  type: string;
  confirmed: boolean;
  userId?: number;
}
