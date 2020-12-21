import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BooksService } from './../../../_services/books.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
declare var $: any;
interface Imagen {
  url?: string;
  libro?: string;
  book?: string;
  description?: string;
  file?: string;
  id?: number;
  name?: string;
  page?: number;
  state?: number;
}
interface Libro {
  description?: string;
  file?: string;
  id?: number;
  name?: string;
  pages?: Imagen[];
  state?: number;
}
@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent implements OnInit {
  private _list: Libro[] = [];
  private _selectedData: Libro;
  private _esAdmin = false;
  private selected = 2;
  private _emit: EventEmitter<number> = new EventEmitter<number>();
  private _emitData: EventEmitter<number> = new EventEmitter<number>();
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
    private router: Router,
    private mainServices: BooksService
  ) { }

  ngOnInit() {
    this.buscar();
  }
  editar(value: Libro) {
    this._selectedData = value;
    this._emitData.emit(this._selectedData.id);
    this._emit.emit(2);
  }
  buscar() {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');

    this.mainServices.getAll().then((response: Libro[]) => {
      this._list = response;
      $('#Loading').css('display', 'none');
    }).catch(error => {
      this.createError('Error guardando el libro');
      $('#Loading').css('display', 'none');
    });
  }
  delete(id: number) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    if (confirm('Realmente desea eliminar este libro?')) {
      this.mainServices.delete(id).then((response) => {
        if (response.id) {
          this.buscar();
        }
        $('#Loading').css('display', 'none');
      }).catch(error => {
        this.createError('Error guardando el libro');
        $('#Loading').css('display', 'none');
      });
    }
    $('#Loading').css('display', 'none');
  }
  create(success) {
    this._service.success('¡Éxito!', success);

  }
  createError(error) {
    this._service.error('¡Error!', error);

  }

  get list(): Libro[] {
    return this._list;
  }
  @Input()
  set esAdmin(value: boolean) {
    this._esAdmin = value;
  }
  get esAdmin(): boolean {
    return this._esAdmin;
  }
  @Output()
  get cambiar(): EventEmitter<number> {
    this._emit.emit(this.selected);
    return this._emit;
  }
  @Output()
  get obtenerLibro(): EventEmitter<number> {
    if (this._selectedData) {
      this._emitData.emit(this._selectedData.id);
    }
    return this._emitData;
  }
}

