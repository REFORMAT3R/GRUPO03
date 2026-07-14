import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  private authService = inject(AuthService);
  private router = inject(Router);


  username: string = '';
  password: string = '';

  error: string = '';



  iniciarSesion() {


    this.error = '';


    this.authService.login(
      this.username,
      this.password

    ).subscribe({

      next: (perfil) => {


        console.log(
          'Usuario:',
          perfil
        );


        this.router.navigate([
          this.authService.rutaSegunRol()
        ]);


      },


      error: (err) => {


        console.error(
          err
        );


        this.error =
          'Usuario o contraseña incorrectos';


      }


    });


  }


}