import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DataTableModule } from "angular2-datatable";

import { EstudianteRoutingModule } from './estudiante.routing';
import { EstudianteComponent } from './estudiante.component';
import { FileUploadModule } from 'ng2-file-upload';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { LoadersCssModule } from 'angular2-loaders-css';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarModule } from 'ap-angular2-fullcalendar';
import { EventsService } from '../admin/_services/events.service';
import { LoaderComponent } from './loader/loader.component';
import { StudentsService } from '../admin/_services/students.service';
import { CursosComponent } from './cursos/cursos.component';
import { CursoDetalleComponent } from './curso-detalle/curso-detalle.component';
import { CursosService } from './_services/cursos.service';
import { CursoDetalleService } from './_services/curso-detalle.service';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosService } from './../admin/_services/usuarios.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule, 
    ChartsModule,
    FileUploadModule,
    SimpleNotificationsModule.forRoot(),  
    Ng2SearchPipeModule, 
    Ng2DragDropModule.forRoot(),
    LoadersCssModule,  
    CalendarModule,
    EstudianteRoutingModule
  ],
  declarations: [
    EstudianteComponent, 
    DashboardComponent, 
    LoaderComponent, 
    CursosComponent, 
    CursoDetalleComponent, ProfileComponent
  ],
  providers: [
    EventsService,
    UsuariosService,
    StudentsService, 
    CursosService,
    CursoDetalleService
  ]
})
export class EstudianteModule { }
