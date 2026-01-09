import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User, UserStateService } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading = false;
  error: string | null = null;
  searchTerm = '';
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;
  private destroy$ = new Subject<void>();
  constructor(private userStateService: UserStateService) {}
  ngOnInit() {
    this.loadUsers();
    this.userStateService.users$
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => (this.users = users));
    this.userStateService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => (this.loading = loading));
    this.userStateService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => (this.error = error));
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadUsers() {
    this.userStateService.loadUsers(this.searchTerm, this.currentPage, this.itemsPerPage);
  }
  onSearch() {
    this.currentPage = 1;
    this.loadUsers();
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadUsers();
  }
  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userStateService.deleteUser(id);
    }
  }
  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
