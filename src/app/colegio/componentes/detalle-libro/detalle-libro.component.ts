import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { BooksService } from './../../../_services/books.service';
import { NotificationsService } from 'angular2-notifications';
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
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.css']
})
export class DetalleLibroComponent implements OnInit {
  private _libro: Libro;
  private selected: number;
  public active = 0;
  private _libroId: number;
  private _emit: EventEmitter<number> = new EventEmitter<number>();
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
    private mainServices: BooksService
  ) { }

  ngOnInit() {
    this.buscar();
  }
  regresar() {
    this._emit.emit(1);
  }
  buscar() {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');

    this.mainServices.getSingle(this._libroId).then((response: Libro) => {
      this._libro = response;
      $('#Loading').css('display', 'none');
    }).catch(error => {
      this.createError('Error guardando el libro');
      $('#Loading').css('display', 'none');
    });
  }
  seleccionar(i: number) {
    this.active = i;
  }
  create(success) {
    this._service.success('¡Éxito!', success);

  }
  createError(error) {
    this._service.error('¡Error!', error);

  }
  @Input()
  set libroId(value: number) {
    this._libroId = value;
  }
  get libroId(): number {
    return this._libroId;
  }
  get libro(): Libro {
    return this._libro;
  }
  @Output()
  get cambiar(): EventEmitter<number> {
    if (this.selected) {
      this._emit.emit(this.selected);

    }
    return this._emit;
  }
}
