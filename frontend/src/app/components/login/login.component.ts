import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  credenciales = { usuario: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  ingresar() {
    this.authService.iniciarSesion(this.credenciales).subscribe({
      next: (res) => {
        
        this.router.navigate(['/pacientes']);
      },
      error: (err) => {
        
        alert('Error: Usuario o contraseña incorrectos.');
      }
    });
  }
}