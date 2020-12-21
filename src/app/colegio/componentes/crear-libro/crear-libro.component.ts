import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { BooksService } from './../../../_services/books.service';
import { path } from '../../../config.module';
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
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css']
})
export class CrearLibroComponent implements OnInit {
  private _imagenes: Imagen[] = [];
  private basePath: string = path.path;
  private selected = 2;
  public active = 0;
  private _emit: EventEmitter<number> = new EventEmitter<number>();
  private _libroId;
  private _selectedData: Libro;

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
  }
  buscar() {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');

    this.mainServices.getSingle(this._libroId).then((response: Libro) => {
      this._selectedData = response;
      this._imagenes = response.pages;
      $('#Loading').css('display', 'none');
    }).catch(error => {
      this.createError('Error guardando el libro');
      $('#Loading').css('display', 'none');
    });
  }
  seleccionar(i: number) {
    this.active = i;
  }
  subirImagenes(archivo?, id?) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    if (this.selectedData.name === '') {
      $('#' + id).val('');
      $('#barra_de_progreso').val(0);
      this.createError('Debe ingresar el nombre del libro antes de cargar paginas.');
      $('#Loading').css('display', 'none');
      return;
    }
    const archivos = archivo.srcElement.files;
    const url = `${this.basePath}/api/pages/upload`;
    let bar: any;
    const i = 0;
    const size = archivos[i].size;
    const type = archivos[i].type;
    if (size < (3 * (1024 * 1024))) {
      if (type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg') {
        $('#' + id).upload(url,
          {
            avatar: archivos[i],
            carpeta: this.selectedData.name
          },
          (respuesta) => {
            bar = respuesta;
            $('#Loading').css('display', 'none');
            $('#' + id).val('');
            $('#barra_de_progreso').val(0);
            this.selectedData.file = respuesta.url;
            const img: Imagen = {
              file: respuesta.url,
              url: respuesta.url,
              libro: this.selectedData.name
            };
            this._imagenes.push(img);
          },
          (progreso, valor) => {
            $('#barra_de_progreso').val(valor);
          },
          (error) => {
            console.log(archivos[i]);
          }
        );
      } else {
        // this.createError('El tipo de imagen no es valido');
      }
    } else {
      // this.createError('La imagen es demaciado grande, seleccione una imagen de menos de 3MB');
    }
  }

  guardar() {
    if (this.selectedData.name === '') {
      this.createError('El libro debe contener un nombre');
      return;
    }
    if (this._imagenes.length <= 0) {
      this.createError('Debe contener al menos una pagina');
      return;
    }
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    const data = {
      titulo: this.selectedData.name,
      imagenes: this._imagenes,
      file: this._imagenes[0].url
    };
    this.mainServices.create(data).then(reponse => {
      $('#Loading').css('display', 'none');
      this._emit.emit(1);
    }).catch(error => {
      this.createError('Error guardando el libro');
      $('#Loading').css('display', 'none');
    });
  }

  create(success) {
    this._service.success('¡Éxito!', success);

  }
  createError(error) {
    this._service.error('¡Error!', error);

  }
  get imagenes(): Imagen[] {
    return this._imagenes;
  }

  @Input()
  set libroId(value: number) {
    this._libroId = value;
    if (this._libroId) {
      this.buscar();
    }
  }
  get libroId(): number {
    return this._libroId;
  }
  get selectedData(): Libro {
    return this._selectedData;
  }
  @Output()
  get cambiar(): EventEmitter<number> {
    this._emit.emit(this.selected);
    return this._emit;
  }
}
