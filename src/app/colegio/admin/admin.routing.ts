import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CiclosComponent } from "./ciclos/ciclos.component";
import { CursosComponent } from "./cursos/cursos.component";
import { EstudiantesComponent } from "./estudiantes/estudiantes.component";
import { GradosComponent } from "./grados/grados.component";
import { JornadasComponent } from "./jornadas/jornadas.component";
import { MaestrosComponent } from "./maestros/maestros.component";
import { TutoresComponent } from "./tutores/tutores.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { UsuariosTipoComponent } from "./usuarios-tipo/usuarios-tipo.component";
import { EventosTipoComponent } from './eventos-tipo/eventos-tipo.component';
import { EventosComponent } from './eventos/eventos.component';
import { CargosComponent } from './cargos/cargos.component';

import { AsignarEstudiantesTutoresComponent } from "./asignar-estudiantes-tutores/asignar-estudiantes-tutores.component";
import { AsignarCicloJornadaComponent } from "./asignar-ciclo-jornada/asignar-ciclo-jornada.component";
import { AsignarJornadaGradosComponent } from "./asignar-jornada-grados/asignar-jornada-grados.component";
import { AsignarGradoMateriasComponent } from "./asignar-grado-materias/asignar-grado-materias.component";
import { AsignarMateriaMaestrosComponent } from "./asignar-materia-maestros/asignar-materia-maestros.component";

import { InscribirAlumnoComponent } from "./inscribir-alumno/inscribir-alumno.component";
import { InscripcionJornadaComponent } from "./inscripcion-jornada/inscripcion-jornada.component";
import { ProfileComponent } from "./profile/profile.component";


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  
  { path: '', component: AdminComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'ciclos', component: CiclosComponent },
    { path: 'cursos', component: CursosComponent },
    { path: 'estudiantes', component: EstudiantesComponent },
    { path: 'grados', component: GradosComponent },
    { path: 'jornadas', component: JornadasComponent },
    { path: 'maestros', component: MaestrosComponent },
    { path: 'tutores', component: TutoresComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'usuarios-tipo', component: UsuariosTipoComponent },
    { path: 'eventos', component: EventosComponent },
    { path: 'eventos-tipo', component: EventosTipoComponent },
    { path: 'estudiantes-tutores', component: AsignarEstudiantesTutoresComponent },
    { path: 'ciclo-jornada', component: AsignarCicloJornadaComponent },
    { path: 'jornada-grados', component: AsignarJornadaGradosComponent },
    { path: 'grado-materias', component: AsignarGradoMateriasComponent },
    { path: 'materia-maestros', component: AsignarMateriaMaestrosComponent },
    { path: 'inscripcion-alumno', component: InscribirAlumnoComponent },
    { path: 'inscripcion-jornada', component: InscripcionJornadaComponent },
    { path: 'cargos', component: CargosComponent },
    { path: 'profile', component: ProfileComponent },
  ]},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
