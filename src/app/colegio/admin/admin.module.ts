import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';

import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CiclosComponent } from './ciclos/ciclos.component';
import { JornadasComponent } from './jornadas/jornadas.component';
import { MaestrosComponent } from './maestros/maestros.component';
import { GradosComponent } from './grados/grados.component';
import { CursosComponent } from './cursos/cursos.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { TutoresComponent } from './tutores/tutores.component';
import { AsignarEstudiantesTutoresComponent } from './asignar-estudiantes-tutores/asignar-estudiantes-tutores.component';
import { AsignarCicloJornadaComponent } from './asignar-ciclo-jornada/asignar-ciclo-jornada.component';
import { AsignarJornadaGradosComponent } from './asignar-jornada-grados/asignar-jornada-grados.component';
import { AsignarGradoMateriasComponent } from './asignar-grado-materias/asignar-grado-materias.component';
import { AsignarMateriaMaestrosComponent } from './asignar-materia-maestros/asignar-materia-maestros.component';
import { UsuariosTipoComponent } from './usuarios-tipo/usuarios-tipo.component';
import { EventosComponent } from './eventos/eventos.component';
import { EventosTipoComponent } from './eventos-tipo/eventos-tipo.component';
import { InscribirAlumnoComponent } from './inscribir-alumno/inscribir-alumno.component';
import { InscripcionJornadaComponent } from './inscripcion-jornada/inscripcion-jornada.component';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { LoadersCssModule } from 'angular2-loaders-css';

import { UsuariosService } from './_services/usuarios.service';
import { CyclesService } from './_services/cycles.service';
import { StudyingDaysService } from './_services/studying-days.service';
import { GradesService } from './_services/grades.service';
import { StudentsService } from './_services/students.service';
import { SubjectsService } from './_services/subjects.service';
import { TeachersService } from './_services/teachers.service';
import { TutorsService } from './_services/tutors.service';
import { EstudiantesTutoresService } from './_services/_asignaciones/estudiantes-tutores.service';
import { CiclosJornadaService } from './_services/_asignaciones/ciclos-jornada.service';
import { JornadaGradoService } from './_services/_asignaciones/jornada-grado.service';
import { GradoMateriaService } from './_services/_asignaciones/grado-materia.service';
import { MateriaMaestroService } from './_services/_asignaciones/materia-maestro.service';
import { UsersTypesService } from './_services/users-types.service';
import { EventsTypeService } from './_services/events-type.service';
import { EventsService } from './_services/events.service';
import { InscriptionsService } from './_services/_asignaciones/inscriptions.service';
import { InscriptionsStudyingDayService } from './_services/_asignaciones/inscriptions-studying-day.service';
import { ChargesService } from './_services/charges.service';

import { LoaderComponent } from './loader/loader.component';
import { CargosComponent } from './cargos/cargos.component';
import { ProfileComponent } from './profile/profile.component';


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
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsuariosComponent,
    CiclosComponent,
    JornadasComponent,
    MaestrosComponent,
    GradosComponent,
    CursosComponent,
    EstudiantesComponent,
    TutoresComponent,
    AsignarEstudiantesTutoresComponent,
    AsignarCicloJornadaComponent,
    AsignarJornadaGradosComponent,
    AsignarGradoMateriasComponent,
    AsignarMateriaMaestrosComponent,
    LoaderComponent,
    UsuariosTipoComponent,
    EventosComponent,
    EventosTipoComponent,
    InscribirAlumnoComponent,
    InscripcionJornadaComponent,
    CargosComponent, ProfileComponent
  ],
  providers: [
    UsuariosService,
    CyclesService,
    StudyingDaysService,
    GradesService,
    StudentsService,
    SubjectsService,
    TeachersService,
    TutorsService,
    EstudiantesTutoresService,
    CiclosJornadaService,
    JornadaGradoService,
    GradoMateriaService,
    MateriaMaestroService,
    UsersTypesService,
    EventsTypeService,
    EventsService,
    InscriptionsService,
    InscriptionsStudyingDayService,
    ChargesService
  ]
})
export class AdminModule { }
