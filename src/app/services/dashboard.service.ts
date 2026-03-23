import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { InfractionService } from './infraction.service';
import { UserService } from './user.service';
import { DashboardStats } from '../models/dashboard.model';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class DashboardService {

  constructor(
    private infractionService: InfractionService,
    private userService: UserService
  ) {}

  getDashboardStats(): Observable<DashboardStats> {
    return forkJoin({
      totalInfractions: this.infractionService.getInfractionsCount(),
      totalEtudiants: this.userService.getUsersCount(),
      infractionsEnAttente: this.infractionService.getInfractionsEnAttente().pipe(
        // On ne veut que le nombre
        map(infractions => infractions.length)
      ),
      infractionsValidees: this.infractionService.getInfractionsValidees().pipe(
        map(infractions => infractions.length)
      )
    });
  }
}
