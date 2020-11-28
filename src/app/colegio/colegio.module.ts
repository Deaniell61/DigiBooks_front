import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { LoadersCssModule } from 'angular2-loaders-css';

import { ColegioRoutingModule } from './colegio.routing';
import { NavComponent } from './nav.component';

import { StudentGuard } from "./../_guards/student.guard";
import { TutorGuard } from "./../_guards/tutor.guard";
import { TeacherGuard } from "./../_guards/teacher.guard";
import { AdminGuard } from "./../_guards/admin.guard";
import { UsuariosService } from "./admin/_services/usuarios.service";
import { NotificacionesService } from "./maestro/_services/notificaciones.service";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadersCssModule,
    ColegioRoutingModule
  ],
  declarations: [NavComponent],
  providers: [
    StudentGuard,
    TutorGuard,
    TeacherGuard,
    AdminGuard,
    UsuariosService,
    NotificacionesService
  ]
})
export class ColegioModule { }
