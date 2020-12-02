import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EventsService } from '../_services/events.service';
import { EventsTypeService } from '../_services/events-type.service';
import { NotificationsService } from 'angular2-notifications';


declare var $: any;
import { path } from '../../../config.module';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  Table: any;
  selectedData: any;
  parentCombo: any;
  beginDate: any;
  endDate: any;
  public rowsOnPage = 5;
  public search: any;
  Data: any;
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
  private basePath: string = path.path;
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private mainService: EventsService,
    private parentService: EventsTypeService
  ) { }

  ngOnInit() {
    this.getDate();
    this.cargarAll();
    this.cargarTipo();
  }
  getDate() {
    const date = new Date();
    let month = date.getMonth() + 1;
    let month2;
    if (month < 10) {
      month2 = '0' + month;
    } else {
      month2 = month;
    }
    this.beginDate = date.getFullYear() + '-' + month2 + '-01';
    month = date.getMonth() + 2;
    if (month < 10) {
      month2 = '0' + month;
    } else {
      month2 = month;
    }
    this.endDate = date.getFullYear() + '-' + month2 + '-01';

  }
  cargarAll() {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.mainService.getAll()
      .then(response => {
        this.Table = response;
        $('#editModal .close').click();
        $('#insertModal .close').click();
        $('#Loading').css('display', 'none');
      }).catch(error => {
        this.createError(error);
      });
  }

  cargarTipo() {
    this.parentService.getAll()
      .then(response => {
        this.parentCombo = response;

      }).catch(error => {
        this.createError(error);
      });
  }

  cargarSingle(id: number) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.mainService.getSingle(id)
      .then(response => {
        this.selectedData = response;
        $('#Loading').css('display', 'none');
      }).catch(error => {
        this.createError(error);
      });
  }
  update(formValue: any) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    // console.log(data)
    this.mainService.update(formValue)
      .then(response => {
        this.cargarAll();
        this.create('Evento Actualizado exitosamente');
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
        this.create('Evento Eliminado exitosamente');
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
        this.create('Evento Ingresado');
        $('#Loading').css('display', 'none');
        $('#insert-form')[0].reset();
        this.getDate();
      }).catch(error => {
        this.createError(error);
      });


  }
  subirImagenes(archivo, form, id) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    const archivos = archivo.srcElement.files;
    const url = `${this.basePath}/api/events/upload/${form.id}`;

    const i = 0;
    const size = archivos[i].size;
    const type = archivos[i].type;
    if (size < (2 * (1024 * 1024))) {
      if (type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg') {
        $('#' + id).upload(url,
          {
            avatar: archivos[i]
          },
          function (respuesta) {
            $('#imgAvatar').attr('src', '');
            $('#imgAvatar').attr('src', respuesta.avatar);
            $('#Loading').css('display', 'none');
            $('#' + id).val('');
            $('#barra_de_progreso').val(0);
          },
          function (progreso, valor) {

            $('#barra_de_progreso').val(valor);
          }
        );
      } else {
        this.createError('El tipo de imagen no es valido');
        $('#Loading').css('display', 'none');
      }
    } else {
      this.createError('La imagen es demaciado grande');
      $('#Loading').css('display', 'none');
    }
  }
  previsualizarImagenes(archivo, tipoAR, id) {
    const archivos = archivo.files;
    const i = 0;
    const size = archivos[i].size;
    const type = archivos[i].type;
    const target = archivo.value;
    if (size < (2 * (1024 * 1024))) {
      if (type === 'image/png') {
        if (archivo.files && archivo.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
            console.log(e);
          };
          reader.readAsDataURL(archivos[i]);
        }
      } else {
        $('#mensajeP2').html('La imagen debe ser de tipo PNG');
        location.href = '#mensajeP2';

      }
    } else {
      $('#mensajeP2').html('La imagen es muy pesada, se recomienda subir imagenes de menos de 2MB.');
      location.href = '#mensajeP2';
    }
  }


  create(success) {
    this._service.success('¡Éxito!', success);

  }
  createError(error) {
    this._service.error('¡Error!', error);

  }
}
