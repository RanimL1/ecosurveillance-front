export interface Infraction {
  id?: number;
  etudiantNom: string;
  etudiantEmail: string;
  type: 'JET_DES_DECHETS' | 'ARRACHEMENT_DES_FLEURS';
  date: Date;
  amende: number;
  status: 'PAYE' | 'NON_PAYE' | 'EN_CONSTATION';
  preuveUrl?: string;
}

export interface InfractionRequest {
  etudiantId?: number;
  etudiantEmail?: string;
  type: 'JET_DES_DECHETS' | 'ARRACHEMENT_DES_FLEURS';
  preuveUrl?: string;
}

export interface DashboardStats {
  totalInfractions: number;
  infractionsAujourdhui: number;
  amendesAujourdhui: number;
  camerasActives: number;
}

export interface EtudiantStats {
  totalInfractions: number;
  infractionsPaye: number;
  infractionsNonPaye: number;
  montantDu: number;
}

export interface EtudiantList {
  nom: string;
  email: string;
  infractions: number;
  totalAmendes: number;
}
