export interface User {
  id?: number;
  nom: string;
  email: string;
  password?: string;
  role: 'ADMIN' | 'ETUDIANT';
  matricule?: string;
  createdAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: 'ADMIN' | 'ETUDIANT';
  matricule: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  nom: string;
  role: 'ADMIN' | 'ETUDIANT';
}
