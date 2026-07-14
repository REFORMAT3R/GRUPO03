import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
 
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
 
@Component({
  selector: 'app-recepcionista-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  templateUrl: './recepcionista-layout.component.html',
  styleUrl: './recepcionista-layout.component.css'
})
export class RecepcionistaLayoutComponent {}