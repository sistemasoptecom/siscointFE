import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { SiscointService } from 'src/app/siscoint.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VentanabusquedaComponent } from '../ventanabusqueda/ventanabusqueda.component';
import { ArticulosComponent } from 'src/app/views/articulos/articulos.component';

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

  EsHabilitarEditar : boolean = false;

  @ViewChild(ArticulosComponent)
  private articulos! : ArticulosComponent;
  //@Output() notificarArticulo: EventEmitter<any> = new EventEmitter();
  constructor(private siscointService : SiscointService, private modalService : NgbModal, private router:Router) { }

  ngOnInit(): void {
    this.siscointService.esHabilitarGuardar.subscribe(valor => {
      this.EsHabilitarEditar = valor;
      if(this.EsHabilitarEditar == true){
        this.habilitarEditar();
      }
    });
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
  habilitarEditar()
  {
    this.buscar = false;
    this.imprimir = false;
    this.crear = false;
    this.guardar = false;
    this.editar = false;
    this.actulizar = true;
    this.confirmar = false;
    this.cancelar = true;
    this.cerrar = false;
  }
  cerrarModulo(){
    //this.router.url('/home')
    this.router.navigateByUrl('/home');
  }

  agregarFormulario(){
    
    switch(this.router.url){
      case '/usuarios':
        this.siscointService.esGuardarFromUser.emit(true);
        break;
      case '/empleados':
        this.siscointService.esGuardarFormEmpleado.emit(true);
        break;
      case '/articulos':
        this.siscointService.esGuardarFormArticulo.emit(true);
        //this.articulo.validarAddArticulos();
        break;
      case '/gestionar/activos':
        this.siscointService.EsGuardarActivoFijo.emit(true);
        break;
      case '/gestionar/devolutivos':
        this.siscointService.EsGuardarDevolutivo.emit(true);
        break;
    }
    
  }

  actualizarFormulario(){
    switch(this.router.url){
      case '/usuarios':
        this.siscointService.esActualizarFormUser.emit(true);
        break;
      case '/empleados':
        this.siscointService.esActualizarFormEmpleado.emit(true);
        break;
    }
  }

}
