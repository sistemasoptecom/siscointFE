import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiscointService } from 'src/app/siscoint.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { VentanabusquedaComponent } from '../ventanabusqueda/ventanabusqueda.component';
import { VentanabusquedarapidaComponent } from '../ventanabusquedarapida/ventanabusquedarapida.component';

@Component({
  selector: 'app-busquedarapida',
  templateUrl: './busquedarapida.component.html',
  styleUrls: ['./busquedarapida.component.css']
})
export class BusquedarapidaComponent implements OnInit {
  @Input() tipoEvento : string = "";
  required_name : string = "";
  valor1 : string = "";
  valor2 : string = "";
  propiedad1 : string = "";
  propiedad2 : string = "";
  propiedad3 : string = "";
  disabled : boolean = true;
  title = 'appBootstrap';
  
  closeResult: string = "";
  constructor(private siscointService : SiscointService, private modalService : NgbModal, private router:Router) { }

  ngOnInit(): void {
    //this.setValuesBusquedaRapida();
    this.validateComponent();
  }

  validateComponent(){
    if(this.tipoEvento.length > 0){
      switch(this.tipoEvento){
        case 'busquedaArticuloDevolutivo':
          this.setValuesBusquedaRapida();
          break;
        
        case 'busquedaArticuloActivoFijo':
          this.setValuesBusquedaRapida();
          break;
        
        case 'busquedaCentroCosto':
          this.setValuesBusquedaRapida();
          break;
      }
    } 
  }

  setValuesBusquedaRapida(){
    
    this.siscointService.showValor1BusquedaRapida.subscribe(valor => {
      this.valor1 = valor;
    })
    this.siscointService.showValor2BusquedaRapida.subscribe(valor => {
      this.valor2 = valor;
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
          this.propiedad1 = "ArticuloDevolutivo";
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
      }
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
