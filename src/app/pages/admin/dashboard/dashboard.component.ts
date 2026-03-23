import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';
import { NgChartsModule } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
Chart.register(...registerables);

interface LocalDashboardStats {
  totalInfractions: number;
  totalEtudiants: number;
  infractionsEnAttente: number;
  infractionsValidees: number;
  infractionsAujourdhui: number;
  camerasActives: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats: LocalDashboardStats = {
    totalInfractions: 0,
    totalEtudiants: 0,
    infractionsEnAttente: 0,
    infractionsValidees: 0,
    infractionsAujourdhui: 0,
    camerasActives: 8
  };

  loading: boolean = false;
  error: string = '';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { display: true } },
      x: { grid: { display: false } }
    }
  };

  public barChartData: ChartData<'bar'> = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [{
      data: [12, 5, 4, 6, 4, 1, 2],
      backgroundColor: '#3b82f6',
      borderRadius: 5
    }]
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };

  public pieChartData: ChartData<'pie'> = {
    datasets: [{
      data: [200, 50, 100],
      backgroundColor: ['#3b82f6', '#f59e0b', '#ef4444']
    }]
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.error = '';

    this.dashboardService.getDashboardStats().subscribe({
      next: (data: any) => {
        const infractions = data.totalInfractions || [];
        const punitions = data.totalPunitions || [];

        this.stats.totalInfractions = infractions.length;
        this.stats.totalEtudiants = punitions.length;
        this.stats.infractionsEnAttente = infractions.filter((i: any) => i.status === 'EN_ATTENTE').length;
        this.stats.infractionsValidees = infractions.filter((i: any) => i.status === 'VALIDEE').length;

        const today = new Date().toISOString().split('T')[0];
        this.stats.infractionsAujourdhui = infractions.filter((i: any) => {
          return i.date && i.date.includes(today);
        }).length;

        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du dashboard', err);
        this.error = 'Impossible de charger les statistiques';
        this.loading = false;
      }
    });
  }
}
