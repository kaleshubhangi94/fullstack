import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  // users: any;
  ngOnChanges(changes: SimpleChanges) {
    console.log('Input Changes:', changes);
  }
  
  @Input() users: any[] = [];
  @Output() userEdited = new EventEmitter<any>();
  @Output() userDeleted = new EventEmitter<any>();
  editingUser: any = null;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(id: string, user: any) {
    console.log('Editing user:', id, user);
    console.log('Updating user:', id, user); // Add this line
    this.editingUser = { ...user }; // Set editingUser to a copy of the user being edited

    this.userService.updateUser(id, user).subscribe(
      response => {
        console.log('User updated:', response);
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }
  
  

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      response => {
        console.log('User deleted:', response);
        this.users = this.users.filter(user => user.id !== id);

      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }

  saveUserChanges() {
    const index = this.users.findIndex(user => user.id === this.editingUser.id);
    if (index !== -1) {
      this.users[index] = { ...this.editingUser };
      this.editingUser = null;
    }
  }

  cancelEdit() {
    this.editingUser = null;
  }


    // deleteUser(user: any) {
    //   this.users = this.users.filter(u => u !== user);
    // }
  generatePDF() {
    const doc = new jsPDF();
    let y = 10;
    this.users.forEach(user => {
      doc.text(`Name: ${user.name}`, 10, y);
      doc.text(`Email: ${user.email}`, 10, y + 10);
      doc.text(`Phone: ${user.phone}`, 10, y + 20);
      doc.text(`Address: ${user.address}`, 10, y + 30);
      y += 40;
    });
    doc.save('users.pdf');
  }

  downloadPDF() {
    // PDF download logic (using `jspdf` library)
  const doc = new jsPDF();
  let y = 10;
  this.users.forEach(user => {
    doc.text(`Name: ${user.name}`, 10, y);
    doc.text(`Email: ${user.email}`, 10, y + 10);
    doc.text(`Phone: ${user.phone}`, 10, y + 20);
    doc.text(`Address: ${user.address}`, 10, y + 30);
    y += 40;
  });
  doc.save('users.pdf');
  }

  viewPDF() {
    this.generatePDF(); 
  }
}
