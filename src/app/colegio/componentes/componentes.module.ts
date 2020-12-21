import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadersCssModule } from 'angular2-loaders-css';
import { DigibooksComponent } from './digibooks/digibooks.component';
import { CrearLibroComponent } from './crear-libro/crear-libro.component';
import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { DetalleLibroComponent } from './detalle-libro/detalle-libro.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
@NgModule({
  imports: [
    CommonModule,
    SimpleNotificationsModule.forRoot(),
    FormsModule,
    LoadersCssModule,
  ],
  declarations: [
    DigibooksComponent,
    CrearLibroComponent,
    ListaLibrosComponent,
    DetalleLibroComponent
  ],
  exports: [
    DigibooksComponent,
    CrearLibroComponent,
    ListaLibrosComponent,
    DetalleLibroComponent
  ]
})
export class ComponentesModule { }
