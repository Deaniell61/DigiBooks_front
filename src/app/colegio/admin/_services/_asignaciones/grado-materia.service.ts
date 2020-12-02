import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { path } from '../../../../config.module';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class GradoMateriaService {
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
    console.log(error);
    return Promise.reject(error.message || error);
  }
  getAll(): Promise<any> {
    const url = `${this.basePath}/api/gradessubjects`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getBussy(): Promise<any> {
    const url = `${this.basePath}/api/bussy/gradessubjects`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getMyChilds(id: number): Promise<any> {
    const url = `${this.basePath}/api/studyingdays/${id}/grades`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getMyGrandChilds(id: number): Promise<any> {
    const url = `${this.basePath}/api/grades/${id}/subjects`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getMyId(id: number, id2: number): Promise<any> {
    const url = `${this.basePath}/api/studyingdaysgrades/${id}/grades/${id2}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  create(form): Promise<any> {
    const url = `${this.basePath}/api/gradessubjects/signedup`;
    return this.http.post(url, form)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  deleteAll(form): Promise<any> {
    const url = `${this.basePath}/api/gradessubjects/signeddown`;
    return this.http.post(url, form)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  delete(id): Promise<any> {
    const url = `${this.basePath}/api/studyingdaysgrades/${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  update(form): Promise<any> {
    const url = `${this.basePath}/api/studyingdaysgrades/${form.id}`;
    return this.http.put(url, form)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getSingle(id: number): Promise<any> {
    const url = `${this.basePath}/api/studyingdaysgrades/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
}
