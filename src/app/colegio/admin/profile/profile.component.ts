import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsuariosService } from './../../admin/_services/usuarios.service';
import { NotificationsService } from 'angular2-notifications';

declare var $: any;
import { path } from '../../../config.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userTable: any;
  userTypesCombo: any;
  foreignCombo: any;
  foreignData: any;
  selectedUser: any;
  selectedUserId: any = localStorage.getItem('currentId');
  public rowsOnPage = 5;
  public search: any;
  Data: any;
  private basePath: string = path.path;

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
    private userService: UsuariosService
  ) { }

  subirImagenes(archivo, form, id) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    const archivos = archivo.srcElement.files;
    const url = `${this.basePath}/api/users/upload/${form.id}`;

    const i = 0;
    const size = archivos[i].size;
    const type = archivos[i].type;
    if (size < (2 * (1024 * 1024))) {
      if (type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg') {
        $('#' + id).upload(url,
          {
            avatar: archivos[i]
          },
          function (respuesta) {
            $('#imgAvatar').attr('src', '');
            $('#imgAvatar').attr('src', respuesta.picture);
            $('#Loading').css('display', 'none');
            $('#' + id).val('');
            $('#barra_de_progreso').val(0);
          },
          function (progreso, valor) {

            $('#barra_de_progreso').val(valor);
          }
        );
      } else {
        this.createError('El tipo de imagen no es valido');
        $('#Loading').css('display', 'none');
      }
    } else {
      this.createError('La imagen es demaciado grande');
      $('#Loading').css('display', 'none');
    }
  }
  previsualizarImagenes(archivo, tipoAR, id) {
    const archivos = archivo.files;
    const i = 0;
    const size = archivos[i].size;
    const type = archivos[i].type;
    const target = archivo.value;
    if (size < (2 * (1024 * 1024))) {
      if (type === 'image/png') {
        if (archivo.files && archivo.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
            console.log(e);
          };
          reader.readAsDataURL(archivos[i]);
        }
      } else {
        $('#mensajeP2').html('La imagen debe ser de tipo PNG');
        location.href = '#mensajeP2';

      }
    } else {
      $('#mensajeP2').html('La imagen es muy pesada, se recomienda subir imagenes de menos de 2MB.');
      location.href = '#mensajeP2';
    }
  }
  ngOnInit() {

    this.cargarUser(this.selectedUserId);
    this.userService.getTypes()
      .then(response => {
        this.userTypesCombo = response;
      }).catch(error => {
        this.createError(error);
      });
  }
  cargarUsers() {
    this.userService.getAll()
      .then(response => {
        this.userTable = response;
        $('#editModal .close').click();
        $('#insertModal .close').click();
      }).catch(error => {
        this.createError(error);
      });
  }
  cargarUser(id: number) {
    this.userService.getSingle(id)
      .then(response => {
        this.selectedUser = response;
        this.cargarForanea(response.type + '');
        switch (response.type + '') {
          case '1': {
            this.selectedUser.foreign = response.student;
            break;
          }
          case '2': {
            this.selectedUser.foreign = response.teacher;
            break;
          }
          case '3': {
            this.selectedUser.foreign = response.tutor;
            break;
          }
          default: {
            break;
          }
        }
        if (this.selectedUser.foreign) {
          this.getForeign(this.selectedUser.foreign + '', response.type + '');
        }
      }).catch(error => {
        this.createError(error);
      });
  }
  updateUser(formValue: any) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    let tutor: any = null;
    let teacher: any = null;
    let student: any = null;
    switch (formValue.type) {
      case '1': {
        student = this.selectedUser.foreign * 1;
        break;
      }
      case '2': {
        teacher = this.selectedUser.foreign * 1;
        break;
      }
      case '3': {
        tutor = this.selectedUser.foreign * 1;
        break;
      }
      case 1: {
        student = this.selectedUser.foreign * 1;
        break;
      }
      case 2: {
        teacher = this.selectedUser.foreign * 1;
        break;
      }
      case 3: {
        tutor = this.selectedUser.foreign * 1;
        break;
      }
      default: {
        break;
      }
    }


    const data = {
      id: formValue.id,
      username: formValue.username,
      email: formValue.email,
      firstname: formValue.firstname ? formValue.firstname : '',
      lastname: formValue.lastname ? formValue.lastname : '',
      type: formValue.type,
      student: student,
      teacher: teacher,
      tutor: tutor
    };
    this.userService.update(data)
      .then(response => {
        this.cargarUsers();
        this.create('Usuario Actualizado exitosamente');
        $('#Loading').css('display', 'none');

      }).catch(error => {
        $('#Loading').css('display', 'none');
        this.createError(error);
      });

  }
  updatePass(formValue: any) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');



    const data = {
      id: this.selectedUserId,
      old_pass: formValue.old_pass,
      new_pass: formValue.new_pass,
      new_pass_rep: formValue.new_pass2
    };
    this.userService.updatePass(data)
      .then(response => {
        this.create('Usuario Actualizado exitosamente');
        $('#Loading').css('display', 'none');

        $('#passChange-form')[0].reset();

      }).catch(error => {
        this.createError(error);
      });

  }
  generar(longitud) {
    let i: number;
    const caracteres = '123456789+/-*abcdefghijkmnpqrtuvwxyz123456789+/-*ABCDEFGHIJKLMNPQRTUVWXYZ12346789+/-*';
    let contraseña = '';
    for (i = 0; i < longitud; i++) {
      contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return contraseña;
  }
  comboTutor(id: string) {
    this.userService.getTutor(id)
      .then(response => {
        this.Data = {
          lastnameData: response.lastname,
          firstnameData: response.firstname
        };
      }).catch(error => {
        this.createError(error);
      });
  }
  comboTeacher(id: string) {
    this.userService.getTeacher(id)
      .then(response => {
        this.Data = {
          lastnameData: response.lastname,
          firstnameData: response.firstname
        };
      }).catch(error => {
        this.createError(error);
      });
  }
  comboStudent(id: string) {
    this.userService.getStudent(id)
      .then(response => {
        this.Data = {
          lastnameData: response.lastname,
          firstnameData: response.firstname
        };
      }).catch(error => {
        this.createError(error);
      });
  }
  getForeign(id: string, type: string) {
    switch (type) {
      case '1': {
        this.comboStudent(id);
        break;
      }
      case '2': {
        this.comboTeacher(id);
        break;
      }
      case '3': {
        this.comboTutor(id);
        break;
      }
      default: {
        console.log(`${id} id
          ${type} tipo`);
        break;
      }
    }
  }
  comboTutors(type: string) {
    this.userService.getTutors()
      .then(response => {
        this.foreignCombo = response;
      }).catch(error => {
        this.createError(error);
      });
  }
  comboTeachers(type: string) {
    this.userService.getTeachers()
      .then(response => {
        this.foreignCombo = response;
      }).catch(error => {
        this.createError(error);
      });
  }
  comboStudents(type: string) {
    this.userService.getStudents()
      .then(response => {
        this.foreignCombo = response;
      }).catch(error => {
        this.createError(error);
      });
  }
  cargarForanea(type: string) {

    switch (type) {
      case '1': {
        this.comboStudents(type);
        this.foreignData = {
          title: 'Alumnos',
          type: type
        };
        break;
      }
      case '2': {
        this.comboTeachers(type);
        this.foreignData = {
          title: 'Maestros',
          type: type
        };
        break;
      }
      case '3': {
        this.comboTutors(type);
        this.foreignData = {
          title: 'Tutores',
          type: type
        };
        break;
      }
      case '4': {
        this.foreignData = {
          title: '',
          type: type
        };
        break;
      }
      default: {
        this.foreignData = {
          title: '',
          type: type
        };
        console.log(`combo foraneo no encontrado ${type} tipo`);
        break;
      }
    }
  }
  create(success) {
    this._service.success('¡Éxito!', success);

  }
  createError(error) {
    this._service.error('¡Error!', error);

  }
}
