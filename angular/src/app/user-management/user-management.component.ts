import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { TableComponent } from '../table/table.component';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';
@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule,FormComponent,TableComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

  constructor(private userService: UserService,private dialog: MatDialog) {
  }
  users: any[] = [];
  addUser(user: any) {
    this.userService.addUser(user);
    // this.users = this.userService.getUsers();
  }
  

  // editUser(user: any) {
  //   // openEditForm(user: any) {
  //     const dialogRef = this.dialog.open(EditUserFormComponent, {
  //       width: '400px', // Set the width of the dialog
  //       data: user // Pass the entire user object to the dialog
  //     });
    
  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('The dialog was closed', result);
  //       // Handle any result returned by the dialog
  //       // For example, you can update the user data in the table here
  //     });
  //   }  

  // deleteUser(user: any) {
  //   this.users = this.users.filter(u => u !== user);
  // }
}
