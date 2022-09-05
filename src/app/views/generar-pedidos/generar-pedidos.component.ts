import { Component, OnInit, ViewChild } from '@angular/core';
import { centroCosto } from 'src/app/_inteface/centroCosto.model';
import { SiscointService } from 'src/app/siscoint.service';
import { BusqProvedorComponent } from 'src/app/controls/busquedasRapidas/busq-provedor/busq-provedor.component';
import { VentanabusquedarapidaComponent } from 'src/app/controls/ventanabusquedarapida/ventanabusquedarapida.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { jefesModel } from 'src/app/_inteface/jefes.models';

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
  idJefe : number = -1;
  disabled : boolean = false;

  idCompraArticulo : number = 0;

  propiedad1 : string = "";
  propiedad2 : string = "";
  propiedad3 : string = "";

  @ViewChild(BusqProvedorComponent)
  private proveedor! : BusqProvedorComponent;
  constructor(private siscointService : SiscointService, private router : Router, private modalService : NgbModal) { }

  ngOnInit(): void {
    this.valueCentroCosto();
    this.validateProvedorContrato();
    this.validateJefes();
    this.validatePedidoCompraArticulos();
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
      //console.log(res);
      this.jefes = res;
    })
  }

  getCompraArticulos(id : number){
    this.siscointService.getCompraArticulo(id).subscribe((res : any) => {
      console.log(res);
    })
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
    this.siscointService.ShowsCcostosValues.subscribe(valor => {
      this.idCentroCosto = valor;
      if(this.idCentroCosto > 0){
        this.getCentroCostos(this.idCentroCosto);
      } 
    })
  }

  getContratoProvedor(id : number){
    this.siscointService.getProvedorContrato(id).subscribe((res : any) => {
      console.log(res);
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
    this.siscointService.showValor1BusquedaRapida.emit(res[0].ccosto);
    this.siscointService.showValor2BusquedaRapida.emit(res[0].area);
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
      //prop3: 'This Can be anything'
    }
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
    // switch(this.router.url){
    //   case '/pedidos':
    //     break;
    //   case '/pedidosAF':
    //     break;
    //   case '/pedidosDiferidos':
    //     break;
    // }
  }

}
