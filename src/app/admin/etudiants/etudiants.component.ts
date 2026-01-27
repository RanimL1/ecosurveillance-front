import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  email: string;
  matricule: string;
  infractions: number;
  totalFines: number;
  status: string;
}

@Component({
  selector: 'app-admin-etudiants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class AdminEtudiantsComponent implements OnInit {
  // Variables en anglais pour correspondre au template
  students: Student[] = [
    { id: 1, name: 'Foulen Ben Foulen', email: 'foulen@gmail.com', matricule: 'ETU001', infractions: 2, totalFines: 100, status: 'Actif' },
    { id: 2, name: 'Ali Ben Mohamed', email: 'ali@gmail.com', matricule: 'ETU002', infractions: 4, totalFines: 75, status: 'Actif' },
    { id: 3, name: 'Salah Ben Ahmed', email: 'salah@gmail.com', matricule: 'ETU003', infractions: 5, totalFines: 200, status: 'Inactif' },
    { id: 4, name: 'Mariem Ben Salah', email: 'mariem@gmail.com', matricule: 'ETU004', infractions: 1, totalFines: 45, status: 'Actif' },
    { id: 5, name: 'Ahmed Ben Ali', email: 'ahmed@gmail.com', matricule: 'ETU005', infractions: 3, totalFines: 30, status: 'Actif' },
    { id: 6, name: 'Fatma Ben Hassan', email: 'fatma@gmail.com', matricule: 'ETU006', infractions: 0, totalFines: 0, status: 'Actif' },
    { id: 7, name: 'Hassan Ben Omar', email: 'hassan@gmail.com', matricule: 'ETU007', infractions: 2, totalFines: 40, status: 'Inactif' },
    { id: 8, name: 'Omar Ben Foulen', email: 'omar@gmail.com', matricule: 'ETU008', infractions: 6, totalFines: 150, status: 'Actif' }
  ];

  filteredStudents: Student[] = [...this.students];
  searchTerm: string = '';
  selectedStatus: string = 'Tous';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  ngOnInit(): void {
    this.filterStudents();
  }

  // Cette méthode doit exister
  getStats() {
    return {
      total: this.students.length,
      active: this.students.filter(s => s.status === 'Actif').length,
      totalInfractions: this.students.reduce((sum, s) => sum + s.infractions, 0),
      totalFines: this.students.reduce((sum, s) => sum + s.totalFines, 0)
    };
  }

  // Cette méthode doit exister
  filterStudents(): void {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = !this.searchTerm ||
        student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.matricule.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = this.selectedStatus === 'Tous' ||
        student.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
    this.updatePagination();
  }

  // Cette méthode doit exister
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredStudents.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
  }

  // Cette méthode doit exister (correction du nom)
  get paginatedStudents(): Student[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredStudents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Cette méthode doit exister
  getFineClass(fine: number): string {
    if (fine === 0) return 'small';
    if (fine < 50) return 'small';
    if (fine < 100) return 'medium';
    return 'high';
  }

  // Méthodes de pagination
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Méthode pour les numéros de page
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  // Méthodes d'actions
  viewStudent(id: number): void {
    alert(`Voir profil étudiant #${id}`);
  }

  editStudent(id: number): void {
    alert(`Modifier étudiant #${id}`);
  }

  deleteStudent(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      this.students = this.students.filter(s => s.id !== id);
      this.filterStudents();
    }
  }
}
