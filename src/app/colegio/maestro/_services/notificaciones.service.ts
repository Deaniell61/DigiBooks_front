import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { path } from '../../../config.module';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class NotificacionesService {
  headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'cache-control': 'no-cache',
    'server': 'Apache/2.4.18 (Ubuntu)',
    'x-ratelimit-limit': '60',
    'x-ratelimit-remaining': '59'
  });
  private basePath: string = path.path;
  constructor(private http: Http) {
  }
  private handleError(error: any): Promise<any> {
    console.error('ha ocurrido un error');
    return Promise.reject(error.message || error);
  }

  getAll(): Promise<any> {
    const url = `${this.basePath}/api/notifications`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getTutorAll(id: number): Promise<any> {
    const url = `${this.basePath}/api/tutors/${id}/notifications`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getStudentAll(id: number): Promise<any> {
    const url = `${this.basePath}/api/students/${id}/notifications`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  createForHomeworks(id, form): Promise<any> {
    const url = `${this.basePath}/api/students/${id}/homeworks/notification/${form.id}?
    subject=${form.name}&name=${form.homework.name}&student_note=${form.homework.student_note}
    &homework_note=${form.homework.homework_note}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  createForAssistance(id, form): Promise<any> {
    const url = `${this.basePath}/api/students/${id}/assistance/notification/${form.id}?name=${form.name}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  delete(id): Promise<any> {
    const url = `${this.basePath}/api/notifications/${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  update(form): Promise<any> {
    const url = `${this.basePath}/api/notifications/${form.id}`;
    return this.http.put(url, form)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  updateByTutor(form): Promise<any> {
    const url = `${this.basePath}/api/tutors/${form.id}/notifications`;
    return this.http.post(url, form)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  updateByStudent(form): Promise<any> {
    const url = `${this.basePath}/api/students/${form.id}/notifications`;
    return this.http.post(url, form)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getSingle(id: number): Promise<any> {
    const url = `${this.basePath}/api/notifications/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
}
