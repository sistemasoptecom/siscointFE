import { Component, OnInit } from '@angular/core';
import { VentanabusquedarapidaComponent } from '../../ventanabusquedarapida/ventanabusquedarapida.component';
import { SiscointService } from 'src/app/siscoint.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

 @Component({
  selector: 'app-busq-provedor',
  templateUrl: './busq-provedor.component.html',
  styleUrls: ['./busq-provedor.component.css']
})

export class BusqProvedorComponent implements OnInit {
  valor1 : string = "";
  valor2 : string = "";
  disabled: boolean = true;

  propiedad1 : string = "";
  propiedad2 : string = "";
  propiedad3 : string = "";

  constructor(private siscointService : SiscointService, private modalService : NgbModal, private router:Router) { }

  ngOnInit(): void {
  }
  setValues(value1 : string, value2 : string){
    switch(this.router.url){
      case '/pedidos':
        this.setFormValuesComponent(value1, value2)
        break;
    }
  }

  setFormValuesComponent(value1: string, value2 : string){
    this.valor1 = value1;
    this.valor2 = value2;
  }

  openModal(){
    const modalRef = this.modalService.open(VentanabusquedarapidaComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      // keyboard: false,
      // backdrop: 'static'
    });

    switch(this.router.url){
      case '/pedidos':
        this.propiedad1 = "BUSCAR PROVEEDOR";
        this.propiedad2 = "BusquedaProvedor";
        break;
      case '/pedidosAF':
        this.propiedad1 = "BUSCAR PROVEEDOR";
        this.propiedad2 = "BusquedaProvedor";
        break;
      case '/pedidosDiferidos':
        this.propiedad1 = "BUSCAR PROVEEDOR";
        this.propiedad2 = "BusquedaProvedor";
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
      
    }, (reason) => {
    });
  }

}
