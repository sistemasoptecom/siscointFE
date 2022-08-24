import { Component, OnInit } from '@angular/core';
import { VentanabusquedarapidaComponent } from '../../ventanabusquedarapida/ventanabusquedarapida.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-busq-empleado',
  templateUrl: './busq-empleado.component.html',
  styleUrls: ['./busq-empleado.component.css']
})
export class BusqEmpleadoComponent implements OnInit {
  valor1 : string = "";
  valor2 : string = "";
  disabled : boolean = true;

  propiedad1 : string = "";
  propiedad2 : string = "";
  propiedad3 : string = "";
  constructor(private modalService : NgbModal, private router:Router) { }

  ngOnInit(): void {
  }

  setValues(value1 : string, value2 : string){
    switch(this.router.url){
      case '/gestionar/activos':
        this.setFormValuesComponent(value1, value2);
        break;
      case '/gestionar/devolutivos':
        this.setFormValuesComponent(value1, value2);
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
      case '/gestionar/activos':
        this.propiedad1 = "Buscar nombre de empleado";
        this.propiedad2 = "BuscarEmpleado";
        break;
      case '/gestionar/devolutivos':
        this.propiedad1 = "Buscar nombre de empleado";
        this.propiedad2 = "BuscarEmpleado";
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
