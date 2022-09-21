import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentanabusquedarapidaComponent } from '../../ventanabusquedarapida/ventanabusquedarapida.component';
import { SiscointService } from 'src/app/siscoint.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { articulosModel } from 'src/app/_inteface/articulos.model';

@Component({
  selector: 'app-busq-articulo-devolucion',
  templateUrl: './busq-articulo-devolucion.component.html',
  styleUrls: ['./busq-articulo-devolucion.component.css']
})
export class BusqArticuloDevolucionComponent implements OnInit {
  valor1 : string = "";
  valor2 : string = "";
  disabled : boolean = true;
  propiedad1 : string = "";
  propiedad2 : string = "";
  propiedad3 : string = "";
  constructor(private siscointService : SiscointService, private modalService : NgbModal, private router:Router) { }

  ngOnInit(): void {
    this.validateSetArticuloDev();
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

  validateSetArticuloDev(){
    this.siscointService.ShowsArticulosFormDev.subscribe(valor => {
      if(valor != ""){
        console.log("Entra a validar ? ", valor)
        this.validCampoArticuloDev(valor);
      }
    });
  }

  validCampoArticuloDev(valor : string){
    //const articulo : art
    const articulos : articulosModel = { codigo : valor, descripcion : "", tipo :0, marca :"" }
    this.siscointService.getValuesTipoArticuloDevolucion(articulos).subscribe((res : any) => {
      this.setFormValuesComponent(res.codigo, res.descripcion);
    })
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
        this.propiedad1 = "Buscar Articulo";
        this.propiedad2 = "ArticuloDevolutivo";
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
  }

}
