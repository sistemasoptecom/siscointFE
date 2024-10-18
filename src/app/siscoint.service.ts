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
import * as forge from 'node-forge';
import { RSAhelper } from './helpers/rsa.helper';
import { tec_liq_periodo_comision } from './_inteface/tec_liq_periodo_comision.model';
import { tec_liq_config_semana_comision } from './_inteface/tec_liq_config_semana_comision.model';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';



@Injectable({
  providedIn: 'root'
})
export class SiscointService {
  
  private myAppUrl = 'https://localhost:44362/';
  //private myAppUrl = 'https://sistemasoptecom.net/appserver/';
  //private myAppUrl = 'https://pruebasiscoint.sistemasoptecom.net/appserver/';
  //private myAppUrl = 'https://pruebasiscoint.sistemasoptecom.net/appserverV2/';
  //private myAppUrl = 'https://ajlf2010.bsite.net/';
  //private myAppUrl = 'https://ajlf2020.bsite.net/';
  private myApiLoginUrl = 'api/login/';
  arrayBuffer:any;
  arrayJson : any =[];
  //publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  credenciales2: LoginModel = {Username:'', Password:''};
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

  constructor(private http: HttpClient, private rsaHelper : RSAhelper) { }

  
  httpOptions = {
    Headers : new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      "Access-Control-Max-Age": "3000"
      
    }),responseType: 'text' as 'json'
  };

  httpOptionsFile = {
    Headers : new HttpHeaders({
      'Content-Type':  'text/plain; charset=utf-8',
      "Access-Control-Allow-Origin": "*",
    }), responseType : 'blob' as 'json'
  }
  

  httpOptions2 = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'})
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
     this.credenciales2 = {
       Username : this.rsaHelper.encryptWithPublicKey(credentials.Username),
       Password : this.rsaHelper.encryptWithPublicKey(credentials.Password)
     }
    return this.http.post(this.myAppUrl+this.myApiLoginUrl, this.credenciales2, this.httpOptions);
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

  actualizarTblPap(id : number, valor : number, esquema : string ) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/liqPap/ActualizarTblPap",{id, valor, esquema})
  }

  enviarArchivoCartaMeta(meta : any[], usuario : string, nombreUser : string, codigo_tipo_esquema : number) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/procesarExcelCartaMetasAsesor",{meta,usuario,nombreUser,codigo_tipo_esquema});
  }

  enviarArchivoCartaMetaSuper(meta : any[], usuario : string, nombreUser : string, codigo_tipo_esquema : number) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/procesarExcelCartaMetasSuper",{meta,usuario,nombreUser,codigo_tipo_esquema})
  }

  getLiqTipoEsquema(parametro : number) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/ImporteMetas/ListarTipoEquema",{parametro});
  }

  getLiqPeriodos() : Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/ImporteMetas/listarPeriodos");
  }
  getLiqPeriodosAll() : Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/ImporteMetas/ListarPeriodosAll")
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
  enviarArchivoBaseCierrePap(usuario : string, nombreUser : string, periodo : string, baseCierre : any[], tipo_esquema : number) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelBaseCierrePap",{baseCierre,usuario,nombreUser,periodo, tipo_esquema},this.httpOptions)
  }

  enviarArchivoBaseCierrePymes(usuario : string, nombreUser : string, periodo : string, baseCierre : any[], tipo_esquema : number) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelBaseCierrePyme",{baseCierre,usuario,nombreUser,periodo, tipo_esquema})
  }

  enviarArchivoAltasMoviles(usuario : string, nombreUser : string, periodo : string, altasMovil : any[]) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelAltasMovil",{altasMovil,usuario,nombreUser,periodo})
  }
  enviarArchivoPenalizacionesPap(usuario : string, nombreUser : string, periodo : string, baseCierre : any[], tipo_esquema : number) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelPenalizacionesMegasPap",{baseCierre,usuario,nombreUser,periodo, tipo_esquema})
  } 
  enviarArchivoNuncaPagosMegas(usuario : string, nombreUser : string, periodo : string, nuncaPagos : any[]) :Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelNuncaPagosMegas",{nuncaPagos,usuario,nombreUser,periodo})
  }
  enviarArchivoAltasMigracionMegasPap(usuario : string, nombreUser : string, periodo : string, altaMigracion : any[],tipo_esquema : number) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelAltasMigracion",{altaMigracion,usuario,nombreUser,periodo,tipo_esquema})
  }
  enviarArchivoAltasMigracionMegasPyme(usuario : string, nombreUser : string, periodo : string, altaMigracion : any[],tipo_esquema : number) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelAltasMigracion",{altaMigracion,usuario,nombreUser,periodo,tipo_esquema})
  }
  enviarArchivoAltasMigracionMegasCall(usuario : string, nombreUser : string, periodo : string, altaMigracion : any[],tipo_esquema : number) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelAltasMigracion",{altaMigracion,usuario,nombreUser,periodo,tipo_esquema})
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

  enviarArchivoNuncaPagosMovil(usuario : string, nombreUser : string, periodo : string, nuncaPagosMovil : any[]){
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarNuncaPagosMovil",{usuario,nombreUser,periodo,nuncaPagosMovil})
  }
  enviarArchivoOtrosConceptos(usuario : string, nombreUser : string, periodo : string, otrosConceptos : any[]){
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelOtrosConceptos",{usuario,nombreUser,periodo,otrosConceptos})
  }

  getListarTipoLiquidador(parametro : string) : Observable<any[]> {
    return this.http.post<any[]>(this.myAppUrl+"api/liqPap/listarTblLiqPap",{parametro})
  }

  enviarArchivoPenalizacionesPyme(usuario : string, nombreUser : string, periodo : string, baseCierre : any[], tipo_esquema : number) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelPenalizacionesMegasPyme",{baseCierre,usuario,nombreUser,periodo, tipo_esquema})
  }
  
  getListarTipoLiquidadorCall() : Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/liqPap/listarTblCall")
  }

  getListarTipoLiquidadoMovil():Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/liqPap/listarTblMovil")
  }

  getListarValoresMega(esquema : number) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/liqPap/listarValoresMega",{esquema})
  }

  actualizarMegas(id : number , valor : number) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/liqPap/actualizarLiqValoresMega",{id, valor})
  }

  enviarArchivoBaseCierreCall(usuario : string, nombreUser : string, periodo : string, baseCierre : any[], tipo_esquema : number) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelBaseCierreCall",{baseCierre,usuario,nombreUser,periodo, tipo_esquema})
  }

  enviarArchivoPenalizacionesCall(usuario : string, nombreUser : string, periodo : string, baseCierre : any[], tipo_esquema : number) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarPenalizacionesCall",{baseCierre,usuario,nombreUser,periodo, tipo_esquema})
  }

  getObtenerLiquidadorComisionSupervisor(cedula_supervisor : string, periodo : string ) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/detalleLiquidadorComisionSupervisor",{cedula_supervisor, periodo});
  }

  getObtenerLiquididadorSupervisorExcel(cedula_supervisor : string, periodo : string ) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/ImporteMetas/ListarLiquidadorSupervisorAsesor",{cedula_supervisor, periodo})
  }

  getObtenerPorcentaje(proceso : string) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/validoEstadoProceso",{proceso})
  }
  getAnularProceso(proceso : string) :Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/cancelarProceso",{proceso})
  }

  reprocesarAltasMega(tipo_esquema : number, TipoProceso : number, cedula_supervisor : string, periodo : string) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/reprocesarBaseCierreCartaMetaPap",{tipo_esquema, TipoProceso, cedula_supervisor, periodo})
  }

  reprocesarAltasMegaPymes(codigo_tipo_esquema : number, TipoProceso : number, cedula_supervisor : string, periodo : string) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/reprocesarBaseCierreCartaMetaPymes",{codigo_tipo_esquema, TipoProceso, cedula_supervisor, periodo})
  }

  reprocesarAltasMegaCall(tipo_esquema : number, TipoProceso : number, cedula_supervisor : string, periodo : string) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/reprocesarExcelBaseCierreCall",{tipo_esquema, TipoProceso, cedula_supervisor, periodo})
  }

  reprocesarAltasMovil(tipo_esquema : number, TipoProceso : number, cedula_supervisor : string, periodo : string) : Observable<any>
  {
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/reprocesarExcelAltasMovil",{tipo_esquema, TipoProceso, cedula_supervisor, periodo})
  }
  reprocesarPenalizacionMovil(tipo_esquema : number, TipoProceso : number, cedula_supervisor : string, periodo : string) : Observable<any>
  {
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/reprocesarExcelAltasMovil",{tipo_esquema, TipoProceso, cedula_supervisor, periodo})
  }

  getListarEscalaAltas(codigo_tipo_esquema:number) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/liqPap/listarEscalaAltas",{codigo_tipo_esquema});
  }
  actualizarNivel(id : number, valor : number) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/liqPap/actualizarEscalaAltas",{id, valor})
  }

  getListarEmpHome(codigo_tipo_esquema : number) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/liqPap/listarEmpHome",{codigo_tipo_esquema})
  }
  actualizarEmpHome(id : number, valor : number) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/liqPap/actualizarEmpHome",{id, valor})
  }
  enviarCorreo(usuario : string, proceso : string, correo : string) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/EnviarTokenAutorizacion",{usuario, proceso, correo})
  }
  validarTokenAutizacion(usuario : string, token : number, prop1: string, prop2 : string, prop3 : string) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/ValidarTokenAutorizacion",{usuario,token,prop1,prop2,prop3})
  }

  validarEstadoPerido(periodo : string) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/validarEstadoPeriodo",{periodo})
  }

  ListarComisionSupervisorV2(periodo : string, codigo_tipo_esquema : number) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/ImporteMetas/ListarComisionSupervisorV2",{periodo,codigo_tipo_esquema})
  }

  ListarLiqConsultas() : Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/liqConsultas/listarLiqConsultas")
  }

  descargarArchivoConsulta(codigoTipoComisionConsulta : number, periodoConsulta : string): Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/liqConsultas/descargoArchivoConsula",{codigoTipoComisionConsulta,periodoConsulta})
  }

  consultaCantidadProcesos(codigoTipoEsquema : number, periodo : string) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/liqConsultas/consultoCantidadLiq",{codigoTipoEsquema,periodo})
  }

  descargarCantidadProcesos(tipo_rpt : string , periodo : string , codigoTipoEsquema : number) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/liqConsultas/descargarRptEsquemas",{tipo_rpt,periodo,codigoTipoEsquema})
  }

  enviarAcrchivoNoProcesadosMegas(usuario : string, nombreUser : string, periodo : string, baseCierre : any[]) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/procesarExcelNoPrecesadosMegas",{usuario,nombreUser,periodo,baseCierre})
  }

  getUsuariosToken():Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl+"api/Token/listarUsuariosToken");
  }

  reprocesarEsquema(TipoEsquema : number, TipoProceso : number, periodo : string) : Observable<string>{
    return this.http.post<string>(this.myAppUrl+"api/ImporteMetas/ReprocesarEsquema",{TipoEsquema,TipoProceso,periodo})
  }

  enviarArchivoCartaMetaRecuperador(data : any[], usuario : string, nombreUser : string, codigo_tipo_esquema : number) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/procesarExcelCartaMetaRecuperador",{data,usuario,nombreUser,codigo_tipo_esquema})
  }

  enviarArchivoExcelEmpleados(data : any[], usuario : string,  nombreUser : string ) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/ImportEmpleado/enviaTmpDataEmpleado",{data, usuario, nombreUser})
  }

  getSupervisores(codigo_tipo_esquema : number, periodo : string) : Observable<any[]>{
    return this.http.post<any[]>(this.myAppUrl+"api/ImporteMetas/getSupervisores",{codigo_tipo_esquema, periodo})
  }

  recalcularComisionSuper(periodo: string, 
                          usuario : string,
                          cedula_supervisor : string, 
                          codigo_tipo_esquema : number,
                          numero_meta_ftth : number,
                          numero_ejecucion_ftth : number,
                          numero_meta_movil : number,
                          numero_ejecucion_movil : number) : Observable<any>{
     return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/recalcularComisionSupervisor",{
                                                                                                periodo,
                                                                                                usuario,
                                                                                                cedula_supervisor,
                                                                                                codigo_tipo_esquema,
                                                                                                numero_meta_ftth,
                                                                                                numero_ejecucion_ftth,
                                                                                                numero_meta_movil,
                                                                                                numero_ejecucion_movil
                                                                                              })                        
  }

  getAnio():Observable<string>
  {
    return this.http.get<string>(this.myAppUrl+"api/liqTecConf/getAAAA")
  }

  getTopePuntos():Observable<string>
  {
    return this.http.get<string>(this.myAppUrl+"api/liqTecConf/getTopePuntos")
  }

  enviarPuntajeComisionTecnica(periodo_comision : tec_liq_periodo_comision, periodo_detalle : tec_liq_config_semana_comision[], usuario : string) : Observable<any>{
    return this.http.post<any>(this.myAppUrl+"api/liqTecConf/addPuntajeComisionTecnica",{periodo_comision,periodo_detalle,usuario});
  }

  getlistarPeriodosComisionTec():Observable<any>
  {
    return this.http.get<any>(this.myAppUrl+"api/liqTecConf/listarPeriodosComision")
  }

  getListarCiudades(usuario : string):Observable<any[]>
  {
    return this.http.post<any[]>(this.myAppUrl+"api/liqTecConf/getListCiudades",{usuario})
  }

  listarPeriodoCiudad(periodo : string, usuario : string):Observable<any[]>
  {
    return this.http.post<any[]>(this.myAppUrl+"api/liqTecConf/listarPeriodoCiudad",{periodo,usuario})
  }

  enviarConfigPuntos(formConfig :any) : Observable<any>
  {
    return this.http.post<any>(this.myAppUrl+"api/liqTecConf/enviarConfBonos",{formConfig})
  }

  getListarConfBonoCiudad(cod_ciudad : string) : Observable<any[]>
  {
    return this.http.post<any[]>(this.myAppUrl+"api/liqTecConf/getListarConfBonoCiudad",{cod_ciudad})
  }

  editConfBono(id: number, rango_puntaje: string, valor : number, usuario : string) : Observable<any>
  {
    return this.http.post<any>(this.myAppUrl+"api/liqTecConf/editConfBono",{id,rango_puntaje,valor,usuario})
  }

  enviarImporteLiquidador(data : any[], usuario : string) : Observable<string>
  {
    return this.http.post<string>(this.myAppUrl+"api/liqPap/importarEsquena",{data,usuario})
  }

  setEnviarConfPenalizacion(data : any) : Observable<string>
  {
    return this.http.post<string>(this.myAppUrl+"api/liqTecConf/enviarConfPenalizacion",{data})
  }

  setEditConfPenalizacion(id: number, data : any) : Observable<string>
  {
    return this.http.post<string>(this.myAppUrl+"api/liqTecConf/editConfPenalizacion",{id, data})
  }

  getListarConfPenalizaCiudad(cod_ciudad : string) : Observable<any[]>
  {
    return this.http.post<any[]>(this.myAppUrl+"api/liqTecConf/getListarConfPenalizaCiudad",{cod_ciudad})
  }

  setEnviarImporteDiaTecnico(base : any[], 
                            periodo : string, 
                            cod_ciudad : string, 
                            semana_comision : number, 
                            dia_comision : Date, 
                            usuario: string) : Observable<string>
  {
    return this.http.post<string>(this.myAppUrl+"api/liqTecConf/setImporteDiaTecnico",{base,periodo,cod_ciudad,semana_comision,dia_comision,usuario})
  }

  getListarDetalleImporteTecnicos(periodo : string, 
                                  cod_ciudad : string, 
                                  cod_semana : number, 
                                  dia_semana : Date ) : Observable<any[]>
  {
    return this.http.post<any[]>(this.myAppUrl+"api/liqTecConf/getListarDetalleImporteTecnicos",{periodo,cod_ciudad,cod_semana,dia_semana})
  }
  
  setEnviarItemsValores(data:any[],usuario:string) : Observable<any[]>
  {
    return this.http.post<any[]>(this.myAppUrl+"api/liqTecConf/setEnviarItemsValores",{data,usuario});
  }

  getListarItemsCiudad(cod_ciudad : string) : Observable<any[]>
  {
    return this.http.post<any[]>(this.myAppUrl+"api/liqTecConf/getListarItemsCiudad",{cod_ciudad})
  }

  enviarNoProcesadosMovil(procesar : any[],usuario : string, nombreUser : string) : Observable<any>
  {
    return this.http.post<any>(this.myAppUrl+"api/ImporteMetas/procesarExcelNoPrecesadosMovil",{procesar,usuario,nombreUser})
  }

  setUsuarioCiudad(usuario : string ) : Observable<any[]>
  {
    return this.http.post<any[]>(this.myAppUrl+"api/liqTecConf/tecUsuarioCiudad",{usuario})
  }

  setImporteMasivoEmpleado(base : any[]) : Observable<any>
  {
    return this.http.post<any>(this.myAppUrl+"api/empleado/agregarEmpleadosMasivos",{base})
  }

  public get getCampos(){
    return this.disabledcampos;
  }



  
}
