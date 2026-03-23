import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // 1. Ajout de Router ici
import { Chart, registerables } from 'chart.js'; // 2. Ajout de registerables pour éviter les erreurs de rendu
import { DashboardService } from '../../../services/dashboard.service';

Chart.register(...registerables); // Enregistre les composants nécessaires pour Chart.js

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, AfterViewInit {

  barChart: any;
  lineChart: any;

  // 3. Injection du Router dans le constructeur
  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initCharts();
  }

  /**
   * Logique de déconnexion
   */
  onLogout(): void {
    // Nettoyage de la session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();

    // Redirection vers la page de connexion
    this.router.navigate(['/login']);
  }

  initCharts() {
    // 📊 BAR CHART
    const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;

    if (barCanvas) {
      this.barChart = new Chart(barCanvas, {
        type: 'bar',
        data: {
          labels: ['En-attente', 'Terminée'],
          datasets: [
            { data: [4, 2], label: 'Jan', backgroundColor: '#4285F4' },
            { data: [8, 3], label: 'Fev', backgroundColor: '#DB4437' },
            { data: [6, 4], label: 'Mar', backgroundColor: '#0F9D58' }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Recommandé pour le contrôle de la taille
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }

    // 📈 LINE CHART
    const lineCanvas = document.getElementById('lineChart') as HTMLCanvasElement;

    if (lineCanvas) {
      this.lineChart = new Chart(lineCanvas, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin'],
          datasets: [{
            data: [14, 22, 18, 28, 24, 19],
            label: 'Infractions',
            borderColor: '#4285F4',
            backgroundColor: 'rgba(66,133,244,0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }
  }
}
