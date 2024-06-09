import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from '../app.routes';

@Component({
  selector: 'app-edit-user-form',
  standalone: true,
  imports: [FormsModule, // Import FormsModule here
    HttpClientModule, // Import HttpClientModule here
    MatInputModule, // Import MatInputModule here
    MatButtonModule, // Import MatButtonModule here
    MatFormFieldModule, // Import MatFormFieldModule here
    MatDialogModule, // Import MatDialogModule here
    AppRoutingModule // Import AppRoutingModul],
  ],
  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.css'
})
export class EditUserFormComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
