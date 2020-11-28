import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { path } from "../../../config.module";

import "rxjs/add/operator/toPromise"; 

@Injectable()
export class StudentsService {

  headers = new Headers({'Access-Control-Allow-Origin':'*',
  'cache-control':'no-cache',
  'server':'Apache/2.4.18 (Ubuntu)',
  'x-ratelimit-limit':'60',
  'x-ratelimit-remaining':'59'})
private basePath:string = path.path

constructor(private http:Http){

}

private handleError(error:any):Promise<any> {
console.error("ha ocurrido un error")
console.log(error)
return Promise.reject(error.message || error)
}

  getAll():Promise<any> {
  let url = `${this.basePath}/api/students`

    return this.http.get(url)
                    .toPromise()
                      .then(response => {
                        //console.log(response.json())
                        return response.json()
                      })
                      .catch(this.handleError)                  
  }
  create(form):Promise<any> {
    let url = `${this.basePath}/api/students`
  
      return this.http.post(url,form)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
  delete(id):Promise<any> {
    let url = `${this.basePath}/api/students/${id}`
  
      return this.http.delete(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
  update(form):Promise<any> {
    let url = `${this.basePath}/api/students/${form.id}`
  
      return this.http.put(url,form)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
   
  getSingle(id:number):Promise<any> {
    let url = `${this.basePath}/api/students/${id}`
  
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
  getFreeStudents():Promise<any>{
    let url = `${this.basePath}/api/free/students`
      
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError) 

  }

  getHomeWork(id:any):Promise<any> {
    let url = `${this.basePath}/api/students/${id}/homeworks`
  
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
}
