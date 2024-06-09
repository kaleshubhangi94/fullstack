import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'; // Import NgForm
import { UserService } from '../user.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent {
  constructor(private router: Router,private userService: UserService) {}

  // onSubmit(form: any) {
  //   this.userService.addUser(form.value);
  //   form.reset(); 
  //   this.router.navigate(['/table']);

  // }
  onSubmit(formData: any) {
    console.log(formData);
    const userData = formData.value;

    this.userService.addUser(userData).subscribe(
      (response: any) => {
        console.log('User added successfully:', response);
        this.router.navigate(['/table']);
        // Optionally, you can navigate to another page after successful submission
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
  }
}