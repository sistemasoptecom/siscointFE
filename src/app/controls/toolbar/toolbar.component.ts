import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { SiscointService } from 'src/app/siscoint.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VentanabusquedaComponent } from '../ventanabusqueda/ventanabusqueda.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  buscar : boolean = true;
  imprimir : boolean = false;
  crear : boolean = true;
  guardar : boolean = false;
  editar : boolean = true;
  actulizar : boolean = false;
  confirmar : boolean = false;
  cancelar : boolean = false;
  cerrar : boolean = true;
  constructor(private siscointService : SiscointService, private modalService : NgbModal) { }

  ngOnInit(): void {
  }
  habiliarCampos(valor : boolean){
    this.siscointService.disabled.emit(valor);
    if(valor === true){
      this.habilitarToolbarInicio();
    }else{
      this.habilitarGuardar();
    }
  }

  openModal(){
    this.modalService.open(VentanabusquedaComponent)
    this.siscointService.enabledModal.emit(true);
    // modalRef.result.then((result) => {
    //   console.log("result es ",result);
      
        
    //   this.siscointService.enabledModal.emit(true);
    // }).catch((error) => {
    //   console.log("error es  ",error);
    // });
    
  }

  habilitarToolbarInicio(){
    this.buscar = true;
    this.imprimir = false;
    this.crear = true;
    this.guardar = false;
    this.editar = true;
    this.actulizar = false;
    this.confirmar = false;
    this.cancelar = false;
    this.cerrar = true;
  }
  
  habilitarGuardar(){
    this.buscar = false;
    this.imprimir = false;
    this.crear = false;
    this.guardar = true;
    this.editar = false;
    this.actulizar = false;
    this.confirmar = false;
    this.cancelar = true;
    this.cerrar = false;
  }

}
