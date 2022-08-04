import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from './_inteface/login.model';
import { AuthenticatedResponse } from './_inteface/authenticated-response.model';
import { ViewsModels } from './_inteface/views.model';
import { UsuariosModels } from './_inteface/usuario.model';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SiscointService {
  private myAppUrl = 'https://localhost:44362/';
  private myApiLoginUrl = 'api/login/';
  disabledcampos : boolean = true;
  disabled = new EventEmitter<boolean>();
  enabledModal = new EventEmitter<boolean>();
  showsUserValues = new EventEmitter<number>();
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

  getUsuarios(usuario: UsuariosModels) : Observable<UsuariosModels[]>{
    return this.http.post<UsuariosModels[]>(this.myAppUrl+"api/Usuarios/getUsuario/", usuario);
  }

  getUsuarioPrueba(valor:string){
    return valor;
  }

  getViews() : Observable <ViewsModels[]> {
    return this.http.get<ViewsModels[]>(this.myAppUrl+'api/views/views');
  }



  setCampos(campos : boolean) : void{
    this.disabledcampos = campos;
  }

  public get getCampos(){
    return this.disabledcampos;
  }

  
}
