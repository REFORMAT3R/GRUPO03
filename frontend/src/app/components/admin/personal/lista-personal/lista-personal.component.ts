import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { PersonalService } from '../../../../services/personal.service';
import { Personal } from '../../../../models/personal';

@Component({
  selector: 'app-lista-personal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-personal.component.html',
  styleUrl: './lista-personal.component.css'
})
export class ListaPersonalComponent implements OnInit {

  personal: Personal[] = [];

  constructor(
    private personalService: PersonalService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerPersonal();
  }

  obtenerPersonal(): void {

    this.personalService.getPersonal().subscribe({

      next: (data: Personal[]) => {

        this.personal = data;
        this.cdr.detectChanges();

      },

      error: (err) => console.error(err)

    });

  }

  editarPersonal(p: Personal): void {

    this.personalService.setPersonalEditar(p);

    this.router.navigate([
      '/admin/personal/editar'
    ]);

  }

  eliminarPersonal(id: number): void {

    if (confirm('¿Desea eliminar este miembro del personal?')) {

      this.personalService.eliminarPersonal(id).subscribe({

        next: () => {

          alert('Personal eliminado correctamente');
          this.obtenerPersonal();

        },

        error: (err) => console.error(err)

      });

    }

  }

}