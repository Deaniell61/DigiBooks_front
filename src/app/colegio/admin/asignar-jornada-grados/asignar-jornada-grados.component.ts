import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { JornadaGradoService } from '../_services/_asignaciones/jornada-grado.service';
import { GradesService } from '../_services/grades.service';
import { CiclosJornadaService } from '../_services/_asignaciones/ciclos-jornada.service';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-asignar-jornada-grados',
  templateUrl: './asignar-jornada-grados.component.html',
  styleUrls: ['./asignar-jornada-grados.component.css']
})
export class AsignarJornadaGradosComponent implements OnInit {
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
    private mainService: JornadaGradoService,
    private ChildsService: GradesService,
    private ParentsService: CiclosJornadaService
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
      const existe = (this.selectedData.find(dat => {
        return dat.id === e.dragData.id;
      }));

      if (!existe) {
        this.droppedItemsId.push({ 'id': e.dragData.id });
        this.selectedData.push(e.dragData);
      }
      // this.childs.splice(this.childs.findIndex(dat=>{
      //   return dat.id===e.dragData.id
      // }),1)
      // this.childsId.splice(this.childsId.findIndex(dat=>{
      //   return dat.id===e.dragData.id
      // }),1)
    }
  }

  onItemRemove(e: any) {
    // Get the dropped data here

    // this.childsId.push({"id":e.dragData.id});
    // this.childs.push(e.dragData);
    this.selectedData.splice(this.selectedData.findIndex(dat => {
      return dat.id === e.dragData.id;
    }), 1);
    this.droppedItemsId.splice(this.droppedItemsId.findIndex(dat => {
      return dat.id === e.dragData.id;
    }), 1);



  }
  cargarFree() {
    this.childsId.length = 0;
    this.ChildsService.getAll()
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
    this.mainService.getBussy()
      .then(response => {
        this.Table = response;
        $('#editModal .close').click();
        $('#insertModal .close').click();
        $('#Loading').css('display', 'none');
      }).catch(error => {
        this.createError(error);
      });
  }
  limpiar() {
    this.selectedData.length = 0;
    this.droppedItemsId.length = 0;
    this.droppedItems.length = 0;
    this.selectedParent = null;
  }
  cargarSingle(id: number) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.selectedParent = id;
    this.droppedItemsId.length = 0;
    this.childsId.length = 0;
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
    // console.log(data)
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
        this.create('Grados Desasignados');
      }).catch(error => {
        this.createError(error);
      });

  }
  delete(formValueDel) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');

    this.droppedItemsId.forEach(element => {
      this.childsId.splice(this.childsId.findIndex(dat => {
        return dat.id === element.id;
      }), 1);
    });



    const formValue = {
      'master': this.selectedParent,
      'grades': this.droppedItemsId
    };

    formValueDel = {
      'master': this.selectedParent,
      'grades': this.childsId
    };
    //  console.log(formValue);
    //  console.log(formValueDel);


    if (this.selectedParent) {
      this.mainService.deleteAll(formValueDel)
        .then(response => {
          this.insert(formValue);
          this.create('Grados Desasignados');
        }).catch(error => {
          this.insert(formValue);
          this.createError(error);
        });
    } else {
      this.createError('Debe seleccionar un Ciclo-Jornada');
    }

  }
  insert(formValue: any) {

    this.mainService.create(formValue)
      .then(response => {
        this.cargarAll();
        this.create('Grados Asignados');
        $('#Loading').css('display', 'none');
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
