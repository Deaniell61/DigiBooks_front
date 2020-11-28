import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { CursoAlumnosService } from "./../_services/curso-alumnos.service";
import { AsistenciasService } from "./../_services/asistencias.service";
import { TareasService } from "./../_services/tareas.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import { path } from "../../../config.module";

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.css']
})
export class DetalleAlumnoComponent implements OnInit {
  @Input() id:any;
  @Input() name:any;
  selectedData:any
  Table:any
  title:string=""
  idSubject:any=""
  public rowsOnPage = 5;
  public search:any
  today:any
  date:any
  view:number=1;
  private basePath:string = path.path
  url:String
  
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location:Location,
    private router:Router,
    private mainService:CursoAlumnosService,
    private HChildService:TareasService,
    private childService:AsistenciasService
  ) { }

  ngOnInit() {
    let date = new Date();
    this.today = date.getFullYear()+'-'+(((date.getMonth()+1)<10)?'0'+(date.getMonth()+1):(date.getMonth()+1))+'-'+(((date.getDate())<10)?'0'+(date.getDate()):(date.getDate()))
    this.date = this.today
    this.route.params
    .switchMap((params: Params) => (params['name']))
    .subscribe(response => { 
                      this.title+=response
                  });
    this.route.params
    .switchMap((params: Params) => (params['id']))
    .subscribe(response => { 
                      this.idSubject+=response
                  });
    this.cargarAll()
  }
charge(name:string):void{
  this.title=name;
}
  goBack(): void {
    this.location.back();
  }
  cargarAll(){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    this.route.params
                  .switchMap((params: Params) => this.mainService.getAll(+params['id']))
                  .subscribe(response => { 
                      this.Table = response
                                      $("#editModal .close").click();
                                      $("#insertModal .close").click();
                                      $('#Loading').css('display','none')
                                      console.clear 
                  });
      
    }
    cargarSingle(id:number,id2:number){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.mainService.getSingle(id,id2)
                        .then(response => {
                          this.selectedData = response;
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear     
                          $('#Loading').css('display','none')
                          this.createError(error) 
                        })
    }
    cargarReporte(id:number,id2:number){
      this.url = `${this.basePath}/api/subjects/${id2}/students/${id}/report`
      
    }
    update(formValue:any){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      //console.log(data)
      this.mainService.update(formValue)
                        .then(response => {
                          this.cargarAll()
                          console.clear 
                          this.create('Estudiante Actualizado exitosamente')
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear     
                          $('#Loading').css('display','none')
                          this.createError(error) 
                        })
      
    }
    delete(id:string){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.mainService.delete(id)
                        .then(response => {
                          this.cargarAll()
                          console.clear 
                          this.create('Estudiante Eliminado exitosamente')
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear     
                          $('#Loading').css('display','none')
                          this.createError(error) 
                        })
      
    }
    insert(formValue:any){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.mainService.create(formValue)
                        .then(response => {
                          this.cargarAll()
                          console.clear 
                          this.create('Estudiante Ingresado')
                          $('#Loading').css('display','none')
                          
                        }).catch(error => {
                          console.clear     
                          $('#Loading').css('display','none')
                          this.createError(error) 
                        })
      
      
    }
    childInsert(id:number,asiste:boolean){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      let formValue:any = {
        assistance : asiste,
        subject_student: id
      }
      this.childService.create(formValue)
                        .then(response => {
                          console.clear 
                          this.create('Asistencia Ingresada')
                          $('#Loading').css('display','none')
                          $("#editModal .close").click();
                          $("#insertModal .close").click();
                          this.cargarAll()
                        }).catch(error => {
                          console.clear     
                          $('#Loading').css('display','none')
                          this.createError(error) 
                        })
      
      
    }
    childUpdate(id:number,asiste:boolean){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      let formValue:any = {
        assistance : asiste,
        id: id
      }
      this.childService.update(formValue)
                        .then(response => {
                          console.clear 
                          this.create('Asistencia Ingresada')
                          $('#Loading').css('display','none')
                          $("#editModal .close").click();
                          $("#insertModal .close").click();
                        }).catch(error => {
                          console.clear     
                          $('#Loading').css('display','none')
                          this.createError(error) 
                        })
      
      
    }
    secondChildUpdate(id:number){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      let nota = $('#nota'+id).val()
      let formValue:any = {
        student_note : nota,
        id: id
      }
      this.HChildService.update(formValue)
                        .then(response => {
                          console.clear 
                          this.create('Asistencia Ingresada')
                          $('#Loading').css('display','none')
                          $("#editModal .close").click();
                          $("#insertModal .close").click();
                        }).catch(error => {
                          console.clear     
                          $('#Loading').css('display','none')
                          this.createError(error) 
                        })
      
      
    }
    childsInsert(value:any){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      let formValue:any = {
        name : value.name,
        description : value.description,
        homework_note : value.homework_note,
        date_end : value.date_end,
        students_subjects: []
      }
      this.Table.forEach(element => {
        formValue.students_subjects.push(
          {id:element.id}
        )
      });
      
      this.HChildService.createAll(formValue)
                        .then(response => {
                          console.clear 
                          this.create('Tarea Ingresada')
                          $('#Loading').css('display','none')
                          $("#editModal .close").click();
                          $("#insertModal .close").click();
                          this.cargarAll()
                        }).catch(error => {
                          console.clear     
                          $('#Loading').css('display','none')
                          this.createError(error) 
                        })
      
      
    }
  public options = {
               position: ["bottom", "right"],
               timeOut: 2000,
               lastOnBottom: false,
               animate: "fromLeft",  
               showProgressBar: false,
               pauseOnHover: true,
               clickToClose: true,
               maxLength: 200
           };
  
    create(success) {
                this._service.success('¡Éxito!',success)

    }
    createError(error) {
                this._service.error('¡Error!',error)

    }
}
