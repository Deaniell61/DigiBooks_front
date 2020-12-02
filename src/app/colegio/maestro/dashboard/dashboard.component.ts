import { Component, OnInit } from '@angular/core';
import { EventsService } from './../../admin/_services/events.service';
import { TeachersService } from './../../admin/_services/teachers.service';

import { NotificationsService } from 'angular2-notifications';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  myId = localStorage.getItem('currentIdTeacher');
  calendarOptions: Object;
  Eventos: any = [];
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
    private mainService: EventsService,
    private secondMainService: TeachersService
  ) { }

  ngOnInit() {

    this.cargarEventos();
    const date = new Date();
    this.calendarOptions = {
      fixedWeekCount: false,
      height: 600,
      defaultDate: date.getFullYear() + '-' + (((date.getMonth() + 1) < 10) ? '0'
        + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (((date.getDate()) < 10) ? '0'
          + (date.getDate()) : (date.getDate())),
      editable: false,
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles',
        'Jueves', 'Viernes', 'Sabado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      firstDay: 1,
      weekends: false,
      eventLimit: true, // allow "more" link when too many events
      events: this.Eventos
    };
  }
  cargarEventos() {
    this.mainService.getAll()
      .then(response => {
        response.forEach(element => {
          this.Eventos.push(
            {
              title: element.description,
              start: element.begindate,
              end: element.finishdate,
              backgroundColor: element.backColor,
              textColor: element.color
            }
          );

        });
        this.secondMainService.getHomeWork(this.myId)
          .then(responseq => {
            responseq.forEach(element => {
              element.homework.forEach(element2 => {
                this.Eventos.push(
                  {
                    title: element.subjects.subjects.name + '\n' + element2.name,
                    start: element2.date_end,
                    end: element2.date_end,
                    backgroundColor: '#226DA6',
                    textColor: '#ffffff'
                  }
                );
              });
            });
            $('#myCalendar').fullCalendar('renderEvents', this.Eventos, true);
          }).catch(error => {
            this.createError(error);
          });
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
