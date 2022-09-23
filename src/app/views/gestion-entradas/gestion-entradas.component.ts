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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gestion-entradas',
  templateUrl: './gestion-entradas.component.html',
  styleUrls: ['./gestion-entradas.component.css'],
  providers : [DatePipe]
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
  detalleTablaDevolutivo : detalleEntregaModel[] = [];
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
  estadoObjetoDev : string = "";
  cantidaObjeto : string = "1";
  observacionesObjetos : string = "";
  valorObjeto : number = 0;
  observacionEntrega : string = "";
  justificacionEntrega : string = "";
  
  entrega : string = "";
  devolucion : string = "";
  translado : string = "";
  reparacion : string = "";
  prestamo : string = "";

  accesorioC : boolean = false;
  accesorioL : boolean = false;
  accesorioA : boolean = false;
  accesorioV : boolean = false;
  accesorioF : boolean = false;

  tipoEntrega : string = "";
  parametroDetalle : string = "";
  idObjetoActivo : number = 0;
  idObjetoDevolutivo : number =  0;

  @ViewChild(BusqEmpleadoComponent)
  private empleado! : BusqEmpleadoComponent;

  @ViewChild(NavbarComponent)
  private navbar! : NavbarComponent;
  constructor(private router : Router,private modalService : NgbModal, private siscointService : SiscointService) { 
    this.fecha = new Date();
  }

  ngOnInit(): void {
    
    this.siscointService.disabled.subscribe(valor => {
      this.disabled = valor;
    });
    this.validarTipoGestion();
    this.validarIdEmpleado();
    this.validateJefes();
    this.validateDescripcionActivoFijo();
    this.validarGuardarActivoFijo();
    this.validateDescripcionDevolitivo();
  }
  
  
  validateGuardarActivoDev(){
    this.siscointService.EsGuardarDevolutivo.subscribe(valor => {
      this.EsGuardarDevolutivo = valor;
      if(this.EsGuardarDevolutivo){

      }
    })
  }
  validarGuardarActivoFijo(){

    
    
      this.siscointService.EsGuardarActivoFijo.subscribe(valor => {
        this.EsGuardarActivoFijo = valor;
        if(this.EsGuardarActivoFijo){
          this.EsCrearEntradaActivoFijo();
          
        }
      })
    

    
  }

  validateCamposAF(){
    if( this.cargo !== ""
      || this.cCostoAsignado !== ""
      || this.descripcionObjeto !== ""
      || this.serialObjeto !== ""
      || this.estadoObjeto !== ""
      || this.observacionesObjetos !== ""
      || this.justificacionEntrega ! == ""
      ){
        return 1;
    }else{
        return 0;
    }
  }

  validarGuardarDevolutivo(){
    this.siscointService.EsGuardarDevolutivo.subscribe(valor => {
      this.EsGuardarDevolutivo = valor;
      
    })
  }

  tipoEntregaForm(e : any){
    this.tipoEntrega = e.target.value;
    
  }

  EsCrearEntradaDevolutivo(){
    let ValidaForm : number = this.validateCamposAF();
    if(ValidaForm == 1){
      if(this.detalleTablaDevolutivo.length > 0){
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
        this.siscointService.addEntradaDevolutivo(tipoEntrega, entradas, this.detalleTablaDevolutivo).subscribe((res : any) => {
          console.log(res);
        })
      }else{
        alert("Debe Agregar un Item")
      }
    }else{

      alert("Hay Campos Vacios ")
    }
  }

  EsCrearEntradaActivoFijo(){
    let ValidaForm : number = this.validateCamposAF();
    if(ValidaForm == 1){
      if(this.detalleTablaActFijo.length > 0){
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
          tipo_acta : 1
        }
    
        this.siscointService.addEntregaArticuloFijo(tipoEntrega, entradas, this.detalleTablaActFijo).subscribe((res : any) => {
          console.log(res);
        })
      }else{
        alert("Debe Agregar un Item")
      }
      
      //alert("No hay Campos Vacios")
    }else{

      alert("Hay Campos Vacios ")
    }

     
  }

  validateJefes(){
    this.siscointService.getJefes().subscribe((res : jefesModel[]) => {
      //console.log(res);
      this.jefes = res;
    })
  }

  validateDescripcionDevolitivo(){
    this.siscointService.ShowDescripcionArticuloDevolutivo.subscribe(valor => {
      this.idObjetoDevolutivo = valor;
      if(this.idObjetoDevolutivo > 0){
        this.getdataDescripcionDevolutivo(this.idObjetoDevolutivo);
      }
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

  getdataDescripcionDevolutivo(id : number){
    this.siscointService.getTipoObjeto(id).subscribe((res : any[]) => {
      this.setValuesDescripcionDevolutivo(res);
    })
  }

  getDataDescripcionActivoFijo(id : number){
    this.siscointService.getTipoObjeto(id).subscribe((res : any[]) => {
     this.setValuesDescripcionActivoFijo(res);
    })
  }

  setValuesDescripcionDevolutivo(res :any[]){
    this.descripcionObjeto  = res[0].descripcion;
    this.serialObjeto = res[0].imei;
    this.valorObjeto = res[0].valor;
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

  addDescripcionDev(){
    if(this.descripcionObjeto !== ""){
      if(this.estadoObjetoDev !== ""){
        const entregaDetalle : detalleEntregaModel = {
          elemento : this.descripcionObjeto,
          marca : this.marcaObjeto,
          placa_af : "",
          estado : this.estadoObjeto,
          cantidad : parseInt(this.cantidaObjeto),
          observacion : this.observacionesObjetos,
          imei_inv : this.serialObjeto,
          c : +this.accesorioC,
          l : +this.accesorioL, 
          a : +this.accesorioA,
          v : +this.accesorioV, 
          f : +this.accesorioF
        }
        let indexAc : number = -1;
        indexAc = this.detalleTablaDevolutivo.findIndex(x => x.imei_inv === this.serialObjeto);
        if(indexAc > -1){
          alert("El objeto "+this.serialObjeto+" ya esta adicionado");
        }else{
          this.detalleTablaDevolutivo.push(entregaDetalle);
          this.cleanValuesDetallesActivoFijos();
        }
      }else{
        alert("debe Escoger un estado")
      }
    }else{
      alert("Debe Escoger un Item")
    }
  }

  addDescripcionAF(){
    if(this.descripcionObjeto !== ""){
      if(this.estadoObjeto != ""){
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
        //console.log("indice es : ", indexAc);
        if(indexAc > -1){
          alert("El objeto "+this.serialObjeto+" ya esta adicionado");
        }else{
          this.detalleTablaActFijo.push(entregaDetalle);
          this.cleanValuesDetallesActivoFijos();
        }
      }else{
        alert("debe Escoger un estado")
      }
      
    }else{
      alert("Debe Escoger un Item")
    }
    //validar campos
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
    const index : number = this.detalleTablaActFijo.findIndex(x => x.imei_inv === item.imei_inv)
    
    this.detalleTablaActFijo.splice(index, 1);
  }

  removerDev (item : any){
    const index : number = this.detalleTablaDevolutivo.findIndex(x => x.imei_inv === item.imei_inv)
    
    this.detalleTablaDevolutivo.splice(index, 1);
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
    if(this.entrega !== "" 
    || this.devolucion !== "" 
    || this.translado !== ""  
    || this.reparacion !== "" 
    || this.prestamo !== ""){
      const modalRef = this.modalService.open(VentanabusquedarapidaComponent, {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });
  
      switch(this.router.url){
        case '/gestionar/activos':
          if(this.tipoEntrega === "1"){
            this.parametroDetalle = "estado = 1";
          }else if(this.tipoEntrega === "2"){
            this.parametroDetalle = "estado = 0";
          }
          this.propiedad1 = "BUSCAR ACTIVOS FIJOS DISPONIBLES";
          this.propiedad2 = "ObjetoFijo";
          this.propiedad3 = this.parametroDetalle;
          break;
        case '/gestionar/devolutivos':
          if(this.tipoEntrega === "1"){
            this.parametroDetalle = "estado = 1";
          }else if(this.tipoEntrega === "2"){
            this.parametroDetalle = "estado = 0";
          }
          this.propiedad1 = "BUSCAR DEVOLUTIVOS DISPONIBLES";
          this.propiedad2 = "ObjetoDevolutivo";
          this.propiedad3 = this.parametroDetalle;
          break;
      }
  
      let data = {
        prop1: this.propiedad1,
        prop2: this.propiedad2,
        prop3: this.propiedad3,
      }
      modalRef.componentInstance.fromParent = data;
      modalRef.result.then((result) => {
        console.log(result);
      }, (reason) => {
      });
    }else{
      alert("Debe Escoger un tipo de acta")
    }
    
    
  }

}
