import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import * as $ from 'jquery';

import { MateriaMaestroService } from "../_services/_asignaciones/materia-maestro.service";
import { TeachersService } from "../_services/teachers.service";
import { GradoMateriaService } from "../_services/_asignaciones/grado-materia.service";
import { JornadaGradoService } from "../_services/_asignaciones/jornada-grado.service";
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-asignar-materia-maestros',
  templateUrl: './asignar-materia-maestros.component.html',
  styleUrls: ['./asignar-materia-maestros.component.css']
})
export class AsignarMateriaMaestrosComponent implements OnInit {
  Table:any
  selectedData:any[]
  selectedDataSigned:any=[]
  selectedDataId:any
  selectedDataChildId:any
  droppedItemsId:any=[]
  childs:any[]
  childsId:any=[]
  droppedItems:any=[]
  parentCombo:any
  grandParentCombo:any
  selectedParent:any
  selectedGrandParent:any
  selectedChild:any
  public rowsOnPage = 5;
  public search:any
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private mainService: MateriaMaestroService,
    private ChildsService: TeachersService,
    private ParentsService: JornadaGradoService,
    private GrandParentsService: GradoMateriaService
  ) { }
    ngOnInit() {
      
      this.cargarAll()
      this.cargarFree()
      this.ParentsService.getBussy()
                        .then(response => {
                          this.grandParentCombo = response
                          console.clear 
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
    }
    onItemDrop(e: any) {
        // Get the dropped data here 
        if(!this.selectedParent){
          this.createError("Debe seleccionar un tutor")
        }else{
          let existe=(this.selectedDataSigned.find(dat=>{
            return dat.id==e.dragData.id
          }))

          if(!existe){
            this.droppedItemsId.push({"id":e.dragData.id});
            this.selectedDataSigned.push(e.dragData);
          }
        }
    }

    onItemRemove(e: any) {
        // Get the dropped data here 
          
           //this.childsId.push({"id":e.dragData.id});
          // this.childs.push(e.dragData);
          // console.log(e.dragData);
          this.selectedDataSigned.splice(this.selectedDataSigned.findIndex(dat=>{
            return dat.id==e.dragData.id
          }),1)
          this.droppedItemsId.splice(this.droppedItemsId.findIndex(dat=>{
            return dat.id==e.dragData.id
          }),1)
    }
    cargarFree(){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.ChildsService.getAll()
                        .then(response => {
                          this.childs = response
                          this.childs.forEach((item,index)=>{
                            this.childsId.push({"id":item.id});
                            $('#Loading').css('display','none')
                          })
                          console.clear 
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
    }
    cargarAll(){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.mainService.getBussy()
                        .then(response => {
                          this.Table = response
                          
                          $("#editModal .close").click();
                          $("#insertModal .close").click();
                          $('#Loading').css('display','none')
                          console.clear 
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
    }
    cargarSingle(id:number,id2:number,id3:number){

      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.selectedGrandParent=id2
      this.cargarFree()
      this.GrandParentsService.getMyChilds(id2)
                        .then(response => {
                          this.parentCombo = response
                          
                          console.clear 
                                                    
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })

      this.selectedParent=id
      this.droppedItemsId.length = 0;
      this.selectedDataSigned.length = 0;
      this.childsId.length = 0;
      this.GrandParentsService.getMyId(id2,id)
                          .then(response => {
                            this.selectedDataId=response.id
                            this.GrandParentsService.getMyGrandChilds(this.selectedDataId)
                                              .then(response => {
                                                this.selectedData = response
                                                this.selectedChild=id3
                                                this.mainService.getMyId(this.selectedDataId,id3)
                                                                        .then(response => {
                                                                          this.selectedDataChildId=response.id
                                                                          
                                                                          this.cargarFree()
                                                                          this.mainService.getMyGrandChilds(this.selectedDataChildId)
                                                                                            .then(response => {
                                                                                              this.selectedDataSigned = response
                                                                                              this.selectedDataSigned.forEach((item,index)=>{
                                                                                                this.droppedItemsId.push({"id":item.id});
                                                                                              })
                                                                                                $('#Loading').css('display','none')
                                                                                                console.clear 
                                                                                                                        
                                                                                            }).catch(error => {
                                                                                              console.clear     
                                                                                              this.createError(error) 
                                                                                            })
                                                                          console.clear 
                                                                                                    
                                                                        }).catch(error => {
                                                                          console.clear     
                                                                          this.createError(error) 
                                                                        })
                                                console.clear 
                                                                          
                                              }).catch(error => {
                                                console.clear     
                                                this.createError(error) 
                                              })
                            
                            console.clear 
                                                      
                          }).catch(error => {
                            console.clear     
                            this.createError(error) 
                          })
      
    }
    cargarGrandChilds(id:number){
      this.selectedParent=id
      this.droppedItemsId.length = 0;
      this.selectedDataSigned.length = 0;
      this.childsId.length = 0;
      this.GrandParentsService.getMyId(this.selectedGrandParent,id)
                          .then(response => {
                            this.selectedDataId=response.id
                            this.cargarFree()
                            this.GrandParentsService.getMyGrandChilds(this.selectedDataId)
                                              .then(response => {
                                                this.selectedData = response
                                                
                                                console.clear 
                                                                          
                                              }).catch(error => {
                                                console.clear     
                                                this.createError(error) 
                                              })
                            console.clear 
                                                      
                          }).catch(error => {
                            console.clear     
                            this.createError(error) 
                          })
      
    }
    cargarChilds(id:number){
      this.selectedChild=id
      this.droppedItemsId.length = 0;
      this.selectedDataSigned.length = 0;
      this.childsId.length = 0;
      this.mainService.getMyId(this.selectedDataId,id)
                          .then(response => {
                            this.selectedDataChildId=response.id
                            
                            this.cargarFree()
                            this.mainService.getMyGrandChilds(this.selectedDataChildId)
                                              .then(response => {
                                                this.selectedDataSigned = response
                                                this.selectedDataSigned.forEach((item,index)=>{
                                                  this.droppedItemsId.push({"id":item.id});
                                                })
                                                console.clear 
                                                                          
                                              }).catch(error => {
                                                console.clear     
                                                this.createError(error) 
                                              })
                            console.clear 
                                                      
                          }).catch(error => {
                            console.clear     
                            this.createError(error) 
                          })
      
    }
    cargarChild(id:number){
      this.selectedGrandParent=id
      this.cargarFree()
      this.GrandParentsService.getMyChilds(id)
                        .then(response => {
                          this.parentCombo = response
                          
                          console.clear 
                                                    
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
                          console.clear 
                          this.create('Ciclo Actualizado exitosamente')
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
      
    }
    delete2(id:string){
      this.mainService.delete(id)
                        .then(response => {
                          this.cargarAll()
                          console.clear 
                          this.create('Grados Desasignados')
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
      
    }
    delete(formValueDel){
      
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.droppedItemsId.forEach(element => {
        this.childsId.splice(this.childsId.findIndex(dat => {
          return dat.id==element.id
        }),1)
      })
      let formValue = {
        "subject":this.selectedDataChildId,
        "teachers": this.droppedItemsId
      }

      formValueDel = {
        "subject":this.selectedDataChildId,
        "teachers": this.childsId
      }
      // console.log(this.selectedDataChildId);
      
      // console.log(formValue);
      // console.log(formValueDel);
      
      
      if(this.selectedParent){   
      this.mainService.deleteAll(formValueDel)
                        .then(response => {
                          this.insert(formValue)
                          this.create('Materias Desasignadas')
                        }).catch(error => {
                          this.insert(formValue)
                          console.clear     
                          this.createError(error) 
                        })
                      }else{
                        this.createError("Debe seleccionar un Ciclo-Jornada") 
                      }
      
    }
    limpiar(){
      this.selectedDataSigned.length=0
      this.selectedDataId=null
      this.droppedItems.length=0
      this.selectedParent=null
      this.selectedGrandParent=null
      this.selectedChild=null
      this.parentCombo=null
      this.selectedData=null
    }
    insert(formValue:any){
      
      this.mainService.create(formValue)
                        .then(response => {
                          this.cargarAll()
                          console.clear 
                          this.create('Grados Asignados')
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear     
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
