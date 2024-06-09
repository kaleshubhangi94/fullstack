import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { UserManagementComponent } from './user-management/user-management.component';

export const routes: Routes = [
  { path: 'users', component: UserManagementComponent }, // Configure the route
  { path: 'form', component: FormComponent },
  { path: 'table', component: TableComponent },
  { path: '', redirectTo: 'form', pathMatch: 'full' } // Default route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
