import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  user: any;

  stats = {
    totalInfractions: 350,
    todayInfractions: 12,
    totalFines: 7500,
    activeCameras: 8
  };

  weeklyData = [
    { day: 'Lun', count: 45 },
    { day: 'Mar', count: 52 },
    { day: 'Mer', count: 48 },
    { day: 'Jeu', count: 55 },
    { day: 'Ven', count: 60 },
    { day: 'Sam', count: 40 },
    { day: 'Dim', count: 35 }
  ];

  // AJOUTEZ LA PROPRIÉTÉ "color" ICI :
  infractionDistribution = [
    { type: 'Jet des déchets', count: 180, percentage: 51, color: '#4caf50' },
    { type: 'Arrachement des fleurs', count: 95, percentage: 27, color: '#2196f3' },
    { type: 'Vandalisme', count: 45, percentage: 13, color: '#ff9800' },
    { type: 'Autres', count: 30, percentage: 9, color: '#9c27b0' }
  ];

  recentInfractions = [
    { student: 'Foulen Ben Foulen', type: 'Jet des déchets', date: '01/05/25', fine: '20 DT', status: 'Payé' },
    { student: 'Foulen Ben Foulen', type: 'Jet des déchets', date: '02/08/25', fine: '20 DT', status: 'Non Payé' },
    { student: 'Foulen Ben Foulen', type: 'Arrachement des fleurs', date: '01/01/26', fine: '10 DT', status: 'Non Payé' },
    { student: 'Foulen Ben Foulen', type: 'Arrachement des fleurs', date: '02/01/26', fine: '10 DT', status: 'Non Payé' },
    { student: 'Foulen Ben Foulen', type: 'Jet des déchets', date: '06/01/26', fine: '20 DT', status: 'Payé' }
  ];

  ngOnInit() {
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : { nom: 'Administrateur', role: 'ADMIN' };
  }

  getWeeklyMax(): number {
    return Math.max(...this.weeklyData.map(item => item.count));
  }
}
