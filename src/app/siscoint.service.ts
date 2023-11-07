import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
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
import { jefesModel } from './_inteface/jefes.models';
import { tipoEntregaModel } from './_inteface/tipoEntrega.model';
import { entradasModel } from './_inteface/entradas.model';
import { detalleEntregaModel } from './_inteface/detalleEntrega.model';
import { tipoReporteModel } from './_inteface/tipoReporte.model';
import { reporteEntregasModel } from './_inteface/reporteEntrega.model';
import { pedidosModel } from './_inteface/pedido.models';
import { detallePedidoModel } from './_inteface/detallePedido.model';
import * as XLSX from 'xlsx';
import { liq_comision_asesor } from './_inteface/liq_comision_asesor.model';

@Injectable({
  providedIn: 'root'
})
export class SiscointService {
  private myAppUrl = 'https://localhost:44362/';
  private myApiLoginUrl = 'api/login/';
  arrayBuffer:any;
  arrayJson : any =[];
  //file : any;
  disabledcampos : boolean = true;
  disabled = new EventEmitter<boolean>();
  enabledModal = new EventEmitter<boolean>();
  showsUserValues = new EventEmitter<number>();
  showEmpleadosValues = new EventEmitter<number>();
  showEmpleadosValuesBusRap = new EventEmitter<number>();
  showObjetoValues = new EventEmitter<number>();
  ShowsCcostosValues = new EventEmitter<number>();
  ShowsArticuloDevolucion = new EventEmitter<number>();
  ShowsArticulosFormDev = new EventEmitter<string>();
  ShowArticuloActivoFijo = new EventEmitter<number>();
  ShowProveedores = new EventEmitter<number>();
  ShowCentroCostos = new EventEmitter<number>();
  ShowDescripcionArticuloActivoFijo = new EventEmitter<number>();
  ShowDescripcionArticuloDevolutivo = new EventEmitter<number>();
  showPedidoArticulosCompras = new EventEmitter<number>();
  esHabilitarGuardar = new EventEmitter<boolean>();
  esActualizarFormUser = new EventEmitter<boolean>();
  esActualizarFormEmpleado = new EventEmitter<boolean>();
  esActualizarFormArticulo = new EventEmitter<boolean>();
  esGuardarFromUser = new EventEmitter<boolean>();
  esGuardarFormEmpleado = new EventEmitter<boolean>();
  esGuardarFormArticulo = new EventEmitter<boolean>();
  EsGuardarActivoFijo = new EventEmitter<boolean>();
  EsGuardarDevolutivo = new EventEmitter<boolean>();
  EsGuardarPedidoNormal = new EventEmitter<boolean>();
  EsGuardarPedidoAF = new EventEmitter<boolean>();
  EsGuardarPedidoDiff = new EventEmitter<boolean>();
  showValor1BusquedaRapida = new EventEmitter<string>();
  showValor2BusquedaRapida = new EventEmitter<string>();
  valorVentanaBusquedaRapida = new EventEmitter<string>();
  showLiqComisionValues = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  httpOptions = {
    Headers : new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": "https://localhost:44362/",
    }),responseType: 'text' as 'json'
  };

  httpOptionsFile = {
    Headers : new HttpHeaders({
      'Content-Type':  'text/plain; charset=utf-8',
      "Access-Control-Allow-Origin": "https://localhost:44362/",
    }), responseType : 'blob' as 'json'
  }
  

  httpOptions2 = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  ConvertirExcelToJson(file: any) : Promise <any[]>{

    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    return new Promise((resolve,reject)=>{
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type:"binary"});
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        XLSX.utils.sheet_to_json(worksheet,{raw:true})
        //console.log("El array aqui es : "+this.arrayJson)
        resolve(XLSX.utils.sheet_to_json(worksheet,{raw:true}))
      }
    })
  }

  Authenticated(credentials : any) : Observable <any>{
    return this.http.post(this.myAppUrl+this.myApiLoginUrl, credentials, this.httpOptions);
  }

  ResetPassword(crenciales : LoginModel) : Observable<any>{
    return this.http.post(this.myAppUrl+"api/login/resetPassword/", crenciales, this.httpOptions2);
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

  getMenuPadre(usuario : UsuariosModels) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/views/listarMenuPadre",usuario);
  }

  getMenuHijo(usuario : UsuariosModels) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/views/listarMenuHijo", usuario);
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

  getDirectivos() : Observable<any[]> {
    return this.http.get<any[]>(this.myAppUrl+"api/Pedidos/getDirectivos");
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

  addEntregaArticuloFijo(tipoEntrega : tipoEntregaModel, entrega : entradasModel, detalleEntrega: detalleEntregaModel[]) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/Entradas/AgregarEntrada",{tipoEntrega, entrega, detalleEntrega});
  }

  addEntradaDevolutivo(tipoEntrega : tipoEntregaModel, entrega : entradasModel, detalleEntrega: detalleEntregaModel[]) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/Entradas/AgregarEntrada",{tipoEntrega, entrega, detalleEntrega});
  }

  addPedidos(tipoPedido : string, pedido : pedidosModel, detallePedido : detallePedidoModel[]) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/Pedidos/AgregarPedido",{tipoPedido, pedido, detallePedido});
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

  getCentroCostos() : Observable<centroCosto[]>{
    return this.http.get<centroCosto[]>(this.myAppUrl+"api/CentroCosto/listarCentroCostos");
  }

  getListTipoReporte(idTipoReporte : number) : Observable<tipoReporteModel[]>{
    
    return this.http.get<tipoReporteModel[]>(this.myAppUrl+"api/Entradas/listarTipoReporte/"+ idTipoReporte);
  }

  getJefes() : Observable<jefesModel[]>{
    return this.http.get<jefesModel[]>(this.myAppUrl+"api/Entradas/ObtenerJefes");
  }

  getTipoArticulo() : Observable<tipoArticulo[]>{
    return this.http.get<tipoArticulo[]>(this.myAppUrl+"api/Articulo/tipoArticulo");
  }

  validateImei(imei : string) : Observable<string>{
    return this.http.get<string>(this.myAppUrl+"api/Articulo/validarImei/"+imei);
  }

  getTipoReporte(idTipoFormulario : number, idOpcion : number ) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/Entradas/listarEntregas",{idTipoFormulario, idOpcion})
  }

  getTipoObjeto(id : number) : Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/Entradas/ObtnerObjeto/"+id)
  }

  getProvedorContrato(id : number) : Observable<any>{
    return this.http.get<any>(this.myAppUrl+"api/Pedidos/obtenerContratoProvedor/"+id);
  }

  getCompraArticulo(id : number) : Observable<any>{
    return this.http.get<any>(this.myAppUrl+"api/Pedidos/obtenerArticuloComprasId/"+id);
  }

  getArticuloFijoPedido(id : number) : Observable<any>{
    return this.http.get<any>(this.myAppUrl+"api/Pedidos/obtenerArticuloFijoId/"+id);
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

  enviarArchivoBcoAgrario(base : any[], usuario : string, nombreUser : string) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ExcelBcoAgreario/procesarExcelBcoAgrario",{base,usuario,nombreUser});
  }

  setCampos(campos : boolean) : void{
    this.disabledcampos = campos;
  }
  
  getListadoExcel() : Observable <any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/ExcelBcoAgreario/listarExcelBcoAgrario")
  }

  getObtenerTxt(consecutivo : number) : Observable<string>{
    return this.http.get<string>(this.myAppUrl+"api/ExcelBcoAgreario/ObtenerBcoAgrario/"+consecutivo, this.httpOptions)
  }

  getObtenerTablaPap() : Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/liqPap/listarTblLiqPap")
  }

  actualizarTblPap(id : number, valor : number ) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/liqPap/ActualizarTblPap",{id, valor})
  }

  enviarArchivoCartaMeta(meta : any[], usuario : string, nombreUser : string, codigo_tipo_esquema : number) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/procesarExcelCartaMetas",{meta,usuario,nombreUser,codigo_tipo_esquema});
  }

  getLiqTipoEsquema() : Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/ImporteMetas/ListarTipoEquema");
  }

  getLiqPeriodos() : Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/ImporteMetas/listarPeriodos");
  }

  getObtenerEscalaXPerido(periodo : string) : Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/ImporteMetas/listarEsquemasXperiodo/"+periodo, this.httpOptions)
  }
  getOptenerSupervisoresEscalaXPerido(codigo_tipo_esquema : number, periodo : string) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/ImporteMetas/ListarSupervisoresXPeriodoEsquema",{codigo_tipo_esquema, periodo})
  }
  getObtenerAsesoresSupervisoresEscalaXPerido(codigo_tipo_esquema : number, periodo : string, cedula_super : string) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/ImporteMetas/ListarAsesorSupervisoresXPeriodoEsquema",{codigo_tipo_esquema, periodo, cedula_super})
  }
  getObtenerLiquidadorComisionAsesor(id : number) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/detalleLiquidadorComisionAsesor",{id});
  }
  getListarTipoImporte() : Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/ImporteMetas/ListarTipoImporte");
  }
  enviarArchivoBaseCierre(usuario : string, nombreUser : string, periodo : string, baseCierre : any[], tipo_esquema : number) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelBaseCierre",{baseCierre,usuario,nombreUser,periodo, tipo_esquema})
  }
  enviarArchivoAltasMoviles(usuario : string, nombreUser : string, periodo : string, altasMovil : any[]) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelAltasMovil",{altasMovil,usuario,nombreUser,periodo})
  }
  enviarArchivoPenalizacionesPap(usuario : string, nombreUser : string, periodo : string, baseCierre : any[], tipo_esquema : number) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelPenalizacionesMegas",{baseCierre,usuario,nombreUser,periodo, tipo_esquema})
  } 
  enviarArchivoNuncaPagosMegas(usuario : string, nombreUser : string, periodo : string, nuncaPagos : any[]) :Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelNuncaPagosMegas",{nuncaPagos,usuario,nombreUser,periodo})
  }
  enviarArchivoAltasMigracionMegas(usuario : string, nombreUser : string, periodo : string, altaMigracion : any[]) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelAltasMigracion",{altaMigracion,usuario,nombreUser,periodo})
  }
  updateLiqComisionAsesor(id: number, liq_comision_asesor_e : liq_comision_asesor) : Observable<string>{
    return this.http.put<string>(this.myAppUrl+"api/ImporteMetas/actualizarLiqComisionAsesor/"+id, liq_comision_asesor_e , this.httpOptions);
  }
  getListarArchivosLiq() : Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/ImporteMetas/listarArchivosLiquidador");
  }
  descargarArchivosLiq(id : number) : Observable<any>{
    return this.http.get<any>(this.myAppUrl+"api/ImporteMetas/DescargarArchivoExcel/"+id, this.httpOptionsFile)
  }
  enviarArchivoPenalizacionesMoviles(usuario : string, nombreUser : string, periodo : string, penalizacionMovil : any[]) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelPenalizacionMovil",{penalizacionMovil,usuario,nombreUser,periodo})
  }

  getListarTipoLiquidador(parametro : string) : Observable<any[]> {
    return this.http.post<any[]>(this.myAppUrl+"api/liqPap/listarTblLiqPap",{parametro})
  }

  enviarArchivoPenalizacionesPyme(usuario : string, nombreUser : string, periodo : string, baseCierre : any[], tipo_esquema : number) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelPenalizacionesMegas",{baseCierre,usuario,nombreUser,periodo, tipo_esquema})
  } 

  public get getCampos(){
    return this.disabledcampos;
  }

  
}
