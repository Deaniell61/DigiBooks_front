import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { CursosService } from "../_services/cursos.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  @Input() id:any;
  Table:any
  selectedData:any
  Id:any = localStorage.getItem('currentIdTeacher');
  tipo:any
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location:Location,
    private router:Router,
    private mainService: CursosService
  ) { }
  
    ngOnInit() {
      this.route.params
      .switchMap((params: Params) => (params['op']))
      .subscribe(response => { 
                        this.tipo=response
                    });
      this.cargarAll()
    }
    cargarAll(){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.mainService.getAll(this.Id)
                        .then(response => {
                          this.Table = response
                          $('#Loading').css('display','none')
                          console.clear 
                        }).catch(error => {
                          console.clear     
                          $('#Loading').css('display','none')
                          this.createError(error) 
                        })
    }
    cargarSingle(id:number){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.mainService.getSingle(id)
                        .then(response => {
                          this.selectedData = response;
                          $('#Loading').css('display','none')
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
