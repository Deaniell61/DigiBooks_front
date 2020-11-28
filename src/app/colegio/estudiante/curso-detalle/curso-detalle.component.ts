import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { CursoDetalleService } from "./../_services/curso-detalle.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import { path } from "../../../config.module";
declare var $: any
@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.css']
})
export class CursoDetalleComponent implements OnInit {
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
    private mainService:CursoDetalleService
  ) { }
  deleteHomework(id:number){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
      this.mainService.deleteHomework(id)
                              .then(response => {
                                this.selectedData = response;
                                this.create('Entrega Eliminada exitosamente')
                                $('#Loading').css('display','none')
                              }).catch(error => {
                                console.clear     
                                this.createError(error) 
                              })
  }
  subirImagenes(archivo,form,id){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    var archivos=archivo.srcElement.files;
    let url = `${this.basePath}/api/homeworks/upload/${form.id}`
    let bar:any
    var i=0;
    var size=archivos[i].size;
    var type=archivos[i].type;
        if(size<(10*(1024*1024))){
        $("#"+id).upload(url,
            {
              avatar: archivos[i],
              description: $('#descriptionUser').val()
          },
          function(respuesta) 
          {
            bar=respuesta
            $('#imgAvatar').attr("href",'')
            $('#imgAvatar').attr("href",respuesta.file)
            $('#Loading').css('display','none')
            $("#"+id).val('')
            $("#barra_de_progreso").val(0)
            
            
          }, 
          function(progreso, valor) 
          {
                      
            $("#barra_de_progreso").val(valor);
          }
        );
      }
      this.selectedData.file = '';
  }
  previsualizarImagenes(archivo,tipoAR,id){
    var archivos=archivo.files;
    var i=0;
    var size=archivos[i].size;
    var type=archivos[i].type;
      var target=archivo.value;
      if(size<(2*(1024*1024))){
          if(type=="image/png"){    
              if (archivo.files && archivo.files[0]) {
              var reader = new FileReader();
                      reader.onload = function (e) {
                        console.log(e);
                      }
                      reader.readAsDataURL(archivos[i]);
              }
          }else{
              $('#mensajeP2').html('La imagen debe ser de tipo PNG');
              location.href="#mensajeP2";
             
          }
      }else{
          $('#mensajeP2').html('La imagen es muy pesada, se recomienda subir imagenes de menos de 2MB.');
          location.href="#mensajeP2";
      }
  }
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
                      this.Table = response.homework
                                      $("#editModal .close").click();
                                      $("#insertModal .close").click();
                                      $('#Loading').css('display','none')
                                      console.clear 
                  });
      
    }
    cargarSingle(id:number,id2:number){
      $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    this.mainService.getSingle(id)
                        .then(response => {
                          this.selectedData = response;
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear     
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
      // this.childService.create(formValue)
      //                   .then(response => {
      //                     console.clear 
      //                     this.create('Asistencia Ingresada')
      //                     $('#Loading').css('display','none')
      //                     $("#editModal .close").click();
      //                     $("#insertModal .close").click();
      //                     this.cargarAll()
      //                   }).catch(error => {
      //                     console.clear     
      //                     this.createError(error) 
      //                   })
      
      
    }
    childUpdate(id:number,asiste:boolean){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      let formValue:any = {
        assistance : asiste,
        id: id
      }
      // this.childService.update(formValue)
      //                   .then(response => {
      //                     console.clear 
      //                     this.create('Asistencia Ingresada')
      //                     $('#Loading').css('display','none')
      //                     $("#editModal .close").click();
      //                     $("#insertModal .close").click();
      //                   }).catch(error => {
      //                     console.clear     
      //                     this.createError(error) 
      //                   })
      
      
    }
    secondChildUpdate(id:number){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      let nota = $('#nota'+id).val()
      let formValue:any = {
        student_note : nota,
        id: id
      }
      // this.HChildService.update(formValue)
      //                   .then(response => {
      //                     console.clear 
      //                     this.create('Asistencia Ingresada')
      //                     $('#Loading').css('display','none')
      //                     $("#editModal .close").click();
      //                     $("#insertModal .close").click();
      //                   }).catch(error => {
      //                     console.clear     
      //                     this.createError(error) 
      //                   })
      
      
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
      
      // this.HChildService.createAll(formValue)
      //                   .then(response => {
      //                     console.clear 
      //                     this.create('Tarea Ingresada')
      //                     $('#Loading').css('display','none')
      //                     $("#editModal .close").click();
      //                     $("#insertModal .close").click();
      //                     this.cargarAll()
      //                   }).catch(error => {
      //                     console.clear     
      //                     this.createError(error) 
      //                   })
      
      
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
