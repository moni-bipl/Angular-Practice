import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  id?: number;
  name: string;
  email: string;
  age: number;
  city: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface PaginatedResponse {
  items: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Side Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Side Error: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
  constructor(private http: HttpClient) {}
  getUsers(
    search?: string,
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResponse | User[]> {
    let param: any = {};
    if (search) param.search = search;
    if (page) param.page = page;
    if (limit) param.limit = limit;

    return this.http
      .get<PaginatedResponse | User[]>(this.apiUrl, {})
      .pipe(catchError(this.handleError));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(catchError(this.handleError));
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(catchError(this.handleError));
  }

  deletedUser(id: number) {
    return this.http.delete<User>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }
}

import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })


export class UserStateService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  users$ = this.usersSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  constructor(private userService: UserService) {}


  loadUsers(search?: string, page: number = 1, limit: number = 10) {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    this.userService.getUsers(search, page, limit).subscribe({
      next: (data) => {
        const users = Array.isArray(data) ? data : data.items;
        this.usersSubject.next(users);
        this.loadingSubject.next(false);
      },
      error: (error) => {
        this.errorSubject.next(error.message);
        this.loadingSubject.next(false);
      },
    });
  }
  
  addUser(user: User) {
    this.userService.createUser(user).subscribe({
      next: (newUser) => {
        const currentUsers = this.usersSubject.value;
        this.usersSubject.next([...currentUsers, newUser]);
      },
      error: (error) => this.errorSubject.next(error.message),
    });
  }
  updateUser(id: number, user: User) {
    this.userService.updateUser(id, user).subscribe({
      next: (updatedUser) => {
        const currentUsers = this.usersSubject.value;
        const index = currentUsers.findIndex((u) => u.id === id);
        if (index !== -1) {
          currentUsers[index] = updatedUser;
          this.usersSubject.next([...currentUsers]);
        }
      },
      error: (error) => this.errorSubject.next(error.message),
    });
  }
  deleteUser(id: number) {
    this.userService.deletedUser(id).subscribe({
      next: () => {
        const currentUsers = this.usersSubject.value;
        this.usersSubject.next(currentUsers.filter((u) => u.id !== id));
      },
      error: (error:any) => this.errorSubject.next(error.message),
    });
  }
}
