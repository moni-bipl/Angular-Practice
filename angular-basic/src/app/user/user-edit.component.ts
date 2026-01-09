import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserStateService } from '../service/user.service';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  user: User | null = null;
  loading = true;
  error: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userStateService: UserStateService
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUser(parseInt(id));
    } else {
      this.error = 'No user ID provided';
      this.loading = false;
    }
  }
  loadUser(id: number) {
    this.userStateService.users$.subscribe((users) => {
      const user = users.find((u) => u.id === id);
      if (user) {
        this.user = user;
        this.loading = false;
      } else {
        this.userStateService.loadUsers();
      }
    });
  }
  onFormSubmit(userData: User) {
    if (this.user?.id) {
      this.userStateService.updateUser(this.user.id, userData);
      this.router.navigate(['/users']);
    }
  }
  onCancel() {
    this.router.navigate(['/users']);
  }
}
