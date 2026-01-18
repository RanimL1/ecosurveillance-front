import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    const requiredRole = route.data['role'];

    if (currentUser && (!requiredRole || currentUser.role === requiredRole)) {
      return true;
    }

    // Rediriger selon le rôle
    if (currentUser?.role === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']);
    } else if (currentUser?.role === 'ETUDIANT') {
      this.router.navigate(['/etudiant/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }

    return false;
  }
}
