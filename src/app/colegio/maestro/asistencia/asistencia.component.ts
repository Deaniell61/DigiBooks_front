import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { CursoAlumnosService } from './../_services/curso-alumnos.service';
import { AsistenciasService } from './../_services/asistencias.service';
import { TareasService } from './../_services/tareas.service';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/switchMap';
import { NotificacionesService } from '../_services/notificaciones.service';

declare var $: any;

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
  @Input() id: any;
  @Input() name: any;
  selectedData: any;
  Table: any;
  title = '';
  idSubject: any = '';
  public rowsOnPage = 5;
  public search: any;
  today: any;
  date: any;
  view = 1;
  public options = {
    position: ['bottom', 'right'],
    timeOut: 2000,
    lastOnBottom: false,
    animate: 'fromLeft',
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private mainService: AsistenciasService,
    private HChildService: TareasService,
    private childService: AsistenciasService,
    private parentService: CursoAlumnosService,
    private noticeService: NotificacionesService
  ) { }

  ngOnInit() {
    const date = new Date();
    this.today = date.getFullYear() + '-' + (((date.getMonth() + 1) < 10) ? '0'
      + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (((date.getDate() + 1) < 10) ? '0'
        + (date.getDate() + 1) : (date.getDate() + 1));
    this.date = this.today;
    this.route.params
      .switchMap((params: Params) => (params['name']))
      .subscribe(response => {
        this.title += response;
      });
    this.route.params
      .switchMap((params: Params) => (params['id']))
      .subscribe(response => {
        this.idSubject += response;
      });
    this.cargarAll();
  }
  charge(name: string): void {
    this.title = name;
  }
  goBack(): void {
    this.location.back();
  }
  cargarAll() {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.route.params
      .switchMap((params: Params) => this.mainService.getAll(+params['id']))
      .subscribe(response => {
        this.Table = response;
        $('#editModal .close').click();
        $('#insertModal .close').click();
        $('#Loading').css('display', 'none');
      });

  }
  cargarSingle(data: any, id: number) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.selectedData = {
      homework: data,
      students: []
    };
    this.parentService.getAll(id)
      .then(response => {
        this.selectedData.students = response;
        $('#Loading').css('display', 'none');
      }).catch(error => {
        $('#Loading').css('display', 'none');
        this.createError(error);
      });
  }
  update(formValue: any) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.mainService.updateBySubject(formValue)
      .then(response => {
        this.cargarAll();
        this.create('Estudiante Actualizado exitosamente');
        $('#Loading').css('display', 'none');
      }).catch(error => {
        this.createError(error);
      });
  }
  delete(id: string) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.mainService.delete(id)
      .then(response => {
        this.cargarAll();
        this.create('Estudiante Eliminado exitosamente');
        $('#Loading').css('display', 'none');
      }).catch(error => {
        this.createError(error);
      });
  }
  insert(formValue: any) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.mainService.create(formValue)
      .then(response => {
        this.cargarAll();
        this.create('Estudiante Ingresado');
        $('#Loading').css('display', 'none');
      }).catch(error => {
        this.createError(error);
      });
  }
  childInsert(id: number, asiste: boolean) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    const formValue: any = {
      assistance: asiste,
      subject_student: id
    };
    this.childService.create(formValue)
      .then(response => {
        this.create('Asistencia Ingresada');
        $('#Loading').css('display', 'none');
        $('#editModal .close').click();
        $('#insertModal .close').click();
        this.cargarAll();
      }).catch(error => {
        this.createError(error);
      });
  }
  childUpdate(id: number, asiste: boolean) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    const formValue: any = {
      assistance: asiste,
      id: id
    };
    this.childService.update(formValue)
      .then(response => {
        this.create('Asistencia Ingresada');
        $('#Loading').css('display', 'none');
        $('#editModal .close').click();
        $('#insertModal .close').click();
      }).catch(error => {
        this.createError(error);
      });
  }
  secondChildUpdate(date: any, id: any, asistio) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    const formValue: any = {
      assistance_date: date,
      subject_student: id.id,
      assistance: asistio
    };
    const form: any = {
      id: localStorage.getItem('currentId'),
      name: this.title
    };
    this.mainService.updateByDate(formValue)
      .then(response => {
        if (asistio === '1') {
          this.create('Asistencia Ingresada');
          $('#Loading').css('display', 'none');
          this.cargarSingle(this.selectedData.homework, this.idSubject);
        } else {
          this.noticeService.createForAssistance(id.students.id, form)
            .then(responseq => {
              this.create('Asistencia Ingresada');
              $('#Loading').css('display', 'none');
              this.cargarSingle(this.selectedData.homework, this.idSubject);
            })
            .catch(error => {
              $('#Loading').css('display', 'none');
              this.createError(error);
            });
        }
      }).catch(error => {
        this.createError(error);
      });
  }
  childsInsert(formValue: any) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.mainService.createBySubject(formValue)
      .then(response => {
        this.create('Dia de Asistencia Ingresado');
        $('#Loading').css('display', 'none');
        $('#insert-form')[0].reset();
        this.cargarAll();
      }).catch(error => {
        this.createError(error);
      });
  }
  create(success) {
    this._service.success('¡Éxito!', success);
  }
  createError(error) {
    this._service.error('¡Error!', error);
  }
}
