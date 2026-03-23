import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart } from 'chart.js';
import { DashboardService } from '../../../services/dashboard.service';

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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initCharts();
  }

  initCharts() {

    // 📊 BAR CHART
    const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;

    if (barCanvas) {
      this.barChart = new Chart(barCanvas, {
        type: 'bar',
        data: {
          labels: ['Déchet', 'Eau', 'Air'],
          datasets: [
            { data: [4, 2, 1], label: 'Jan', backgroundColor: '#4285F4' },
            { data: [8, 3, 2], label: 'Fev', backgroundColor: '#DB4437' },
            { data: [6, 4, 1], label: 'Mar', backgroundColor: '#0F9D58' }
          ]
        },
        options: {
          responsive: true,
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
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }
  }
}
