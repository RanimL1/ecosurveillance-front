export interface FaceVector {
  id?: number;
  userId: number;
  vector: string;
  user?: {
    id: number;
    nom: string;
    email: string;
  };
}

export interface FaceVectorRequest {
  userId: number;
  vector: string;
}