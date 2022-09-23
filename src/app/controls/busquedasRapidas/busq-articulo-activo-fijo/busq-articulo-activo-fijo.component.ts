import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentanabusquedarapidaComponent } from '../../ventanabusquedarapida/ventanabusquedarapida.component';
import { SiscointService } from 'src/app/siscoint.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-busq-articulo-activo-fijo',
  templateUrl: './busq-articulo-activo-fijo.component.html',
  styleUrls: ['./busq-articulo-activo-fijo.component.css']
})
export class BusqArticuloActivoFijoComponent implements OnInit {
  valor1 : string = "";
  valor2 : string = "";
  disabled : boolean = true;
  propiedad1 : string = "";
  propiedad2 : string = "";
  propiedad3 : string = "";
  constructor(private siscointService : SiscointService, private modalService : NgbModal, private router:Router) { }

  ngOnInit(): void {
  }

  setValues(value1 : string, value2 : string){
    switch(this.router.url){
      case '/articulos':
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
      case '/articulos':
        this.propiedad1 = "Buscar Articulo Activo Fijo";
        this.propiedad2 = "ArticuloActivoFijo";
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

}
