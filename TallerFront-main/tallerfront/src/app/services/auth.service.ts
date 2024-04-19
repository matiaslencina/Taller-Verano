import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private tokenKey = 'token';
  private userIdKey = 'userId'; // Nuevo: Clave para almacenar el ID del usuario

  constructor(private router: Router) { }

  login(userId: number) {
    console.log('ID de usuario recibido:', userId);
    this.loggedIn = true;
    localStorage.setItem(this.userIdKey, userId.toString()); // Almacenar el ID del usuario en el almacenamiento local
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey); // Nuevo: Eliminar el ID del usuario al cerrar sesión
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUsuarioId(): number | null {
    const userId = localStorage.getItem(this.userIdKey);
    return userId ? parseInt(userId, 10) : null; // Convertir a número y devolver, si existe
  }
}
