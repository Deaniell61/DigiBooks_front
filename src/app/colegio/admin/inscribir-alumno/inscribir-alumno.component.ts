import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { InscriptionsService } from "../_services/_asignaciones/inscriptions.service";
import { EstudiantesTutoresService } from "../_services/_asignaciones/estudiantes-tutores.service";
import { NotificationsService } from 'angular2-notifications';

declare var $: any

@Component({
  selector: 'app-inscribir-alumno',
  templateUrl: './inscribir-alumno.component.html',
  styleUrls: ['./inscribir-alumno.component.css']
})
export class InscribirAlumnoComponent implements OnInit {
  Table:any
  comboParent:any
  selectedData:any
  public rowsOnPage = 5;
  public search:any
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private mainService: InscriptionsService,
    private parentService: EstudiantesTutoresService
  ) { }
  
    ngOnInit() {
      let date = new Date();
     
      this.selectedData = {
        student: '0',
        year: date.getFullYear()+'-01-01'
      }
      
      this.cargarAll()
      this.cargarFree()
    }
    cargarAll(){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.mainService.getAll()
                        .then(response => {
                          this.Table = response
                          $("#editModal .close").click();
                          $("#insertModal .close").click();
                          console.clear 
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
    }
    cargarFree(){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.mainService.getFree()
                        .then(response => {
                          this.comboParent = response
                          
                          console.clear 
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
    }
    cargarSingle(id:number){
      this.mainService.getSingle(id)
                        .then(response => {
                          this.selectedData = response;
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
    }
    update(formValue:any){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      //console.log(data)
      this.mainService.update(formValue)
                        .then(response => {
                          this.cargarAll()
                          this.cargarFree()
                          console.clear 
                          this.create('Inscripcion Actualizado exitosamente')
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
                          this.cargarFree()
                          console.clear 
                          this.create('Inscripcion Eliminado exitosamente')
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
      
    }
    insert(formValue:any){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      if(formValue.student!=0){
      this.mainService.create(formValue)
                        .then(response => {
                          this.cargarAll()
                          this.cargarFree()
                          console.clear 
                          this.create('Inscripcion Ingresado')
                          $('#Loading').css('display','none')
                          //$('#insert-form')[0].reset()
                          
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
            }else{
              this.createError("Debe seleccionar un alumno") 
              $('#Loading').css('display','none')
              
            }
      
      
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
