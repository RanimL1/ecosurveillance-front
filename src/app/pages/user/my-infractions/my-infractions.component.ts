import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProofViewerComponent } from '../../../components/proof-viewer/proof-viewer.component';

@Component({
  selector: 'app-my-infractions',
  standalone: true,
  imports: [CommonModule, RouterModule, ProofViewerComponent],
  templateUrl: './my-infractions.component.html',
  styleUrls: ['./my-infractions.component.css']
})
export class MyInfractionsComponent {

  // Liste des punitions disponibles pour l'admin
  private punitionsDisponibles: string[] = [
    'Nettoyage du jardin de la faculté',
    'Arrosage des plantes ',
    'Tri des déchets (1h)',
    'Organisation de la bibliothèque',
    'Vérification de l\'extinction des lumières'
  ];

  infractions = [
    { id: 1, description: '-', date: new Date('2026-01-02'), punition: '-', status: 'En attente' },
    { id: 2, description: '-', date: new Date('2026-01-06'), punition: '-', status: 'Terminé' },
    { id: 3, description: '-', date: new Date('2026-01-06'), punition: '-', status: 'Terminé' }
  ];

  selectedInfractionId: number | null = null;

  constructor(private router: Router) {}

  /**
   * Valide l'infraction et attribue une punition aléatoire
   */
  valider(infraction: any): void {
    if (infraction.status === 'En attente') {
      // 1. Mise à jour du statut
      infraction.status = 'En cours';

      // 2. Sélection aléatoire d'une punition
      const randomIndex = Math.floor(Math.random() * this.punitionsDisponibles.length);
      infraction.punition = this.punitionsDisponibles[randomIndex];

      console.log(`Infraction ${infraction.id} validée avec la punition : ${infraction.punition}`);
    }
  }

  /**
   * Déconnexion
   */
  onLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  openProofs(id: number) {
    this.selectedInfractionId = id;
  }

  closeModal() {
    this.selectedInfractionId = null;
  }

  get showModal(): boolean {
    return this.selectedInfractionId !== null;
  }
}
