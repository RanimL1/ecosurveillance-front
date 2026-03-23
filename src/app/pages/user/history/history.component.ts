import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProofViewerComponent } from '../../../components/proof-viewer/proof-viewer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule,RouterModule, ProofViewerComponent],
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

  openProofs(id: number) {
    this.selectedInfractionId = id;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedInfractionId = null;
  }

}
