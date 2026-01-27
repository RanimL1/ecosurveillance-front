import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  name: string;
  email: string;
  matricule: string;
  infractions: number;
  totalFines: number;
  status: 'Actif' | 'Inactif';
}

@Component({
  selector: 'app-admin-etudiants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class AdminEtudiantsComponent implements OnInit {
  // Données initiales (exemple)
  students: Student[] = [
    { name: 'Ahmed Ben Ali', email: 'ahmed.benali@ensi.com', matricule: '2023001', infractions: 2, totalFines: 50, status: 'Actif' },
    { name: 'Fatima Zahra', email: 'fatima.zahra@ensi.com', matricule: '2023002', infractions: 0, totalFines: 0, status: 'Actif' },
    { name: 'Mohamed Salah', email: 'mohamed.salah@ensi.com', matricule: '2023003', infractions: 5, totalFines: 125, status: 'Inactif' },
    { name: 'Salma Karray', email: 'salma.karray@ensi.com', matricule: '2023004', infractions: 1, totalFines: 25, status: 'Actif' },
    { name: 'Youssef Ben Ammar', email: 'youssef.benammar@ensi.com', matricule: '2023005', infractions: 3, totalFines: 75, status: 'Actif' },
    { name: 'Leila Trabelsi', email: 'leila.trabelsi@ensi.com', matricule: '2023006', infractions: 0, totalFines: 0, status: 'Actif' },
    { name: 'Karim Bouazizi', email: 'karim.bouazizi@ensi.com', matricule: '2023007', infractions: 2, totalFines: 50, status: 'Inactif' },
    { name: 'Sonia Chennoufi', email: 'sonia.chennoufi@ensi.com', matricule: '2023008', infractions: 4, totalFines: 100, status: 'Actif' },
    { name: 'Riadh Ksouri', email: 'riadh.ksouri@ensi.com', matricule: '2023009', infractions: 1, totalFines: 25, status: 'Actif' },
    { name: 'Nadia Baccouche', email: 'nadia.baccouche@ensi.com', matricule: '2023010', infractions: 0, totalFines: 0, status: 'Actif' },
    { name: 'Hichem Mansouri', email: 'hichem.mansouri@ensi.com', matricule: '2023011', infractions: 3, totalFines: 75, status: 'Inactif' },
    { name: 'Amira Ferchichi', email: 'amira.ferchichi@ensi.com', matricule: '2023012', infractions: 2, totalFines: 50, status: 'Actif' }
  ];

  // Variables de recherche et filtrage
  searchTerm: string = '';
  selectedStatus: string = 'Tous';
  filteredStudents: Student[] = [];
  paginatedStudents: Student[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5; // Réduit à 5 pour voir la pagination
  totalPages: number = 1;

  ngOnInit(): void {
    this.filteredStudents = [...this.students];
    this.updatePagination();
  }

  // Méthode pour filtrer les étudiants
  filterStudents(): void {
    this.filteredStudents = this.students.filter(student => {
      // Filtre par recherche
      const searchMatch =
        this.searchTerm === '' ||
        student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.matricule.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filtre par statut
      const statusMatch =
        this.selectedStatus === 'Tous' ||
        student.status === this.selectedStatus;

      return searchMatch && statusMatch;
    });

    this.currentPage = 1; // Réinitialiser à la première page
    this.updatePagination();
  }

  // Mise à jour de la pagination
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredStudents.length / this.itemsPerPage);

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedStudents = this.filteredStudents.slice(startIndex, endIndex);
  }

  // Calcul des statistiques
  getStats(): { total: number, active: number, totalInfractions: number, totalFines: number } {
    const total = this.filteredStudents.length;
    const active = this.filteredStudents.filter(s => s.status === 'Actif').length;
    const totalInfractions = this.filteredStudents.reduce((sum, student) => sum + student.infractions, 0);
    const totalFines = this.filteredStudents.reduce((sum, student) => sum + student.totalFines, 0);

    return { total, active, totalInfractions, totalFines };
  }

  // Classe CSS pour les amendes
  getFineClass(fines: number): string {
    if (fines === 0) return 'fine-zero';
    if (fines <= 50) return 'fine-low';
    if (fines <= 100) return 'fine-medium';
    return 'fine-high';
  }

  // Méthode pour générer le tableau des pages
  getPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i);
  }

  // Navigation de pagination
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  // Méthode pour ajouter un étudiant
  addStudent(): void {
    console.log('Ajouter un étudiant');
    // Implémentez la logique d'ajout ici
  }

  // Méthodes d'actions
  viewProfile(student: Student): void {
    console.log('Voir profil:', student);
    // Implémentez la navigation vers le profil
  }

  editStudent(student: Student): void {
    console.log('Modifier:', student);
    // Implémentez la logique de modification
  }

  deleteStudent(student: Student): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${student.name} ?`)) {
      const index = this.students.findIndex(s => s.matricule === student.matricule);
      if (index !== -1) {
        this.students.splice(index, 1);
        this.filterStudents(); // Re-filtrer après suppression
      }
    }
  }
}
