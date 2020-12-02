import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';

import { MaestroRoutingModule } from './maestro.routing';
import { MaestroComponent } from './maestro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CursosComponent } from './cursos/cursos.component';
import { DetalleAlumnoComponent } from './detalle-alumno/detalle-alumno.component';
import { TareasComponent } from './tareas/tareas.component';
import { CursoAlumnosComponent } from './curso-alumnos/curso-alumnos.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { LoaderComponent } from './loader/loader.component';

import { CalendarModule } from 'ap-angular2-fullcalendar';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { LoadersCssModule } from 'angular2-loaders-css';

import { EventsService } from './../admin/_services/events.service';
import { CursosService } from './_services/cursos.service';
import { CursoAlumnosService } from './_services/curso-alumnos.service';
import { AsistenciasService } from './_services/asistencias.service';
import { TareasService } from './_services/tareas.service';
import { RecomendacionesService } from './_services/recomendaciones.service';
import { NotificacionesService } from './_services/notificaciones.service';
import { TeachersService } from '../admin/_services/teachers.service';
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
    SimpleNotificationsModule.forRoot(),
    Ng2SearchPipeModule,
    Ng2DragDropModule.forRoot(),
    LoadersCssModule,
    ComponentesModule,
    CalendarModule,
    MaestroRoutingModule
  ],
  declarations: [
    MaestroComponent,
    DashboardComponent,
    CursosComponent,
    DetalleAlumnoComponent,
    TareasComponent,
    CursoAlumnosComponent,
    AsistenciaComponent,
    LoaderComponent,
    ProfileComponent,
    DigibooksComponent
  ],
  providers: [
    EventsService,
    UsuariosService,
    TeachersService,
    CursosService,
    CursoAlumnosService,
    NotificacionesService,
    AsistenciasService,
    TareasService,
    RecomendacionesService
  ]
})
export class MaestroModule { }
