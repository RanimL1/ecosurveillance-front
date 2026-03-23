import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  selectedUser: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((res: any[]) => {
      this.users = res;
    });
  }

  addUser() {
    this.selectedUser = null;
  }

  editUser(user: any) {
    this.selectedUser = { ...user };
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter(u => u.id !== userId);
    });
  }

  onFormSaved() {
    this.selectedUser = null;
    this.loadUsers();
  }
}
