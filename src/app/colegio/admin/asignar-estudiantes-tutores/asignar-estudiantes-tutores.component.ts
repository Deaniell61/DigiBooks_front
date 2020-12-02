import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EstudiantesTutoresService } from '../_services/_asignaciones/estudiantes-tutores.service';
import { StudentsService } from '../_services/students.service';
import { TutorsService } from '../_services/tutors.service';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-asignar-estudiantes-tutores',
  templateUrl: './asignar-estudiantes-tutores.component.html',
  styleUrls: ['./asignar-estudiantes-tutores.component.css']
})
export class AsignarEstudiantesTutoresComponent implements OnInit {
  Table: any;
  selectedData: any[];
  droppedItemsId: any = [];
  childs: any[];
  childsId: any = [];
  droppedItems: any = [];
  parentCombo: any;
  selectedParent: any;
  public rowsOnPage = 5;
  public search: any;

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
    private router: Router,
    private mainService: EstudiantesTutoresService,
    private ChildsService: StudentsService,
    private ParentsService: TutorsService
  ) { }
  ngOnInit() {

    this.cargarAll();
    this.cargarFree();
    this.ParentsService.getAll()
      .then(response => {
        this.parentCombo = response;
      }).catch(error => {
        this.createError(error);
      });
  }
  onItemDrop(e: any) {
    // Get the dropped data here
    if (!this.selectedParent) {
      this.createError('Debe seleccionar un tutor');
    } else {
      this.droppedItemsId.push({ 'id': e.dragData.id });
      this.selectedData.push(e.dragData);
      this.childs.splice(this.childs.findIndex(dat => {
        return dat.id === e.dragData.id;
      }), 1);
      this.childsId.splice(this.childsId.findIndex(dat => {
        return dat.id === e.dragData.id;
      }), 1);
    }
  }

  onItemRemove(e: any) {
    // Get the dropped data here

    this.childsId.push({ 'id': e.dragData.id });
    this.childs.push(e.dragData);
    this.selectedData.splice(this.selectedData.findIndex(dat => {
      return dat.id === e.dragData.id;
    }), 1);
    this.droppedItemsId.splice(this.droppedItemsId.findIndex(dat => {
      return dat.id === e.dragData.id;
    }), 1);



  }
  limpiar() {
    if (this.selectedData) {
      this.selectedData.length = 0;
      this.droppedItemsId.length = 0;
      this.droppedItems.length = 0;
      this.selectedParent = null;
    }
  }
  cargarFree() {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.ChildsService.getFreeStudents()
      .then(response => {
        this.childs = response;
        this.childs.forEach((item, index) => {
          this.childsId.push({ 'id': item.id });
        });
      }).catch(error => {
        this.createError(error);
      });
  }
  cargarAll() {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.ParentsService.getBussy()
      .then(response => {
        this.Table = response;
        $('#editModal .close').click();
        $('#insertModal .close').click();
        $('#Loading').css('display', 'none');
      }).catch(error => {
        this.createError(error);
      });
  }
  cargarSingle(id: number) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.selectedParent = id;
    if (this.droppedItemsId.length) {
      this.droppedItemsId.length = 0;
    }
    this.cargarFree();
    this.mainService.getMyChilds(id)
      .then(response => {
        this.selectedData = response;
        this.selectedData.forEach((item, index) => {
          this.droppedItemsId.push({ 'id': item.id });
        });
        $('#Loading').css('display', 'none');

      }).catch(error => {
        this.createError(error);
      });
  }
  update(formValue: any) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.mainService.update(formValue)
      .then(response => {
        this.cargarAll();
        this.create('Ciclo Actualizado exitosamente');
        $('#Loading').css('display', 'none');
      }).catch(error => {
        this.createError(error);
      });

  }
  delete2(id: string) {
    this.mainService.delete(id)
      .then(response => {
        this.cargarAll();
        this.create('Estudiantes Desasignados');
      }).catch(error => {
        this.createError(error);
      });

  }
  delete(formValue) {
    this.mainService.deleteAll(formValue)
      .then(response => {
        this.cargarAll();
        this.create('Estudiantes Desasignados');
        $('#Loading').css('display', 'none');
      }).catch(error => {
        this.createError(error);
      });

  }
  insert(formValue: any) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    formValue = {
      'tutor': this.selectedParent,
      'students': this.droppedItemsId
    };

    const formValueDel = {
      'tutor': this.selectedParent,
      'students': this.childsId
    };

    if (this.selectedParent) {
      this.mainService.create(formValue)
        .then(response => {
          this.create('Estudiantes Asignados');
        }).catch(error => {
          this.createError(error);
        });

    } else {
      this.createError('Debe seleccionar un Tutor');
    }
    this.delete(formValueDel);
  }

  create(success) {
    this._service.success('¡Éxito!', success);

  }
  createError(error) {
    this._service.error('¡Error!', error);

  }
}
