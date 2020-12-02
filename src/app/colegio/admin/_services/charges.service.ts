import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { path } from '../../../config.module';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ChargesService {
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
    const url = `${this.basePath}/api/bussy/charges`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  create(form): Promise<any> {
    const url = `${this.basePath}/api/charges`;
    return this.http.post(url, form)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  createAll(form): Promise<any> {
    const url = `${this.basePath}/api/charges/signedup`;
    return this.http.post(url, form)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  createToAll(form): Promise<any> {
    const url = `${this.basePath}/api/charges/load`;
    return this.http.post(url, form)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  deleteAll(form): Promise<any> {
    const url = `${this.basePath}/api/charges/signeddown`;
    return this.http.post(url, form)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  delete(id): Promise<any> {
    const url = `${this.basePath}/api/charges/${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  update(form): Promise<any> {
    const url = `${this.basePath}/api/charges/${form.id}`;
    return this.http.put(url, form)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getSingle(id: number, option: string): Promise<any> {
    const url = `${this.basePath}/api/students/${id}/charges${option}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
}
