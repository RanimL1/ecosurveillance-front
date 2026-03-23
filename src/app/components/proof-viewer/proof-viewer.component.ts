import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Proof {
  type: 'image' | 'video';
  url: string;
}

@Component({
  selector: 'app-proof-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proof-viewer.component.html',
  styleUrls: ['./proof-viewer.component.css']
})
export class ProofViewerComponent {
  // Infraction sélectionnée
  @Input() infractionId!: number; // <-- attention ! ne pas mettre | null ici
  @Output() closeEvent = new EventEmitter<void>();

  selectedProof: Proof | null = null;

  proofs: Proof[] = [];

  ngOnChanges() {
    if (this.infractionId) {
      // Simuler récupération des preuves depuis l'infraction
      this.proofs = [
        { type: 'image', url: 'assets/proof1.jpg' },
        { type: 'video', url: 'assets/proof2.mp4' }
      ];
      this.selectedProof = null;
    }
  }

  openPreview(proof: Proof) {
    this.selectedProof = proof;
  }

  closePreview() {
    this.selectedProof = null;
    this.closeEvent.emit();
  }
}
