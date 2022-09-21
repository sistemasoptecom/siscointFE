import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { SiscointService } from 'src/app/siscoint.service';
import { centroCosto } from 'src/app/_inteface/centroCosto.model';
import { tipoArticulo } from 'src/app/_inteface/tipoArticulo.model';
import { BusquedarapidaComponent } from 'src/app/controls/busquedarapida/busquedarapida.component';
import { InputsBusquedaComponent } from 'src/app/controls/inputs-busqueda/inputs-busqueda.component';
import { BusqArticuloDevolucionComponent } from 'src/app/controls/busquedasRapidas/busq-articulo-devolucion/busq-articulo-devolucion.component';
import { BusqArticuloActivoFijoComponent } from 'src/app/controls/busquedasRapidas/busq-articulo-activo-fijo/busq-articulo-activo-fijo.component';
import { objetoModels } from 'src/app/_inteface/objeto.model';
import { ToolbarComponent } from 'src/app/controls/toolbar/toolbar.component';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  public disabled : boolean = true;
  idObjeto : number =  0;
  af : string = "";
  imei : string = "";
  nuevoImei : string = "";
  tipoArticulo : number = 0;
  cod_articulo : string = "";
  descripcion : string = "";
  tipo : number = 0;
  linea : string = "";
  lineaActiva : string = "";
  factura : string = "";
  causacion : Date = new Date;
  valor : number = 0;
  observacion : string = "";
  mostrarEstados : boolean = false;
  estadoValue : number = 0;
  idArticuloDevolucion : number = 0;
  idArticuloActivoFijo : number = 0;
  fechaEstado : Date = new Date;
  activoFijoDescrip : string = "";
  cCostos : string = "";
  idDepreciacion : number = 0;

  area : string = "";
  idCentroCosto : number = 0;

  tiposArticulos : tipoArticulo[] = [];
  estados : any[] = [];
  EsGuardarForm : boolean = false;

  @ViewChild(BusquedarapidaComponent) 
  private busquedaRapida! : BusquedarapidaComponent
  @ViewChild(InputsBusquedaComponent) 
  private inputBusqueda! : InputsBusquedaComponent
  @ViewChild(BusqArticuloDevolucionComponent)
  private busquedaDevolucion! : BusqArticuloDevolucionComponent

  

  @ViewChild(BusqArticuloActivoFijoComponent)
  private busquedaActivoFijo! : BusqArticuloActivoFijoComponent
  @ViewChild(ToolbarComponent)
  private toolbar! : ToolbarComponent;

  constructor(private siscointService : SiscointService) { }

  ngOnInit(): void {
    this.siscointService.disabled.subscribe(valor => {
      this.disabled = valor;
    });
    this.getTipoArticulo();
    this.valueCentroCosto();
    this.valueArticuloDevolutivo();
    this.valueArticuloActivoFijo();
    this.validarAddArticulos();
    this.validateExisObjetoArticulo();
  }

  validarAddArticulos(){
    this.siscointService.esGuardarFormArticulo.subscribe(valor => {
      this.EsGuardarForm = valor;
      if(this.EsGuardarForm){
        this.AddArticulos();
      }
    })
  }

  AddArticulos(){
    //console.log("Se va guardar aqui el articulo");
    const objetoAdd : objetoModels = {
      id : 0, 
      tipo : this.tipo,
      af : this.af,
      imei : this.imei,
      descripcion : this.descripcion,
      observacion : this.observacion,
      estado : this.estadoValue,
      factura : this.factura,
      linea : this.linea,
      linea_activa : this.lineaActiva,
      valor : this.valor.toString(),
      nuevo_imei : this.nuevoImei,
      causacion : this.causacion,
      centro_costo : this.cCostos,
      fecha_estado : this.fechaEstado,
      tipo_articulo : this.tipoArticulo,
      cod_articulo : this.cod_articulo,
    }
     //console.log(objetoAdd);
     this.siscointService.addArticulos(this.idDepreciacion,objetoAdd).subscribe((res : any) => {
      //console.log(res.Mensaje);
      alert(res.Mensaje);
      this.toolbar.habilitarToolbarInicio();
      this.disabled = true;
     })
  }
  validateExisObjetoArticulo(){
    this.siscointService.showObjetoValues.subscribe(valor => {
      this.idObjeto = valor;
      if(this.idObjeto > 0){
        this.getObjetoArticulo(this.idObjeto)
      }
    })
  }

  getObjetoArticulo(idObjeto : number){
    const objetoAdd : objetoModels = {
      id : idObjeto, 
      tipo : 0,
      af : "",
      imei : "",
      descripcion : "",
      observacion : "",
      estado : 0,
      factura : "",
      linea : "",
      linea_activa : "",
      valor : "",
      nuevo_imei : "",
      causacion : new Date,
      centro_costo : "",
      fecha_estado : new Date,
      tipo_articulo : 0,
      cod_articulo : "",
    }
    this.siscointService.getArticulosObjetosId(objetoAdd).subscribe((res : any) => {
      console.log(res.descripcion);
      this.tipoArticulo = res.tipo_articulo
      this.setFormArticulos(res);
    })
  }
  setFormArticulos(res : any){
    
    this.tipoArticulo = res.tipo_articulo;
    this.imei = res.imei;
    this.nuevoImei = res.nuevo_imei;
    this.cod_articulo = res.cod_articulo;
    this.descripcion = res.descripcion;
    //this.busquedaRapida.setValues(res[0].ccosto, res[0].area, "busquedaCentroCosto")
    this.busquedaRapida.validCampoCentroCosto(res.centro_costo)
    
    if(this.tipoArticulo == 1){
      this.siscointService.ShowsArticulosFormDev.emit(res.cod_articulo);
      //console.log(busquedaDevolucion2);
      
    }else{

    }
  }
  getTipoArticulo(){
    this.siscointService.getTipoArticulo().subscribe((res : tipoArticulo[]) => {
      this.tiposArticulos = res;
    })
  }
  validarImei(e : any){
    //alert("Este metodo se validara el imei : "+ this.imei)
    this.siscointService.validateImei(this.imei).subscribe((res:string) => {
      var obj = JSON.stringify(res);
      var ress = JSON.parse(obj);
      //console.log(ress.Result)
      if(ress.Result == true){
        alert(ress.Mensaje);
      }
    })
  }
 
  valueArticuloDevolutivo(){
    this.siscointService.ShowsArticuloDevolucion.subscribe(valor => {
      this.idArticuloDevolucion = valor;
      if(this.idArticuloDevolucion > 0){
        this.getArticuloDevolucion(this.idArticuloDevolucion);
      }
    });
  }

  valueArticuloActivoFijo(){
    this.siscointService.ShowArticuloActivoFijo.subscribe(valor => {
      this.idArticuloActivoFijo = valor;
      if(this.idArticuloActivoFijo > 0){
        this.getArticulosActivoFijo(this.idArticuloActivoFijo);
      }
    })
  }

  getArticuloDevolucion(idArticulo : number){
    this.siscointService.getArticuloDevolucion(idArticulo).subscribe((res : any[]) => {
      console.log(res);
      this.setValuesArticulosDevolucion(res);
    })
  }

  valueCentroCosto(){
    this.siscointService.ShowsCcostosValues.subscribe(valor => {
      this.idCentroCosto = valor;
      if(this.idCentroCosto > 0){
        this.getCentroCostos(this.idCentroCosto);
      } 
    })
  }

  getArticulosActivoFijo(id: number){
    
    this.siscointService.getArticuloArtivoFijo(id).subscribe((res : any[]) => {
      //console.log(res[0]);
      this.cod_articulo = res[0].codigo;
      this.descripcion = res[0].descripcion;
      this.valor = res[0].valor;
      this.idDepreciacion = res[0].id;
      this.cCostos = res[0].ceco;
      this.activoFijoDescrip = res[0].id_ped+" "+res[0].codigo+" "+res[0].usuario+" "+res[0].descripcion+" "+res[0].Grupo+" "+res[0].valor+" "+res[0].ceco+" "+res[0].v_util;
      this.busquedaActivoFijo.setValues(res[0].id, this.activoFijoDescrip)
      this.busquedaRapida.validCampoCentroCosto(res[0].ceco)
    })
  }
  getCentroCostos(id:number){
    const area_cCosto : centroCosto = {id : id, ccosto : 0, area: '', area_funcional: ''}
    this.siscointService.getAreaCentroCosto(area_cCosto).subscribe((res : any) => {
      
      this.setValuesAreaCCosto(res);
      
    })
  }

  setValuesArticulosDevolucion(res : any){
    this.cod_articulo = res.codigo;
    this.descripcion = res.descripcion;
    this.tipo = res.tipo;

    this.busquedaDevolucion.setValues(res.codigo, res.descripcion);
    this.siscointService.valorVentanaBusquedaRapida.emit('');
  }

  setValuesAreaCCosto(res: any){
    this.cCostos = res[0].ccosto;
    this.area = res[0].area;
    
    
    this.busquedaRapida.valorMostrar  = res[0].ccosto;
    this.busquedaRapida.setValues(res[0].ccosto, res[0].area, "busquedaCentroCosto")
    this.siscointService.valorVentanaBusquedaRapida.emit('');
  }

}
