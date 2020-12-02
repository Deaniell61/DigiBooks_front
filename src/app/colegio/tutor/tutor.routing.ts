import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorComponent } from './tutor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { CursosAlumnoComponent } from './cursos-alumno/cursos-alumno.component';
import { TareasCursoComponent } from './tareas-curso/tareas-curso.component';
import { CobrosComponent } from './cobros/cobros.component';
import { ProfileComponent } from './profile/profile.component';
import { DigibooksComponent } from './digibooks/digibooks.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: TutorComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'alumnos/:op', component: AlumnosComponent },
      { path: 'cursos/:op/:name', component: CursosAlumnoComponent },
      { path: 'tareas/:id/:name', component: TareasCursoComponent },
      { path: 'cobros/:id/:name', component: CobrosComponent },
      { path: 'digibooks', component: DigibooksComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorRoutingModule { }
