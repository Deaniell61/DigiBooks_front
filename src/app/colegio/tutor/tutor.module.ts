import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DataTableModule } from "angular2-datatable";

import { TutorRoutingModule } from './tutor.routing';
import { TutorComponent } from './tutor.component';
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
import { TutorsService } from '../admin/_services/tutors.service';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { CursosAlumnoComponent } from './cursos-alumno/cursos-alumno.component';
import { TareasCursoComponent } from './tareas-curso/tareas-curso.component';
import { AlumnosService } from './_services/alumnos.service';
import { CursosAlumnoService } from './_services/cursos-alumno.service';
import { TareasCursoService } from './_services/tareas-curso.service';
import { CobrosComponent } from './cobros/cobros.component';
import { CobrosService } from './_services/cobros.service';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosService } from './../admin/_services/usuarios.service';
import { DigibooksComponent } from './digibooks/digibooks.component';
import { ComponentesModule } from './../componentes/componentes.module';
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
    ComponentesModule,
    CalendarModule,
    TutorRoutingModule
  ],
  declarations: [
    TutorComponent,
    DashboardComponent,
    LoaderComponent,
    AlumnosComponent,
    CursosAlumnoComponent,
    TareasCursoComponent,
    CobrosComponent, ProfileComponent, DigibooksComponent
  ],
  providers: [
    EventsService,
    UsuariosService,
    TutorsService,
    CursosAlumnoService,
    TareasCursoService,
    CobrosService,
    AlumnosService
  ]
})
export class TutorModule { }
