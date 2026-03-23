import { User } from './user.model';

export interface Infraction {
  id: number;
  type: string;
  description: string;

  status: 'EN_ATTENTE' | 'VALIDEE' | 'REFUSEE';

  dateInfraction: Date;

  etudiant: User;

  preuveUrl?: string;     // image ou vidéo
  punition?: string;      // punition écologique
}
