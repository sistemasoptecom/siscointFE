import { Component, OnInit, ViewChild } from '@angular/core';
import { centroCosto } from 'src/app/_inteface/centroCosto.model';
import { SiscointService } from 'src/app/siscoint.service';
import { BusqProvedorComponent } from 'src/app/controls/busquedasRapidas/busq-provedor/busq-provedor.component';
import { BusquedaCentroCostoComponent } from 'src/app/controls/busquedasRapidas/busqueda-centro-costo/busqueda-centro-costo.component';
import { VentanabusquedarapidaComponent } from 'src/app/controls/ventanabusquedarapida/ventanabusquedarapida.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { jefesModel } from 'src/app/_inteface/jefes.models';
import { NavbarComponent } from 'src/app/controls/navbar/navbar.component';
import { detallePedidoModel } from 'src/app/_inteface/detallePedido.model';
import { pedidosModel } from 'src/app/_inteface/pedido.models';


@Component({
  selector: 'app-generar-pedidos',
  templateUrl: './generar-pedidos.component.html',
  styleUrls: ['./generar-pedidos.component.css']
})
export class GenerarPedidosComponent implements OnInit {
  cCostos : string = "";
  area : string = "";
  nro_pedido :string = "";
  idCentroCosto : number = 0;
  idProvedorContrato : number = 0;
  nitProveedor : string = "";
  contratorProveedor : string = "";
  jefes : jefesModel[] = [];
  directivos : any[] = [];
  idJefe : number = -1;
  usuariojefe : string = "";
  disabled : boolean = false;
  justificacion : string = "";

  idCompraArticulo : number = 0;

  propiedad1 : string = "";
  propiedad2 : string = "";
  propiedad3 : string = "";

  codigoArtGrid : string = "";
  descripArtGrid : string = "";
  cantidadArtGrid : number = 0;
  undArtGrid : string = "";
  valorArtGrid : number = 0;
  ivaArtGrid : number = 0;
  subTotalArtGrid : number = 0;
  totalArtGrid : number = 0;
  valorTotal : number = 0;
  cuentaArtGridHidden : string = "";

  EsAgregarGrid : boolean = true;
  EsEditarGrid : boolean = false;

  EsGuardarPedidoNormal : boolean = false;
  EsGuardarPedidoAF : boolean = false;
  EsGuardarPedidoDiff : boolean = false;

  detalleTablaPedidoGrid : detallePedidoModel[] = [];

  fecha : Date = new Date;
  usuario : string = "";
  nombreUsuario : string = "";

  @ViewChild(BusqProvedorComponent)
  private proveedor! : BusqProvedorComponent;

  @ViewChild(BusquedaCentroCostoComponent)
  private cCosto! : BusquedaCentroCostoComponent;

  @ViewChild(NavbarComponent)
  private navbar! : NavbarComponent;
  constructor(private siscointService : SiscointService, private router : Router, private modalService : NgbModal) { }

  ngOnInit(): void {
    this.valueCentroCosto();
    this.validateProvedorContrato();
    this.validateJefes();
    this.validateGetDirectivos();
    this.validatePedidoCompraArticulos();
    
    this.nombreUsuario = JSON.parse(JSON.stringify(localStorage.getItem('nombreCompleto'))) || ""
   
    this.validarAddTipoPedido();
  }

  

  validatePedidoCompraArticulos(){
    this.siscointService.showPedidoArticulosCompras.subscribe(valor => {
      this.idCompraArticulo = valor;
      if(this.idCompraArticulo > 0){
        this.getCompraArticulos(this.idCompraArticulo);
      }
    })
  }

  validateJefes(){
    this.siscointService.getJefes().subscribe((res : jefesModel[]) => {
      
      this.jefes = res;
    })
  }

  validateGetDirectivos(){
    this.siscointService.getDirectivos().subscribe((res : any[]) => {
      this.directivos = res;
    })
  }

  getCompraArticulos(id : number){
    this.siscointService.getCompraArticulo(id).subscribe((res : any) => {
      
      this.codigoArtGrid = res.codigo;
      this.descripArtGrid = res.descripcion;
      this.undArtGrid = res.und;
      this.ivaArtGrid = res.iva;
      this.cuentaArtGridHidden = res.cuenta;
    })
  }

  addDetallePedido(){
    //let subTotal : number = this.valorArtGrid * this.cantidadArtGrid;
    
    let sumArticulos : number = 0;
    if(this.cantidadArtGrid > 0 || this.valorArtGrid > 0){
      const detallePedido : detallePedidoModel = {
        id_pedido : 0,
        codigo_art : this.codigoArtGrid,
        descripcion : this.descripArtGrid,
        cantidad : this.cantidadArtGrid,
        und : this.undArtGrid,
        valor : this.valorArtGrid,
        iva : this.valorArtGrid*this.ivaArtGrid,
        subtotal : this.valorArtGrid * this.cantidadArtGrid,
        total : (this.valorArtGrid*this.cantidadArtGrid) + (this.valorArtGrid* this.cantidadArtGrid)*this.ivaArtGrid,
        cuenta : this.cuentaArtGridHidden
      }
      let indexAc : number = -1;
      indexAc = this.detalleTablaPedidoGrid.findIndex(x => x.codigo_art === this.codigoArtGrid);
      if(indexAc > -1){
        alert("El objeto "+this.codigoArtGrid+" ya esta adicionado");
      }else{
        this.detalleTablaPedidoGrid.push(detallePedido);
        sumArticulos = (this.valorArtGrid*this.cantidadArtGrid) + (this.valorArtGrid* this.cantidadArtGrid)*this.ivaArtGrid;
        this.valorTotal = this.valorTotal + sumArticulos;
        //this.cleanValuesDetallesActivoFijos();

        this.cleanValuesTablaDetallePedido();
      }
    }else{
      alert("Cantida y/o Valor deben ser mayor a cero")
    }
  }

  cleanValuesTablaDetallePedido(){
    this.codigoArtGrid = "";
    this.descripArtGrid = "";
    this.cantidadArtGrid = 0;
    this.undArtGrid = "";
    this.valorArtGrid = 0;
    this.ivaArtGrid = 0;
    this.subTotalArtGrid = 0;
    this.totalArtGrid = 0;
  }

  validateProvedorContrato(){
    this.siscointService.ShowProveedores.subscribe(valor => {
      this.idProvedorContrato = valor;
      if(this.idProvedorContrato > 0){
        this.getContratoProvedor(this.idProvedorContrato);
      }
    })
  }

  valueCentroCosto(){
    this.siscointService.ShowCentroCostos.subscribe(valor => {
      this.idCentroCosto = valor;
      if(this.idCentroCosto > 0){
        this.getCentroCostos(this.idCentroCosto);
      } 
    })
  }

  getContratoProvedor(id : number){
    this.siscointService.getProvedorContrato(id).subscribe((res : any) => {
      
      this.setValuesContratoProveedor(res)
    })
  }

  setValuesContratoProveedor(res : any){
    this.nitProveedor = res.nit;
    this.contratorProveedor = res.contrato;
    this.proveedor.setValues(res.nit, res.contrato)
  }

  getCentroCostos(id:number){
    const area_cCosto : centroCosto = {id : id, ccosto : 0, area: '', area_funcional: ''}
    this.siscointService.getAreaCentroCosto(area_cCosto).subscribe((res : any) => {
      
      this.setValuesAreaCCosto(res);
      
    })
  }

  setValuesAreaCCosto(res: any){
    this.cCostos = res[0].ccosto;
    this.area = res[0].area;
    this.cCosto.setValues(this.cCostos, this.area);
   
  }
 

  getTipoArticulo(){
    const modalRef = this.modalService.open(VentanabusquedarapidaComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      // keyboard: false,
      // backdrop: 'static'
    });

    switch(this.router.url){
      case '/pedidos':
        this.propiedad1 = "BUSCAR ARTICULO";
        this.propiedad2 = "busquedaArticulo";
        break;
      case '/pedidosAF':
        this.propiedad1 = "BUSCAR ARTICULO";
        this.propiedad2 = "busquedaArticuloArticuloFijo";
        break;
      case '/pedidosDiferidos':
        this.propiedad1 = "BUSCAR ARTICULO";
        this.propiedad2 = "busquedaArticuloArticuloDiff";
        break;
    }

    let data = {
      prop1: this.propiedad1,
      prop2: this.propiedad2,
      prop3: this.propiedad3,
     
    }
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      
    }, (reason) => {
    });
    
  }

  validarAddTipoPedido(){
    let tipoPedido : string = "";
    switch(this.router.url){
      case '/pedidos':
        this.siscointService.EsGuardarPedidoNormal.subscribe( valor => {
          this.EsGuardarPedidoNormal = valor;
          if(this.EsGuardarPedidoNormal){
            tipoPedido = "PEDIDO";
            this.addPedido(tipoPedido);
          }
        })
        // tipoPedido = "PEDIDO";
        break;
      case '/pedidosAF':
        this.siscointService.EsGuardarPedidoAF.subscribe( valor => {
          this.EsGuardarPedidoAF = valor;
          if(this.EsGuardarPedidoAF){
            tipoPedido = "ARTICULO_FIJO";
            this.addPedido(tipoPedido);
          }
        })
        // tipoPedido = "ARTICULO_FIJO"
        break;
      case '/pedidosDiferidos':
        this.siscointService.EsGuardarPedidoDiff.subscribe(valor => {
          this.EsGuardarPedidoDiff = valor;
          if(this.EsGuardarPedidoDiff){
            tipoPedido = "DIFERIDO";
            this.addPedido(tipoPedido);
          }
        })
        
        break;
    }
  }

  addPedido(tipoPedido : string){
    if(this.detalleTablaPedidoGrid.length > 0){
      const pedido : pedidosModel = {
        fecha : this.fecha,
        usuario : this.nombreUsuario,
        proveedor : this.nitProveedor,
        ccosto : this.cCostos,
        justificacion : this.justificacion,
        estado : 'RETENIDO',
        nro_contrato : this.contratorProveedor,
        asignado_a : this.usuariojefe
      }
      this.siscointService.addPedidos(tipoPedido, pedido, this.detalleTablaPedidoGrid).subscribe((res : any) => {
       
      })
    }else{
      alert("Debe seleccionar un articulo")
    }
    
  }

}
