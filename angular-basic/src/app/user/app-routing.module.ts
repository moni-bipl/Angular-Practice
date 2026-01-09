import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UserNewComponent } from './user-new.component';
import { UserEditComponent } from './user-edit.component';
const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserNewComponent },
  { path: 'users/:id/edit', component: UserEditComponent },
  { path: '**', redirectTo: '/users' },
];
@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
