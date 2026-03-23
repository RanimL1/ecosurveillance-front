import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfractionService } from '../../../services/infraction.service';
import { InfractionTableComponent } from '../../../components/infraction-table/infraction-table.component';

@Component({
  selector: 'app-infractions',
  standalone: true,
  imports: [CommonModule, RouterModule, InfractionTableComponent],
  templateUrl: './infractions.component.html',
  styleUrls: ['./infractions.component.css']
})
export class InfractionsComponent implements OnInit {
  infractions: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private infractionService: InfractionService) {}

  ngOnInit(): void {
    // On simule une réponse immédiate avec les données de l'image 3
    this.infractions = [
      { etudiantNom: 'Foulen ben Foulen', date: '2025-05-01', status: 'TERMINE', punitionDescription: '-' },
      { etudiantNom: 'Foulen ben Foulen', date: '2025-08-02', status: 'EN_ATTENTE', punitionDescription: '-' }
    ];
    this.loading = false;
    this.error = null;
  }

  loadInfractions() {
    this.loading = true;
    this.error = null;
    this.infractionService.getInfractions().subscribe({
      next: (res: any[]) => {
        this.infractions = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Impossible de charger les infractions';
        this.loading = false;
      }
    });
  }

  editInfraction(infraction: any) {
    console.log('Edit', infraction);
    // tu peux ouvrir un modal ou une page d'édition ici
  }

  deleteInfraction(id: number) {
    this.infractionService.deleteInfraction(id).subscribe(() => {
      this.infractions = this.infractions.filter(i => i.id !== id);
    });
  }
}
