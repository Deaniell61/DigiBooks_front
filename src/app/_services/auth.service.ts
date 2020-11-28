import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { path } from "../config.module";

import "rxjs/add/operator/toPromise"; 

@Injectable()
export class AuthService {
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

  Authentication(login:any):Promise<any> {
    let url = `${this.basePath}/api/login`

    return this.http.post(url,login)
                    .toPromise()
                    .then(response => {
                      // console.log(response.json())
                      return response.json()
                    })
                    .catch(this.handleError)
  }

  recovery(form:any):Promise<any>{
    let url = `${this.basePath}/api/users/password/reset`
    
    return this.http.post(url,form)
                      .toPromise()
                      .then(response => {
                        return response.json()
                      })
                      .catch(this.handleError)
  }

}
