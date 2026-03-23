import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProofViewerComponent } from '../../../components/proof-viewer/proof-viewer.component';
import { RouterModule, Router } from '@angular/router'; // Ajout de Router

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterModule, ProofViewerComponent],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  infractions = [
    { id: 1, description: '-', date: new Date('2025-12-15'), punition: '-', status: 'Terminé' },
    { id: 2, description: '-', date: new Date('2025-11-01'), punition: '-', status: 'Terminé' },
  ];

  showModal = false;
  selectedInfractionId: number | null = null;

  // Injection du Router dans le constructeur
  constructor(private router: Router) {}

  /**
   * Logique de déconnexion pour le footer de la sidebar
   */
  onLogout(): void {
    // Nettoyage de la session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();

    // Redirection vers l'écran de connexion
    this.router.navigate(['/login']);
    console.log('Déconnexion réussie depuis l\'historique');
  }

  openProofs(id: number) {
    this.selectedInfractionId = id;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedInfractionId = null;
  }
}
