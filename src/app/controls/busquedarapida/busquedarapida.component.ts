import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiscointService } from 'src/app/siscoint.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { VentanabusquedaComponent } from '../ventanabusqueda/ventanabusqueda.component';
import { VentanabusquedarapidaComponent } from '../ventanabusquedarapida/ventanabusquedarapida.component';
import { centroCosto } from 'src/app/_inteface/centroCosto.model';

@Component({
  selector: 'app-busquedarapida',
  templateUrl: './busquedarapida.component.html',
  styleUrls: ['./busquedarapida.component.css']
})
export class BusquedarapidaComponent implements OnInit {
  @Input() tipoEvento : string = "";
  @Input() valorMostrar : string = "";
  tipoEventoValid : string = "";
  valorValidBusqueda : string = "";
  valorCompare : string = "";
  required_name : string = "";
  valor1 : string = "";
  valor2 : string = "";

  value_1 : string = "";
  value_2 : string = "";
  propiedad1 : string = "";
  propiedad2 : string = "";
  propiedad3 : string = "";
  disabled : boolean = true;
  title = 'appBootstrap';

  
  
  closeResult: string = "";
  constructor(private siscointService : SiscointService, private modalService : NgbModal, private router:Router) { }

  ngOnInit(): void {
    this.setValidComponent();
  }

  setValues(valueInput1 : string , valueInput2 : string, valorCompare: string){
    
    this.value_1 = valueInput1
    this.value_2 = valueInput2
    this.valorCompare = valorCompare
   
    this.validateComponent();
  }

  setValueComponent(value1 : string, value2 : string){
    this.valor1 = value1;
    this.valor2 = value2;
  }
  validateComponent(){
    
    if(this.valorValidBusqueda.length > 0){
      this.tipoEventoValid = this.tipoEvento;
      switch(this.valorValidBusqueda){
        case 'busquedaArticuloDevolutivo':
          if(this.valorCompare == this.valorValidBusqueda){
            this.valor1 = this.value_1;
            this.valor2 = this.value_2;
          }
          break;
        
        case 'busquedaArticuloActivoFijo':
          if(this.valorCompare == this.valorValidBusqueda){
            this.valor1 = this.value_1;
            this.valor2 = this.value_2;
          }
          break;
        
        case 'busquedaCentroCosto':
          if(this.valorCompare == this.valorValidBusqueda){
            this.valor1 = this.value_1;
            this.valor2 = this.value_2;
          }
          break;
      }
    } 
  }

  validCampoCentroCosto(cCosto : string){
    this.valor1 = cCosto;
    this.getCentroCostos(parseInt(this.valor1));
  }

  getCentroCostos(ccosto:number){
    const area_cCosto : centroCosto = {id : 0, ccosto : ccosto, area: '', area_funcional: ''}
    this.siscointService.getAreaCentroCosto(area_cCosto).subscribe((res : any[]) => {
      console.log(res[0]);
      
      this.setValueComponent(res[0].ccosto, res[0].area);
    })
  }

  setValidComponent(){
    this.siscointService.valorVentanaBusquedaRapida.subscribe(valor => {
      this.valorValidBusqueda = valor;
    })
  }

  openModal(){
    const modalRef = this.modalService.open(VentanabusquedarapidaComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      // keyboard: false,
      // backdrop: 'static'
    });
    if(this.tipoEvento.length > 0){
      switch(this.tipoEvento){
        case 'busquedaArticuloDevolutivo':
          this.propiedad1 = "Buscar Articulo";
          this.propiedad2 = "ArticuloDevolutivo";
          break;
        case 'busquedaArticuloActivoFijo':
          this.propiedad1 = "Buscar Articulo Activo Fijo";
          this.propiedad2 = "ArticuloActivoFijo";
          break;
        case 'busquedaCentroCosto':
          this.propiedad1 = "Buscar Centro de costo"
          this.propiedad2 = "area_ccosto"
          break;
      }
    }else{
      switch(this.router.url){
        case '/empleados':
          this.propiedad1 = "Buscar Area"
          this.propiedad2 = "area_ccosto"
          break;
        case '/pedidos':
          this.propiedad1 = "Buscar Area"
          this.propiedad2 = "area_ccosto"
          break;
      }
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
    this.siscointService.enabledModal.emit(true);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
