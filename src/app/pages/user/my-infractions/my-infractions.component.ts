import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProofViewerComponent } from '../../../components/proof-viewer/proof-viewer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-infractions',
  standalone: true,
  imports: [CommonModule, RouterModule, ProofViewerComponent],
  templateUrl: './my-infractions.component.html',
  styleUrls: ['./my-infractions.component.css']
})
export class MyInfractionsComponent {

  infractions = [
    { id: 1, description: '-', date: new Date('2026-01-02'), punition: '-', status: 'En attente' },
    { id: 2, description: '-', date: new Date('2026-01-06'), punition: '-', status: 'Terminé' },
    { id: 3, description: '-', date: new Date('2026-01-06'), punition: '-', status: 'Terminé' }
  ];

  selectedInfractionId: number | null = null;

  // Ouvre le modal
  openProofs(id: number) {
    this.selectedInfractionId = id;
  }

  // Ferme le modal
  closeModal() {
    this.selectedInfractionId = null;
  }

  // Méthode helper pour le *ngIf dans le template
  get showModal(): boolean {
    return this.selectedInfractionId !== null;
  }
}
