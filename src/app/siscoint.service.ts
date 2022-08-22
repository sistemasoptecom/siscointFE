import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from './_inteface/login.model';
import { AuthenticatedResponse } from './_inteface/authenticated-response.model';
import { ViewsModels } from './_inteface/views.model';
import { UsuariosModels } from './_inteface/usuario.model';
import { permisosUsuII } from './_inteface/permisosUsuII.model';
import { HttpHeaders } from '@angular/common/http';
import { tipoUsuario } from './_inteface/tipoUsuario.model';
import { empresaModel } from './_inteface/empresas.model';
import { busquedaRapida } from './_inteface/busquedaRapida.model';
import { empleado } from './_inteface/empleado.model';
import { centroCosto } from './_inteface/centroCosto.model';
import { tipoArticulo } from './_inteface/tipoArticulo.model';
import { objetoModels } from './_inteface/objeto.model';
import { articulosModel } from './_inteface/articulos.model';



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
  showEmpleadosValues = new EventEmitter<number>();
  showObjetoValues = new EventEmitter<number>();
  ShowsCcostosValues = new EventEmitter<number>();
  ShowsArticuloDevolucion = new EventEmitter<number>();
  ShowsArticulosFormDev = new EventEmitter<string>();
  ShowArticuloActivoFijo = new EventEmitter<number>();
  esHabilitarGuardar = new EventEmitter<boolean>();
  esActualizarFormUser = new EventEmitter<boolean>();
  esActualizarFormEmpleado = new EventEmitter<boolean>();
  esActualizarFormArticulo = new EventEmitter<boolean>();
  esGuardarFromUser = new EventEmitter<boolean>();
  esGuardarFormEmpleado = new EventEmitter<boolean>();
  esGuardarFormArticulo = new EventEmitter<boolean>();
  showValor1BusquedaRapida = new EventEmitter<string>();
  showValor2BusquedaRapida = new EventEmitter<string>();
  valorVentanaBusquedaRapida = new EventEmitter<string>();
  constructor(private http: HttpClient) { }

  httpOptions = {
    Headers : new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": "*",
    }),responseType: 'text' as 'json'
  };

  httpOptions2 = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  Authenticated(credentials : any) : Observable <any>{
    return this.http.post(this.myAppUrl+this.myApiLoginUrl, credentials, this.httpOptions);
  }

  getCurrentUser() : Observable <any>{
    return this.http.get(this.myAppUrl+'api/Usuarios/Usuarios/', this.httpOptions);
  }

  getUsuarios(usuario: UsuariosModels) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/Usuarios/getUsuario/", usuario);
  }

  getUsuariosID(usuario: UsuariosModels) : Observable<UsuariosModels[]>{
    return this.http.post<UsuariosModels[]>(this.myAppUrl+"api/Usuarios/getUsuarioId/", usuario);
  }

  getPermisosUsuario(permisosUSuario : permisosUsuII) : Observable<permisosUsuII[]>{
    return this.http.post<permisosUsuII[]>(this.myAppUrl+"api/views/viewsUser", permisosUSuario);
  }

  getAreaCentroCosto(area_cCosto : centroCosto) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/CentroCosto/getCentroCosto", area_cCosto);
  }

  getEmpleados(empleado : empleado) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/empleado/busquedaEmpleado", empleado);
  }

  getArticulosObjetos(objeto : objetoModels) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/Articulo/busquedaObjeto", objeto);
  }

  getArticulosObjetosId(objeto : objetoModels) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/Articulo/getObjetoArticuloId", objeto);
  }

  
  getEmpleado(empleados : empleado) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/empleado/busquedaEmpleadoId", empleados);
  }

  getDataBusquedaRapida(data : busquedaRapida[]) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/busquedaRapida/index",data);
  }

  getUsuarioPrueba(valor:string){
    return valor;
  }

  getViews() : Observable <ViewsModels[]> {
    return this.http.get<ViewsModels[]>(this.myAppUrl+'api/views/views');
  }

  getTipoUsuario() : Observable<tipoUsuario[]>{
    return this.http.get<tipoUsuario[]>(this.myAppUrl+'api/Usuarios/tipoUsuario');
  }

  updateUsuario(id: number, usuario: UsuariosModels) : Observable<any>{
    return this.http.put<any>(this.myAppUrl+"api/Usuarios/EditarUsuario/"+id, usuario,this.httpOptions);
  }

  updateEmpleado(id: number, empleado : empleado) : Observable<string>{
    return this.http.put<string>(this.myAppUrl+"api/empleado/EditarEmpleado/"+id, empleado , this.httpOptions);
  }

  addUsuario(usuario: UsuariosModels) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/Usuarios/AgregarUsuario", usuario);
  }

  addEmpleados(empleado : empleado) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/empleado/agregarEmpleado", empleado);
  }

  //Articulo//AgregarObjeto
  addArticulos(idDepreciacion : number ,objeto : objetoModels) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/Articulo/AgregarObjeto/"+idDepreciacion, objeto, this.httpOptions2);
  }

  updatePermisosUsuarios(data : any[]) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/permisos_usuII/actulizarPermisosUsu",data,this.httpOptions2)
  }

  getEmpresas() : Observable<empresaModel[]>{
    return this.http.get<empresaModel[]>(this.myAppUrl+"api/empleado/getEmpresas");
  }

  getTipoArticulo() : Observable<tipoArticulo[]>{
    return this.http.get<tipoArticulo[]>(this.myAppUrl+"api/Articulo/tipoArticulo");
  }

  validateImei(imei : string) : Observable<string>{
    return this.http.get<string>(this.myAppUrl+"api/Articulo/validarImei/"+imei);
  }

  getArticuloDevolucion(idArticulo : number) : Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/Articulo/validarArticulo/"+idArticulo.toString());
  }

  getArticuloArtivoFijo(idDepreciacion : number) : Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/Articulo/ValidarArticuloFijo/"+idDepreciacion.toString());
  }

  getValuesTipoArticuloDevolucion(articulo : articulosModel) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/Articulo/validarArticuloDevolutivo", articulo);
  }

  setCampos(campos : boolean) : void{
    this.disabledcampos = campos;
  }

  public get getCampos(){
    return this.disabledcampos;
  }

  
}
