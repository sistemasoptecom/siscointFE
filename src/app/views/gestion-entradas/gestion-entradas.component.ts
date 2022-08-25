import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VentanabusquedarapidaComponent } from '../../controls/ventanabusquedarapida/ventanabusquedarapida.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SiscointService } from 'src/app/siscoint.service';
import { empleado } from 'src/app/_inteface/empleado.model';
import { BusqEmpleadoComponent } from 'src/app/controls/busquedasRapidas/busq-empleado/busq-empleado.component';
import { jefesModel } from 'src/app/_inteface/jefes.models';
import { detalleEntregaModel } from 'src/app/_inteface/detalleEntrega.model';
import { tipoEntregaModel } from 'src/app/_inteface/tipoEntrega.model';
import { NavbarComponent } from 'src/app/controls/navbar/navbar.component';
import { entradasModel } from 'src/app/_inteface/entradas.model';

@Component({
  selector: 'app-gestion-entradas',
  templateUrl: './gestion-entradas.component.html',
  styleUrls: ['./gestion-entradas.component.css']
})
export class GestionEntradasComponent implements OnInit {
  public disabled : boolean = true;
  EsGuardarActivoFijo : boolean = false;
  EsGuardarDevolutivo : boolean = false;
  tipoGestion : string = "";
  tituloGestion  : string = "";
  cCostoAsignado : string = "";
  cCostoProveniente  : string = "";
  cargo : string = "";
  fecha : Date = new Date;
  idJefe : number = 0;
  jefes : jefesModel[] = [];
  detalleTablaActFijo : detalleEntregaModel[] = [];
  tipoFomulario : number = 0;
  propiedad1 : string = "";
  propiedad2 : string = "";
  propiedad3 : string = "";
  idEmpleado : number = 0;
  cedulaEmpleado : string = "";
  nombresEmpleado : string = "";
  descripcionObjeto : string = "";
  marcaObjeto : string = "";
  serialObjeto : string = "";
  estadoObjeto : string = "";
  cantidaObjeto : string = "1";
  observacionesObjetos : string = "";
  observacionEntrega : string = "";

  entrega : string = "";
  devolucion : string = "";
  translado : string = "";
  reparacion : string = "";
  prestamo : string = "";

  idObjetoActivo : number = 0;

  @ViewChild(BusqEmpleadoComponent)
  private empleado! : BusqEmpleadoComponent;

  @ViewChild(NavbarComponent)
  private navbar! : NavbarComponent;
  constructor(private router : Router,private modalService : NgbModal, private siscointService : SiscointService) { }

  ngOnInit(): void {
    this.siscointService.disabled.subscribe(valor => {
      this.disabled = valor;
    });
    this.validarTipoGestion();
    this.validarIdEmpleado();
    this.validateJefes();
    this.validateDescripcionActivoFijo();
    this.validarGuardarActivoFijo();
  }

  validarGuardarActivoFijo(){
    this.siscointService.EsGuardarActivoFijo.subscribe(valor => {
      this.EsGuardarActivoFijo = valor;
      if(this.EsGuardarActivoFijo){
        this.EsCrearEntradaActivoFijo();
      }
    })
  }

  validarGuardarDevolutivo(){
    this.siscointService.EsGuardarDevolutivo.subscribe(valor => {
      this.EsGuardarDevolutivo = valor;
      
    })
  }

  EsCrearEntradaActivoFijo(){
    const tipoEntrega : tipoEntregaModel = {
      entrega : this.entrega,
      devolucion : this.devolucion,
      translado : this.translado,
      reparacion : this.reparacion,
      prestamo : this.reparacion
    }
    let hora = new Date().getHours().toString();
    let minutos = new Date().getMinutes().toString();
    const entradas : entradasModel = {
      ced_empl : this.cedulaEmpleado,
      fecha : new Date(),
      hora : hora+":"+minutos,
      id_empresa : 1,
      cod_user : parseInt(this.navbar.getCodigoUser()),
      observacion : this.observacionEntrega,
      autoriza : this.idJefe,
      estado : 1,
      tipo_acta : 2
    }

    //let data : Array<object> = [];
    
    //console.log(this.navbar.getCodigoUser());
    this.siscointService.addEntregaArticuloFijo(tipoEntrega, entradas, this.detalleTablaActFijo).subscribe((res : any) => {
      console.log(res);
    }) 
  }

  validateJefes(){
    this.siscointService.getJefes().subscribe((res : jefesModel[]) => {
      //console.log(res);
      this.jefes = res;
    })
  }

  validateDescripcionActivoFijo(){
    this.siscointService.ShowDescripcionArticuloActivoFijo.subscribe(valor => {
      this.idObjetoActivo = valor;
      if(this.idObjetoActivo > 0){
        this.getDataDescripcionActivoFijo(this.idObjetoActivo);
      }
    })
  }

  getDataDescripcionActivoFijo(id : number){
    this.siscointService.getTipoObjeto(id).subscribe((res : any[]) => {
      console.log(res);
      this.setValuesDescripcionActivoFijo(res);
    })
  }

  setValuesDescripcionActivoFijo(res : any[]){
    this.descripcionObjeto = res[0].descripcion;
    this.serialObjeto = res[0].imei;
  }

  cleanValuesDetallesActivoFijos(){
    this.descripcionObjeto = "";
    this.marcaObjeto = "";
    this.serialObjeto = "";
    this.estadoObjeto = "";
    this.descripcionObjeto = "";
  }

  validarIdEmpleado(){
    this.siscointService.showEmpleadosValuesBusRap.subscribe(valor => {
      this.idEmpleado = valor;
      if(this.idEmpleado > 0){
        this.getValuesFormEmpleado(this.idEmpleado);
      }
    });
  }

  addDescripcionAF(){
    //validar campos
    const entregaDetalle : detalleEntregaModel = {
      elemento : this.descripcionObjeto,
      marca : this.marcaObjeto,
      placa_af : "",
      estado : this.estadoObjeto,
      cantidad : parseInt(this.cantidaObjeto),
      observacion : this.observacionesObjetos,
      imei_inv : this.serialObjeto,
      c : 0,
      l : 0, 
      a : 0,
      v : 0, 
      f : 0
    }
    let indexAc : number = -1;
    indexAc = this.detalleTablaActFijo.findIndex(x => x.imei_inv === this.serialObjeto);
    console.log("indice es : ", indexAc);
    if(indexAc > -1){
      alert("El objeto "+this.serialObjeto+" ya esta adicionado");
    }else{
      this.detalleTablaActFijo.push(entregaDetalle);
      this.cleanValuesDetallesActivoFijos();
    }
  }

  getValuesFormEmpleado(id: number){
    //getEmpleado
    const Empleado : empleado = {
                      id: id,
                      cedula_emp:"",
                      nombre : "",
                      snombre : "",
                      ppellido : "",
                      spellido : "",
                      area     : "",
                      cargo : "",
                      estado : 0,
                      permiso : 0,
                      ccosto : 0,
                      empresa : 0}
    this.siscointService.getEmpleado(Empleado).subscribe((res : any) => {
      //console.log(res);
      this.setValuesEmpleados(res);
    })
  }

  setValuesEmpleados(res : any){
    this.cCostoAsignado = res[0].ccosto;
    this.cargo = res[0].cargo;
    this.cedulaEmpleado = res[0].cedula_emp;
    this.nombresEmpleado = res[0].nombre + " " + res[0].snombre + " " + res[0].ppellido + " " + res[0].spellido;
    this.empleado.setValues(this.cedulaEmpleado, this.nombresEmpleado);
  }

  remover(item : any){
    //console.log(item);

    const index : number = this.detalleTablaActFijo.findIndex(x => x.imei_inv === item.imei_inv)
    //console.log("Index : ", index);
    this.detalleTablaActFijo.splice(index, 1);
  }

  validarTipoGestion(){
    this.tipoGestion = this.router.url
    //console.log(this.tipoGestion);
    switch(this.tipoGestion){
      case '/gestionar/activos':
        this.tituloGestion = 'ACTA DE ACTIVOS FIJOS';
        this.tipoFomulario = 1;
        break;
      case '/gestionar/devolutivos':
        this.tituloGestion = 'ACTA DE ENTREGA ELEMENTOS DEVOLUTIVOS';
        this.tipoFomulario = 2;
        break;
    }
  }
  validateModal(){
    //alert("Presionada con el F2")
    const modalRef = this.modalService.open(VentanabusquedarapidaComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      // keyboard: false,
      // backdrop: 'static'
    });

    switch(this.router.url){
      case '/gestionar/activos':
        this.propiedad1 = "BUSCAR ACTIVOS FIJOS DISPONIBLES";
        this.propiedad2 = "ObjetoFijo";
        break;
    }

    let data = {
      prop1: this.propiedad1,
      prop2: this.propiedad2,
      //prop3: 'This Can be anything'
    }
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

}
