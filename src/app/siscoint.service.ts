import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from './_inteface/login.model';
import { AuthenticatedResponse } from './_inteface/authenticated-response.model';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SiscointService {
  private myAppUrl = 'https://localhost:44362/';
  private myApiLoginUrl = 'api/login/';
  constructor(private http: HttpClient) { }

  httpOptions = {
    Headers : new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": "*",
    }),responseType: 'text' as 'json'
  };

  Authenticated(credentials : any) : Observable <any>{
    return this.http.post(this.myAppUrl+this.myApiLoginUrl, credentials, this.httpOptions);
  }

  getCurrentUser() : Observable <any>{
    return this.http.get(this.myAppUrl+'api/Usuarios/Usuarios/', this.httpOptions);
  }

  
}
