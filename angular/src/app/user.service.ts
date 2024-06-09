import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];
  private apiUrl = 'http://localhost:3000/api/users';
  private usersSubject = new BehaviorSubject<any[]>([]);


  constructor(private http: HttpClient) {
    this.getUsers(); // Call getUsers initially to fetch users

   }

   getUsers(): Observable<any[]> {
    this.http.get<any[]>(this.apiUrl).subscribe(users => {
      this.users = users;
      this.usersSubject.next(users); // Emit changes to subscribers
    });
    return this.usersSubject.asObservable();
  }
  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, user);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  updateUser(id: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }
  
  // addUser(user: any) {
  //   this.users.push(user);
  // }

  // getUsers() {
  //   return this.users;
  // }
}
